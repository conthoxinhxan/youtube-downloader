const ytdlp = require('yt-dlp-exec');

async function testYtDlp() {
  console.log('🧪 Testing yt-dlp functionality...');
  
  try {
    // Test with a simple public domain video
    const testUrl = 'https://www.youtube.com/watch?v=GL9sgRLdR_E';
    console.log(`📋 Testing URL: ${testUrl}`);
    
    // Get video info without downloading
    const info = await ytdlp(testUrl, {
      dumpSingleJson: true,
      noDownload: true,
      noWarnings: true
    });
    
    console.log('✅ Video info retrieved successfully:');
    console.log(`📺 Title: ${info.title}`);
    console.log(`⏱️ Duration: ${info.duration} seconds`);
    console.log(`📊 View count: ${info.view_count}`);
    console.log(`📅 Upload date: ${info.upload_date}`);
    
    // Test available formats
    if (info.formats) {
      console.log(`🎬 Available formats: ${info.formats.length}`);
      const mp4Formats = info.formats.filter(f => f.ext === 'mp4');
      console.log(`📹 MP4 formats: ${mp4Formats.length}`);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('🔍 Full error:', error);
  }
}

testYtDlp();
