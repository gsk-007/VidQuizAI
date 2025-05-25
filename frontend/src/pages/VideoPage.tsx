import { useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { fetchVideoStatus } from "@/lib/api"
import { useEffect, useState } from "react"
import type { VideoStatusResponse } from "@/types/video"
import ExportMCQsCSVButton from "@/components/ExportMCQsCSVButton"

const POLLING_INTERVAL = 5000

const VideoPage = () => {
  const { id } = useParams()
  const [shouldPoll, setShouldPoll] = useState(true)

  const { data, isLoading, isFetching } = useQuery<VideoStatusResponse>({
    queryKey: ["video-status", id],
    queryFn: () => fetchVideoStatus(id!),
    enabled: !!id && shouldPoll,
    refetchInterval: shouldPoll ? POLLING_INTERVAL : false,
  })

  useEffect(() => {
    if (data?.status === "DONE") {
      setShouldPoll(false)
    }
  }, [data])

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-600 animate-pulse">
          ⏳ Processing video...
        </p>
      </div>
    )
  }

  if (data?.status !== "DONE") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-yellow-500">Status: {data?.status}</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          🎬 Video Analysis Complete
        </h1>

        <div className="flex justify-center">
          <ExportMCQsCSVButton segments={data.segments} />
        </div>

        {data.segments.map((seg, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 shadow-md rounded-xl p-6 space-y-4"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              Segment {i + 1}: {seg.start}s – {seg.end}s
            </h2>

            <details className="rounded overflow-hidden border border-gray-300">
              <summary className="cursor-pointer bg-gray-100 px-4 py-2 font-medium">
                📄 Transcript
              </summary>
              <div className="p-4 text-sm text-gray-700 whitespace-pre-wrap max-h-[40vh] overflow-y-scroll">
                {seg.text}
              </div>
            </details>

            <details className="rounded overflow-hidden border border-gray-300">
              <summary className="cursor-pointer bg-gray-100 px-4 py-2 font-medium">
                ❓ Multiple Choice Questions
              </summary>
              <div className="p-4 space-y-4">
                {seg.mcqs.map((mcq, j) => (
                  <div
                    key={j}
                    className="bg-gray-50 border rounded-lg p-4 shadow-sm"
                  >
                    <strong className="block mb-2">Q: {mcq.question}</strong>
                    <ul className="list-disc pl-5 space-y-1">
                      {mcq.options.map((opt, k) => (
                        <li
                          key={k}
                          className={
                            opt === mcq.answer
                              ? "font-semibold text-green-600"
                              : "text-gray-700"
                          }
                        >
                          {opt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </details>
          </div>
        ))}
      </div>
    </main>
  )
}

export default VideoPage
