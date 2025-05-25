import multer from "multer"
import { Request } from "express"
import path from "path"
import fs from "fs"

// Path to 'uploads' in the current (backend) directory
const uploadDir = path.join(__dirname, "..", "..", "uploads")
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req: Request, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`
    cb(null, uniqueName)
  },
})

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = file.mimetype === "video/mp4"
    cb(null, allowed)
  },
  limits: { fileSize: 1 * 1024 * 1024 * 1024 }, // 1GB
})
