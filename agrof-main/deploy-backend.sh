#!/bin/bash

# AGROF AI Backend Deployment Script
echo "🚀 Deploying AGROF AI Backend to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Login to Railway (if not already logged in)
echo "🔐 Logging into Railway..."
railway login

# Navigate to backend directory
cd src/api

# Deploy to Railway
echo "🚀 Deploying to Railway..."
railway up

echo "✅ Backend deployment initiated!"
echo "📝 Note: Set your GEMINI_API_KEY environment variable in Railway dashboard"
echo "🌐 Your backend will be available at: https://your-app-name.up.railway.app"

