import {
  JsonController,
  Post,
  Req,
  Res,
  UseBefore,
  Get,
  Param,
} from "routing-controllers"
import { Request, Response } from "express"
import { upload } from "../middleware/MulterMiddleware"
import { getDb } from "../config/MongoClient"
import { ObjectId } from "mongodb"
import { videoQueue } from "../queue/VideoQueue"

@JsonController("/video")
export class VideoController {
  @Post("/upload")
  @UseBefore(upload.single("file"))
  async uploadVideo(@Req() req: Request, @Res() res: Response) {
    const file = req.file
    if (!file) return res.status(400).json({ message: "No file uploaded" })

    try {
      const db = getDb()
      const videos = db.collection("videos")

      const fileUrl = `http://localhost:5000/uploads/${file.filename}`

      const videoDoc = {
        filename: file.filename,
        uploadDate: new Date(),
        status: "INITIATING",
        fileUrl,
      }

      const result = await videos.insertOne(videoDoc)
      const videoId = result.insertedId

      await videoQueue.add("process", {
        videoId,
        fileUrl,
        filename: file.filename,
      })

      return res.status(202).json({
        message: "Video queued for processing",
        videoId,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Error Occured",
      })
    }
  }

  @Get("/status/:id")
  async getStatus(@Param("id") id: string, @Res() res: Response) {
    const db = getDb()
    const videos = db.collection("videos")

    const video = await videos.findOne({ _id: new ObjectId(id) })
    if (!video) return res.status(404).json({ message: "Video not found" })

    return res.status(200).json({
      status: video.status,
      segments: video.segments || [],
    })
  }
}
