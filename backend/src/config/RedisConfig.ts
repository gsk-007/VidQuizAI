import * as dotenv from "dotenv"
dotenv.config()

import { DefaultJobOptions, RedisOptions } from "bullmq"

export const redisConnection: RedisOptions = {
  connectionName: "video-processing",
  url: process.env.REDIS_URI,
}

export const defaultQueueConfig: DefaultJobOptions = {
  removeOnComplete: {
    count: 20,
    age: 60 * 60,
  },
  attempts: 3,
  backoff: {
    type: "exponential",
    delay: 1000,
  },
}
