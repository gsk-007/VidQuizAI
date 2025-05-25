import * as dotenv from "dotenv"
dotenv.config()

import "reflect-metadata"
import { createExpressServer } from "routing-controllers"
import { VideoController } from "./controllers/VideoController"
import { connectToDatabase } from "./config/MongoClient"
import path from "path"
import express from "express"
import { Worker } from "bullmq"
import { videoQueueName } from "./queue/VideoQueue"
import { processVideo } from "./queue/VideoProcessor"
import { redisConnection } from "./config/RedisConfig"

const PORT = process.env.PORT || 5000

const app = createExpressServer({
  cors: {
    origin: "http://localhost:5173", // allow your frontend origin
    credentials: true, // if using cookies/auth headers
  },
  controllers: [VideoController],
})

const uploadsPath = path.join(__dirname, "..", "uploads")
app.use("/uploads", express.static(uploadsPath))

const main = async () => {
  try {
    await connectToDatabase()

    // Initialize Workers
    const videoWorker = new Worker(videoQueueName, processVideo, {
      connection: redisConnection,
    })
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error("❌ Failed to start server:", err)
  }
}

main()
