const ytdlp = require('yt-dlp-exec');
const fs = require('fs');
const path = require('path');

async function testDownload() {
  console.log('🧪 Testing actual download...');
  
  const testUrl = 'https://www.youtube.com/watch?v=GL9sgRLdR_E';
  const outputPath = path.join(__dirname, 'downloads', 'test_video.mp4');
  
  try {
    // Ensure downloads directory exists
    if (!fs.existsSync(path.join(__dirname, 'downloads'))) {
      fs.mkdirSync(path.join(__dirname, 'downloads'), { recursive: true });
    }
    
    console.log(`📁 Output path: ${outputPath}`);
    
    // Clean up any existing file
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
      console.log('🗑️ Cleaned up existing file');
    }
    
    console.log('⬇️ Starting download...');
    
    await ytdlp(testUrl, {
      output: outputPath,
      format: 'best[ext=mp4]/best',
      mergeOutputFormat: 'mp4',
      noPlaylist: true,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      verbose: true
    });
    
    console.log('✅ Download command completed');
    
    // Check if file exists
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      console.log(`✅ File created successfully!`);
      console.log(`📊 File size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
      
      // Clean up test file
      fs.unlinkSync(outputPath);
      console.log('🗑️ Test file cleaned up');
    } else {
      console.error('❌ File was not created');
    }
    
  } catch (error) {
    console.error('❌ Download test failed:', error.message);
    console.error('🔍 Error details:', error);
  }
}

testDownload();
