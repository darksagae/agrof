"""
Prediction module for crop disease detection.
"""

import torch
import torch.nn.functional as F
import cv2
import numpy as np
from PIL import Image
from pathlib import Path
import json

# Add src to path
import sys
sys.path.append(str(Path(__file__).parent.parent))

from models.cnn_pytorch import create_model
from preprocessing.dataset import get_transforms

class CropDiseasePredictor:
    """Predictor for crop disease detection."""
    
    def __init__(self, model_path, device=None):
        """
        Initialize predictor.
        
        Args:
            model_path: Path to trained model checkpoint
            device: Device to run inference on (auto-detect if None)
        """
        self.model_path = Path(model_path)
        self.device = device or torch.device("cuda" if torch.cuda.is_available() else "cpu")
        
        # Load model
        self.model, self.config, self.label_names = self._load_model()
        self.model.eval()
        
        # Create transforms
        self.transform = get_transforms(image_size=224, is_training=False)
    
    def _load_model(self):
        """Load trained model from checkpoint."""
        print(f"Loading model from: {self.model_path}")
        
        # Load checkpoint
        checkpoint = torch.load(self.model_path, map_location=self.device)
        config = checkpoint['config']
        
        # Create model
        model = create_model(
            model_type=config['model_type'],
            num_classes=len(config['label_names']),
            pretrained=False,
            use_attention=config.get('use_attention', False)
        )
        
        # Load weights
        model.load_state_dict(checkpoint['model_state_dict'])
        model = model.to(self.device)
        
        print(f"Model loaded: {config['model_type']}")
        print(f"Classes: {config['label_names']}")
        print(f"Device: {self.device}")
        
        return model, config, config['label_names']
    
    def preprocess_image(self, image_path):
        """
        Preprocess image for inference.
        
        Args:
            image_path: Path to image file or PIL Image object
        
        Returns:
            tensor: Preprocessed image tensor
        """
        if isinstance(image_path, str) or isinstance(image_path, Path):
            # Load image from file
            image = Image.open(image_path).convert('RGB')
        elif isinstance(image_path, Image.Image):
            # Use provided PIL Image
            image = image_path.convert('RGB')
        elif isinstance(image_path, np.ndarray):
            # Convert numpy array to PIL Image
            if image_path.dtype != np.uint8:
                image_path = (image_path * 255).astype(np.uint8)
            image = Image.fromarray(image_path)
        else:
            raise ValueError(f"Unsupported image type: {type(image_path)}")
        
        # Apply transforms
        tensor = self.transform(image)
        
        # Add batch dimension
        tensor = tensor.unsqueeze(0)
        
        return tensor
    
    def predict(self, image_path, return_probs=False):
        """
        Predict disease for an image.
        
        Args:
            image_path: Path to image file, PIL Image, or numpy array
            return_probs: Whether to return probability distribution
        
        Returns:
            dict: Prediction results
        """
        # Preprocess image
        image_tensor = self.preprocess_image(image_path)
        image_tensor = image_tensor.to(self.device)
        
        # Run inference
        with torch.no_grad():
            output = self.model(image_tensor)
            probs = F.softmax(output, dim=1)
            
            # Get prediction
            pred_idx = output.argmax(dim=1).item()
            confidence = probs[0][pred_idx].item()
            
            # Get all probabilities
            all_probs = probs[0].cpu().numpy()
        
        # Create result
        result = {
            'disease': self.label_names[pred_idx],
            'confidence': confidence,
            'class_index': pred_idx
        }
        
        if return_probs:
            result['probabilities'] = {
                label: prob for label, prob in zip(self.label_names, all_probs)
            }
        
        return result
    
    def predict_batch(self, image_paths, return_probs=False):
        """
        Predict disease for multiple images.
        
        Args:
            image_paths: List of image paths
            return_probs: Whether to return probability distributions
        
        Returns:
            list: List of prediction results
        """
        results = []
        
        for image_path in image_paths:
            try:
                result = self.predict(image_path, return_probs)
                results.append(result)
            except Exception as e:
                print(f"Error processing {image_path}: {e}")
                results.append({
                    'disease': 'unknown',
                    'confidence': 0.0,
                    'class_index': -1,
                    'error': str(e)
                })
        
        return results
    
    def get_model_info(self):
        """Get model information."""
        return {
            'model_type': self.config['model_type'],
            'num_classes': len(self.label_names),
            'classes': self.label_names,
            'device': str(self.device),
            'checkpoint_path': str(self.model_path)
        }

def load_model(ckpt_path, device=None):
    """
    Load trained model.
    
    Args:
        ckpt_path: Path to model checkpoint
        device: Device to run on
    
    Returns:
        predictor: CropDiseasePredictor instance
    """
    return CropDiseasePredictor(ckpt_path, device)

def preprocess(img_bgr, target_size=(224, 224)):
    """
    Preprocess BGR image for inference.
    
    Args:
        img_bgr: BGR image (numpy array)
        target_size: Target size for resizing
    
    Returns:
        tensor: Preprocessed image tensor
    """
    # Convert BGR to RGB
    img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
    
    # Resize
    img_resized = cv2.resize(img_rgb, target_size)
    
    # Convert to PIL Image
    img_pil = Image.fromarray(img_resized)
    
    # Apply transforms
    transform = get_transforms(image_size=target_size[0], is_training=False)
    tensor = transform(img_pil)
    
    return tensor.unsqueeze(0)

def predict(ckpt, img_path, device=None):
    """
    Predict disease for an image.
    
    Args:
        ckpt: Path to model checkpoint
        img_path: Path to image file
        device: Device to run on
    
    Returns:
        tuple: (label, confidence, full_probs)
    """
    predictor = load_model(ckpt, device)
    result = predictor.predict(img_path, return_probs=True)
    
    label = result['disease']
    confidence = result['confidence']
    full_probs = result['probabilities']
    
    return label, confidence, full_probs

# Example usage
if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Predict crop disease")
    parser.add_argument("--model", required=True, help="Path to model checkpoint")
    parser.add_argument("--image", required=True, help="Path to image file")
    parser.add_argument("--device", default=None, help="Device to use")
    
    args = parser.parse_args()
    
    # Load predictor
    predictor = load_model(args.model, args.device)
    
    # Make prediction
    result = predictor.predict(args.image, return_probs=True)
    
    # Print results
    print(f"Predicted disease: {result['disease']}")
    print(f"Confidence: {result['confidence']:.4f}")
    print("\nAll probabilities:")
    for disease, prob in result['probabilities'].items():
        print(f"  {disease}: {prob:.4f}")
