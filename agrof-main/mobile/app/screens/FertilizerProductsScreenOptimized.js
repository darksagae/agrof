import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import FertilizerDetailScreen from './FertilizerDetailScreen';
import LazyImage from '../components/LazyImage';

const FertilizerProductsScreen = ({ onBack }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Optimized image loading - dynamically load images when needed
  const getImageSource = (imageId) => {
    try {
      const imageNumber = imageId.split('_')[1];
      
      // Map of known image extensions for fertilizers
      const imageExtensions = {
        '1': 'png', '7': 'png', '11': 'png', '13': 'png', '14': 'png', 
        '17': 'png', '18': 'png', '19': 'png', '23': 'png', '27': 'png',
        '31': 'png', '35': 'png', '42': 'png', '53': 'png', '58': 'png',
        '60': 'png', '61': 'png', '28': 'jpeg', '29': 'jpeg', '45': 'jpeg',
        '47': 'jpeg', '50': 'jpeg', '54': 'jpeg'
      };
      
      const extension = imageExtensions[imageNumber] || 'jpg';
      
      switch (extension) {
        case 'png':
          return require(`../assets/FERTILIZERS_SIMPLE/fertilizer_${imageNumber}.png`);
        case 'jpeg':
          return require(`../assets/FERTILIZERS_SIMPLE/fertilizer_${imageNumber}.jpeg`);
        default:
          return require(`../assets/FERTILIZERS_SIMPLE/fertilizer_${imageNumber}.jpg`);
      }
    } catch (error) {
      console.warn(`Failed to load fertilizer image: ${imageId}`, error);
      return require('../assets/fertilizers.png'); // Fallback
    }
  };

  // Memoized products data without pre-loaded images
  const fertilizerProducts = useMemo(() => [
    {
      id: 1, name: 'Agri Gold Foliar Fertilizer', imageId: 'fertilizer_1', category: 'Foliar', manufacturer: 'Various Suppliers',
      price: 'UGX 30,000 (1L) | UGX 15,000 (500ml)', packaging: '1L: UGX 30,000 | 500ml: UGX 15,000',
      description: 'Agri Gold is a wonder product that prevents flower shedding, promotes more flower formation and bumper yield while enhancing healthy fruit formation and vegetative growth.',
    },
    {
      id: 2, name: 'Omni K - Potassium Nitrate', imageId: 'fertilizer_2', category: 'Water Soluble', manufacturer: 'Uganda Crop Care Limited',
      price: 'UGX 366,000 (Retail) | UGX 357,500 (Wholesale)', packaging: 'Retail: UGX 366,000 | Wholesale: UGX 357,500',
      description: 'Water-soluble fertilizer for fertigation or foliar application, supplying nitrate, nitrogen and chlorine free potassium to plants.',
    },
    { id: 3, name: 'Magnesium Nitrate - Hexahydrate', imageId: 'fertilizer_3', category: 'Water Soluble', manufacturer: 'Uganda Crop Care Limited', price: 'UGX 158,800', description: 'Recommended for vegetative growth and during production stages.' },
    { id: 4, name: 'Elfert F - Trace Element Mix', imageId: 'fertilizer_4', category: 'Trace Elements', manufacturer: 'Uganda Crop Care Limited', price: 'UGX 779,600', description: 'Effective foliar spray to correct trace element deficiency.' },
    { id: 5, name: 'Nova Peak 0-52-34 - Monopotassium Phosphate', imageId: 'fertilizer_5', category: 'Water Soluble', manufacturer: 'Uganda Crop Care Limited', price: 'UGX 315,500', description: 'High purity product that dissolves completely and quickly in water.' },
    { id: 6, name: 'Calcium Nitrate - Nitrogen Calcium Compound', imageId: 'fertilizer_6', category: 'Water Soluble', manufacturer: 'Uganda Crop Care Limited', price: 'UGX 170,400', description: 'Helps with cell formation and neutralizes acids to detoxify plants.' },
    { id: 7, name: 'Yaravita Crop Boost', imageId: 'fertilizer_7', price: 'UGX 38,500', description: 'Concentrated phosphorous foliar fertilizer for enhanced crop growth' },
    { id: 8, name: 'Nova Map 12-61-0', imageId: 'fertilizer_8', price: 'UGX 314,200', description: 'Soluble fertilizer for fertigation and early growth stages' },
    { id: 9, name: 'Nutriplant Organic Plus', imageId: 'fertilizer_9', price: 'UGX 117,150 (1L)', description: 'Organic eliciting fertilizer with amino acids and trace elements' },
    { id: 10, name: 'Yara Vera Amidas', imageId: 'fertilizer_10', price: 'UGX 146,000', description: 'High nitrogen fertilizer (46% N) for all crops' },
    { id: 11, name: 'Calcium Nitrate', imageId: 'fertilizer_11', price: 'UGX 170,400', description: 'Water-soluble calcium and nitrogen fertilizer' },
    { id: 12, name: 'Yara Mila 25.5.5+5S', imageId: 'fertilizer_12', price: 'UGX 125,000', description: 'Yara Mila NPK with sulfur' },
    { id: 13, name: 'Crop Champion', imageId: 'fertilizer_13', price: 'UGX 13,000 (300g)', description: 'Complete crop nutrition fertilizer' },
    { id: 14, name: 'Rosasol Even', imageId: 'fertilizer_14', price: 'UGX 260,000', description: 'Water soluble NPK with trace elements' },
    { id: 15, name: 'Easygro Starter', imageId: 'fertilizer_15', price: 'UGX 18,000 (1kg)', description: 'Starter fertilizer for young plants' },
    { id: 16, name: 'Magnesium Nitrate', imageId: 'fertilizer_16', price: 'UGX 158,800', description: 'Magnesium and nitrogen fertilizer' },
    { id: 17, name: 'Magnesium Nitrate (Alt)', imageId: 'fertilizer_17', price: 'UGX 158,800', description: 'Alternative magnesium nitrate formulation' },
    { id: 18, name: 'Microp Topdressing', imageId: 'fertilizer_18', price: 'UGX 135,000', description: 'Topdressing fertilizer for crops' },
    { id: 19, name: 'NPK 112923 (Beans)', imageId: 'fertilizer_19', price: 'UGX 160,000', description: 'Fertilizer for beans and soybeans' },
    { id: 20, name: 'Cassava Tapiocal', imageId: 'fertilizer_20', price: 'UGX 5,000 (250g)', description: 'Microfood foliar fertilizer for cassava' },
    { id: 21, name: 'Kynoch Panda Power', imageId: 'fertilizer_21', price: 'UGX 160,000', description: 'High-performance NPK fertilizer blend' },
    { id: 22, name: 'Multi-NPK', imageId: 'fertilizer_22', price: 'UGX 18,000', description: 'Multi-nutrient NPK fertilizer' },
    { id: 23, name: 'Nova Peak 0-52-34', imageId: 'fertilizer_23', price: 'UGX 315,500', description: 'Monopotassium phosphate for foliar spraying' },
    { id: 24, name: 'Kynohorti NPK 15.9.21+5S', imageId: 'fertilizer_24', price: 'UGX 155,000', description: 'Specialized NPK blend with sulfur' },
    { id: 25, name: 'Greensea K20', imageId: 'fertilizer_25', price: 'UGX 35,000', description: 'Potassium fertilizer for all crops' },
    { id: 26, name: 'Kynoplus Top', imageId: 'fertilizer_26', price: 'UGX 165,000', description: 'Top-dressing NPK fertilizer' },
    { id: 27, name: 'Yaravita Crop Boost', imageId: 'fertilizer_27', price: 'UGX 38,500', description: 'Yaravita crop boost fertilizer' },
    { id: 28, name: 'Polyfeed 19-19-19 +Te', imageId: 'fertilizer_28', price: 'UGX 350,000', description: 'Balanced NPK with trace elements' },
    { id: 29, name: 'Yara Mila Power Plus', imageId: 'fertilizer_29', price: 'UGX 190,000', description: 'Premium NPK fertilizer with micronutrients' },
    { id: 30, name: 'Kynoplus S', imageId: 'fertilizer_30', price: 'UGX 140,000', description: 'Sulfur-enriched NPK fertilizer' },
    { id: 31, name: 'NPK 141028 (Cassava)', imageId: 'fertilizer_31', price: 'UGX 70,000', description: 'Blended fertilizer for cassava and sweet potato' },
    { id: 32, name: 'NPK 2555+5S', imageId: 'fertilizer_32', price: 'UGX 125,000', description: 'High phosphorus NPK with sulfur' },
    { id: 33, name: 'Yaramila Winner', imageId: 'fertilizer_33', price: 'UGX 165,000', description: 'Balanced NPK fertilizer for all crops' },
    { id: 34, name: 'Yaraliva Nitrabor', imageId: 'fertilizer_34', price: 'UGX 100,000', description: 'Yaraliva Nitrabor fertilizer' },
    { id: 35, name: 'Microp Planting', imageId: 'fertilizer_35', price: 'UGX 155,000', description: 'Planting fertilizer for crops' },
    { id: 36, name: 'Rootex 0.8%', imageId: 'fertilizer_36', price: 'UGX 170,000', description: 'Rooting hormone fertilizer' },
    { id: 37, name: 'NPK 16.2.31 (Coffee)', imageId: 'fertilizer_37', price: 'UGX 155,000', description: 'Specialized fertilizer for coffee cultivation' },
    { id: 38, name: 'Nutriplant Organic Plus', imageId: 'fertilizer_38', price: 'UGX 117,150', description: 'Organic eliciting fertilizer' },
    { id: 39, name: 'Easygro Calcium', imageId: 'fertilizer_39', price: 'UGX 6,400 (250g)', description: 'Water-soluble calcium fertilizer' },
    { id: 40, name: 'MOP', imageId: 'fertilizer_40', price: 'UGX 150,000', description: 'Muriate of potash fertilizer' },
    { id: 41, name: 'Kynoplus Expresso', imageId: 'fertilizer_41', price: 'UGX 160,000', description: 'Quick-release NPK fertilizer' },
    { id: 42, name: 'Nova Map 12-61-0', imageId: 'fertilizer_42', price: 'UGX 314,200', description: 'Soluble fertilizer for fertigation' },
    { id: 43, name: 'Folcrop B-MO', imageId: 'fertilizer_43', price: 'UGX 35,000', description: 'Boron and molybdenum fertilizer' },
    { id: 44, name: 'NPK 11.29.23', imageId: 'fertilizer_44', price: 'UGX 160,000', description: 'Planting fertilizer blend' },
    { id: 45, name: 'Yarabela Can', imageId: 'fertilizer_45', price: 'UGX 110,000', description: 'Yarabela Can fertilizer' },
    { id: 46, name: 'Mea-urea', imageId: 'fertilizer_46', price: 'UGX 125,000', description: 'MEA-urea fertilizer blend' },
    { id: 47, name: 'Yarabela Sulfan', imageId: 'fertilizer_47', price: 'UGX 125,000', description: 'Yarabela Sulfan fertilizer' },
    { id: 48, name: 'Yaramila Java', imageId: 'fertilizer_48', price: 'UGX 162,000', description: 'Yaramila Java fertilizer' },
    { id: 49, name: 'NPK 171717', imageId: 'fertilizer_49', price: 'UGX 120,000', description: 'Balanced NPK fertilizer' },
    { id: 50, name: 'Green Miracle', imageId: 'fertilizer_50', price: 'UGX 31,000', description: 'Anti-transpirant for plant stress relief' },
    { id: 51, name: 'AGRI GOLD', imageId: 'fertilizer_51', price: 'UGX 30,000 (1L)', description: 'Premium fertilizer blend for enhanced crop growth' },
    { id: 52, name: 'AGRI GOLD (Alt)', imageId: 'fertilizer_52', price: 'UGX 15,000 (500ml)', description: 'Alternative AGRI GOLD formulation' },
    { id: 53, name: 'Grow-cal', imageId: 'fertilizer_53', price: 'UGX 38,000', description: 'Calcium fertilizer for plant growth' },
    { id: 54, name: 'Agricultural Lim', imageId: 'fertilizer_54', price: 'UGX 25,000', description: 'Agricultural limestone for soil conditioning' },
    { id: 55, name: 'Yara Vera Amidas', imageId: 'fertilizer_55', price: 'UGX 146,000', description: 'Yara Vera Amidas fertilizer' },
    { id: 56, name: 'DAP', imageId: 'fertilizer_56', price: 'UGX 175,000', description: 'Diammonium phosphate for phosphorus supply' },
    { id: 57, name: 'Super Green', imageId: 'fertilizer_57', price: 'UGX 11,000', description: 'Liquid complete water-soluble fertilizer' },
    { id: 58, name: 'Agricultural Lime', imageId: 'fertilizer_58', price: 'UGX 36,000', description: 'Soil pH correction and calcium supplement' },
    { id: 59, name: 'Easygro Vegetative', imageId: 'fertilizer_59', price: 'UGX 20,000', description: 'Vegetative growth fertilizer' },
    { id: 60, name: 'Urea (Prilled)', imageId: 'fertilizer_60', price: 'UGX 125,000', description: 'High nitrogen fertilizer for rapid growth' },
    { id: 61, name: 'NPK 241710 (Sunflower)', imageId: 'fertilizer_61', price: 'UGX 78,000', description: 'Fertilizer for sunflower crops' }
  ], []);

  // Render item component with performance optimizations
  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      key={item.id}
      style={styles.productItem}
      onPress={() => setSelectedProduct({ ...item, image: getImageSource(item.imageId) })}
    >
      <LazyImage 
        source={getImageSource(item.imageId)}
        style={styles.productImage} 
        resizeMode="cover"
        placeholder={require('../assets/fertilizers.png')}
      />
      <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">
        {item.name}
      </Text>
      <Text style={styles.productPrice} numberOfLines={1} ellipsizeMode="tail">
        {item.price || 'Contact for pricing'}
      </Text>
      <Text style={styles.productDescription} numberOfLines={2} ellipsizeMode="tail">
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  // Show detail screen if product is selected
  if (selectedProduct) {
    return (
      <FertilizerDetailScreen 
        product={selectedProduct} 
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <MaterialIcons name="eco" size={32} color="white" />
          <Text style={styles.headerTitle}>Fertilizer Products</Text>
        </View>
        <Text style={styles.headerSubtitle}>Complete range of agricultural fertilizers</Text>
      </View>

      {/* Products List with FlatList for better performance */}
      <FlatList
        data={fertilizerProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productsContainer}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={8}
        getItemLayout={(data, index) => ({
          length: 200,
          offset: 200 * Math.floor(index / 2),
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#2c5530',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 50,
    zIndex: 1,
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
  },
  productsContainer: {
    padding: 5,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  productItem: {
    width: '48%',
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 0,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 1,
  },
  productImage: {
    width: '100%',
    height: 150,
  },
  productName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2c5530',
    marginBottom: 2,
    marginTop: 20,
    textAlign: 'center',
    lineHeight: 16,
  },
  productPrice: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 0,
  },
  productDescription: {
    fontSize: 10,
    color: '#666',
    lineHeight: 14,
    textAlign: 'center',
    marginTop: 0,
  },
});

export default FertilizerProductsScreen;