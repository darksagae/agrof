import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SeedsScreen = ({ onBack }) => {
  // Import all seeds images from simplified folder structure
  const seedImages = {
    'seed_1': require('../assets/SEEDS_SIMPLE/seed_1.jpg'),
    'seed_2': require('../assets/SEEDS_SIMPLE/seed_2.jpg'),
    'seed_3': require('../assets/SEEDS_SIMPLE/seed_3.png'),
    'seed_4': require('../assets/SEEDS_SIMPLE/seed_4.jpg'),
    'seed_5': require('../assets/SEEDS_SIMPLE/seed_5.jpg'),
    'seed_6': require('../assets/SEEDS_SIMPLE/seed_6.jpeg'),
    'seed_7': require('../assets/SEEDS_SIMPLE/seed_7.jpg'),
    'seed_8': require('../assets/SEEDS_SIMPLE/seed_8.png'),
    'seed_9': require('../assets/SEEDS_SIMPLE/seed_9.jpg'),
    'seed_10': require('../assets/SEEDS_SIMPLE/seed_10.jpg'),
    'seed_11': require('../assets/SEEDS_SIMPLE/seed_11.jpg'),
    'seed_12': require('../assets/SEEDS_SIMPLE/seed_12.jpg'),
    'seed_13': require('../assets/SEEDS_SIMPLE/seed_13.jpg'),
    'seed_14': require('../assets/SEEDS_SIMPLE/seed_14.jpeg'),
    'seed_15': require('../assets/SEEDS_SIMPLE/seed_15.jpg'),
    'seed_16': require('../assets/SEEDS_SIMPLE/seed_16.jpg'),
    'seed_17': require('../assets/SEEDS_SIMPLE/seed_17.png'),
    'seed_18': require('../assets/SEEDS_SIMPLE/seed_18.jpg'),
    'seed_19': require('../assets/SEEDS_SIMPLE/seed_19.jpg'),
    'seed_20': require('../assets/SEEDS_SIMPLE/seed_20.jpg'),
    'seed_21': require('../assets/SEEDS_SIMPLE/seed_21.jpg'),
    'seed_22': require('../assets/SEEDS_SIMPLE/seed_22.png'),
    'seed_23': require('../assets/SEEDS_SIMPLE/seed_23.jpg'),
    'seed_24': require('../assets/SEEDS_SIMPLE/seed_24.jpg'),
    'seed_25': require('../assets/SEEDS_SIMPLE/seed_25.jpg'),
    'seed_26': require('../assets/SEEDS_SIMPLE/seed_26.jpg'),
    'seed_27': require('../assets/SEEDS_SIMPLE/seed_27.jpg'),
    'seed_28': require('../assets/SEEDS_SIMPLE/seed_28.png'),
    'seed_29': require('../assets/SEEDS_SIMPLE/seed_29.jpg'),
    'seed_30': require('../assets/SEEDS_SIMPLE/seed_30.jpeg'),
    'seed_31': require('../assets/SEEDS_SIMPLE/seed_31.jpg'),
    'seed_32': require('../assets/SEEDS_SIMPLE/seed_32.png'),
    'seed_33': require('../assets/SEEDS_SIMPLE/seed_33.jpg'),
    'seed_34': require('../assets/SEEDS_SIMPLE/seed_34.png'),
    'seed_35': require('../assets/SEEDS_SIMPLE/seed_35.png'),
    'seed_36': require('../assets/SEEDS_SIMPLE/seed_36.png'),
    'seed_37': require('../assets/SEEDS_SIMPLE/seed_37.jpg'),
    'seed_38': require('../assets/SEEDS_SIMPLE/seed_38.jpg'),
    'seed_39': require('../assets/SEEDS_SIMPLE/seed_39.jpg'),
    'seed_40': require('../assets/SEEDS_SIMPLE/seed_40.jpg'),
    'seed_41': require('../assets/SEEDS_SIMPLE/seed_41.jpg'),
    'seed_42': require('../assets/SEEDS_SIMPLE/seed_42.png'),
    'seed_43': require('../assets/SEEDS_SIMPLE/seed_43.jpg'),
    'seed_44': require('../assets/SEEDS_SIMPLE/seed_44.jpg'),
    'seed_45': require('../assets/SEEDS_SIMPLE/seed_45.jpeg'),
    'seed_46': require('../assets/SEEDS_SIMPLE/seed_46.jpeg'),
    'seed_47': require('../assets/SEEDS_SIMPLE/seed_47.jpg'),
    'seed_48': require('../assets/SEEDS_SIMPLE/seed_48.jpg'),
    'seed_49': require('../assets/SEEDS_SIMPLE/seed_49.jpg'),
    'seed_50': require('../assets/SEEDS_SIMPLE/seed_50.jpeg'),
    'seed_51': require('../assets/SEEDS_SIMPLE/seed_51.jpg'),
    'seed_52': require('../assets/SEEDS_SIMPLE/seed_52.jpg'),
    'seed_53': require('../assets/SEEDS_SIMPLE/seed_53.jpg'),
    'seed_54': require('../assets/SEEDS_SIMPLE/seed_54.jpg'),
    'seed_55': require('../assets/SEEDS_SIMPLE/seed_55.jpg'),
    'seed_56': require('../assets/SEEDS_SIMPLE/seed_56.jpg'),
    'seed_57': require('../assets/SEEDS_SIMPLE/seed_57.jpg'),
    'seed_58': require('../assets/SEEDS_SIMPLE/seed_58.png'),
    'seed_59': require('../assets/SEEDS_SIMPLE/seed_59.png'),
    'seed_60': require('../assets/SEEDS_SIMPLE/seed_60.jpg'),
    'seed_61': require('../assets/SEEDS_SIMPLE/seed_61.jpg'),
    'seed_62': require('../assets/SEEDS_SIMPLE/seed_62.jpg'),
    'seed_63': require('../assets/SEEDS_SIMPLE/seed_63.jpg'),
    'seed_64': require('../assets/SEEDS_SIMPLE/seed_64.jpg'),
    'seed_65': require('../assets/SEEDS_SIMPLE/seed_65.jpg'),
    'seed_66': require('../assets/SEEDS_SIMPLE/seed_66.jpg'),
    'seed_67': require('../assets/SEEDS_SIMPLE/seed_67.jpg'),
    'seed_68': require('../assets/SEEDS_SIMPLE/seed_68.jpg'),
    'seed_69': require('../assets/SEEDS_SIMPLE/seed_69.jpeg'),
    'seed_70': require('../assets/SEEDS_SIMPLE/seed_70.jpg'),
    'seed_71': require('../assets/SEEDS_SIMPLE/seed_71.jpg'),
    'seed_72': require('../assets/SEEDS_SIMPLE/seed_72.jpg')
  };

  const seedProducts = [
    {
      id: 1,
      name: 'Cayenne Long Slim - Hot Pepper',
      image: seedImages.seed_1,
      description: 'Hot pepper with early maturity and high yield potential'
    },
    {
      id: 2,
      name: 'Kifaru F1 - Red Cabbage',
      image: seedImages.seed_2,
      description: 'Hybrid red cabbage variety for home gardens'
    },
    {
      id: 3,
      name: 'E107 (Simsim)',
      image: seedImages.seed_3,
      description: 'Sesame seed variety for oil production'
    },
    {
      id: 4,
      name: 'Tomato Assila',
      image: seedImages.seed_4,
      description: 'High-quality tomato variety for fresh market'
    },
    {
      id: 5,
      name: 'Anita - Watermelon',
      image: seedImages.seed_5,
      description: 'Sweet watermelon variety for home gardens'
    },
    {
      id: 6,
      name: 'Sc Duma 43 - Maize Seed',
      image: seedImages.seed_6,
      description: 'High-yielding maize variety for commercial farming'
    },
    {
      id: 7,
      name: 'Sugar Baby - Watermelon',
      image: seedImages.seed_7,
      description: 'Most popular watermelon variety with early maturity'
    },
    {
      id: 8,
      name: 'Yubi F1 Pakchoy - Chinese Cabbage',
      image: seedImages.seed_8,
      description: 'Chinese cabbage variety for Asian cuisine'
    },
    {
      id: 9,
      name: 'Nakati - Local Vegetable',
      image: seedImages.seed_9,
      description: 'Highly nutritious local vegetable variety'
    },
    {
      id: 10,
      name: 'Green Sprouting Calabrese - Broccoli',
      image: seedImages.seed_10,
      description: 'Broccoli with medium sized dark green heads'
    },
    {
      id: 11,
      name: 'Galia F1 - Sweet Melon',
      image: seedImages.seed_11,
      description: 'Sweet melon with firm fruits and aromatic flavour'
    },
    {
      id: 12,
      name: 'Kaveri F1 - Sweet Pepper',
      image: seedImages.seed_12,
      description: 'High-yielding sweet pepper variety'
    },
    {
      id: 13,
      name: 'Maxim F1 - Tomato',
      image: seedImages.seed_13,
      description: 'Hybrid tomato variety for commercial production'
    },
    {
      id: 14,
      name: 'Red Beauty',
      image: seedImages.seed_14,
      description: 'Red variety for colorful garden displays'
    },
    {
      id: 15,
      name: 'Namuche 3',
      image: seedImages.seed_15,
      description: 'Local vegetable variety for traditional cooking'
    },
    {
      id: 16,
      name: 'Arjuna F1 - Pumpkin',
      image: seedImages.seed_16,
      description: 'Hybrid pumpkin variety for home gardens'
    },
    {
      id: 17,
      name: 'Tengeru 97 - Tomato',
      image: seedImages.seed_17,
      description: 'Determinate round tomato with high yield potential'
    },
    {
      id: 18,
      name: 'Tandi F1 - Tomato',
      image: seedImages.seed_18,
      description: 'Hybrid tomato variety for fresh market'
    },
    {
      id: 19,
      name: 'Mammoth Red Rock - Red Cabbage',
      image: seedImages.seed_19,
      description: 'Red cabbage producing large, beautiful deep red-purple heads'
    },
    {
      id: 20,
      name: 'Pusa Sawani',
      image: seedImages.seed_20,
      description: 'Okra variety with wide adaptability'
    },
    {
      id: 21,
      name: 'Copenhagen',
      image: seedImages.seed_21,
      description: 'Cabbage variety for home gardens'
    },
    {
      id: 22,
      name: 'Habanero Red - Bonnet Pepper',
      image: seedImages.seed_22,
      description: 'Very hot pepper variety for spice lovers'
    },
    {
      id: 23,
      name: 'Ashley - Open Pollinated Cucumber',
      image: seedImages.seed_23,
      description: 'Cucumber variety with prolific productivity'
    },
    {
      id: 24,
      name: 'California Wonder - Sweet Pepper',
      image: seedImages.seed_24,
      description: 'Sweet pepper variety suitable for home and market gardens'
    },
    {
      id: 25,
      name: 'Poornima 008 F1 - Cauliflower',
      image: seedImages.seed_25,
      description: 'Hybrid cauliflower variety for commercial production'
    },
    {
      id: 26,
      name: 'Indica F1 - Cabbage',
      image: seedImages.seed_26,
      description: 'Hybrid cabbage variety for home gardens'
    },
    {
      id: 27,
      name: 'Green Gold F1 - Pepper',
      image: seedImages.seed_27,
      description: 'High yielding pepper variety with excellent fruit set'
    },
    {
      id: 28,
      name: 'Femi F1 - Hybrid Eggplant',
      image: seedImages.seed_28,
      description: 'Hybrid eggplant variety for commercial production'
    },
    {
      id: 29,
      name: 'Cal-j Tomato',
      image: seedImages.seed_29,
      description: 'Compact and determinate variety suitable for processing and fresh market'
    },
    {
      id: 30,
      name: 'Arjani F1 - Eggplants',
      image: seedImages.seed_30,
      description: 'Hybrid eggplant variety for home gardens'
    },
    {
      id: 31,
      name: 'Green Bunching - Onion',
      image: seedImages.seed_31,
      description: 'Non-bulbing alliums that produce yummy green stems'
    },
    {
      id: 32,
      name: 'Swiss Chard Ford Hook Giant',
      image: seedImages.seed_32,
      description: 'Tall and vigorous spinach variety'
    },
    {
      id: 33,
      name: 'Long Purple - Eggplant',
      image: seedImages.seed_33,
      description: 'Eggplant variety with high yield potential'
    },
    {
      id: 34,
      name: 'Maradona F1 - Hybrid Papaya',
      image: seedImages.seed_34,
      description: 'Hybrid papaya variety for tropical gardens'
    },
    {
      id: 35,
      name: 'Habanero Yellow - Bonnet Pepper',
      image: seedImages.seed_35,
      description: 'Yellow variety of very hot bonnet pepper'
    },
    {
      id: 36,
      name: 'California Wonder "Bamba" - Pepper',
      image: seedImages.seed_36,
      description: 'Special variety of California Wonder pepper'
    },
    {
      id: 37,
      name: 'Frey - Pepper Hybrid F1',
      image: seedImages.seed_37,
      description: 'Hybrid pepper variety for commercial production'
    },
    {
      id: 38,
      name: 'Coatmeal - Coriander',
      image: seedImages.seed_38,
      description: 'Coriander variety for culinary use'
    },
    {
      id: 39,
      name: 'Copenhagen Market - Cabbage',
      image: seedImages.seed_39,
      description: 'Most popular early maturing ball-headed variety'
    },
    {
      id: 40,
      name: 'Bitter Gourd - Palee F1',
      image: seedImages.seed_40,
      description: 'Hybrid bitter gourd variety for home gardens'
    },
    {
      id: 41,
      name: 'Corriander Dhania',
      image: seedImages.seed_41,
      description: 'Traditional coriander variety for cooking'
    },
    {
      id: 42,
      name: 'Tengeru',
      image: seedImages.seed_42,
      description: 'Tomato variety for commercial production'
    },
    {
      id: 43,
      name: 'Water Melon Pata Negra',
      image: seedImages.seed_43,
      description: 'Special watermelon variety for home gardens'
    },
    {
      id: 44,
      name: 'Fanaka F1 - Cabbage',
      image: seedImages.seed_44,
      description: 'Hybrid with excellent heat tolerance and high adaptability'
    },
    {
      id: 45,
      name: 'Merdan F1 - African Eggplants',
      image: seedImages.seed_45,
      description: 'African eggplant variety for traditional cooking'
    },
    {
      id: 46,
      name: 'Demon F1 - Hot Pepper',
      image: seedImages.seed_46,
      description: 'Very hot pepper variety for spice enthusiasts'
    },
    {
      id: 47,
      name: 'Green Coronet F1 - Cabbage',
      image: seedImages.seed_47,
      description: 'Medium-large, semi-upright hybrid cabbage'
    },
    {
      id: 48,
      name: 'Sugar King - Sweet Corn',
      image: seedImages.seed_48,
      description: 'Sweet corn variety for home gardens'
    },
    {
      id: 49,
      name: 'California Wonder',
      image: seedImages.seed_49,
      description: 'Classic sweet pepper variety'
    },
    {
      id: 50,
      name: 'Efia - Hot Pepper',
      image: seedImages.seed_50,
      description: 'Hot pepper variety for spicy dishes'
    },
    {
      id: 51,
      name: 'Kilele F1 Hybrid',
      image: seedImages.seed_51,
      description: 'Hybrid variety for commercial production'
    },
    {
      id: 52,
      name: 'Great Lakes Mesa 659 - Lettuce',
      image: seedImages.seed_52,
      description: 'Lettuce variety with tip-burn resistance and medium-large, solid heads'
    },
    {
      id: 53,
      name: 'Zawadi F1 - Cabbage',
      image: seedImages.seed_53,
      description: 'High yielding variety that withstands long distance transportation'
    },
    {
      id: 54,
      name: 'Georgia Sukuma Wiki - Collard',
      image: seedImages.seed_54,
      description: 'Vigorous and hardy collard variety'
    },
    {
      id: 55,
      name: 'Red Bugga - Amaranthus',
      image: seedImages.seed_55,
      description: 'Red amaranthus variety for nutritious greens'
    },
    {
      id: 56,
      name: 'Rambo F1 - Tomato Seed',
      image: seedImages.seed_56,
      description: 'Hybrid tomato variety for commercial production'
    },
    {
      id: 57,
      name: 'Sukari F1 - Watermelon',
      image: seedImages.seed_57,
      description: 'Hybrid watermelon variety for sweet fruits'
    },
    {
      id: 58,
      name: 'Grace - Barley Seed',
      image: seedImages.seed_58,
      description: 'Barley variety for grain production'
    },
    {
      id: 59,
      name: 'Mak Soy 3N (Brac Seed)',
      image: seedImages.seed_59,
      description: 'Soybean variety for commercial farming'
    },
    {
      id: 60,
      name: 'Nouvelle F1 - Tomatoes',
      image: seedImages.seed_60,
      description: 'Hybrid tomato variety for fresh market'
    },
    {
      id: 61,
      name: 'Sugar Baby',
      image: seedImages.seed_61,
      description: 'Sweet watermelon variety for home gardens'
    },
    {
      id: 62,
      name: 'Tall Utah - Celery',
      image: seedImages.seed_62,
      description: 'Celery variety with crisp, stringless green tightly folded hearts'
    },
    {
      id: 63,
      name: 'Terere - Amaranthus',
      image: seedImages.seed_63,
      description: 'Indigenous, highly nutritious green leafy vegetable'
    },
    {
      id: 64,
      name: 'Green Aroma - Coriander (Dhania)',
      image: seedImages.seed_64,
      description: 'Coriander variety with vigorous and fast growing plants'
    },
    {
      id: 65,
      name: 'Pusa Sawani - Okra',
      image: seedImages.seed_65,
      description: 'Okra variety with wide adaptability'
    },
    {
      id: 66,
      name: 'Dodo (Elma)',
      image: seedImages.seed_66,
      description: 'Local vegetable variety for traditional cooking'
    },
    {
      id: 67,
      name: 'Julie F1',
      image: seedImages.seed_67,
      description: 'Hybrid variety for commercial production'
    },
    {
      id: 68,
      name: 'Drumhead - Cabbage',
      image: seedImages.seed_68,
      description: 'Traditional cabbage variety for home gardens'
    },
    {
      id: 69,
      name: 'Black Beauty - Eggplants',
      image: seedImages.seed_69,
      description: 'Classic eggplant variety with dark purple fruits'
    },
    {
      id: 70,
      name: 'Roma Vfn - Tomato',
      image: seedImages.seed_70,
      description: 'High yielding determinate oval shape tomato'
    },
    {
      id: 71,
      name: 'Katana F1 - Pumpkin',
      image: seedImages.seed_71,
      description: 'Hybrid pumpkin variety for home gardens'
    },
    {
      id: 72,
      name: 'Giant Drum Head - Cabbage',
      image: seedImages.seed_72,
      description: 'Cabbage variety that is high yielding and market fit'
    }
  ];

  const renderProduct = (product) => (
    <View key={product.id} style={styles.productItem}>
      <Image 
        source={product.image} 
        style={styles.productImage} 
        resizeMode="cover"
        onError={(error) => console.log('Image load error:', error)}
      />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <MaterialIcons name="spa" size={32} color="white" />
          <Text style={styles.headerTitle}>Seed Products</Text>
        </View>
        <Text style={styles.headerSubtitle}>Premium quality seeds for your garden and farm</Text>
      </View>

      {/* Products Grid */}
      <ScrollView style={styles.productsContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.productsGrid}>
          {seedProducts.map(renderProduct)}
        </View>
      </ScrollView>
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
    flex: 1,
    padding: 15,
    backgroundColor: 'transparent',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    width: '48%',
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  productImage: {
    width: '100%',
    height: 120,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c5530',
    marginBottom: 5,
    marginTop: 8,
    textAlign: 'center',
  },
  productDescription: {
    fontSize: 11,
    color: '#666',
    lineHeight: 16,
    textAlign: 'center',
  },
});

export default SeedsScreen;
