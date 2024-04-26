const Redis = require('ioredis');
export const redis = new Redis({
    host: '127.0.0.1',
    port: 6379
});

// #region example
const Koa = require('koa');
const app = new Koa();

// 使用中间件
app.use(fixedWindow('fixedWindow', 5));

app.use((ctx) => ctx.body = 'Hello World');
app.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
});
// #endregion example

// #region middleware
/**
 * 固定窗口限流
 * @param {string} key 缓存key
 * @param {number} max 最大访问量
 */
export function fixedWindow(key = 'fixedWindow', max = 5) {
    return async (ctx, next) => {
        const cacheKey = `${key}:${ctx.path}`;

        // 计数器
        const counter = await redis.incr(cacheKey);
        if (counter === 1) {
            await redis.expire(cacheKey, 5 * 60);
        }

        // 如果超过最大访问量，则拒绝访问
        if (counter > max) {
            ctx.status = 429;
            ctx.body = 'Too many request, try again later.';
        } else {
            await next();
        }
    }
}
// #endregion middleware
