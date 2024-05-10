/**
 * 互斥锁
 */
import Redis from 'ioredis';
const redis = new Redis({
    host: '127.0.0.1',
    port: 6379
})

// #region mutex
export class Mutex {
    key: string

    constructor(key: string) {
        this.key = key;
    }

    get uuid() {
        return `${Date.now()}${Math.random().toString(36).slice(2)}`
    }

    async lock(): Promise<this | null> {
        const lock = await redis.set(this.key, this.uuid, 'EX', 5, 'NX');
        return lock ? this : null;
    }

    async release(): Promise<boolean> {
        const cacheUuid = await redis.get(this.key);
        // 只有uuid一样才可以释放锁
        if (cacheUuid === this.uuid) {
            await redis.del(this.key);
        }

        return cacheUuid === this.uuid
    }
}

export async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function mutexOn<T>(key: string, fn: () => Promise<T>): Promise<T> {
    let cache = await redis.get(key);

    if (!cache) {
        const lock = await new Mutex(`${key}:lock`).lock();
        if (lock) {
            try {
                const result = await fn();
                await redis.set(key, JSON.stringify(result));
                return result;
            } finally {
                await lock.release();
            }
        } else {
            // 如果获取锁失败，则重试直到超时
            const timeout = 5000;
            const begin = Date.now();
            while (Date.now() <= begin + timeout && !cache) {
                await sleep(200);
                cache = await redis.get(key);
            }
        }
    }

    return JSON.parse(cache);
}
// #endregion mutex
