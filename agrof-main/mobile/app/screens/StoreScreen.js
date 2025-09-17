import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import FertilizerProductsScreen from './FertilizerProductsScreen';
import FungicidesScreen from './FungicidesScreen';
import HerbicidesScreen from './HerbicidesScreen';
import NurseryBedScreen from './NurseryBedScreen';
import OrganicChemicalsScreen from './OrganicChemicalsScreen';
import SeedsProductsScreen from './SeedsProductsScreen';

const StoreScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('fertilizers');
  const [showFertilizerProducts, setShowFertilizerProducts] = useState(false);
  const [showFungicideProducts, setShowFungicideProducts] = useState(false);
  const [showHerbicideProducts, setShowHerbicideProducts] = useState(false);
  const [showNurseryBedProducts, setShowNurseryBedProducts] = useState(false);
  const [showOrganicChemicalsProducts, setShowOrganicChemicalsProducts] = useState(false);
  const [showSeedsProducts, setShowSeedsProducts] = useState(false);
  const [imageLoadingStates, setImageLoadingStates] = useState({});

  // Memoize categories to prevent unnecessary re-renders
  const categories = useMemo(() => [
    { id: 'fertilizers', name: 'Fertilizers', image: require('../assets/fertilizers.png') },
    { id: 'fungicides', name: 'Fungicides', image: require('../assets/fungicides.png') },
    { id: 'herbicides', name: 'Herbicides', image: require('../assets/herbicides.png') },
    { id: 'nurserybed', name: 'Nursery Bed', image: require('../assets/nurserybed.png') },
    { id: 'organic_chemicals', name: 'Organic Chemicals', image: require('../assets/organic_chemicals.png') },
    { id: 'seeds', name: 'Seeds', image: require('../assets/seeds.png') },
  ], []);

  const handleCategoryPress = (categoryId) => {
    console.log(`🏪 Store: Loading ${categoryId} category...`);
    
    if (categoryId === 'fertilizers') {
      setShowFertilizerProducts(true);
    } else if (categoryId === 'fungicides') {
      setShowFungicideProducts(true);
    } else if (categoryId === 'herbicides') {
      setShowHerbicideProducts(true);
    } else if (categoryId === 'nurserybed') {
      setShowNurseryBedProducts(true);
    } else if (categoryId === 'organic_chemicals') {
      setShowOrganicChemicalsProducts(true);
    } else if (categoryId === 'seeds') {
      setShowSeedsProducts(true);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  // Optimized image loading handler
  const handleImageLoad = (categoryId) => {
    setImageLoadingStates(prev => ({ ...prev, [categoryId]: false }));
  };

  const handleImageLoadStart = (categoryId) => {
    setImageLoadingStates(prev => ({ ...prev, [categoryId]: true }));
  };

  if (showFertilizerProducts) {
    return (
      <FertilizerProductsScreen 
        onBack={() => setShowFertilizerProducts(false)} 
      />
    );
  }

  if (showFungicideProducts) {
    return (
      <FungicidesScreen 
        onBack={() => setShowFungicideProducts(false)} 
      />
    );
  }

  if (showHerbicideProducts) {
    return (
      <HerbicidesScreen 
        onBack={() => setShowHerbicideProducts(false)} 
      />
    );
  }

  if (showNurseryBedProducts) {
    return (
      <NurseryBedScreen 
        onBack={() => setShowNurseryBedProducts(false)} 
      />
    );
  }

  if (showOrganicChemicalsProducts) {
    return (
      <OrganicChemicalsScreen 
        onBack={() => setShowOrganicChemicalsProducts(false)} 
      />
    );
  }

  if (showSeedsProducts) {
    return (
      <SeedsProductsScreen 
        onBack={() => setShowSeedsProducts(false)} 
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <MaterialIcons name="store" size={32} color="white" />
          <Text style={styles.headerTitle}>AGROF Store</Text>
        </View>
        <Text style={styles.headerSubtitle}>Quality agricultural products for your farm</Text>
      </View>

      {/* Category Grid */}
      <View style={styles.categoriesContainer}>
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => handleCategoryPress(category.id)}
            >
              <Image source={category.image} style={styles.categoryImage} resizeMode="stretch" />
              <Text style={styles.categoryText}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    backgroundColor: '#2c5530',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
  },
  categoriesContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  categoryImage: {
    width: 140,
    height: 140,
    marginBottom: 10,
    borderRadius: 70,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2c5530',
    textAlign: 'center',
    lineHeight: 14,
  },
});

export default StoreScreen;