# Railway Deployment - Python Environment Fix

## Problem
Railway's Python environment is externally managed (PEP 668), preventing pip from installing packages system-wide.

## Solutions

### Option 1: Use Nix Packages (Recommended)
Copy `nixpacks.toml` (uses `python311Packages.yt-dlp`):
```toml
[variables]
NODE_VERSION = "18"

[phases.setup]
nixPkgs = ["nodejs_18", "python311", "ffmpeg", "python311Packages.yt-dlp"]

[phases.install]
cmds = ["npm install"]

[start]
cmd = "npm start"
```

### Option 2: Virtual Environment
Copy `nixpacks-venv.toml` to `nixpacks.toml`:
```bash
cp nixpacks-venv.toml nixpacks.toml
```

### Option 3: System Package Manager
Copy `nixpacks-apt.toml` to `nixpacks.toml`:
```bash
cp nixpacks-apt.toml nixpacks.toml
```

### Option 4: Use Docker
Deploy using the updated Dockerfile which handles the virtual environment.

## Quick Fix
The current `nixpacks.toml` should now work with `python311Packages.yt-dlp` instead of pip installation.

## Test Locally
```bash
# Test the current configuration
npm start

# Test Docker build
docker build -t youtube-downloader .
docker run -p 3000:3000 youtube-downloader
```

## Redeploy
```bash
git add .
git commit -m "Fix Python environment issue"
git push origin main
```

Railway will automatically redeploy with the new configuration.
