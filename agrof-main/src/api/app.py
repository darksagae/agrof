#!/usr/bin/env python3
"""
AGROF AI Backend - Lightweight Version with Gemini AI
Uses Google Gemini for AI analysis without heavy ML dependencies
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import io
import os
import logging
import hashlib
from datetime import datetime, timedelta
from PIL import Image
import requests
import json

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, origins=['*'], methods=['GET', 'POST', 'OPTIONS'], allow_headers=['Content-Type', 'Authorization'])

class GeminiAIDetector:
    """Lightweight AI detector using Google Gemini"""
    
    def __init__(self):
        self.gemini_api_key = os.getenv('GEMINI_API_KEY', 'AIzaSyC-iO6PkYIVcb4Z-9iixdFapdKe-HQL-58')
        self.gemini_url = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent"
        self.cache = {}  # Simple in-memory cache
        self.cache_ttl = 3600  # 1 hour cache
        logger.info("🚀 Gemini AI Detector Initialized")
        logger.info(f"   Gemini API: {'✅ Available' if self.gemini_api_key else '❌ Not configured'}")
    
    def analyze_image(self, image_data):
        """Analyze image using Gemini AI with caching"""
        try:
            logger.info("🔍 Starting Gemini AI analysis...")
            
            # Generate cache key from image data
            cache_key = hashlib.md5(image_data.encode()).hexdigest()
            
            # Check cache first
            cached_result = self.get_cached_result(cache_key)
            if cached_result:
                logger.info("✅ Using cached analysis result")
                return cached_result
            
            # Convert base64 to image
            image = self.base64_to_image(image_data)
            if image is None:
                raise ValueError("Could not decode image data")
            
            # Analyze with Gemini
            result = self.analyze_with_gemini(image)
            if result:
                logger.info("✅ Gemini analysis successful")
                # Cache the result
                self.cache_result(cache_key, result)
                return result
            else:
                logger.warning("⚠️ Gemini analysis failed, using fallback")
                fallback = self.get_fallback_response()
                self.cache_result(cache_key, fallback)
                return fallback
                
        except Exception as e:
            logger.error(f"❌ Gemini analysis failed: {e}")
            return self.get_fallback_response()
    
    def base64_to_image(self, base64_data):
        """Convert base64 string to PIL Image"""
        try:
            # Remove data URL prefix if present
            if ',' in base64_data:
                base64_data = base64_data.split(',')[1]
            
            # Decode base64
            image_bytes = base64.b64decode(base64_data)
            image = Image.open(io.BytesIO(image_bytes))
            return image
            
        except Exception as e:
            logger.error(f"❌ Base64 conversion failed: {e}")
            return None
    
    def optimize_image_for_api(self, image):
        """Optimize image size and quality for faster API processing"""
        try:
            # Convert to RGB if needed
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            # Resize if too large (max 1024x1024 for faster processing)
            max_size = 1024
            if max(image.size) > max_size:
                ratio = max_size / max(image.size)
                new_size = tuple(int(dim * ratio) for dim in image.size)
                image = image.resize(new_size, Image.Resampling.LANCZOS)
                logger.info(f"📐 Image resized to {new_size} for faster processing")
            
            return image
            
        except Exception as e:
            logger.error(f"❌ Image optimization failed: {e}")
            return image  # Return original if optimization fails
    
    def analyze_with_gemini(self, image):
        """Analyze image using Google Gemini Pro Vision"""
        try:
            # Optimize image for faster processing
            optimized_image = self.optimize_image_for_api(image)
            
            # Convert image to base64 for Gemini
            buffered = io.BytesIO()
            optimized_image.save(buffered, format="JPEG", quality=85, optimize=True)
            img_base64 = base64.b64encode(buffered.getvalue()).decode()
            
            # Gemini API request
            headers = {
                "Content-Type": "application/json",
            }
            
            data = {
                "contents": [{
                    "parts": [
                        {
                            "text": """You are an expert agricultural scientist and plant pathologist. 
                            Analyze this plant image and provide a JSON response with:
                            
                            {
                                "crop_type": "plant species (be specific)",
                                "health_status": "healthy/diseased",
                                "disease_type": "disease name if any, or 'No disease detected'",
                                "severity_level": "low/medium/high/none",
                                "confidence": 0.85,
                                "symptoms": "visible symptoms if any",
                                "immediate_treatments": ["treatment1", "treatment2"],
                                "long_term_strategies": ["strategy1", "strategy2"],
                                "prevention": "prevention advice",
                                "economic_impact": "estimated yield loss or economic impact"
                            }
                            
                            Be specific and accurate. If you can't identify the plant or disease, use "unknown"."""
                        },
                        {
                            "inline_data": {
                                "mime_type": "image/jpeg",
                                "data": img_base64
                            }
                        }
                    ]
                }]
            }
            
            # Make API call with shorter timeout for better performance
            response = requests.post(
                f"{self.gemini_url}?key={self.gemini_api_key}",
                headers=headers,
                json=data,
                timeout=15  # Reduced from 30 to 15 seconds
            )
            
            if response.status_code == 200:
                result = response.json()
                if 'candidates' in result and len(result['candidates']) > 0:
                    content = result['candidates'][0]['content']['parts'][0]['text']
                    
                    # Try to extract JSON from response
                    try:
                        # Find JSON in the response
                        start = content.find('{')
                        end = content.rfind('}') + 1
                        if start != -1 and end != 0:
                            json_str = content[start:end]
                            analysis = json.loads(json_str)
                            
                            return {
                                'crop_type': analysis.get('crop_type', 'unknown'),
                                'confidence': analysis.get('confidence', 0.8),
                                'health_status': analysis.get('health_status', 'unknown'),
                                'disease_type': analysis.get('disease_type', 'unknown'),
                                'severity_level': analysis.get('severity_level', 'unknown'),
                                'symptoms': analysis.get('symptoms', ''),
                                'immediate_treatments': analysis.get('immediate_treatments', []),
                                'long_term_strategies': analysis.get('long_term_strategies', []),
                                'prevention': analysis.get('prevention', ''),
                                'economic_impact': analysis.get('economic_impact', ''),
                                'detection_method': 'gemini_ai',
                                'api_source': 'google_gemini'
                            }
                    except json.JSONDecodeError:
                        logger.warning("Could not parse JSON from Gemini response")
                        return self.parse_gemini_text_response(content)
            
            logger.warning(f"Gemini API error: {response.status_code}")
            return None
            
        except Exception as e:
            logger.error(f"Gemini API call failed: {e}")
            return None
    
    def parse_gemini_text_response(self, text):
        """Parse text response from Gemini when JSON parsing fails"""
        try:
            # Simple text parsing as fallback
            crop_type = "unknown"
            health_status = "unknown"
            disease_type = "unknown"
            
            text_lower = text.lower()
            
            # Extract crop type
            if "maize" in text_lower or "corn" in text_lower:
                crop_type = "Maize"
            elif "coffee" in text_lower:
                crop_type = "Coffee"
            elif "tomato" in text_lower:
                crop_type = "Tomato"
            elif "potato" in text_lower:
                crop_type = "Potato"
            
            # Extract health status
            if "healthy" in text_lower:
                health_status = "healthy"
            elif "diseased" in text_lower or "disease" in text_lower:
                health_status = "diseased"
            
            # Extract disease type
            if "rust" in text_lower:
                disease_type = "Rust"
            elif "blight" in text_lower:
                disease_type = "Blight"
            elif "spot" in text_lower:
                disease_type = "Leaf Spot"
            elif "healthy" in text_lower:
                disease_type = "No disease detected"
            
            return {
                'crop_type': crop_type,
                'confidence': 0.7,
                'health_status': health_status,
                'disease_type': disease_type,
                'severity_level': 'medium',
                'symptoms': 'Analysis based on AI detection',
                'immediate_treatments': ['Monitor plant health', 'Maintain proper care'],
                'long_term_strategies': ['Implement integrated pest management'],
                'prevention': 'Regular monitoring and proper care',
                'economic_impact': 'Requires proper diagnosis',
                'detection_method': 'gemini_ai_text_parsing',
                'api_source': 'google_gemini'
            }
            
        except Exception as e:
            logger.error(f"Text parsing failed: {e}")
            return self.get_fallback_response()
    
    def get_cached_result(self, cache_key):
        """Get cached analysis result"""
        try:
            if cache_key in self.cache:
                cached_item = self.cache[cache_key]
                if datetime.now() - cached_item['timestamp'] < timedelta(seconds=self.cache_ttl):
                    return cached_item['result']
                else:
                    # Remove expired cache
                    del self.cache[cache_key]
            return None
        except Exception as e:
            logger.error(f"Cache retrieval failed: {e}")
            return None
    
    def cache_result(self, cache_key, result):
        """Cache analysis result"""
        try:
            self.cache[cache_key] = {
                'result': result,
                'timestamp': datetime.now()
            }
            # Keep cache size reasonable (max 100 items)
            if len(self.cache) > 100:
                oldest_key = min(self.cache.keys(), key=lambda k: self.cache[k]['timestamp'])
                del self.cache[oldest_key]
        except Exception as e:
            logger.error(f"Cache storage failed: {e}")
    
    def get_fallback_response(self):
        """Fallback response when AI analysis fails"""
        return {
            'crop_type': 'unknown',
            'confidence': 0.0,
            'health_status': 'unknown',
            'disease_type': 'unknown',
            'severity_level': 'unknown',
            'symptoms': 'Analysis unavailable',
            'immediate_treatments': ['Consult agricultural expert'],
            'long_term_strategies': ['Implement proper monitoring'],
            'prevention': 'Regular field monitoring',
            'economic_impact': 'Unknown - requires expert assessment',
            'detection_method': 'fallback',
            'api_source': 'offline'
        }

# Initialize AI detector
ai_detector = GeminiAIDetector()

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'AGROF AI Backend is running',
        'timestamp': datetime.now().isoformat(),
        'ai_status': 'Gemini AI Ready' if ai_detector.gemini_api_key else 'AI Not Configured'
    })

@app.route('/api/analyze', methods=['POST'])
def analyze_image():
    """Analyze crop image endpoint"""
    try:
        logger.info("🔍 Received analysis request")
        
        # Handle both file upload and base64 data
        image_data = None
        stakeholder = 'farmers'
        
        if 'image' in request.files:
            # File upload
            file = request.files['image']
            if file.filename == '':
                return jsonify({'error': 'No file selected'}), 400
            
            # Convert file to base64
            file_bytes = file.read()
            image_data = base64.b64encode(file_bytes).decode('utf-8')
            logger.info("📥 Received file upload")
            
        elif 'image_data' in request.json:
            # Base64 data
            image_data = request.json['image_data']
            logger.info("📥 Received base64 data")
            
        else:
            return jsonify({'error': 'No image data provided'}), 400
        
        # Get stakeholder type
        stakeholder = request.form.get('stakeholder', 'farmers') if request.form else 'farmers'
        logger.info(f"Processing image for stakeholder: {stakeholder}")
        
        # Analyze with Gemini AI
        analysis_result = ai_detector.analyze_image(image_data)
        
        # Business analysis
        business_insights = {
            'economic_impact': analysis_result.get('economic_impact', 'Requires assessment'),
            'recommendations': analysis_result.get('immediate_treatments', ['Monitor crop health']),
            'market_value': 'Good market conditions' if analysis_result.get('health_status') == 'healthy' else 'Requires attention'
        }
        
        # Post-harvest analysis
        post_harvest = {
            'loss_risk': 'Low' if analysis_result.get('health_status') == 'healthy' else 'Medium',
            'storage_recommendations': 'Standard storage conditions',
            'transport_advice': 'Normal handling procedures'
        }
        
        # Complete response
        response = {
            'status': 'success',
            'message': 'Analysis completed successfully',
            'timestamp': datetime.now().isoformat(),
            'stakeholder': stakeholder,
            'analysis': analysis_result,
            'business_insights': business_insights,
            'post_harvest': post_harvest,
            'analysis_method': analysis_result.get('detection_method', 'unknown'),
            'api_source': analysis_result.get('api_source', 'unknown')
        }
        
        logger.info(f"✅ Analysis completed successfully for {stakeholder} - {analysis_result['crop_type']} with {analysis_result['disease_type']}")
        return jsonify(response)
        
    except Exception as e:
        logger.error(f"❌ Analysis failed: {e}")
        return jsonify({
            'status': 'error',
            'message': f'Analysis failed: {str(e)}'
        }), 500

@app.route('/api/test', methods=['GET'])
def test_endpoint():
    """Test endpoint"""
    return jsonify({
        'message': 'AGROF AI Backend is working!',
        'timestamp': datetime.now().isoformat(),
        'status': 'success',
        'ai_status': 'Gemini AI Ready' if ai_detector.gemini_api_key else 'AI Not Configured'
    })

@app.route('/api/connection-test', methods=['GET', 'POST', 'OPTIONS'])
def connection_test():
    """Connection test endpoint for frontend"""
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'ok'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
        return response
    
    return jsonify({
        'status': 'success',
        'message': 'Frontend can connect to backend!',
        'timestamp': datetime.now().isoformat(),
        'method': request.method,
        'ai_status': 'Gemini AI Ready' if ai_detector.gemini_api_key else 'AI Not Configured'
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    logger.info("🚀 Starting AGROF AI Backend (Lightweight)...")
    logger.info(f"   Port: {port}")
    logger.info("   CORS: ENABLED")
    logger.info(f"   Gemini AI: {'✅ Ready' if ai_detector.gemini_api_key else '❌ Not configured'}")
    app.run(host='0.0.0.0', port=port, debug=False)
