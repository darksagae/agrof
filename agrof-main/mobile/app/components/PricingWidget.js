import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useCart } from '../contexts/CartContext';

const PricingWidget = ({ visible, onClose, product }) => {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [customQuantity, setCustomQuantity] = useState('');
  const [customUnit, setCustomUnit] = useState('');

  // Get cart context with error handling
  let addToCart;
  try {
    const cartContext = useCart();
    addToCart = cartContext.addToCart;
  } catch (error) {
    console.warn('Cart context not available:', error);
    addToCart = () => console.log('Cart not available');
  }

  // Safety check for product
  if (!product) {
    return null;
  }

  // Parse pricing information from product
  const parsePricing = (product) => {
    if (!product.packaging || typeof product.packaging !== 'string') {
      return [];
    }

    const pricing = [];
    const priceRanges = product.packaging.split(',').map(item => item.trim());
    
    priceRanges.forEach(priceRange => {
      const match = priceRange.match(/(\d+(?:\.\d+)?)\s*([a-zA-Z]+):\s*UGX\s*([\d,]+)/i);
      if (match) {
        const [, quantity, unit, price] = match;
        pricing.push({
          quantity: parseFloat(quantity),
          unit: unit.trim(),
          price: parseInt(price.replace(/,/g, '')),
          displayText: `${quantity} ${unit}: UGX ${price}`
        });
      }
    });

    return pricing;
  };

  const pricingOptions = parsePricing(product);
  const hasMultiplePrices = pricingOptions.length > 1;

  const handleUnitSelect = (option) => {
    setSelectedUnit(option);
    setCustomQuantity('');
    setCustomUnit('');
  };

  const handleCustomOrder = () => {
    if (!customQuantity || !customUnit) {
      Alert.alert('Error', 'Please enter both quantity and unit');
      return;
    }

    const quantity = parseFloat(customQuantity);
    if (isNaN(quantity) || quantity <= 0) {
      Alert.alert('Error', 'Please enter a valid quantity');
      return;
    }

    // Calculate price based on closest available unit
    let estimatedPrice = 0;
    if (pricingOptions.length > 0) {
      const baseOption = pricingOptions[0];
      const pricePerUnit = baseOption.price / baseOption.quantity;
      estimatedPrice = Math.round(pricePerUnit * quantity);
    }

    addToCart({
      productId: product.id,
      productName: product.name,
      quantity: quantity,
      unit: customUnit,
      price: estimatedPrice,
      displayText: `${quantity} ${customUnit}: UGX ${estimatedPrice.toLocaleString()} (Estimated)`,
    });

    Alert.alert('Success', 'Custom order added to cart!');
    onClose();
  };

  const handleAddToCart = () => {
    if (selectedUnit) {
      addToCart({
        productId: product.id,
        productName: product.name,
        quantity: selectedUnit.quantity,
        unit: selectedUnit.unit,
        price: selectedUnit.price,
        displayText: selectedUnit.displayText,
      });
      Alert.alert('Success', 'Item added to cart!');
      onClose();
    } else {
      Alert.alert('Error', 'Please select a unit or enter custom details');
    }
  };

  const renderPricingOption = (option, index) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.pricingOption,
        selectedUnit === option && styles.selectedOption
      ]}
      onPress={() => handleUnitSelect(option)}
    >
      <View style={styles.optionContent}>
        <Text style={styles.optionText}>{option.displayText}</Text>
        <View style={styles.pricePerUnit}>
          <Text style={styles.pricePerUnitText}>
            UGX {(option.price / option.quantity).toFixed(0)} per {option.unit}
          </Text>
        </View>
      </View>
      {selectedUnit === option && (
        <MaterialIcons name="check-circle" size={24} color="#2c5530" />
      )}
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Select Package Size</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <Text style={styles.productName}>{product?.name}</Text>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {hasMultiplePrices ? (
              <>
                <Text style={styles.sectionTitle}>Available Packages:</Text>
                {pricingOptions.map((option, index) => renderPricingOption(option, index))}
                
                <View style={styles.divider} />
                
                <Text style={styles.sectionTitle}>Custom Order:</Text>
                <View style={styles.customOrderContainer}>
                  <View style={styles.inputRow}>
                    <TextInput
                      style={styles.quantityInput}
                      placeholder="Quantity"
                      value={customQuantity}
                      onChangeText={setCustomQuantity}
                      keyboardType="numeric"
                    />
                    <TextInput
                      style={styles.unitInput}
                      placeholder="Unit (g, kg, ml, ltr)"
                      value={customUnit}
                      onChangeText={setCustomUnit}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.customOrderButton}
                    onPress={handleCustomOrder}
                  >
                    <Text style={styles.customOrderButtonText}>Add Custom Order</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={styles.singlePriceContainer}>
                <Text style={styles.singlePriceText}>
                  {product?.price || 'Price not available'}
                </Text>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => {
                    addToCart({
                      productId: product.id,
                      productName: product.name,
                      quantity: 1,
                      unit: 'unit',
                      price: 0,
                      displayText: product?.price,
                    });
                    Alert.alert('Success', 'Item added to cart!');
                    onClose();
                  }}
                >
                  <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>

          {hasMultiplePrices && (
            <View style={styles.footer}>
              <TouchableOpacity
                style={[
                  styles.addToCartButton,
                  !selectedUnit && styles.disabledButton
                ]}
                onPress={handleAddToCart}
                disabled={!selectedUnit}
              >
                <MaterialIcons name="shopping-cart" size={20} color="white" />
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c5530',
  },
  closeButton: {
    padding: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 20,
    paddingBottom: 15,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c5530',
    marginBottom: 15,
    marginTop: 10,
  },
  pricingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: '#2c5530',
    backgroundColor: '#e8f5e8',
  },
  optionContent: {
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  pricePerUnit: {
    backgroundColor: '#2c5530',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  pricePerUnitText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 20,
  },
  customOrderContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  quantityInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    backgroundColor: 'white',
  },
  unitInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'white',
  },
  customOrderButton: {
    backgroundColor: '#17a2b8',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  customOrderButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  singlePriceContainer: {
    alignItems: 'center',
    padding: 20,
  },
  singlePriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c5530',
    marginBottom: 20,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  addToCartButton: {
    backgroundColor: '#2c5530',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default PricingWidget;
