@echo off
echo 🚀 Preparing YouTube Downloader for Railway deployment...

REM Check if Git is initialized
if not exist ".git" (
    echo 📁 Initializing Git repository...
    git init
)

REM Add all files
echo 📦 Adding files to Git...
git add .

REM Commit changes
echo 💾 Committing changes...
git commit -m "Prepare for Railway deployment - %date% %time%"

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
echo Next steps:
echo 1. Go to https://railway.app
echo 2. Create an account or log in
echo 3. Click 'New Project'
echo 4. Select 'Deploy from GitHub repo'
echo 5. Choose your repository
echo 6. Railway will automatically deploy your application
echo.
echo Your app will be available at: https://yourapp.railway.app
pause
