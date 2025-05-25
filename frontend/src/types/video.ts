export interface MCQ {
  question: string
  options: string[]
  answer: string
}

export interface Segment {
  start: number
  end: number
  text: string
  mcqs: MCQ[]
}

export interface VideoStatusResponse {
  status: "PENDING" | "PROCESSING" | "DONE" | "FAILED"
  segments: Segment[]
}
