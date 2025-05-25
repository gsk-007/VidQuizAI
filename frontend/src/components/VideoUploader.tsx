import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { uploadVideo } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useNavigate } from "react-router"

export const VideoUploader = () => {
  const { register, handleSubmit, reset } = useForm()
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("Waiting for file...")

  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: async (data: File) => {
      setStatus("Uploading...")
      setProgress(20)
      const res = await uploadVideo(data)
      setProgress(60)
      setStatus("Transcribing...")
      return res
    },
    onSuccess: (data) => {
      setProgress(100)
      setStatus("Completed 🎉")

      // inside onSuccess:
      navigate(`/video/${data.videoId}`)
    },
    onError: (err) => {
      reset()
      setStatus("Failed: " + (err as Error).message)
    },
  })

  const onSubmit = (form: any) => {
    const file = form.file[0]
    if (!file) return
    mutation.mutate(file)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 max-w-md mx-auto"
    >
      <Input type="file" accept="video/mp4" {...register("file")} />
      <Button type="submit" disabled={mutation.isPending}>
        Upload Video
      </Button>

      <div className="text-sm text-gray-700">{status}</div>
      <Progress value={progress} className="h-2" />
    </form>
  )
}
