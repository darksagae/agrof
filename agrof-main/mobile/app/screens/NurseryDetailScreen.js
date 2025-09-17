import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useCart } from '../contexts/CartContext';

const NurseryDetailScreen = ({ product, onBack }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found.</Text>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <MaterialIcons name="arrow-back" size={24} color="#2c5530" />
          <Text style={styles.backButtonText}>Back to Nursery Products</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    Alert.alert('Added to Cart', `${quantity} x ${product.name} added to your cart.`);
  };

  const handleCall = () => {
    const phoneNumber = '07052237777';
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch(err => console.error('Error opening phone dialer:', err));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <MaterialIcons name="arrow-back" size={24} color="#2c5530" />
          <Text style={styles.backButtonText}>Back to Nursery Products</Text>
        </TouchableOpacity>

        {/* Product Image */}
        <Image source={product.image} style={styles.productImage} resizeMode="contain" />

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productCategory}>{product.category}</Text>
          <Text style={styles.productManufacturer}>Supplier: {product.manufacturer}</Text>
          <Text style={styles.productPrice}>Price: {product.price}</Text>

          {/* Call for Inquiry */}
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

          {/* Product Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Details</Text>
            <Text style={styles.descriptionText}>{product.description}</Text>
          </View>

          {/* Planting Information for Bananas */}
          {product.plantingTime && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Planting Information</Text>
              <View style={styles.applicationCard}>
                <View style={styles.applicationHeader}>
                  <MaterialIcons name="schedule" size={24} color="#27ae60" />
                  <Text style={styles.applicationTitle}>Harvest Time</Text>
                </View>
                <Text style={styles.applicationValue}>{product.plantingTime}</Text>
              </View>
            </View>
          )}

          {/* Susceptibility Information */}
          {product.susceptibility && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Disease & Pest Susceptibility</Text>
              <View style={styles.applicationCard}>
                <View style={styles.applicationHeader}>
                  <MaterialIcons name="bug-report" size={24} color="#27ae60" />
                  <Text style={styles.applicationTitle}>Resistance</Text>
                </View>
                <Text style={styles.applicationValue}>{product.susceptibility}</Text>
              </View>
            </View>
          )}

          {/* Fruit Characteristics */}
          {product.fruitSize && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Fruit Characteristics</Text>
              <View style={styles.applicationCard}>
                <View style={styles.applicationHeader}>
                  <MaterialIcons name="eco" size={24} color="#27ae60" />
                  <Text style={styles.applicationTitle}>Size & Texture</Text>
                </View>
                <Text style={styles.applicationValue}>
                  {product.fruitSize}
                  {product.texture && `\nTexture: ${product.texture}`}
                </Text>
              </View>
            </View>
          )}

          {/* Plant Characteristics for Herbs */}
          {product.height && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Plant Characteristics</Text>
              <View style={styles.applicationCard}>
                <View style={styles.applicationHeader}>
                  <MaterialIcons name="straighten" size={24} color="#27ae60" />
                  <Text style={styles.applicationTitle}>Size</Text>
                </View>
                <Text style={styles.applicationValue}>
                  Height: {product.height}
                  {product.spread && `\nSpread: ${product.spread}`}
                  {product.leafSize && `\nLeaf Size: ${product.leafSize}`}
                </Text>
              </View>
            </View>
          )}

          {/* Health Benefits */}
          {product.benefits && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Health Benefits</Text>
              <View style={styles.applicationCard}>
                <View style={styles.applicationHeader}>
                  <MaterialIcons name="favorite" size={24} color="#27ae60" />
                  <Text style={styles.applicationTitle}>Benefits</Text>
                </View>
                <Text style={styles.applicationValue}>{product.benefits}</Text>
              </View>
            </View>
          )}

          {/* Nutrients */}
          {product.nutrients && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Nutritional Content</Text>
              <View style={styles.applicationCard}>
                <View style={styles.applicationHeader}>
                  <MaterialIcons name="local-dining" size={24} color="#27ae60" />
                  <Text style={styles.applicationTitle}>Nutrients</Text>
                </View>
                <Text style={styles.applicationValue}>{product.nutrients}</Text>
              </View>
            </View>
          )}

          {/* Uses */}
          {product.uses && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Uses</Text>
              <View style={styles.applicationCard}>
                <View style={styles.applicationHeader}>
                  <MaterialIcons name="build" size={24} color="#27ae60" />
                  <Text style={styles.applicationTitle}>Applications</Text>
                </View>
                <Text style={styles.applicationValue}>{product.uses}</Text>
              </View>
            </View>
          )}

          {/* Maturity Time */}
          {product.maturity && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Maturity Information</Text>
              <View style={styles.applicationCard}>
                <View style={styles.applicationHeader}>
                  <MaterialIcons name="timeline" size={24} color="#27ae60" />
                  <Text style={styles.applicationTitle}>Time to Maturity</Text>
                </View>
                <Text style={styles.applicationValue}>{product.maturity}</Text>
              </View>
            </View>
          )}

          {/* Packaging Information */}
          {product.packaging && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Packaging</Text>
              <Text style={styles.descriptionText}>{product.packaging}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    position: 'absolute',
    top: 40,
    left: 0,
    zIndex: 10,
  },
  backButtonText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#2c5530',
  },
  productImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    marginBottom: 15,
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c5530',
    marginBottom: 5,
  },
  productCategory: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  productManufacturer: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 15,
  },
  section: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c5530',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  phoneSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  phoneButton: {
    flexDirection: 'row',
    backgroundColor: '#e0ffe0',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  phoneText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c5530',
  },
  cartSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    overflow: 'hidden',
  },
  quantityButton: {
    padding: 10,
  },
  quantityButtonDisabled: {
    opacity: 0.5,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    color: '#2c5530',
  },
  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: '#2c5530',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  addToCartText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  applicationCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
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
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default NurseryDetailScreen;




