import { VideoUploader } from "@/components/VideoUploader"

const HomePage = () => {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center overflow-hidden">
      {/* SVG Grid Background */}
      <div className="absolute inset-0 z-0 opacity-50">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="gray"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-2xl p-8 bg-white bg-opacity-80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          🎥 Upload Your MP4 Video
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Transcribe and generate multiple choice questions effortlessly.
        </p>
        <VideoUploader />
      </div>
    </main>
  )
}

export default HomePage
