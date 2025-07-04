# YouTube Downloader Web Application

A simple web application for downloading YouTube videos using yt-dlp.

## Features

- Download YouTube videos in MP4 format
- Multiple video download support
- Clean and simple web interface
- Automatic file cleanup after download

## Local Development

### Prerequisites

- Node.js (v14 or higher)
- Python 3.x
- yt-dlp
- ffmpeg

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install yt-dlp:
   ```bash
   pip install yt-dlp
   ```
4. Start the server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## Railway Deployment

### Step 1: Prepare Your Project

1. Make sure all files are committed to Git:
   ```bash
   git add .
   git commit -m "Prepare for Railway deployment"
   ```

### Step 2: Deploy to Railway

1. **Create a Railway Account**
   - Go to [Railway](https://railway.app)
   - Sign up using GitHub, Google, or email

2. **Deploy Your Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway will automatically detect it's a Node.js project

3. **Configure Environment** (if needed)
   - Railway will use the `nixpacks.toml` configuration
   - The deployment includes Python, ffmpeg, and yt-dlp

4. **Deploy**
   - Railway will automatically build and deploy your application
   - You'll get a public URL like `https://yourapp.railway.app`

### Step 3: Monitor Deployment

- Check the deployment logs in Railway dashboard
- Test the application using the provided URL
- The health check endpoint is available at `/health`

## Project Structure

```
youtube-downloader/
├── server.js           # Express server
├── package.json        # Node.js dependencies
├── nixpacks.toml       # Railway build configuration
├── railway.json        # Railway deployment settings
├── public/
│   └── index.html      # Frontend interface
├── downloads/          # Temporary download directory
└── README.md          # This file
```

## API Endpoints

- `GET /` - Web interface
- `POST /download` - Download video endpoint
- `GET /health` - Health check endpoint

## Environment Variables

- `PORT` - Server port (default: 3000)

## Notes

- Downloaded videos are automatically cleaned up after sending
- The application uses a temporary downloads directory
- Railway provides automatic HTTPS
- System dependencies (Python, ffmpeg, yt-dlp) are installed via nixpacks.toml

## Troubleshooting

1. **Build fails**: Check the Railway logs for missing dependencies
2. **Download fails**: Verify the YouTube URL is valid and accessible
3. **Memory issues**: Railway's free tier has resource limits

## License

This project is open source and available under the MIT License.
