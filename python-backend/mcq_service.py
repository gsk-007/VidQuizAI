import requests
import json
from typing import List, Dict
from fastapi import HTTPException

OLLAMA_API_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "gemma:2b"

def call_ollama(prompt: str) -> List[Dict]:
    try:
        response = requests.post(OLLAMA_API_URL, json={
            "model": OLLAMA_MODEL,
            "prompt": prompt,
            "stream": False
        })

        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Ollama API error: " + response.text)

        raw_output = response.json()["response"]
        print("[DEBUG] Raw Ollama Response:", raw_output)

        # Try parsing JSON directly (Ollama should return a JSON-formatted string inside `response`)
        mcqs = json.loads(raw_output)
        return mcqs

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse Ollama's response as JSON")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ollama call failed: {str(e)}")


def generate_mcq_from_text(segment_text: str) -> List[Dict]:
    prompt = (
        "You are an AI assistant that generates multiple choice questions in strict JSON format.\n"
        "Generate exactly 3 multiple choice questions based ONLY on the following transcript:\n\n"
        f"{segment_text}\n\n"
        "Format your response EXACTLY like this example (including quotes and commas):\n\n"
        '[\n'
        '  {\n'
        '    "question": "What is the capital of France?",\n'
        '    "options": [\n'
        '      "A. Paris",\n'
        '      "B. Berlin",\n'
        '      "C. Madrid",\n'
        '      "D. Rome"\n'
        '    ],\n'
        '    "answer": "A. Paris"\n'
        '  },\n'
        '  {\n'
        '    "question": "What is 2+2?",\n'
        '    "options": [\n'
        '      "A. 3",\n'
        '      "B. 4",\n'
        '      "C. 5",\n'
        '      "D. 22"\n'
        '    ],\n'
        '    "answer": "B. 4"\n'
        '  },\n'
        '  {\n'
        '    "question": "What color is the sky?",\n'
        '    "options": [\n'
        '      "A. Green",\n'
        '      "B. Blue",\n'
        '      "C. Red",\n'
        '      "D. Yellow"\n'
        '    ],\n'
        '    "answer": "B. Blue"\n'
        '  }\n'
        ']\n\n'
        "IMPORTANT: Only return a valid JSON array. No explanations, no markdown, no extra text."
    )
    return call_ollama(prompt)
