const Redis = require('ioredis');
export const redis = new Redis({
    host: '127.0.0.1',
    port: 6379
});

// #region example
const Koa = require('koa');
const app = new Koa();

// 使用中间件
app.use(tokenBucket('tokenBucket', 5));

app.use((ctx) => ctx.body = 'Hello World');
app.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
});
// #endregion example

// #region middleware
/**
 * 固定窗口限流
 * @param {string} key 缓存key
 * @param {number} capacity 令牌桶容量
 * @param {number} refillRate 令牌每秒添加速率,
 */
export function tokenBucket(
    key = 'tokenBucket',
    capacity = 5,
    refillRate = 1
) {
    return async (ctx, next) => {
        const luaScript = `
      local redisKey = KEYS[1]
      local now = tonumber(ARGV[1])
      local capacity = tonumber(ARGV[2])
      local refillRate = tonumber(ARGV[3])

      -- Get the current token count and last refill time
      -- Step 1: 获取当前令牌数量、最后添加令牌时间
      local lastRefillTime = tonumber(redis.call("HGET", redisKey, "lastRefillTime")) or now
      local currentTokens = tonumber(redis.call("HGET", redisKey, "tokens")) or capacity

      -- Calculate the elapsed time since the last refill
      -- Step 2: 计算当前需要添加多少令牌
      local elapsedSeconds = math.max(0, now - lastRefillTime)
      local tokensToAdd = math.floor(elapsedSeconds * refillRate)

      -- Update the token count and refill time
      -- Step 3: 更新令牌数量和最后添加令牌时间
      local newTokens = math.min(currentTokens + tokensToAdd, capacity)
      redis.call("HSET", redisKey, "lastRefillTime", now)
      redis.call("HSET", redisKey, "tokens", newTokens)

      -- Check if there are enough tokens for this request
      if newTokens >= 1 then
        redis.call("HSET", redisKey, "tokens", newTokens - 1)
        return "ALLOW"
      else
        return "DENY"
      end
    `;
        const now = Math.floor(Date.now() / 1000);
        const result = await redis.eval(
            luaScript,
            1,
            key,
            now.toString(),
            capacity.toString(),
            refillRate.toString(),
        );

        if (result !== 'ALLOW') {
            ctx.status = 429;
            ctx.body = 'Too many Requests. Try again later.';
        } else {
            await next();
        }
    }
}
// #endregion middleware
