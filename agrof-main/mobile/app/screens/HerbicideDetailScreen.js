import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useCart } from '../contexts/CartContext';

const { width } = Dimensions.get('window');

const HerbicideDetailScreen = ({ product, onBack, onViewPackages }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Selective Herbicide': return '#3498db';
      case 'Pre-emergent Herbicide': return '#e74c3c';
      case 'Post Emergence Herbicide': return '#f39c12';
      case 'Pre and Post-emergence Herbicide': return '#9b59b6';
      case 'Suspension Concentrate Herbicide': return '#1abc9c';
      case 'Non-selective Herbicide': return '#8e44ad';
      case 'Systemic Herbicide': return '#27ae60';
      case 'Contact Herbicide': return '#e67e22';
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
    return product.packaging && product.packaging.includes(',') && product.packaging !== 'Contact for pricing';
  };

  const renderBenefitsList = (benefits) => {
    return benefits.map((benefit, index) => (
      <View key={index} style={styles.benefitItem}>
        <MaterialIcons name="check-circle" size={16} color="#27ae60" />
        <Text style={styles.benefitText}>{benefit}</Text>
      </View>
    ));
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
          
          {product.availability === 'Out of stock' && (
            <View style={styles.outOfStockBadge}>
              <Text style={styles.outOfStockText}>Out of Stock</Text>
            </View>
          )}
          
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
        {product.availability !== 'Out of stock' && (
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
        )}

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        {/* Active Ingredient */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Ingredient</Text>
          <View style={styles.ingredientContainer}>
            <MaterialIcons name="science" size={20} color="#3498db" />
            <Text style={styles.ingredientText}>{product.activeIngredient}</Text>
          </View>
        </View>

        {/* Application Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Application Information</Text>
          
          <View style={styles.applicationCard}>
            <View style={styles.applicationHeader}>
              <MaterialIcons name="opacity" size={24} color="#27ae60" />
              <Text style={styles.applicationTitle}>Application Rate</Text>
            </View>
            <Text style={styles.applicationValue}>{product.applicationRate}</Text>
          </View>

          <View style={styles.applicationCard}>
            <View style={styles.applicationHeader}>
              <MaterialIcons name="eco" size={24} color="#2c5530" />
              <Text style={styles.applicationTitle}>Target Crops</Text>
            </View>
            <Text style={styles.applicationValue}>{product.crops.join(', ')}</Text>
          </View>

          <View style={styles.applicationCard}>
            <View style={styles.applicationHeader}>
              <MaterialIcons name="info" size={24} color="#3498db" />
              <Text style={styles.applicationTitle}>Usage Instructions</Text>
            </View>
            <Text style={styles.applicationValue}>{product.usageInstructions}</Text>
          </View>

          {product.formulation && (
            <View style={styles.applicationCard}>
              <View style={styles.applicationHeader}>
                <MaterialIcons name="inventory" size={24} color="#8e44ad" />
                <Text style={styles.applicationTitle}>Formulation</Text>
              </View>
              <Text style={styles.applicationValue}>{product.formulation}</Text>
            </View>
          )}

          {product.modeOfAction && (
            <View style={styles.applicationCard}>
              <View style={styles.applicationHeader}>
                <MaterialIcons name="psychology" size={24} color="#e67e22" />
                <Text style={styles.applicationTitle}>Mode of Action</Text>
              </View>
              <Text style={styles.applicationValue}>{product.modeOfAction}</Text>
            </View>
          )}

          {product.whoClassification && (
            <View style={styles.applicationCard}>
              <View style={styles.applicationHeader}>
                <MaterialIcons name="warning" size={24} color="#e74c3c" />
                <Text style={styles.applicationTitle}>WHO Classification</Text>
              </View>
              <Text style={styles.applicationValue}>{product.whoClassification}</Text>
            </View>
          )}

          {product.reEntryPeriod && (
            <View style={styles.applicationCard}>
              <View style={styles.applicationHeader}>
                <MaterialIcons name="schedule" size={24} color="#9b59b6" />
                <Text style={styles.applicationTitle}>Re-entry Period</Text>
              </View>
              <Text style={styles.applicationValue}>{product.reEntryPeriod}</Text>
            </View>
          )}

          {product.preHarvestInterval && (
            <View style={styles.applicationCard}>
              <View style={styles.applicationHeader}>
                <MaterialIcons name="agriculture" size={24} color="#1abc9c" />
                <Text style={styles.applicationTitle}>Pre-Harvest Interval</Text>
              </View>
              <Text style={styles.applicationValue}>{product.preHarvestInterval}</Text>
            </View>
          )}
        </View>

        {/* Key Benefits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Benefits</Text>
          <View style={styles.benefitsContainer}>
            {renderBenefitsList(product.keyBenefits)}
          </View>
        </View>

        {/* Packaging Information */}
        {product.packaging && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Packaging Options</Text>
            <View style={styles.packagingContainer}>
              <MaterialIcons name="inventory" size={20} color="#8e44ad" />
              <Text style={styles.packagingText}>{product.packaging}</Text>
            </View>
          </View>
        )}

        {/* Safety Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety Information</Text>
          <View style={styles.safetyContainer}>
            <MaterialIcons name="warning" size={20} color="#e74c3c" />
            <Text style={styles.safetyText}>
              Always read and follow label instructions. Use appropriate protective equipment. 
              Store in a cool, dry place away from children and animals. Do not apply when rain is expected within 6 hours.
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
    marginBottom: 10,
  },
  outOfStockBadge: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginBottom: 10,
  },
  outOfStockText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
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
  ingredientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 15,
    borderRadius: 10,
  },
  ingredientText: {
    fontSize: 16,
    color: '#2c5530',
    marginLeft: 10,
    fontWeight: '500',
  },
  benefitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    padding: 8,
    borderRadius: 15,
    margin: 3,
    width: '48%',
  },
  benefitText: {
    fontSize: 12,
    color: '#27ae60',
    marginLeft: 5,
    fontWeight: '500',
  },
  packagingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
  },
  packagingText: {
    fontSize: 16,
    color: '#2c5530',
    marginLeft: 10,
    fontWeight: '500',
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

export default HerbicideDetailScreen;



