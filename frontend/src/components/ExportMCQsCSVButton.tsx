import React from "react"
import type { Segment } from "@/types/video"

interface ExportMCQsCSVButtonProps {
  segments: Segment[]
}

const ExportMCQsCSVButton: React.FC<ExportMCQsCSVButtonProps> = ({
  segments,
}) => {
  const handleExportCSV = () => {
    const rows = [
      [
        "Segment Start",
        "Segment End",
        "Question",
        "Option A",
        "Option B",
        "Option C",
        "Option D",
        "Answer",
      ],
    ]

    segments.forEach((segment) => {
      segment.mcqs.forEach((mcq) => {
        rows.push([
          segment.start.toString(),
          segment.end.toString(),
          mcq.question,
          mcq.options[0] ?? "",
          mcq.options[1] ?? "",
          mcq.options[2] ?? "",
          mcq.options[3] ?? "",
          mcq.answer,
        ])
      })
    })

    // Convert to CSV string
    const csvContent = rows
      .map((row) =>
        row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")
      )
      .join("\n")

    // Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "mcqs.csv"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={handleExportCSV}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Export MCQs as CSV
    </button>
  )
}

export default ExportMCQsCSVButton
