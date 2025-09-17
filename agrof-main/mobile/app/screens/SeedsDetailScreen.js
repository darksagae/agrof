import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useCart } from '../contexts/CartContext';

const { width } = Dimensions.get('window');

const SeedsDetailScreen = ({ product, onBack, onViewPackages }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Watermelon': return '#e74c3c';
      case 'Tomato': return '#e67e22';
      case 'Pepper': return '#f39c12';
      case 'Cabbage': return '#27ae60';
      case 'Cucumber': return '#2ecc71';
      case 'Onion': return '#95a5a6';
      case 'Leafy Vegetable': return '#1abc9c';
      case 'Melon': return '#f1c40f';
      case 'Soybean': return '#8e44ad';
      case 'Cereal': return '#d35400';
      case 'Celery': return '#16a085';
      case 'Okra': return '#e91e63';
      case 'Eggplant': return '#9c27b0';
      case 'Pumpkin': return '#ff9800';
      case 'Lettuce': return '#4caf50';
      case 'Broccoli': return '#8bc34a';
      case 'Spinach': return '#cddc39';
      case 'Maize': return '#ffc107';
      case 'Sesame': return '#795548';
      case 'Cauliflower': return '#607d8b';
      case 'Papaya': return '#ff5722';
      case 'Corn': return '#ffeb3b';
      default: return '#95a5a6';
    }
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: quantity
    });
  };

  const handleCall = () => {
    const phoneNumber = '07052237777';
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch(err => console.error('Error opening phone dialer:', err));
  };

  const hasMultiplePrices = (product) => {
    return product.packaging && product.packaging.includes('|') && product.packaging !== 'Contact for pricing';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={product.image} 
            style={styles.productImage} 
            resizeMode="contain"
          />
        </View>

        {/* Product Basic Info */}
        <View style={styles.basicInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(product.category) }]}>
            <Text style={styles.categoryText}>{product.category}</Text>
          </View>
          <Text style={styles.price}>{product.price}</Text>
          <Text style={styles.manufacturer}>by {product.manufacturer}</Text>
          
          {/* View Packages Button */}
          {hasMultiplePrices(product) && onViewPackages && (
            <TouchableOpacity 
              style={styles.viewPackagesButton}
              onPress={() => onViewPackages(product)}
            >
              <MaterialIcons name="shopping-cart" size={20} color="white" />
              <Text style={styles.viewPackagesText}>View Packages & Pricing</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Phone Icon */}
        <View style={styles.phoneSection}>
          <TouchableOpacity style={styles.phoneButton} onPress={handleCall}>
            <MaterialIcons name="phone" size={24} color="#2c5530" />
            <Text style={styles.phoneText}>Call for Inquiry</Text>
          </TouchableOpacity>
        </View>

        {/* Quantity Selector and Add to Cart */}
        <View style={styles.cartSection}>
          <View style={styles.quantitySelector}>
            <TouchableOpacity 
              style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]}
              onPress={handleDecrement}
              disabled={quantity <= 1}
            >
              <MaterialIcons name="remove" size={20} color={quantity <= 1 ? "#ccc" : "#2c5530"} />
            </TouchableOpacity>
            
            <Text style={styles.quantityText}>{quantity}</Text>
            
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={handleIncrement}
            >
              <MaterialIcons name="add" size={20} color="#2c5530" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <MaterialIcons name="shopping-cart" size={20} color="white" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        {/* Growing Information */}
        {product.maturity && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Growing Information</Text>
            
            <View style={styles.applicationCard}>
              <View style={styles.applicationHeader}>
                <MaterialIcons name="schedule" size={24} color="#27ae60" />
                <Text style={styles.applicationTitle}>Maturity Period</Text>
              </View>
              <Text style={styles.applicationValue}>{product.maturity}</Text>
            </View>

            {product.spacing && (
              <View style={styles.applicationCard}>
                <View style={styles.applicationHeader}>
                  <MaterialIcons name="straighten" size={24} color="#3498db" />
                  <Text style={styles.applicationTitle}>Spacing</Text>
                </View>
                <Text style={styles.applicationValue}>{product.spacing}</Text>
              </View>
            )}

            {product.seedRate && (
              <View style={styles.applicationCard}>
                <View style={styles.applicationHeader}>
                  <MaterialIcons name="opacity" size={24} color="#e67e22" />
                  <Text style={styles.applicationTitle}>Seed Rate</Text>
                </View>
                <Text style={styles.applicationValue}>{product.seedRate}</Text>
              </View>
            )}

            {product.yieldPotential && (
              <View style={styles.applicationCard}>
                <View style={styles.applicationHeader}>
                  <MaterialIcons name="eco" size={24} color="#2c5530" />
                  <Text style={styles.applicationTitle}>Yield Potential</Text>
                </View>
                <Text style={styles.applicationValue}>{product.yieldPotential}</Text>
              </View>
            )}
          </View>
        )}

        {/* Fruit/Plant Characteristics */}
        {(product.fruitWeight || product.fruitSize || product.color) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Plant/Fruit Characteristics</Text>
            
            {product.fruitWeight && (
              <View style={styles.applicationCard}>
                <View style={styles.applicationHeader}>
                  <MaterialIcons name="fitness-center" size={24} color="#e74c3c" />
                  <Text style={styles.applicationTitle}>Fruit Weight</Text>
                </View>
                <Text style={styles.applicationValue}>{product.fruitWeight}</Text>
              </View>
            )}

            {product.fruitSize && (
              <View style={styles.applicationCard}>
                <View style={styles.applicationHeader}>
                  <MaterialIcons name="straighten" size={24} color="#9b59b6" />
                  <Text style={styles.applicationTitle}>Fruit Size</Text>
                </View>
                <Text style={styles.applicationValue}>{product.fruitSize}</Text>
              </View>
            )}

            {product.color && (
              <View style={styles.applicationCard}>
                <View style={styles.applicationHeader}>
                  <MaterialIcons name="palette" size={24} color="#f39c12" />
                  <Text style={styles.applicationTitle}>Color</Text>
                </View>
                <Text style={styles.applicationValue}>{product.color}</Text>
              </View>
            )}

            {product.shape && (
              <View style={styles.applicationCard}>
                <View style={styles.applicationHeader}>
                  <MaterialIcons name="crop-free" size={24} color="#1abc9c" />
                  <Text style={styles.applicationTitle}>Shape</Text>
                </View>
                <Text style={styles.applicationValue}>{product.shape}</Text>
              </View>
            )}
          </View>
        )}

        {/* Special Attributes */}
        {product.specialAttributes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Special Attributes</Text>
            <View style={styles.applicationCard}>
              <View style={styles.applicationHeader}>
                <MaterialIcons name="star" size={24} color="#f1c40f" />
                <Text style={styles.applicationTitle}>Key Features</Text>
              </View>
              <Text style={styles.applicationValue}>{product.specialAttributes}</Text>
            </View>
          </View>
        )}

        {/* Disease Resistance */}
        {product.diseaseResistance && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Disease Resistance</Text>
            <View style={styles.applicationCard}>
              <View style={styles.applicationHeader}>
                <MaterialIcons name="security" size={24} color="#27ae60" />
                <Text style={styles.applicationTitle}>Resistance</Text>
              </View>
              <Text style={styles.applicationValue}>{product.diseaseResistance}</Text>
            </View>
          </View>
        )}

        {/* Nutritional Information */}
        {product.nutrients && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nutritional Content</Text>
            <View style={styles.applicationCard}>
              <View style={styles.applicationHeader}>
                <MaterialIcons name="local-dining" size={24} color="#e67e22" />
                <Text style={styles.applicationTitle}>Nutrients</Text>
              </View>
              <Text style={styles.applicationValue}>{product.nutrients}</Text>
            </View>
          </View>
        )}

        {/* Growing Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Growing Tips</Text>
          <View style={styles.applicationCard}>
            <View style={styles.applicationHeader}>
              <MaterialIcons name="lightbulb" size={24} color="#f39c12" />
              <Text style={styles.applicationTitle}>Best Practices</Text>
            </View>
            <Text style={styles.applicationValue}>
              • Follow recommended spacing and seed rates for optimal yield{'\n'}
              • Ensure proper soil preparation and drainage{'\n'}
              • Water consistently during growing season{'\n'}
              • Monitor for pests and diseases regularly{'\n'}
              • Harvest at the recommended maturity stage
            </Text>
          </View>
        </View>

        {/* Safety Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety Information</Text>
          <View style={styles.safetyContainer}>
            <MaterialIcons name="warning" size={20} color="#e74c3c" />
            <Text style={styles.safetyText}>
              Store seeds in a cool, dry place away from direct sunlight. 
              Keep out of reach of children and animals. Follow all label 
              instructions for optimal germination and growth.
            </Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#2c5530',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: width * 0.6,
    height: 200,
  },
  basicInfo: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c5530',
    textAlign: 'center',
    marginBottom: 10,
  },
  categoryBadge: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 10,
  },
  categoryText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 5,
  },
  manufacturer: {
    fontSize: 16,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  viewPackagesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c5530',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  viewPackagesText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  phoneSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#2c5530',
  },
  phoneText: {
    fontSize: 16,
    color: '#2c5530',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  cartSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    padding: 5,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  quantityButtonDisabled: {
    backgroundColor: '#f5f5f5',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c5530',
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: 'center',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c5530',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  addToCartText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  applicationCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#2c5530',
  },
  applicationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  applicationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c5530',
    marginLeft: 10,
  },
  applicationValue: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
    marginLeft: 34,
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c5530',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
  },
  safetyContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fdf2f2',
    padding: 15,
    borderRadius: 10,
  },
  safetyText: {
    fontSize: 14,
    color: '#e74c3c',
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
});

export default SeedsDetailScreen;




