from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

from transcription_service import transcribe_video
from mcq_service import generate_mcq_from_text

app = FastAPI()


# ======================
# Request/Response Models
# ======================

class TranscriptionRequest(BaseModel):
    file_path: str

class MCQRequest(BaseModel):
    segment_text: str

class MCQ(BaseModel):
    question: str
    options: List[str]
    answer: str

class MCQResponse(BaseModel):
    mcqs: List[MCQ]


# ======================
# Transcription Endpoint
# ======================

@app.post("/transcribe")
def transcribe(req: TranscriptionRequest):
    try:
        result = transcribe_video(req.file_path)
        return result
    except Exception as e:
        print(f"[ERROR] Transcription failed: {e}")
        raise HTTPException(status_code=500, detail="Transcription error: " + str(e))


# ======================
# MCQ Generation Endpoint
# ======================

@app.post("/generate-mcqs", response_model=MCQResponse)
def generate_mcqs(req: MCQRequest):
    try:
        mcqs = generate_mcq_from_text(req.segment_text)
        return {"mcqs": mcqs}
    except Exception as e:
        print(f"[ERROR] MCQ generation failed: {e}")
        raise HTTPException(status_code=500, detail="MCQ generation error: " + str(e))
