# VidQuizAI

VidQuizAI is an intuitive web application that allows users to upload MP4 videos and automatically generate multiple-choice quizzes based on the video transcription. Powered by AI, VidQuizAI transcribes video content, analyzes it, and creates quiz questions to help with learning and engagement.

---

## Features

- **Easy Video Upload:** Upload MP4 videos quickly through a user-friendly interface.
- **AI-Powered Transcription:** Automatically transcribe the video content.
- **Multiple Choice Question Generation:** Generate quizzes with multiple choice questions based on the transcript.
- **Segmented Video Analysis:** View video segments along with their transcripts and related questions.
- **Downloadable CSV:** Export generated quizzes as CSV files for offline use.
- **Real-time Status Updates:** Poll video processing status with smooth loading experience.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, React Query
- **Backend:** FastAPI (Python)
- **AI Integration:** Ollama API for generating quiz questions
- **Deployment:** Localhost or any preferred hosting

---

## Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/vidquizai.git
   cd vidquizai
   ```

2. **Frontend Setup:**

   - Navigate to the frontend folder:

     ```bash
     cd frontend
     ```

   - Install npm packages:

     ```bash
     npm install
     ```

   - Run the development server:

     ```bash
     npm run dev
     ```

     **Open your browser at** `http://localhost:5173`

3. **Backend Setup:**

   - Navigate to the backend folder:

     ```bash
     cd backend
     ```

   - Install npm packages:

     ```bash
     npm install
     ```

   - Run the db using docker (Local Setup):

     ```bash
     docker compose up -d
     ```

   - Make a new `.env` File and and variables from `.env.example` file:

     ```bash
     MONGODB_URI=mongodb://root:example@localhost:27017/
     DB_NAME=video-transcription
     REDIS_URI=redis://localhost:6379
     ```

     use the above values of get your own.

   - Run the development server:

     ```bash
     npm run dev
     ```

   - Run the python service using:

     ```bash
     npm run dev
     ```

   - Run the python service using:

     ```bash
     cd python-backend

     # Activate Env
     source venv/bin/activate  # Linux/macOS
     venv\Scripts\activate     # Windows

     # install dependencies
     pip install -r requirements.txt

     # Run your server
     uvicorn main:app --reload --host 127.0.0.1 --port 8000
     ```

---

## Usage

1. Navigate to the homepage.
2. Upload an MP4 video for transcription.
3. Wait for the processing to complete.
4. View generated transcript and multiple choice questions.
5. Export questions as CSV using the provided button.

---

## Future Enhancements

- Admin panel to review and edit generated questions.
- Export a structured JSON for quiz data.
- User authentication and Authorization.
- Support for multiple languages using multilingual transcription models.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for improvements and bug fixes.

---
