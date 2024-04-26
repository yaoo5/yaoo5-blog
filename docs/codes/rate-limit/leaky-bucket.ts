const Redis = require('ioredis');
export const redis = new Redis({
    host: '127.0.0.1',
    port: 6379
});

// #region example
const Koa = require('koa');
const app = new Koa();

// 使用中间件
app.use(leakyBucket('fixedWindow', 5));

app.use((ctx) => ctx.body = 'Hello World');
app.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
});
// #endregion example

// #region middleware
/**
 * 漏桶算法限流
 * @param {string} key 缓存key
 * @param {number} capacity 桶容量
 * @param {number} outRate 出水速率, 每秒出水量
 */
export function leakyBucket(
    key = 'leakyBucket',
    capacity = 5,
    outRate = 1
) {
    return async (ctx, next) => {
        const luaScript = `
      local redisKey = KEYS[1]
      local now = tonumber(ARGV[1])
      local capacity = tonumber(ARGV[2])
      local outRate = tonumber(ARGV[3])
      
      -- Step 1: 清除过期水滴，并获取当前水量
      redis.call('ZREMRANGEBYSCORE', redisKey, '-inf', now);
      local water = tonumber(redis.call('zcard', redisKey))
      
      -- Step 2：如果水量小于容量，则继续加水
      if water < capacity then
        local interval = math.floor(1000 / outRate)
        local max_score = redis.call('ZREVRANGE', redisKey, 0, 0)
        local lastOperateTime = max_score[0] or 0
        local currOperateTime = math.max(lastOperateTime + interval, now)
        redis.call('ZADD', redisKey, currOperateTime, currOperateTime)
        return currOperateTime
      else
        return -1
      end
    `;
        const now = Date.now();
        const currOperateTime = await redis.eval(
            luaScript,
            1,
            key,
            now.toString(),
            capacity.toString(),
            outRate.toString(),
        );

        if (currOperateTime && +currOperateTime < 0) {
            ctx.status = 429;
            ctx.body = 'Too many Requests. Try again later.';
        } else {
            await sleep(+currOperateTime - now);
            await next();
        }
    }
}

async function sleep(ms) {
    if (ms <= 0) return ;

    return new Promise(resolve => setTimeout(resolve, ms));
}
// #endregion middleware
