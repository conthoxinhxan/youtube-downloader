# 🚀 Railway Deployment Guide

## Quick Deploy Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Railway deployment"
git push origin main
```

### 2. Deploy on Railway
1. Go to [Railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Wait for deployment to complete

### 3. Get Your URL
- Railway will provide a URL like: `https://yourapp.railway.app`

## Configuration Files

The following files are configured for Railway:

- ✅ `nixpacks.toml` - Build configuration
- ✅ `railway.json` - Railway-specific settings
- ✅ `package.json` - Node.js dependencies
- ✅ `Dockerfile` - Alternative deployment method
- ✅ `Procfile` - Process definition

## Troubleshooting

### Build Issues
1. **npm not found**: Fixed with nodejs_18 in nixpacks.toml
2. **Python missing**: Added python311 to nixPkgs
3. **ffmpeg missing**: Added ffmpeg to nixPkgs

### Runtime Issues
1. **Port binding**: Uses process.env.PORT
2. **File permissions**: Downloads to /app/downloads
3. **Memory limits**: Railway free tier has 512MB limit

### Testing Locally
```bash
# Install dependencies
npm install

# Start server
npm start

# Test health check
curl http://localhost:3000/health
```

## Alternative Deployment Methods

### Using Docker
```bash
docker build -t youtube-downloader .
docker run -p 3000:3000 youtube-downloader
```

### Using Render
1. Connect GitHub to Render
2. Set build command: `npm install`
3. Set start command: `npm start`

### Using Heroku
```bash
heroku create your-app-name
git push heroku main
```

## Environment Variables

Railway automatically handles:
- `PORT` - Set by Railway
- `NODE_ENV` - Set to 'production'

## Resource Requirements

- **Memory**: 256MB minimum (512MB recommended)
- **CPU**: 0.5 vCPU minimum
- **Storage**: 1GB for temporary files
- **Network**: Outbound access for YouTube

## Security Notes

- No sensitive data stored
- Temporary files auto-deleted
- HTTPS provided by Railway
- Rate limiting recommended for production

## Support

If deployment fails:
1. Check Railway logs
2. Verify all files are committed
3. Check nixpacks.toml configuration
4. Test locally first

For issues, check the Railway documentation or GitHub issues.
