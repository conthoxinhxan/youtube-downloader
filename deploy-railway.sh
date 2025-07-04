#!/bin/bash

# Railway Deployment Script for YouTube Downloader

echo "🚀 Preparing YouTube Downloader for Railway deployment..."

# Check if Git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
fi

# Add all files
echo "📦 Adding files to Git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Prepare for Railway deployment - $(date)"

# Push to remote (if configured)
if git remote -v | grep -q "origin"; then
    echo "🌐 Pushing to remote repository..."
    git push origin main
else
    echo "⚠️  No remote repository configured. Please push to your GitHub repo manually."
fi

echo "✅ Project prepared for Railway deployment!"
echo ""
echo "Next steps:"
echo "1. Go to https://railway.app"
echo "2. Create an account or log in"
echo "3. Click 'New Project'"
echo "4. Select 'Deploy from GitHub repo'"
echo "5. Choose your repository"
echo "6. Railway will automatically deploy your application"
echo ""
echo "Your app will be available at: https://yourapp.railway.app"
