#!/bin/bash

# AGROF AI Frontend Deployment Script
echo "🚀 Deploying AGROF AI Frontend to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Navigate to frontend directory
cd mobile/app

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build for web
echo "🔨 Building for web..."
npm run build:web

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Frontend deployment initiated!"
echo "🌐 Your frontend will be available at: https://agrof.farm"

