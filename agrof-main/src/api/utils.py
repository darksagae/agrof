"""
Utility functions for the Flask API.
"""

import os
import json
import logging
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Tuple
import cv2
import numpy as np
from PIL import Image
import torch

logger = logging.getLogger(__name__)

def setup_logging(log_level: str = "INFO") -> None:
    """Setup logging configuration."""
    logging.basicConfig(
        level=getattr(logging, log_level.upper()),
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.StreamHandler(),
            logging.FileHandler('api.log')
        ]
    )

def create_upload_directory(upload_path: str) -> None:
    """Create upload directory if it doesn't exist."""
    Path(upload_path).mkdir(parents=True, exist_ok=True)

def save_uploaded_file(file, upload_path: str, filename: str) -> str:
    """
    Save uploaded file to disk.
    
    Args:
        file: Flask file object
        upload_path: Directory to save file
        filename: Name to save file as
    
    Returns:
        str: Full path to saved file
    """
    filepath = os.path.join(upload_path, filename)
    file.save(filepath)
    return filepath

def cleanup_file(filepath: str) -> bool:
    """
    Delete file from disk.
    
    Args:
        filepath: Path to file to delete
    
    Returns:
        bool: True if successful, False otherwise
    """
    try:
        if os.path.exists(filepath):
            os.remove(filepath)
            return True
    except Exception as e:
        logger.error(f"Error deleting file {filepath}: {e}")
    
    return False

def validate_image_file(file, allowed_extensions: set) -> Tuple[bool, str]:
    """
    Validate uploaded image file.
    
    Args:
        file: Flask file object
        allowed_extensions: Set of allowed file extensions
    
    Returns:
        Tuple[bool, str]: (is_valid, error_message)
    """
    if not file or file.filename == '':
        return False, "No file selected"
    
    if not hasattr(file, 'filename'):
        return False, "Invalid file object"
    
    # Check file extension
    if '.' not in file.filename:
        return False, "File has no extension"
    
    extension = file.filename.rsplit('.', 1)[1].lower()
    if extension not in allowed_extensions:
        return False, f"File type '{extension}' not allowed. Allowed types: {', '.join(allowed_extensions)}"
    
    return True, ""

def get_file_size_mb(filepath: str) -> float:
    """Get file size in megabytes."""
    try:
        size_bytes = os.path.getsize(filepath)
        return size_bytes / (1024 * 1024)
    except Exception:
        return 0.0

def compress_image_if_needed(filepath: str, max_size_mb: float = 5.0) -> str:
    """
    Compress image if it's larger than max_size_mb.
    
    Args:
        filepath: Path to image file
        max_size_mb: Maximum file size in MB
    
    Returns:
        str: Path to compressed image (same path if no compression needed)
    """
    current_size = get_file_size_mb(filepath)
    
    if current_size <= max_size_mb:
        return filepath
    
    try:
        # Open image
        with Image.open(filepath) as img:
            # Convert to RGB if necessary
            if img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Calculate quality for JPEG compression
            quality = int((max_size_mb / current_size) * 100)
            quality = max(10, min(95, quality))  # Keep quality between 10-95
            
            # Save compressed image
            img.save(filepath, 'JPEG', quality=quality, optimize=True)
            
            logger.info(f"Compressed image from {current_size:.2f}MB to {get_file_size_mb(filepath):.2f}MB")
            
    except Exception as e:
        logger.error(f"Error compressing image {filepath}: {e}")
    
    return filepath

def generate_unique_filename(original_filename: str) -> str:
    """
    Generate unique filename with timestamp.
    
    Args:
        original_filename: Original filename
    
    Returns:
        str: Unique filename
    """
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S_%f')
    name, ext = os.path.splitext(original_filename)
    return f"{timestamp}_{name}{ext}"

def log_api_request(
    endpoint: str,
    method: str,
    status_code: int,
    processing_time: float,
    user_agent: str = "",
    ip_address: str = ""
) -> None:
    """
    Log API request details.
    
    Args:
        endpoint: API endpoint
        method: HTTP method
        status_code: Response status code
        processing_time: Time taken to process request
        user_agent: User agent string
        ip_address: Client IP address
    """
    log_entry = {
        'timestamp': datetime.now().isoformat(),
        'endpoint': endpoint,
        'method': method,
        'status_code': status_code,
        'processing_time': processing_time,
        'user_agent': user_agent,
        'ip_address': ip_address
    }
    
    logger.info(f"API Request: {json.dumps(log_entry)}")

def get_client_ip(request) -> str:
    """Get client IP address from Flask request."""
    if request.environ.get('HTTP_X_FORWARDED_FOR'):
        return request.environ['HTTP_X_FORWARDED_FOR'].split(',')[0]
    elif request.environ.get('HTTP_X_REAL_IP'):
        return request.environ['HTTP_X_REAL_IP']
    else:
        return request.environ.get('REMOTE_ADDR', '')

def format_file_size(size_bytes: int) -> str:
    """Format file size in human readable format."""
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size_bytes < 1024.0:
            return f"{size_bytes:.1f} {unit}"
        size_bytes /= 1024.0
    return f"{size_bytes:.1f} TB"

def check_disk_space(path: str, required_mb: float = 100.0) -> Tuple[bool, float]:
    """
    Check available disk space.
    
    Args:
        path: Path to check
        required_mb: Required space in MB
    
    Returns:
        Tuple[bool, float]: (has_space, available_mb)
    """
    try:
        statvfs = os.statvfs(path)
        available_bytes = statvfs.f_frsize * statvfs.f_bavail
        available_mb = available_bytes / (1024 * 1024)
        return available_mb >= required_mb, available_mb
    except Exception as e:
        logger.error(f"Error checking disk space: {e}")
        return False, 0.0

def sanitize_filename(filename: str) -> str:
    """
    Sanitize filename for safe storage.
    
    Args:
        filename: Original filename
    
    Returns:
        str: Sanitized filename
    """
    # Remove or replace unsafe characters
    unsafe_chars = ['<', '>', ':', '"', '|', '?', '*', '\\', '/']
    for char in unsafe_chars:
        filename = filename.replace(char, '_')
    
    # Limit length
    if len(filename) > 255:
        name, ext = os.path.splitext(filename)
        filename = name[:255-len(ext)] + ext
    
    return filename

def get_image_info(filepath: str) -> Dict:
    """
    Get basic information about an image file.
    
    Args:
        filepath: Path to image file
    
    Returns:
        Dict: Image information
    """
    try:
        with Image.open(filepath) as img:
            return {
                'format': img.format,
                'mode': img.mode,
                'size': img.size,
                'width': img.width,
                'height': img.height
            }
    except Exception as e:
        logger.error(f"Error getting image info for {filepath}: {e}")
        return {}

def validate_model_path(model_path: str) -> bool:
    """
    Validate that model checkpoint exists and is accessible.
    
    Args:
        model_path: Path to model checkpoint
    
    Returns:
        bool: True if valid, False otherwise
    """
    try:
        path = Path(model_path)
        return path.exists() and path.is_file()
    except Exception:
        return False

def get_system_info() -> Dict:
    """Get system information for debugging."""
    import platform
    import psutil
    
    return {
        'platform': platform.platform(),
        'python_version': platform.python_version(),
        'cpu_count': psutil.cpu_count(),
        'memory_total_gb': round(psutil.virtual_memory().total / (1024**3), 2),
        'memory_available_gb': round(psutil.virtual_memory().available / (1024**3), 2),
        'torch_version': torch.__version__,
        'cuda_available': torch.cuda.is_available(),
        'cuda_version': torch.version.cuda if torch.cuda.is_available() else None
    }
