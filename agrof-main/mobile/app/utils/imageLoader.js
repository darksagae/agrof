/**
 * Optimized Image Loader for Store Products
 * Dynamically loads images to improve performance
 */

// Image cache to store loaded images
const imageCache = new Map();

// Dynamically load image based on category and ID
export const loadProductImage = (category, imageId) => {
  const cacheKey = `${category}_${imageId}`;
  
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey);
  }

  let imageSource = null;
  
  try {
    switch (category) {
      case 'fertilizers':
        imageSource = require(`../assets/FERTILIZERS_SIMPLE/${imageId}.png`);
        break;
      case 'fertilizers_jpg':
        imageSource = require(`../assets/FERTILIZERS_SIMPLE/${imageId}.jpg`);
        break;
      case 'fertilizers_jpeg':
        imageSource = require(`../assets/FERTILIZERS_SIMPLE/${imageId}.jpeg`);
        break;
      case 'fungicides':
        imageSource = require(`../assets/FUNGICIDES/${imageId}.png`);
        break;
      case 'fungicides_jpg':
        imageSource = require(`../assets/FUNGICIDES/${imageId}.jpg`);
        break;
      case 'fungicides_jpeg':
        imageSource = require(`../assets/FUNGICIDES/${imageId}.jpeg`);
        break;
      case 'seeds':
        imageSource = require(`../assets/SEEDS_SIMPLE/${imageId}.jpg`);
        break;
      case 'herbicides':
        imageSource = require(`../assets/HERBICIDES/${imageId}.png`);
        break;
      case 'herbicides_jpg':
        imageSource = require(`../assets/HERBICIDES/${imageId}.jpg`);
        break;
      case 'organic':
        imageSource = require(`../assets/ORGANIC_CHEMICALS/${imageId}.png`);
        break;
      case 'organic_jpg':
        imageSource = require(`../assets/ORGANIC_CHEMICALS/${imageId}.jpg`);
        break;
      case 'nursery':
        imageSource = require(`../assets/NURSERY/${imageId}.png`);
        break;
      case 'nursery_jpg':
        imageSource = require(`../assets/NURSERY/${imageId}.jpg`);
        break;
      default:
        // Fallback placeholder
        imageSource = require('../assets/fertilizers.png');
    }
    
    imageCache.set(cacheKey, imageSource);
    return imageSource;
  } catch (error) {
    // Fallback to category icon if specific image fails
    console.warn(`Failed to load image: ${category}/${imageId}`, error);
    
    let fallbackSource;
    switch (category.split('_')[0]) {
      case 'fertilizers':
        fallbackSource = require('../assets/fertilizers.png');
        break;
      case 'fungicides':
        fallbackSource = require('../assets/fungicides.png');
        break;
      case 'seeds':
        fallbackSource = require('../assets/seeds.png');
        break;
      case 'herbicides':
        fallbackSource = require('../assets/herbicides.png');
        break;
      case 'organic':
        fallbackSource = require('../assets/organic_chemicals.png');
        break;
      case 'nursery':
        fallbackSource = require('../assets/nurserybed.png');
        break;
      default:
        fallbackSource = require('../assets/fertilizers.png');
    }
    
    imageCache.set(cacheKey, fallbackSource);
    return fallbackSource;
  }
};

// Get optimized image source with proper extension detection
export const getOptimizedImageSource = (imagePath) => {
  if (!imagePath) return require('../assets/fertilizers.png');
  
  // Extract category and filename from path
  const pathParts = imagePath.split('/');
  const fileName = pathParts[pathParts.length - 1];
  const folder = pathParts[pathParts.length - 2];
  
  // Remove extension from filename
  const imageId = fileName.replace(/\.(png|jpg|jpeg)$/i, '');
  const extension = fileName.match(/\.(png|jpg|jpeg)$/i)?.[1].toLowerCase();
  
  // Map folder names to categories
  let category = '';
  switch (folder) {
    case 'FERTILIZERS_SIMPLE':
      category = extension === 'png' ? 'fertilizers' : `fertilizers_${extension}`;
      break;
    case 'FUNGICIDES':
      category = extension === 'png' ? 'fungicides' : `fungicides_${extension}`;
      break;
    case 'SEEDS_SIMPLE':
      category = 'seeds';
      break;
    case 'HERBICIDES':
      category = extension === 'png' ? 'herbicides' : `herbicides_${extension}`;
      break;
    case 'ORGANIC_CHEMICALS':
      category = extension === 'png' ? 'organic' : `organic_${extension}`;
      break;
    case 'NURSERY':
      category = extension === 'png' ? 'nursery' : `nursery_${extension}`;
      break;
    default:
      return require('../assets/fertilizers.png');
  }
  
  return loadProductImage(category, imageId);
};

// Clear cache if needed (for memory management)
export const clearImageCache = () => {
  imageCache.clear();
};