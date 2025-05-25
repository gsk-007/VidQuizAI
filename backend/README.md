# 🎬 Node Backend - Video Transcription & MCQ System

This backend handles video uploads, sends them for transcription using a Python service, generates MCQs via AI, and stores everything in MongoDB. It also uses BullMQ (Redis) for queue-based processing and status tracking.

---

## 🚀 Features

- Upload video files and send them to the Python backend
- Manage job queue with BullMQ (Redis)
- Track transcription and MCQ generation status
- Store transcript, segments, and MCQs in MongoDB
- Serve uploaded files via static endpoint

---

## 🧰 Tech Stack

- Node.js + TypeScript
- Express + routing-controllers
- MongoDB (native driver)
- BullMQ + Redis
- Multer for file uploads

---

## ⚙️ Setup Instructions

### ✅ Prerequisites

- Node.js v18+
- MongoDB (local or cloud)
- Redis (for BullMQ)

### 🔧 Installation

```bash
npm install
```

Here’s a complete setup with:

1. ✅ A `docker-compose.yml` to run MongoDB and Redis
2. 📄 A matching `README.md` explaining how to use it

---

## 📦 docker-compose.yml

```yaml
version: "3.8"

services:
  mongodb:
    image: mongo:6.0
    container_name: mongo
    restart: unless-stopped
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example

  redis:
    image: redis:7.0
    container_name: redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  mongo_data:
  redis_data:
```

---

## Local DB Setup

### 🐳 MongoDB + Redis Setup with Docker Compose

This setup provides local development instances of:

- MongoDB (port: 27017)
- Redis (port: 6379)

---

## 🚀 Getting Started

### 1. ▶️ Start the Services

Run the following command from the directory where the `docker-compose.yml` is located:

```bash
docker-compose up -d
```

This will spin up MongoDB and Redis containers in the background.

---

## 📌 Connection Info

### MongoDB

| Key            | Value                                    |
| -------------- | ---------------------------------------- |
| Host           | `localhost`                              |
| Port           | `27017`                                  |
| Username       | `root`                                   |
| Password       | `example`                                |
| Connection URI | `mongodb://root:example@localhost:27017` |

> Update your app’s `MONGODB_URI` to use this connection string.

### Redis

| Key            | Value                    |
| -------------- | ------------------------ | --- |
| Host           | `localhost`              |
| Port           | `6379`                   |
| Connection URI | 'redis://localhost:6379' |     |

---

> Update your app’s `REDIS_URI` to use this connection string.

## 🛑 Stopping Services

To stop the containers without removing them:

```bash
docker-compose stop
```

To stop and remove everything:

```bash
docker-compose down
```

---

## 🧹 Cleanup Volumes

To also remove data stored in volumes:

```bash
docker-compose down -v
```

---

## ✅ Tips

- Use MongoDB clients like [MongoDB Compass](https://www.mongodb.com/try/download/compass) to browse the DB.
- Use `redis-cli` or Redis GUI tools (e.g., RedisInsight) for Redis.

---

## 🐳 Requirements

- Docker
- Docker Compose (usually included with Docker Desktop)

---

### 🧪 Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017
DB_NAME=video_mcq_db
REDIS_URI=redis://localhost:6379
```

### 🚀 Start Server

```bash
npm run dev
```

📂 File Upload Directory
Uploaded videos are stored in the /uploads folder and served at:

```bash
http://localhost:5000/uploads/:filename
```

### API Specification

`POST /video/upload`
Upload a video and enqueue processing.

#### Request:

- Content-Type: multipart/form-data
- Field: file (video file)

#### Response:

```json

```

`GET /video/status/:id`
Check video status

#### Response:

```json

```
