import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useCart } from '../contexts/CartContext';

const { width } = Dimensions.get('window');

const FungicideDetailScreen = ({ product, onBack, onViewPackages }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Systemic': return '#3498db';
      case 'Contact': return '#e74c3c';
      case 'Preventive': return '#f39c12';
      case 'Broad Spectrum': return '#9b59b6';
      case 'Seed Treatment': return '#1abc9c';
      case 'Soil Treatment': return '#8e44ad';
      case 'Biological': return '#27ae60';
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
    // You can add a success message here if needed
  };

  const handleCall = () => {
    const phoneNumber = '07052237777';
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch(err => console.error('Error opening phone dialer:', err));
  };

  const hasMultiplePrices = (product) => {
    return product.packaging && product.packaging.includes('|') && product.packaging !== 'Contact for pricing';
  };

  const renderDiseaseList = (diseases) => {
    return diseases.map((disease, index) => (
      <View key={index} style={styles.diseaseItem}>
        <MaterialIcons name="bug-report" size={16} color="#e74c3c" />
        <Text style={styles.diseaseText}>{disease}</Text>
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

        {/* Active Ingredient */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Ingredient</Text>
          <View style={styles.ingredientContainer}>
            <MaterialIcons name="science" size={20} color="#3498db" />
            <Text style={styles.ingredientText}>{product.activeIngredient}</Text>
          </View>
        </View>

        {/* Target Diseases */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Target Diseases</Text>
          <View style={styles.diseasesContainer}>
            {renderDiseaseList(product.targetDiseases)}
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

          {product.reEntryPeriod !== 'N/A' && (
            <View style={styles.applicationCard}>
              <View style={styles.applicationHeader}>
                <MaterialIcons name="schedule" size={24} color="#e67e22" />
                <Text style={styles.applicationTitle}>Re-entry Period</Text>
              </View>
              <Text style={styles.applicationValue}>{product.reEntryPeriod}</Text>
            </View>
          )}

          <View style={styles.applicationCard}>
            <View style={styles.applicationHeader}>
              <MaterialIcons name="eco" size={24} color="#2c5530" />
              <Text style={styles.applicationTitle}>Target Crops</Text>
            </View>
            <Text style={styles.applicationValue}>{product.targetCrops || 'Various crops as per label'}</Text>
          </View>

          <View style={styles.applicationCard}>
            <View style={styles.applicationHeader}>
              <MaterialIcons name="warning" size={24} color="#e74c3c" />
              <Text style={styles.applicationTitle}>Safety Notes</Text>
            </View>
            <Text style={styles.applicationValue}>Always follow label instructions and use appropriate protective equipment</Text>
          </View>
        </View>

        {/* Detailed Information based on product */}
        {product.id === 1 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nemasol - Soil Fumigant Details</Text>
            <Text style={styles.detailedText}>
              <Text style={styles.boldText}>Direction for use:</Text> Nemasol is a water miscible soil fumigant and is applied by drenching infected soils. Do not apply when soil temperatures are below 10°C. For optimal efficacy, apply when soil temperatures are between 10°C and 25°C.
            </Text>
            <Text style={styles.detailedText}>
              <Text style={styles.boldText}>Pre-treatment preparations:</Text> Prepare the surface to be treated up to a depth of 40-50 cm and remove undecayed organic matter. Bring soil moisture to field capacity at least 14 days before application.
            </Text>
            <Text style={styles.detailedText}>
              <Text style={styles.boldText}>Post-treatment procedure:</Text> To prevent excessive evaporation, seal treated areas with either follow-up irrigation or plastic sheet. Aerate treated area thoroughly 2-3 weeks after application.
            </Text>
            <Text style={styles.detailedText}>
              <Text style={styles.boldText}>Use limitations:</Text> Do not treat within 5m of existing trees and field crops.
            </Text>
          </View>
        )}

        {product.id === 2 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Proplant 722 SL - Systemic Fungicide Details</Text>
            <Text style={styles.detailedText}>
              <Text style={styles.boldText}>Mode of action:</Text> Proplant is a systemic fungicide that is absorbed by roots and translocated throughout the plant to aerial parts. It disrupts the formation of fungal cell walls by interfering with synthesis of phospholipids and fatty acids.
            </Text>
            <Text style={styles.detailedText}>
              <Text style={styles.boldText}>Recommendations for use:</Text>
              {'\n'}• Roses (Downy Mildew): Foliar spray - 1.5-3ltrs/Ha, 150-300mls/100ltrs of water
              {'\n'}• Pepper (Damping off): Foliar spray – 0.8ltrs/Ha, 80mls/100ltrs of water
            </Text>
            <Text style={styles.detailedText}>
              <Text style={styles.boldText}>Pre-Harvest interval:</Text> Pepper 3 days
            </Text>
          </View>
        )}

        {product.id === 6 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amistar 250 SC - Broad Spectrum Fungicide Details</Text>
            <Text style={styles.detailedText}>
              <Text style={styles.boldText}>Key benefits:</Text>
              {'\n'}• Stops disease even before it starts
              {'\n'}• Delays onset senescence hence prolonging Green Leaf Area (GLA)
              {'\n'}• Treated crop able to cope better with water stress
              {'\n'}• Improved ability to use nitrogen efficiently
            </Text>
            <Text style={styles.detailedText}>
              <Text style={styles.boldText}>Formulation:</Text> Soluble concentrate (SC)
            </Text>
            <Text style={styles.detailedText}>
              <Text style={styles.boldText}>WHO classification:</Text> III
            </Text>
          </View>
        )}

        {product.id === 11 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Daconil 720 SC - Contact Fungicide Details</Text>
            <Text style={styles.detailedText}>
              <Text style={styles.boldText}>Key benefits:</Text>
              {'\n'}• Does not wash off and sticks where needed
              {'\n'}• Built-in surfactant for superior coverage
              {'\n'}• Protection even after heavy rain or watering
              {'\n'}• Anti-fungal effect up to 21 days
            </Text>
            <Text style={styles.detailedText}>
              <Text style={styles.boldText}>Main crops:</Text> Coffee, Cereals, Ornamentals, Potatoes and Vegetables
            </Text>
            <Text style={styles.detailedText}>
              <Text style={styles.boldText}>Targets:</Text> Coffee Berry Disease (CBD), Bean Rust, Angular Leaf Spot, Anthracnose, Botrytis
            </Text>
          </View>
        )}

        {/* Safety Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety Information</Text>
          <View style={styles.safetyContainer}>
            <MaterialIcons name="warning" size={20} color="#e74c3c" />
            <Text style={styles.safetyText}>
              Always read and follow label instructions. Use appropriate protective equipment. 
              Store in a cool, dry place away from children and animals.
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
  diseasesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  diseaseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fdf2f2',
    padding: 8,
    borderRadius: 15,
    margin: 3,
  },
  diseaseText: {
    fontSize: 12,
    color: '#e74c3c',
    marginLeft: 5,
    fontWeight: '500',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoContent: {
    marginLeft: 15,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#2c5530',
    fontWeight: '500',
  },
  detailedText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 22,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#2c5530',
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
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    padding: 15,
    borderRadius: 10,
  },
  contactText: {
    fontSize: 14,
    color: '#27ae60',
    marginLeft: 10,
    flex: 1,
  },
});

export default FungicideDetailScreen;
