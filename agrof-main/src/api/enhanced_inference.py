#!/usr/bin/env python3
"""
AGROF Enhanced Crop & Disease Inference
Uses trained model to predict:
1. Crop type (maize, coffee, etc.)
2. Health status (healthy, diseased)
3. Disease severity (low, medium, high, critical)
4. Specific disease (rust, blight, etc.)
"""

import torch
import torch.nn.functional as F
import torchvision.transforms as transforms
from PIL import Image
import numpy as np
from typing import Dict, Tuple, List
import json
from pathlib import Path

class EnhancedCropPredictor:
    def __init__(self, model_path: str = "enhanced_crop_model.pth"):
        """
        Initialize the enhanced crop predictor
        
        Args:
            model_path: Path to the trained model
        """
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model = None
        self.class_names = []
        self.num_classes = 0
        
        # Load the trained model
        self.load_model(model_path)
        
        # Setup image transforms
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])
        
        print(f"✅ Enhanced Crop Predictor loaded successfully!")
        print(f"📱 Device: {self.device}")
        print(f"🎯 Classes: {self.num_classes}")
        print(f"🏷️  Class names: {self.class_names}")
    
    def load_model(self, model_path: str):
        """Load the trained model"""
        try:
            # Load model checkpoint
            checkpoint = torch.load(model_path, map_location=self.device)
            
            # Extract model info
            self.class_names = checkpoint['class_names']
            self.num_classes = checkpoint['num_classes']
            model_architecture = checkpoint['model_architecture']
            
            print(f"📦 Model loaded: {model_architecture}")
            print(f"🏷️  Classes: {self.class_names}")
            
            # Import and create model
            import torchvision.models as models
            if model_architecture == 'efficientnet_b0':
                self.model = models.efficientnet_b0(pretrained=False)
                in_features = self.model.classifier[1].in_features
                self.model.classifier[1] = torch.nn.Linear(in_features, self.num_classes)
            else:
                raise ValueError(f"Unsupported model architecture: {model_architecture}")
            
            # Load state dict
            self.model.load_state_dict(checkpoint['model_state_dict'])
            self.model.to(self.device)
            self.model.eval()
            
        except Exception as e:
            print(f"❌ Error loading model: {e}")
            raise
    
    def preprocess_image(self, image_path: str) -> torch.Tensor:
        """
        Preprocess image for prediction
        
        Args:
            image_path: Path to the image file
            
        Returns:
            Preprocessed image tensor
        """
        try:
            # Load and preprocess image
            image = Image.open(image_path).convert('RGB')
            image_tensor = self.transform(image)
            image_tensor = image_tensor.unsqueeze(0)  # Add batch dimension
            return image_tensor.to(self.device)
            
        except Exception as e:
            print(f"❌ Error preprocessing image: {e}")
            raise
    
    def predict(self, image_path: str) -> Dict:
        """
        Predict crop type, health status, and disease severity
        
        Args:
            image_path: Path to the image file
            
        Returns:
            Dictionary with prediction results
        """
        try:
            # Preprocess image
            image_tensor = self.preprocess_image(image_path)
            
            # Get prediction
            with torch.no_grad():
                outputs = self.model(image_tensor)
                probabilities = F.softmax(outputs, dim=1)
                confidence, predicted_idx = torch.max(probabilities, 1)
            
            # Get predicted class
            predicted_class = self.class_names[predicted_idx.item()]
            confidence_score = confidence.item()
            
            # Parse class name to extract information
            crop_info = self.parse_class_name(predicted_class)
            
            # Create detailed result
            result = {
                'predicted_class': predicted_class,
                'confidence': confidence_score,
                'crop_type': crop_info['crop_type'],
                'health_status': crop_info['health_status'],
                'disease_type': crop_info['disease_type'],
                'severity_level': crop_info['severity_level'],
                'all_probabilities': self.get_all_probabilities(probabilities),
                'recommendations': self.get_recommendations(crop_info, confidence_score)
            }
            
            return result
            
        except Exception as e:
            print(f"❌ Error during prediction: {e}")
            raise
    
    def parse_class_name(self, class_name: str) -> Dict:
        """
        Parse class name to extract crop, health, disease, and severity info
        
        Expected format: crop_disease_severity (e.g., maize_common_rust_medium)
        """
        parts = class_name.split('_')
        
        if len(parts) < 2:
            return {
                'crop_type': 'unknown',
                'health_status': 'unknown',
                'disease_type': 'unknown',
                'severity_level': 'unknown'
            }
        
        # Extract crop type (first part)
        crop_type = parts[0]
        
        # Check if it's healthy
        if 'healthy' in class_name.lower():
            return {
                'crop_type': crop_type,
                'health_status': 'healthy',
                'disease_type': 'none',
                'severity_level': 'none'
            }
        
        # Extract disease and severity
        if len(parts) >= 3:
            # Last part is severity
            severity = parts[-1]
            # Middle parts form disease name
            disease_parts = parts[1:-1]
            disease_type = '_'.join(disease_parts)
            
            return {
                'crop_type': crop_type,
                'health_status': 'diseased',
                'disease_type': disease_type,
                'severity_level': severity
            }
        else:
            return {
                'crop_type': crop_type,
                'health_status': 'unknown',
                'disease_type': 'unknown',
                'severity_level': 'unknown'
            }
    
    def get_all_probabilities(self, probabilities: torch.Tensor) -> Dict[str, float]:
        """Get probabilities for all classes"""
        probs = probabilities.cpu().numpy()[0]
        return {self.class_names[i]: float(probs[i]) for i in range(len(self.class_names))}
    
    def get_recommendations(self, crop_info: Dict, confidence: float) -> Dict:
        """Get recommendations based on prediction"""
        recommendations = {
            'immediate_action': '',
            'treatment_plan': '',
            'prevention_tips': '',
            'monitoring_frequency': '',
            'expert_consultation': False
        }
        
        # Health status recommendations
        if crop_info['health_status'] == 'healthy':
            recommendations['immediate_action'] = 'Continue current care routine'
            recommendations['treatment_plan'] = 'No treatment needed'
            recommendations['prevention_tips'] = 'Maintain good agricultural practices'
            recommendations['monitoring_frequency'] = 'Weekly monitoring recommended'
            recommendations['expert_consultation'] = False
            
        elif crop_info['health_status'] == 'diseased':
            severity = crop_info['severity_level']
            
            if severity == 'low':
                recommendations['immediate_action'] = 'Monitor closely and apply preventive measures'
                recommendations['treatment_plan'] = 'Light treatment may be sufficient'
                recommendations['prevention_tips'] = 'Improve air circulation and reduce humidity'
                recommendations['monitoring_frequency'] = 'Daily monitoring for 1 week'
                recommendations['expert_consultation'] = False
                
            elif severity == 'medium':
                recommendations['immediate_action'] = 'Apply treatment within 24-48 hours'
                recommendations['treatment_plan'] = 'Moderate treatment required'
                recommendations['prevention_tips'] = 'Remove affected parts and apply fungicide'
                recommendations['monitoring_frequency'] = 'Daily monitoring for 2 weeks'
                recommendations['expert_consultation'] = False
                
            elif severity == 'high':
                recommendations['immediate_action'] = 'Immediate treatment required'
                recommendations['treatment_plan'] = 'Aggressive treatment needed'
                recommendations['prevention_tips'] = 'Consider early harvest if >50% affected'
                recommendations['monitoring_frequency'] = 'Twice daily monitoring'
                recommendations['expert_consultation'] = True
                
            elif severity == 'critical':
                recommendations['immediate_action'] = 'Emergency response required'
                recommendations['treatment_plan'] = 'Maximum treatment effort'
                recommendations['prevention_tips'] = 'Consider complete field treatment'
                recommendations['monitoring_frequency'] = 'Continuous monitoring'
                recommendations['expert_consultation'] = True
        
        # Confidence-based adjustments
        if confidence < 0.7:
            recommendations['expert_consultation'] = True
            recommendations['immediate_action'] = 'Low confidence - manual verification recommended'
        
        return recommendations
    
    def batch_predict(self, image_paths: List[str]) -> List[Dict]:
        """
        Predict for multiple images
        
        Args:
            image_paths: List of image file paths
            
        Returns:
            List of prediction results
        """
        results = []
        for image_path in image_paths:
            try:
                result = self.predict(image_path)
                results.append(result)
            except Exception as e:
                print(f"❌ Error predicting {image_path}: {e}")
                results.append({
                    'error': str(e),
                    'image_path': image_path
                })
        
        return results
    
    def get_model_info(self) -> Dict:
        """Get information about the loaded model"""
        return {
            'num_classes': self.num_classes,
            'class_names': self.class_names,
            'device': str(self.device),
            'model_architecture': 'efficientnet_b0'
        }

def main():
    """Test the enhanced crop predictor"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Enhanced Crop & Disease Prediction')
    parser.add_argument('--model_path', type=str, default='enhanced_crop_model.pth',
                       help='Path to the trained model')
    parser.add_argument('--image_path', type=str, required=True,
                       help='Path to the image to predict')
    
    args = parser.parse_args()
    
    try:
        # Initialize predictor
        predictor = EnhancedCropPredictor(args.model_path)
        
        # Get model info
        model_info = predictor.get_model_info()
        print(f"\n📊 Model Information:")
        print(f"  Classes: {model_info['num_classes']}")
        print(f"  Device: {model_info['device']}")
        
        # Make prediction
        print(f"\n🔍 Predicting for image: {args.image_path}")
        result = predictor.predict(args.image_path)
        
        # Display results
        print(f"\n🎯 Prediction Results:")
        print(f"  Predicted Class: {result['predicted_class']}")
        print(f"  Confidence: {result['confidence']:.2%}")
        print(f"  Crop Type: {result['crop_type']}")
        print(f"  Health Status: {result['health_status']}")
        print(f"  Disease Type: {result['disease_type']}")
        print(f"  Severity Level: {result['severity_level']}")
        
        print(f"\n💡 Recommendations:")
        print(f"  Immediate Action: {result['recommendations']['immediate_action']}")
        print(f"  Treatment Plan: {result['recommendations']['treatment_plan']}")
        print(f"  Prevention Tips: {result['recommendations']['prevention_tips']}")
        print(f"  Monitoring: {result['recommendations']['monitoring_frequency']}")
        print(f"  Expert Consultation: {'Yes' if result['recommendations']['expert_consultation'] else 'No'}")
        
        # Show top 3 probabilities
        print(f"\n📈 Top 3 Probabilities:")
        sorted_probs = sorted(result['all_probabilities'].items(), 
                            key=lambda x: x[1], reverse=True)[:3]
        for class_name, prob in sorted_probs:
            print(f"  {class_name}: {prob:.2%}")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()
