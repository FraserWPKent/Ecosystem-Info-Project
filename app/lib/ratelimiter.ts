import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"


export const googleRateLimit = new Ratelimit({

    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5000, "30 d"),
    analytics: true,
    timeout: 10000,
});
export const wikiepediaRateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(200, "1 m"),
    timeout: 1000,
});