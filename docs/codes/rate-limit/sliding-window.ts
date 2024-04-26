const Redis = require('ioredis');
export const redis = new Redis({
    host: '127.0.0.1',
    port: 6379
});

// #region example
const Koa = require('koa');
const app = new Koa();

// 使用中间件
app.use(slidingWindow('slidingWindow', 5));

app.use((ctx) => ctx.body = 'Hello World');
app.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
});
// #endregion example

// #region middleware
/**
 * 滑动窗口限流
 * @param {string} key 缓存key
 * @param {number} max 最大访问量
 */
export function slidingWindow(key = 'slidingWindow', max = 5) {
    return async (ctx, next) => {
        const path = ctx.path;
        const cacheKey = `${key}:${path}`;
        const smallWindow = 200; // 200ms
        const now = Date.now();
        const uuid = `${Math.random().toString().slice(3)}-${now}`;
        const windowStart = calcWindowStart(5 * 60, smallWindow);
        const luaScript = `
      local key = KEYS[1]
      local now = tonumber(ARGV[1])
      local uuid = ARGV[2]
      local windowStart = tonumber(ARGV[3])
      local maxRequests = tonumber(ARGV[4])

      redis.call('ZREMRANGEBYSCORE', key, '-inf', windowStart)
      redis.call('ZADD', key, now, uuid)
      local requestCount = redis.call('ZCARD', key)

      if requestCount <= maxRequests then
        return "ALLOW"
      else
        return "DENY"
      end
    `;
        const result = await redis.eval(
            luaScript,
            1,
            cacheKey,
            now.toString(),
            uuid,
            windowStart.toString(),
            max
        );

        if (result !== 'ALLOW') {
            ctx.status = 429;
            ctx.body = 'Too many request, try again later.';
        } else {
            await next();
        }
    }
}

/**
 * 根据 滑动窗口长度、最小窗口长度和当前时间，计算滑动窗口开始时间
 * @param duration
 * @param smallWindow
 */
export function calcWindowStart(
    duration: number,
    smallWindow: number
): number {
    const now = Date.now();
    const lastWindowLen = now % smallWindow;
    const dur = duration * 1000;

    return now - dur + (smallWindow - lastWindowLen);
}
// #endregion middleware
