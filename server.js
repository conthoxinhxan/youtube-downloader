const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const ytdlp = require('yt-dlp-exec');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/download', async (req, res) => {
  const videoUrl = req.body.url;
  const outputPath = path.join(__dirname, 'video.mp4'); // Tên cố định

  try {
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);

    try {
      await ytdlp(videoUrl, {
        output: outputPath,
        format: 'bv[ext=mp4]+ba[ext=m4a]/best[ext=mp4]/best',
        mergeOutputFormat: 'mp4',
        noPlaylist: true,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      });
    } catch (err) {
      console.warn('⚠️ yt-dlp reported error, checking if video file exists anyway...');
    }

    if (!fs.existsSync(outputPath)) {
      return res.status(500).send('❌ Video not found after yt-dlp run.');
    }

    // Gửi file cho client
    res.download(outputPath, 'video.mp4', (err) => {
      if (err) {
        console.error('❌ Error sending file:', err);
        res.status(500).send('Error sending file.');
      }

      // Xoá file sau khi gửi xong
      fs.unlink(outputPath, () => {});
    });

  } catch (err) {
    console.error('❌ Unexpected server error:', err);
    res.status(500).send('Internal server error.');
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
