#!/bin/bash

# AGROF AI Fast Local Development Script
echo "🚀 Starting AGROF AI locally (Fast Mode)..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 not found. Please install Python 3.8+"
    exit 1
fi

# Navigate to backend directory
cd src/api

# Install lightweight dependencies for faster startup
echo "📦 Installing lightweight Python dependencies..."
pip3 install -r requirements_light.txt

# Set environment variable with working API key
export GEMINI_API_KEY="AIzaSyC-iO6PkYIVcb4Z-9iixdFapdKe-HQL-58"
export FLASK_DEBUG=0  # Disable debug for faster performance

# Start the backend server
echo "🚀 Starting backend server (optimized)..."
echo "🌐 Backend: http://localhost:5000"
echo "🔍 Health: http://localhost:5000/health"
echo "📱 Frontend: https://agrof-ai.netlify.app"
echo "🚀 API: http://localhost:5000/api/analyze"
echo ""
echo "✅ Performance optimizations enabled:"
echo "   ⚡ Image compression"
echo "   📋 Result caching"
echo "   ⏱️ Reduced timeouts"
echo "   🚀 Lightweight dependencies"
echo ""
echo "⚙️ Press Ctrl+C to stop"
echo ""

python3 app.py
