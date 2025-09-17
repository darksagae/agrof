#!/usr/bin/env python3
"""
Agricultural API Client
Real internet sourcing for crop and disease information
"""

import requests
import json
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

class AgriculturalAPIClient:
    """Client for agricultural APIs and databases"""
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'AGROF-AI/2.0.0 (Agricultural Intelligence System)'
        })
        
        # Free agricultural APIs
        self.apis = {
            'plant_id': {
                'url': 'https://api.plant.id/v2/identify',
                'requires_key': True,
                'description': 'Plant identification with disease detection'
            },
            'trefle': {
                'url': 'https://trefle.io/api/v1/plants',
                'requires_key': True,
                'description': 'Plant database with detailed information'
            },
            'usda_plants': {
                'url': 'https://plants.usda.gov/api',
                'requires_key': False,
                'description': 'USDA plant database'
            },
            'gbif': {
                'url': 'https://api.gbif.org/v1/species',
                'requires_key': False,
                'description': 'Global biodiversity information facility'
            }
        }
        
        logger.info("🌐 Agricultural API Client initialized")
        logger.info(f"   Available APIs: {len(self.apis)}")
    
    def search_crop_information(self, crop_name, disease_type=None):
        """Search for crop information across multiple sources"""
        try:
            logger.info(f"🔍 Searching for crop: {crop_name}")
            
            results = {}
            
            # Search USDA Plants Database (free, no key required)
            usda_result = self.search_usda_plants(crop_name)
            if usda_result:
                results['usda'] = usda_result
            
            # Search GBIF (free, no key required)
            gbif_result = self.search_gbif(crop_name)
            if gbif_result:
                results['gbif'] = gbif_result
            
            # Search disease information if provided
            if disease_type:
                disease_info = self.search_disease_information(crop_name, disease_type)
                if disease_info:
                    results['disease'] = disease_info
            
            return {
                'success': True,
                'crop_name': crop_name,
                'sources': list(results.keys()),
                'data': results,
                'timestamp': datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"❌ Crop information search failed: {e}")
            return {
                'success': False,
                'error': str(e),
                'timestamp': datetime.now().isoformat()
            }
    
    def search_usda_plants(self, crop_name):
        """Search USDA Plants Database"""
        try:
            # USDA Plants API endpoint
            url = f"https://plants.usda.gov/api/plants/search"
            params = {
                'q': crop_name,
                'limit': 10
            }
            
            response = self.session.get(url, params=params, timeout=10)
            if response.status_code == 200:
                data = response.json()
                
                if data.get('data'):
                    plants = data['data']
                    # Extract relevant information
                    results = []
                    for plant in plants[:5]:  # Top 5 results
                        plant_info = {
                            'scientific_name': plant.get('scientific_name', ''),
                            'common_names': plant.get('common_names', []),
                            'family': plant.get('family', ''),
                            'genus': plant.get('genus', ''),
                            'species': plant.get('species', ''),
                            'growth_habit': plant.get('growth_habit', ''),
                            'duration': plant.get('duration', ''),
                            'native_status': plant.get('native_status', '')
                        }
                        results.append(plant_info)
                    
                    return {
                        'source': 'USDA Plants Database',
                        'total_results': len(data['data']),
                        'plants': results
                    }
            
            return None
            
        except Exception as e:
            logger.error(f"❌ USDA search failed: {e}")
            return None
    
    def search_gbif(self, crop_name):
        """Search GBIF (Global Biodiversity Information Facility)"""
        try:
            # GBIF API endpoint
            url = f"https://api.gbif.org/v1/species/match"
            params = {
                'name': crop_name
            }
            
            response = self.session.get(url, params=params, timeout=10)
            if response.status_code == 200:
                data = response.json()
                
                if data.get('matchType') in ['EXACT', 'FUZZY']:
                    species_info = {
                        'scientific_name': data.get('scientificName', ''),
                        'kingdom': data.get('kingdom', ''),
                        'phylum': data.get('phylum', ''),
                        'class': data.get('class', ''),
                        'order': data.get('order', ''),
                        'family': data.get('family', ''),
                        'genus': data.get('genus', ''),
                        'species': data.get('species', ''),
                        'match_type': data.get('matchType', ''),
                        'confidence': data.get('confidence', 0)
                    }
                    
                    return {
                        'source': 'GBIF',
                        'species_info': species_info
                    }
            
            return None
            
        except Exception as e:
            logger.error(f"❌ GBIF search failed: {e}")
            return None
    
    def search_disease_information(self, crop_name, disease_type):
        """Search for disease information"""
        try:
            logger.info(f"🦠 Searching disease info: {crop_name} - {disease_type}")
            
            # Search agricultural extension websites
            search_queries = [
                f"{crop_name} {disease_type} symptoms",
                f"{crop_name} {disease_type} treatment",
                f"{crop_name} {disease_type} prevention"
            ]
            
            # For now, return structured information based on common knowledge
            # In a real implementation, you'd scrape agricultural websites
            disease_info = self.get_common_disease_info(crop_name, disease_type)
            
            return {
                'source': 'Agricultural Knowledge Base',
                'disease_type': disease_type,
                'crop': crop_name,
                'information': disease_info
            }
            
        except Exception as e:
            logger.error(f"❌ Disease information search failed: {e}")
            return None
    
    def get_common_disease_info(self, crop_name, disease_type):
        """Get common disease information from knowledge base"""
        try:
            # Common disease knowledge base
            disease_knowledge = {
                'maize': {
                    'common_rust': {
                        'symptoms': 'Reddish-brown pustules on leaves and stems',
                        'treatment': 'Apply fungicides, remove infected plants',
                        'prevention': 'Plant resistant varieties, proper spacing',
                        'economic_impact': 'Can cause 20-40% yield loss'
                    },
                    'northern_leaf_blight': {
                        'symptoms': 'Large, cigar-shaped lesions on leaves',
                        'treatment': 'Fungicide application, crop rotation',
                        'prevention': 'Resistant varieties, field sanitation',
                        'economic_impact': 'Can cause 30-50% yield loss'
                    },
                    'gray_leaf_spot': {
                        'symptoms': 'Gray to tan lesions with yellow halos',
                        'treatment': 'Fungicides, proper irrigation',
                        'prevention': 'Resistant varieties, crop rotation',
                        'economic_impact': 'Can cause 15-30% yield loss'
                    }
                },
                'coffee': {
                    'coffee_leaf_rust': {
                        'symptoms': 'Orange-yellow powdery spots on leaves',
                        'treatment': 'Copper-based fungicides, pruning',
                        'prevention': 'Resistant varieties, shade management',
                        'economic_impact': 'Can cause 30-70% yield loss'
                    },
                    'coffee_berry_disease': {
                        'symptoms': 'Dark lesions on berries and leaves',
                        'treatment': 'Fungicide application, berry removal',
                        'prevention': 'Field sanitation, proper spacing',
                        'economic_impact': 'Can cause 20-40% yield loss'
                    },
                    'coffee_wilt': {
                        'symptoms': 'Wilting leaves, brown vascular tissue',
                        'treatment': 'Remove infected plants, soil treatment',
                        'prevention': 'Resistant varieties, soil health',
                        'economic_impact': 'Can cause 50-80% yield loss'
                    }
                },
                'cassava': {
                    'cassava_mosaic_disease': {
                        'symptoms': 'Mottled leaves, stunted growth',
                        'treatment': 'Remove infected plants, vector control',
                        'prevention': 'Clean planting material, field isolation',
                        'economic_impact': 'Can cause 20-90% yield loss'
                    },
                    'cassava_brown_streak': {
                        'symptoms': 'Brown streaks in roots, leaf chlorosis',
                        'treatment': 'Remove infected plants, soil treatment',
                        'prevention': 'Resistant varieties, clean material',
                        'economic_impact': 'Can cause 30-70% yield loss'
                    }
                },
                'tomato': {
                    'early_blight': {
                        'symptoms': 'Dark spots with concentric rings',
                        'treatment': 'Fungicides, remove infected leaves',
                        'prevention': 'Proper spacing, crop rotation',
                        'economic_impact': 'Can cause 20-40% yield loss'
                    },
                    'late_blight': {
                        'symptoms': 'Water-soaked lesions, white mold',
                        'treatment': 'Fungicides, immediate removal',
                        'prevention': 'Resistant varieties, good air flow',
                        'economic_impact': 'Can cause 50-80% yield loss'
                    }
                }
            }
            
            # Get disease info
            if crop_name.lower() in disease_knowledge:
                crop_diseases = disease_knowledge[crop_name.lower()]
                if disease_type in crop_diseases:
                    return crop_diseases[disease_type]
            
            # Generic disease information
            return {
                'symptoms': 'General disease symptoms may include spots, wilting, or discoloration',
                'treatment': 'Consult local agricultural extension for specific treatment',
                'prevention': 'Maintain plant health, proper spacing, and crop rotation',
                'economic_impact': 'Disease impact varies by severity and crop type'
            }
            
        except Exception as e:
            logger.error(f"❌ Common disease info failed: {e}")
            return {
                'symptoms': 'Unable to determine specific symptoms',
                'treatment': 'Consult agricultural expert',
                'prevention': 'General plant health practices',
                'economic_impact': 'Unknown'
            }
    
    def get_crop_growing_guide(self, crop_name):
        """Get growing guide for a specific crop"""
        try:
            # Common growing guides
            growing_guides = {
                'maize': {
                    'planting_season': 'Spring to early summer',
                    'soil_type': 'Well-drained, fertile soil',
                    'water_needs': 'Regular watering, especially during tasseling',
                    'fertilizer': 'Nitrogen-rich fertilizer',
                    'harvest_time': '3-4 months after planting',
                    'common_pests': 'Corn borers, armyworms, aphids'
                },
                'coffee': {
                    'planting_season': 'Rainy season',
                    'soil_type': 'Well-drained, slightly acidic soil',
                    'water_needs': 'Regular watering, avoid waterlogging',
                    'fertilizer': 'Balanced NPK fertilizer',
                    'harvest_time': '3-4 years after planting',
                    'common_pests': 'Coffee berry borer, leaf miners'
                },
                'cassava': {
                    'planting_season': 'Early rainy season',
                    'soil_type': 'Well-drained, sandy loam soil',
                    'water_needs': 'Moderate water, drought tolerant',
                    'fertilizer': 'Phosphorus and potassium rich',
                    'harvest_time': '8-24 months after planting',
                    'common_pests': 'Cassava mealybug, green mite'
                }
            }
            
            if crop_name.lower() in growing_guides:
                return growing_guides[crop_name.lower()]
            
            return {
                'planting_season': 'Varies by region and climate',
                'soil_type': 'Well-drained, fertile soil recommended',
                'water_needs': 'Regular watering based on soil moisture',
                'fertilizer': 'Balanced fertilizer appropriate for crop type',
                'harvest_time': 'Varies by crop variety and conditions',
                'common_pests': 'Consult local agricultural extension'
            }
            
        except Exception as e:
            logger.error(f"❌ Growing guide failed: {e}")
            return None

def test_agricultural_api():
    """Test the agricultural API client"""
    print("🧪 Testing Agricultural API Client")
    print("="*50)
    
    client = AgriculturalAPIClient()
    
    # Test crop search
    test_crops = ['maize', 'coffee', 'cassava']
    
    for crop in test_crops:
        print(f"\n🔍 Searching for: {crop}")
        result = client.search_crop_information(crop)
        
        if result['success']:
            print(f"   ✅ Found in {len(result['sources'])} sources")
            print(f"   📚 Sources: {', '.join(result['sources'])}")
        else:
            print(f"   ❌ Search failed: {result['error']}")
    
    # Test disease information
    print(f"\n🦠 Testing disease information...")
    disease_result = client.search_disease_information('maize', 'common_rust')
    if disease_result:
        print(f"   ✅ Disease info found")
        print(f"   📋 Symptoms: {disease_result['information']['symptoms'][:50]}...")
    
    # Test growing guide
    print(f"\n🌱 Testing growing guide...")
    guide = client.get_crop_growing_guide('maize')
    if guide:
        print(f"   ✅ Growing guide found")
        print(f"   📅 Planting season: {guide['planting_season']}")
    
    print("\n✅ Agricultural API Test Complete!")

if __name__ == "__main__":
    test_agricultural_api()
