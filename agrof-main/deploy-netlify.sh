#!/bin/bash

# AGROF AI Frontend Deployment Script for Netlify
echo "🚀 Deploying AGROF AI Frontend to Netlify..."

# Navigate to frontend directory
cd mobile/app

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build for web
echo "🔨 Building for web..."
npm run build:web

# Login to Netlify (if not already logged in)
echo "🔐 Logging into Netlify..."
netlify login

# Deploy to Netlify
echo "🚀 Deploying to Netlify..."
netlify deploy --prod --dir=dist

# Get the deployment URL
echo "✅ Frontend deployed to Netlify!"
echo "🌐 Your frontend URL will be shown above"
echo "📝 Next: Configure custom domain 'agrof.farm' in Netlify dashboard"

