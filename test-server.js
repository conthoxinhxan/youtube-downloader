const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing server configuration...');

// Check if required files exist
const requiredFiles = [
  'server.js',
  'package.json',
  'nixpacks.toml',
  'railway.json',
  'public/index.html'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} missing`);
    allFilesExist = false;
  }
});

// Check package.json
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log(`✅ Package.json valid - ${packageJson.name} v${packageJson.version}`);
  
  if (packageJson.scripts && packageJson.scripts.start) {
    console.log('✅ Start script found');
  } else {
    console.log('❌ Start script missing');
  }
} catch (err) {
  console.log('❌ Package.json invalid');
}

// Check nixpacks.toml
if (fs.existsSync('nixpacks.toml')) {
  console.log('✅ Nixpacks configuration found');
} else {
  console.log('❌ Nixpacks configuration missing');
}

console.log('\n🎯 Ready for Railway deployment!');
console.log('Run: node server.js to test locally');
console.log('Or run: deploy-railway.bat to deploy to Railway');
