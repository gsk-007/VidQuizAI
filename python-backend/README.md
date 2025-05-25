# 🐍 Python Backend - Transcription & MCQ Generator (FastAPI + Whisper + Ollama)

This backend service handles:

- 🎙️ Transcribing video/audio using OpenAI Whisper
- 🧠 Generating multiple-choice questions (MCQs) from transcript segments using a local LLM via Ollama
- 📡 Exposing API endpoints for integration with frontend or other backend services (like Node.js)

---

## 📦 Tech Stack

- **FastAPI** – lightweight and fast web API framework
- **Whisper** – speech-to-text transcription (supports local or cloud inference)
- **Ollama** – local LLM inference (e.g., Mistral, LLaMA2)
- **Pydantic** – data validation and serialization

---

## 🚀 Features

- 🔹 `/transcribe` — Transcribe a local video/audio file from a path or URL
- 🔹 `/generate-mcqs` — Generate MCQs from a transcript segment using a strict JSON format
- 🔹 Optimized for backend-to-backend communication with Node.js

---

## 🧰 Requirements

- Python 3.10+
- `ffmpeg` installed (used by Whisper)
- Ollama installed and running locally

---

## 📂 Folder Structure

```
python-backend/
├── main.py                  # FastAPI entrypoint
├── transcription_service.py # Handles transcription using Whisper
├── mcq_service.py           # MCQ generation using Ollama
├── requirements.txt
└── README.md                # You are here
```

---

## ⚙️ Setup Instructions

### 1. ✅ Install Dependencies

First, create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

Then install dependencies:

```bash
pip install -r requirements.txt
```

> 💡 Optional: Use `faster-whisper` instead of `openai-whisper` for performance.

### 3. 🧠 Install & Run Ollama

Install Ollama ([https://ollama.com](https://ollama.com)) and run a model (like `gemma:2b`):

Install Gemma:2b

```bash
ollama pull gemma:2b
```

Ollama should be running locally on port `11434`.

---

## 🚀 Run FastAPI Server

Start the FastAPI app:

```bash
uvicorn main:app --reload --port 8000
```

Your API will now be available at:

```
http://localhost:8000
```

---

## 🔌 API Endpoints

### 📍 `POST /transcribe`

Transcribes a video or audio file.

**Request:**

```json
{
  "file_path": "/absolute/or/http/path/to/video.mp4"
}
```

**Response:**

```json
{
  "text": "Full transcript text here...",
  "segments": [
    {
      "id": 0,
      "start": 0.0,
      "end": 4.5,
      "text": "This is a segment..."
    },
    ...
  ]
}
```

---

### 📍 `POST /generate-mcqs`

Generates MCQs based on a given transcript segment.

**Request:**

```json
{
  "segment_text": "This paragraph talks about the importance of X..."
}
```

**Response:**

```json
{
  "mcqs": [
    {
      "question": "What is the importance of X?",
      "options": ["A. Reason 1", "B. Reason 2", "C. Reason 3", "D. Reason 4"],
      "answer": "A. Reason 1"
    },
    ...
  ]
}
```

> ✅ Response format is strictly enforced via the LLM prompt.

---

## 🧪 Testing

### Using `curl`:

```bash
curl -X POST http://localhost:8000/generate-mcqs \
  -H "Content-Type: application/json" \
  -d '{"segment_text": "Sample text for testing MCQ generation."}'
```

---

## 🛠 Prompt Used for MCQs

To maintain consistent formatting from Ollama:

```
Generate 3 multiple choice questions based on the following transcript segment:

[segment_text_here]

Return only JSON in this format:
[
  {
    "question": "...",
    "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
    "answer": "A. ..."
  }
]
```

---

## 🧩 Improvements Roadmap

- [ ] Support chunked transcription streaming
- [ ] Use faster-whisper for efficiency
- [ ] Add support for different MCQ difficulty levels
- [ ] Support image/audio MCQ types in the future

---

## 🧼 Cleanup

To clean up the virtual environment:

```bash
deactivate
rm -rf venv
```

---
