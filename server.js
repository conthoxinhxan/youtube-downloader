const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const ytdlp = require('yt-dlp-exec');

const app = express();
const port = process.env.PORT || 3000;

// Create downloads directory if it doesn't exist
const downloadsDir = path.join(__dirname, 'downloads');
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/download', async (req, res) => {
  const videoUrl = req.body.url;
  const filename = `video_${Date.now()}.mp4`;
  const outputPath = path.join(downloadsDir, filename);

  try {
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    console.log(`🔄 Downloading: ${videoUrl}`);

    await ytdlp(videoUrl, {
      output: outputPath,
      format: 'bv[ext=mp4]+ba[ext=m4a]/best[ext=mp4]/best',
      mergeOutputFormat: 'mp4',
      noPlaylist: true,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      noCheckCertificates: true
    });

    if (!fs.existsSync(outputPath)) {
      return res.status(500).send('❌ Download failed: output file missing.');
    }

    res.download(outputPath, 'video.mp4', err => {
      if (err) return res.status(500).send('❌ Error sending file.');
      setTimeout(() => fs.unlink(outputPath, ()=>{}), 1000);
    });

  } catch (err) {
    console.error('❌ Server error:', err);
    res.status(500).send('Internal server error.');
  }
});


app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
  console.log(`🔍 Health check: http://localhost:${port}/health`);
  console.log(`📁 Downloads directory: ${downloadsDir}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down gracefully...');
  process.exit(0);
});
