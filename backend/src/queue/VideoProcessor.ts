import { Job, Worker } from "bullmq"
import { ObjectId } from "mongodb"
import { getDb } from "../config/MongoClient"

interface JobData {
  videoId: string
  fileUrl: string
  filename: string
}

export const processVideo = async (job: Job<JobData>) => {
  const { videoId, fileUrl, filename } = job.data

  const db = getDb()
  const videos = db.collection("videos")

  const updateStatus = (status: string) =>
    videos.updateOne({ _id: new ObjectId(videoId) }, { $set: { status } })

  try {
    await updateStatus("TRANSCRIBING")

    const transRes = await fetch("http://127.0.0.1:8000/transcribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file_path: fileUrl }),
    })

    const { text, segments } = (await transRes.json()) as any

    // Segmenting
    const chunkDuration = 5 * 60
    const chunks: any[] = []
    let currentStart = 0
    let currentText = ""

    for (const seg of segments) {
      if (seg.start >= currentStart + chunkDuration) {
        chunks.push({
          start: currentStart,
          end: currentStart + chunkDuration,
          text: currentText.trim(),
        })
        currentStart += chunkDuration
        currentText = seg.text + " "
      } else {
        currentText += seg.text + " "
      }
    }
    if (currentText.trim()) {
      chunks.push({
        start: currentStart,
        end: currentStart + chunkDuration,
        text: currentText.trim(),
      })
    }

    await updateStatus("GENERATING_MCQS")

    for (let i = 0; i < chunks.length; i++) {
      try {
        const mcqRes = await fetch("http://127.0.0.1:8000/generate-mcqs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ segment_text: chunks[i].text }),
        })

        const mcqData = (await mcqRes.json()) as any
        chunks[i].mcqs = mcqData.mcqs || []
      } catch (err) {
        chunks[i].mcqs = []
      }
    }

    await videos.updateOne(
      { _id: new ObjectId(videoId) },
      {
        $set: {
          transcript: text,
          segments: chunks,
          status: "DONE",
        },
      }
    )
  } catch (error) {
    console.error("Worker error:", error)
    await videos.updateOne(
      { _id: new ObjectId(videoId) },
      { $set: { status: "ERROR", error: error } }
    )
  }
}
