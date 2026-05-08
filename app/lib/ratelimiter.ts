import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"


export const googleRateLimit = new Ratelimit({

    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5000, "30 d"),
    analytics: true,
    timeout: 10000,
});
