export interface UploadResponse {
  videoId: string
  message: string
}

export const uploadVideo = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch("http://localhost:5000/video/upload", {
    method: "POST",
    body: formData,
  })

  if (!res.ok) {
    throw new Error("Failed to upload video")
  }

  return res.json()
}

export const fetchVideoStatus = async (id: string) => {
  const res = await fetch(`http://localhost:5000/video/status/${id}`)
  if (!res.ok) throw new Error("Status check failed")
  return res.json()
}
