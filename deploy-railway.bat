@echo off
echo 🚀 Preparing YouTube Downloader for Railway deployment...

REM Check if Git is initialized
if not exist ".git" (
    echo 📁 Initializing Git repository...
    git init
)

echo 🔧 Fixing Python environment configuration...
echo Current nixpacks.toml uses python311Packages.yt-dlp to avoid PEP 668 issues

REM Add all files
echo 📦 Adding files to Git...
git add .

REM Commit changes
echo 💾 Committing changes...
git commit -m "Fix Python environment - Railway deployment ready - %date% %time%"

REM Check if remote exists
git remote -v | findstr origin >nul
if %errorlevel% equ 0 (
    echo 🌐 Pushing to remote repository...
    git push origin main
) else (
    echo ⚠️  No remote repository configured. Please push to your GitHub repo manually.
)

echo ✅ Project prepared for Railway deployment!
echo.
echo 🔧 Python Environment Fix Applied:
echo - Using python311Packages.yt-dlp from Nix packages
echo - Avoids PEP 668 externally-managed-environment error
echo - Alternative configurations available in nixpacks-*.toml files
echo.
echo Next steps:
echo 1. Go to https://railway.app
echo 2. Create an account or log in
echo 3. Click 'New Project'
echo 4. Select 'Deploy from GitHub repo'
echo 5. Choose your repository
echo 6. Railway will automatically deploy with the fixed configuration
echo.
echo Your app will be available at: https://yourapp.railway.app
echo.
echo If deployment still fails, try these alternatives:
echo - Copy nixpacks-venv.toml to nixpacks.toml (virtual environment)
echo - Copy nixpacks-apt.toml to nixpacks.toml (system packages)
echo - Use Docker deployment method
pause
