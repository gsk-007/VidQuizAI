import { Queue } from "bullmq"
import { defaultQueueConfig, redisConnection } from "../config/RedisConfig"

export const videoQueueName = "videoQueue"

export const videoQueue = new Queue(videoQueueName, {
  connection: redisConnection,
  defaultJobOptions: defaultQueueConfig,
})
