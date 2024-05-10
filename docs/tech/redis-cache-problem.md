# 缓存雪崩、缓存击穿、缓存穿透

## 缓存雪崩

大量缓存同一时间过期，请求绕过Redis请求到数据库，导致数据库

### 解决方案
- 缓存加随机时间
- 后台更新缓存

## 缓存击穿

热点数据缓存过期，大量请求同时到达数据库。

### 解决方案
- 互斥锁

<<< @/codes/redis-cache-problem/mutex.ts#mutex

- 不给热点数据设置过期时间，由后台异步更新缓存。

## 缓存穿透

数据既不在缓存中，也不在数据库中，当大量请求进来时导致数据库压力骤增。

### 解决方案
- 布隆过滤器(TODO: 补充代码)
- 非法请求拦截
- 缓存空值或默认值

TODO
- redLock

## 参考
- [《我们一起进大厂》系列-缓存雪崩、击穿、穿透](https://juejin.cn/post/6844903986475057165?searchId=2024050609381230819AAF4FEA95C32A62)
- [一张图搞懂Redis缓存雪崩、缓存穿透、缓存击穿](https://github.com/CoderLeixiaoshuai/java-eight-part/blob/master/docs/redis/%E4%B8%80%E5%BC%A0%E5%9B%BE%E6%90%9E%E6%87%82Redis%E7%BC%93%E5%AD%98%E9%9B%AA%E5%B4%A9%E3%80%81%E7%BC%93%E5%AD%98%E7%A9%BF%E9%80%8F%E3%80%81%E7%BC%93%E5%AD%98%E5%87%BB%E7%A9%BF.md)
- [什么是缓存雪崩、击穿、穿透](https://xiaolincoding.com/redis/cluster/cache_problem.html#%E7%BC%93%E5%AD%98%E9%9B%AA%E5%B4%A9)
