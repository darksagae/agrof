#!/bin/bash

# AGROF AI Backend Deployment Script for Railway
echo "🚀 Deploying AGROF AI Backend to Railway..."

# Navigate to backend directory
cd src/api

# Login to Railway (if not already logged in)
echo "🔐 Logging into Railway..."
railway login

# Initialize Railway project (if not already initialized)
echo "🔧 Initializing Railway project..."
railway init

# Deploy to Railway
echo "🚀 Deploying to Railway..."
railway up

# Get the deployment URL
echo "✅ Backend deployed to Railway!"
echo "🌐 Your backend URL will be shown above"
echo "📝 Next: Configure custom domain 'api.agrof.farm' in Railway dashboard"
echo "🔑 Don't forget to set GEMINI_API_KEY environment variable!"

