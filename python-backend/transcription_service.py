import whisper
import os
import imageio_ffmpeg
import ntpath
import requests
import tempfile

# Add bundled FFmpeg to PATH to ensure Whisper finds it, even if system ffmpeg is missing
ffmpeg_path = imageio_ffmpeg.get_ffmpeg_exe()
ffmpeg_dir = os.path.dirname(ffmpeg_path)
os.environ["PATH"] = ffmpeg_dir + os.pathsep + os.environ.get("PATH", "")

model = whisper.load_model("base")

def download_video(url: str) -> str:
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception("Failed to download video from URL")
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".mp4")
    file_path = ntpath.normpath(tmp.name)
    tmp.write(response.content)
    tmp.close()
    return file_path  # Return normalized temp file path

def transcribe_video(file_path_or_url: str) -> dict:
    is_url = file_path_or_url.startswith("http")
    file_path = download_video(file_path_or_url) if is_url else file_path_or_url

    print(f"Transcribing file: {file_path}")
    print(f"File exists: {os.path.exists(file_path)}")

    result = model.transcribe(file_path)

    if is_url:
        os.remove(file_path)  # Clean up temp file

    return {
        "text": result["text"],
        "segments": result.get("segments", [])
    }
