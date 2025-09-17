import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import NurseryDetailScreen from './NurseryDetailScreen';

// Import nursery images
const nurseryImages = {
  nursery_1: require('../assets/nursery/nursery_1.jpg'),
  nursery_2: require('../assets/nursery/nursery_2.jpg'),
  nursery_3: require('../assets/nursery/nursery_3.jpg'),
  nursery_4: require('../assets/nursery/nursery_4.jpg'),
  nursery_5: require('../assets/nursery/nursery_5.jpg'),
  nursery_6: require('../assets/nursery/nursery_6.jpg'),
  nursery_7: require('../assets/nursery/nursery_7.jpg'),
  nursery_8: require('../assets/nursery/nursery_8.jpg'),
  nursery_9: require('../assets/nursery/nursery_9.jpg'),
  nursery_10: require('../assets/nursery/nursery_10.jpg'),
  nursery_11: require('../assets/nursery/nursery_11.jpg'),
  nursery_12: require('../assets/nursery/nursery_12.jpg'),
  nursery_13: require('../assets/nursery/nursery_13.jpg'),
  nursery_14: require('../assets/nursery/nursery_14.jpg'),
  nursery_15: require('../assets/nursery/nursery_15.jpg'),
  nursery_16: require('../assets/nursery/nursery_16.jpg'),
  nursery_17: require('../assets/nursery/nursery_17.jpg'),
  nursery_18: require('../assets/nursery/nursery_18.jpg'),
  nursery_19: require('../assets/nursery/nursery_19.jpg'),
  nursery_20: require('../assets/nursery/nursery_20.jpg'),
  nursery_21: require('../assets/nursery/nursery_21.jpg'),
  nursery_22: require('../assets/nursery/nursery_22.jpg'),
  nursery_23: require('../assets/nursery/nursery_23.jpg'),
};

const NurseryProductsScreen = ({ navigation }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const nurseryProducts = [
    {
      id: 1,
      name: 'Bogoya (Gros Michel) Banana T.C Plantlet',
      image: nurseryImages.nursery_1,
      category: 'Banana Plantlets',
      manufacturer: 'Senai Farm Supplies',
      price: 'UGX 3,600',
      packaging: '1 T.C Plantlet',
      description: 'These are laboratory bred, clean Tissue culture plantlets, free from pests and diseases. Banana type: Desert (yellow) banana; Planting to harvest time: 15-16 months; Susceptibility to weevils: Low; Susceptibility to wilt: High; Average finger size: Medium and long; Average bunch size: Small; Fruit texture: Soft and sweet.',
      plantingTime: '15-16 months to harvest',
      susceptibility: 'Low weevils, High wilt',
      fruitSize: 'Medium and long fingers, Small bunch',
      texture: 'Soft and sweet'
    },
    {
      id: 2,
      name: 'Rosemary Seedling',
      image: nurseryImages.nursery_2,
      category: 'Herb Seedlings',
      manufacturer: 'William Omwech',
      price: 'UGX 5,600',
      packaging: '1 Piece',
      description: 'Rosemary is a perennial shrub and usually grows to about 1 meter (3.3 feet) in height, though some plants can reach up to 2 meters (6.6 feet) tall. The linear leaves are about 1 cm (0.4 inch) long and somewhat resemble small curved pine needles. They are dark green and shiny above, with a white underside and curled leaf margins.',
      height: '1-2 meters',
      leafSize: '1 cm long',
      color: 'Dark green with white underside',
      benefits: 'Memory enhancement, aromatic constituent of tonics and liniments'
    },
    {
      id: 3,
      name: 'Parsley Seedling',
      image: nurseryImages.nursery_3,
      category: 'Herb Seedlings',
      manufacturer: 'William Omwech',
      price: 'UGX 5,600',
      packaging: '1 Piece',
      description: 'Parsley is a versatile herb that can be used in many ways, such in, sauces, juices, or as a garnish. Parsley contains several important nutrients, such as vitamins A, K, and C. It\'s also a good source of the mineral calcium, iron, magnesium, and potassium.',
      nutrients: 'Vitamins A, K, C, Calcium, Iron, Magnesium, Potassium',
      uses: 'Sauces, juices, garnish',
      shelfLife: 'Fresh: 2 weeks, Dried: 1 year',
      maturity: '4-6 weeks'
    },
    {
      id: 4,
      name: 'Lemon Balm Seedling',
      image: nurseryImages.nursery_4,
      category: 'Herb Seedlings',
      manufacturer: 'William Omwech',
      price: 'UGX 5,600',
      packaging: '1 Piece',
      description: 'Lemon balm is an herb from the mint family. The leaves, which have a mild lemon aroma, are used to make herbal medicine and flavor foods. Lemon balm is a bushy herbaceous perennial that grows to about 0.6 meters (2 feet) tall.',
      height: '0.6 meters (2 feet)',
      aroma: 'Mild lemon scent',
      uses: 'Herbal medicine, food flavoring, teas, aromatherapy',
      growth: 'Bushy herbaceous perennial'
    },
    {
      id: 5,
      name: 'Coriander Seedlings',
      image: nurseryImages.nursery_5,
      category: 'Herb Seedlings',
      manufacturer: 'William Omwech',
      price: 'UGX 5,600',
      packaging: '1 Piece',
      description: 'Coriander is a very beautiful annual herb. Its green shade and the shape of the leaves come together perfectly. It is used as spice giving food an extra delicious taste. It has essential oils and vitamins associated with various health benefits such as immunity boosting, Regulation of blood sugars, anti-inflammatory, and anti-cancer properties.',
      benefits: 'Immunity boosting, blood sugar regulation, anti-inflammatory, anti-cancer',
      maturity: '4-6 weeks',
      appearance: 'Beautiful green herb with perfect leaf shape',
      commercial: 'Great profitability potential'
    },
    {
      id: 6,
      name: 'Sweet Basil Seedling (Mujaaja)',
      image: nurseryImages.nursery_6,
      category: 'Herb Seedlings',
      manufacturer: 'William Omwech',
      price: 'UGX 5,600',
      packaging: '1 Piece',
      description: 'Sweet Basil is one of the most iconic culinary herbs. It adds flavor to meals, and its nutrients may provide health benefits. Sweet basil has been used for thousands of years as a culinary and medicinal herb. It acts principally on the digestive and nervous systems, easing flatulence, stomach cramps, colic and indigestion.',
      uses: 'Culinary herb, digestive aid, nervous system support',
      benefits: 'Eases flatulence, stomach cramps, colic, indigestion',
      growth: 'Prefers sunny location, well-watered, fertile soil',
      harvesting: 'Limited harvesting on young plants, tips and leaves on mature plants'
    },
    {
      id: 7,
      name: 'Cinnamon Seedling',
      image: nurseryImages.nursery_7,
      category: 'Spice Seedlings',
      manufacturer: 'William Omwech',
      price: 'UGX 10,700',
      packaging: '1 Piece',
      description: 'Cinnamon plant foliage is generally a glossy green to yellow-green, and they produce small flowers. Both the bark and leaves are aromatic It\'s inner bark can also be used to make the spice. Cinnamon generally has a slow to moderate growth rate and can be planted in the spring or early fall.',
      growth: 'Slow to moderate growth rate',
      planting: 'Spring or early fall',
      uses: 'Spice, essential oil, food flavoring, liqueur, perfume, drugs',
      soil: 'Rich, well-draining soil, sandy loam preferred'
    },
    {
      id: 8,
      name: 'Oregano Seedling',
      image: nurseryImages.nursery_8,
      category: 'Herb Seedlings',
      manufacturer: 'William Omwech',
      price: 'UGX 5,600',
      packaging: '1 Piece',
      description: 'Oregano is a loose, open plant with gray-green leaves and small purple or white flowers. Oregano, is a hardy rampant growing perennial. Oregano is marginally hardy perennial. Oregano is used in sauces, tomato dishes, pizza, Mexican dishes, salads and soups.',
      appearance: 'Gray-green leaves, purple or white flowers',
      growth: 'Hardy rampant growing perennial',
      uses: 'Sauces, tomato dishes, pizza, Mexican dishes, salads, soups',
      benefits: 'Rich in antioxidants, anti-bacterial, anti-cancer, anti-inflammatory'
    },
    {
      id: 9,
      name: 'Lemon Grass (Kisubi)',
      image: nurseryImages.nursery_9,
      category: 'Herb Seedlings',
      manufacturer: 'William Omwech',
      price: 'UGX 5,600',
      packaging: '1 Piece',
      description: 'Lemon grass is a perennial herb with a light lemon scent and flavor. This grass has a rich flavor of lemon citrus, can be used to brew tea as well as a herb for seasoning. Lemon grass essential oil can be used in aromatherapy, cosmetics, and as natural insecticide.',
      scent: 'Light lemon scent and flavor',
      uses: 'Tea brewing, seasoning, aromatherapy, cosmetics, natural insecticide',
      attributes: 'Continuous harvesting, container growing suitable',
      growth: 'Perennial herb'
    },
    {
      id: 10,
      name: 'Pineapple Mint Seedling',
      image: nurseryImages.nursery_10,
      category: 'Herb Seedlings',
      manufacturer: 'William Omwech',
      price: 'UGX 5,600',
      packaging: '1 Piece',
      description: 'Pineapple Mint is an herbaceous perennial plant commonly grown as a culinary herb. Like most mints, pineapple mint is a creeping plant that spreads from shallow underground rhizomes. Clumps grow 2 to 3 feet tall, and unlimited in width.',
      height: '2-3 feet tall',
      spread: 'Unlimited width via rhizomes',
      fragrance: 'Pineapple fragrance (sweet and fruity)',
      uses: 'Fruit topping, ice cream, tea, juice drinks, sachets'
    },
    {
      id: 11,
      name: 'Chocolate Mint Seedling',
      image: nurseryImages.nursery_11,
      category: 'Herb Seedlings',
      manufacturer: 'William Omwech',
      price: 'UGX 5,600',
      packaging: '1 Piece',
      description: 'Chocolate mint plants are attractive, fragrant and easy to grow. The plant grows to about 2 feet tall and easily spreads by rhizomes into an attractive ground cover. The rounded, lance-shaped leaves are a darker green than other forms of mint.',
      height: '2 feet tall',
      spread: 'Spreads by rhizomes',
      appearance: 'Darker green, rounded, lance-shaped leaves',
      uses: 'Desserts, drinks, ground cover, rain gardens'
    },
    {
      id: 12,
      name: 'Mbwazirume Banana T.C Plantlet',
      image: nurseryImages.nursery_12,
      category: 'Banana Plantlets',
      manufacturer: 'Senai Farm Supplies',
      price: 'UGX 3,600',
      packaging: '1 T.C Plantlet',
      description: 'These are laboratory bred, clean Tissue culture plantlets, free from pests and diseases. Banana type: Matooke (cooking) banana; Planting to harvest time: 12-13 months; Susceptibility to weevils: Moderate; Susceptibility to wilt: Not susceptible; Average finger size: Medium and medium long; Av. bunch size: Big; Food texture: Soft and golden.',
      plantingTime: '12-13 months to harvest',
      susceptibility: 'Moderate weevils, Not susceptible to wilt',
      fruitSize: 'Medium and medium long fingers, Big bunch',
      texture: 'Soft and golden'
    },
    {
      id: 13,
      name: 'M3 Banana Suckers',
      image: nurseryImages.nursery_13,
      category: 'Banana Suckers',
      manufacturer: 'Zedekia Isabirye',
      price: 'UGX 5,000',
      packaging: '1 Sucker',
      description: 'On a prepared land dig up pits of size of (45x45x45) cm. Leave the pits exposed for some time to enable soil pests get exposed to sunshine. Refill the pit with soil mixed with farmyard manure (10Kg). Put suckers in the middle of the pit and soil around it compacted to keep it firm. Water immediately to provide moisture to the planted sucker.',
      pitSize: '45x45x45 cm',
      manure: '10Kg farmyard manure',
      planting: 'Middle of pit, compacted soil, immediate watering',
      preparation: 'Expose pits to sunshine for pest control'
    },
    {
      id: 14,
      name: 'Atwalira Banana T.C Plantlet',
      image: nurseryImages.nursery_14,
      category: 'Banana Plantlets',
      manufacturer: 'Senai Farm Supplies',
      price: 'UGX 3,600',
      packaging: '1 T.C Plantlet',
      description: 'These are laboratory bred, clean Tissue culture plantlets, free from pests and diseases. Banana type: Matooke (cooking) banana; Planting to harvest: 13-14 months; Susceptibility to weevils: Moderate; Susceptibility to wilt: Not susceptible; Average finger size: Medium and medium long; Av bunch size: Medium; Food texture: Medium soft.',
      plantingTime: '13-14 months to harvest',
      susceptibility: 'Moderate weevils, Not susceptible to wilt',
      fruitSize: 'Medium and medium long fingers, Medium bunch',
      texture: 'Medium soft'
    },
    {
      id: 15,
      name: 'Nakatansese Banana T.C Plantlet',
      image: nurseryImages.nursery_15,
      category: 'Banana Plantlets',
      manufacturer: 'Senai Farm Supplies',
      price: 'UGX 3,600',
      packaging: '1 T.C Plantlet',
      description: 'These are laboratory bred, clean Tissue culture plantlets, free from pests and diseases. Banana type: Plantain (roasting) banana; Planting to harvest time: 14-15 months; Susceptibility to weevils: Moderate; Susceptibility to wilt: Moderate; Average finger size: Medium and medium long; Average bunch size: Large; Food texture: Soft and sweet.',
      plantingTime: '14-15 months to harvest',
      susceptibility: 'Moderate weevils and wilt',
      fruitSize: 'Medium and medium long fingers, Large bunch',
      texture: 'Soft and sweet'
    },
    {
      id: 16,
      name: 'Musakala Banana T.C Plantlet',
      image: nurseryImages.nursery_16,
      category: 'Banana Plantlets',
      manufacturer: 'Senai Farm Supplies',
      price: 'UGX 3,600',
      packaging: '1 T.C Plantlet',
      description: 'These are laboratory bred, clean Tissue culture plantlets, free from pests and diseases. Banana type: Matooke (cooking) banana; Planting to harvest time: 12-13 months; Susceptibility to weevils: Moderate; Susceptibility to wilt: Not susceptible; Average finger size: Large and long; Average bunch size: Big; Food texture: Soft.',
      plantingTime: '12-13 months to harvest',
      susceptibility: 'Moderate weevils, Not susceptible to wilt',
      fruitSize: 'Large and long fingers, Big bunch',
      texture: 'Soft'
    },
    {
      id: 17,
      name: 'Mpologoma Banana T.C Plantlet',
      image: nurseryImages.nursery_17,
      category: 'Banana Plantlets',
      manufacturer: 'Senai Farm Supplies',
      price: 'UGX 3,600',
      packaging: '1 T.C Plantlet',
      description: 'These are laboratory bred, clean Tissue culture plantlets, free from pests and diseases. Banana type: Matooke (cooking) banana; Planting to harvest time: 11-12 months; Susceptibility to weevils: Low; Susceptibility to wilt: Not susceptible; Average finger size: Medium and long; Average bunch size: Big; Food texture: Soft.',
      plantingTime: '11-12 months to harvest',
      susceptibility: 'Low weevils, Not susceptible to wilt',
      fruitSize: 'Medium and long fingers, Big bunch',
      texture: 'Soft'
    },
    {
      id: 18,
      name: 'Kisansa Banana T.C Plantlet',
      image: nurseryImages.nursery_18,
      category: 'Banana Plantlets',
      manufacturer: 'Senai Farm Supplies',
      price: 'UGX 3,600',
      packaging: '1 T.C Plantlet',
      description: 'These are laboratory bred, clean Tissue culture plantlets, free from pests and diseases. Banana type: Matooke (cooking) banana; Planting to harvest time: 12-13 months; Susceptibility to weevils: Moderate; Susceptibility to wilt: Not susceptible; Average finger size: Large and long; Average bunch size: Big; Food texture: Soft.',
      plantingTime: '12-13 months to harvest',
      susceptibility: 'Moderate weevils, Not susceptible to wilt',
      fruitSize: 'Large and long fingers, Big bunch',
      texture: 'Soft'
    },
    {
      id: 19,
      name: 'Kibuzi Banana T.C Plantlet',
      image: nurseryImages.nursery_19,
      category: 'Banana Plantlets',
      manufacturer: 'Senai Farm Supplies',
      price: 'UGX 3,600',
      packaging: '1 T.C Plantlet',
      description: 'These are laboratory bred, clean Tissue culture plantlets, free from pests and diseases. Banana type: Matooke (cooking) banana; Planting to harvest time: 12-13 months; Susceptibility to weevils: Moderate; Susceptibility to wilt: Not susceptible; Average finger size: Medium and medium long; Average bunch size: Big; Food texture: Medium soft.',
      plantingTime: '12-13 months to harvest',
      susceptibility: 'Moderate weevils, Not susceptible to wilt',
      fruitSize: 'Medium and medium long fingers, Big bunch',
      texture: 'Medium soft'
    },
    {
      id: 20,
      name: 'Aloe Vera Seedling',
      image: nurseryImages.nursery_20,
      category: 'Medicinal Plants',
      manufacturer: 'Mukama Mwesigwa Compound Designers',
      price: 'UGX 5,600',
      packaging: '1 Piece',
      description: 'Aloe vera is a succulent plant species that is stemless or very short-stemmed with thick, greenish, fleshy leaves that fan out from the plant\'s central stem. The margin of the leaf is serrated with small teeth. The useful parts of aloe are the gel and latex.',
      appearance: 'Thick, greenish, fleshy leaves with serrated margins',
      parts: 'Gel and latex are useful',
      benefits: 'Skin treatment, blood sugar regulation, commercial crop potential',
      attributes: 'Easy to grow, pest/disease tolerant, hot climate suitable'
    },
    {
      id: 21,
      name: 'Celery Seedling',
      image: nurseryImages.nursery_21,
      category: 'Vegetable Seedlings',
      manufacturer: 'Mukama Mwesigwa Compound Designers',
      price: 'UGX 3,500',
      packaging: '1 Piece',
      description: 'This is a crisp, stringless green celery with tightly folded hearts, and broad, thick, well-rounded stalks. It is a vigorous grower without getting flimsy. This is a popular green celery for late use.',
      appearance: 'Crisp, stringless, tightly folded hearts, broad thick stalks',
      growth: 'Vigorous grower, not flimsy',
      benefits: 'Negative-calorie food, rich in fiber, detoxification, vitamin A',
      uses: 'Late season use, popular green celery'
    },
    {
      id: 22,
      name: 'Strawberry Chandler Seedlings',
      image: nurseryImages.nursery_22,
      category: 'Fruit Seedlings',
      manufacturer: 'William Omwech',
      price: 'UGX 5,600',
      packaging: '1 Piece',
      description: 'Strawberries are low-growing herbaceous plants with a fibrous root system and a crown from which arise basal leaves. The leaves are compound, typically with three leaflets, sawtooth-edged, and usually hairy. The flowers, generally white, rarely reddish, are borne in small clusters on slender stalks.',
      appearance: 'Low-growing, compound leaves with three leaflets, white flowers',
      benefits: 'High in antioxidants, vitamin C, manganese, potassium, low-calorie',
      nutrients: 'Vitamins, fiber, polyphenols, sodium-free, fat-free, cholesterol-free',
      comparison: 'More vitamin C than an orange'
    },
    {
      id: 23,
      name: 'Mint Seedling',
      image: nurseryImages.nursery_23,
      category: 'Herb Seedlings',
      manufacturer: 'Mukama Mwesigwa Compound Designers',
      price: 'UGX 2,400',
      packaging: '1 Piece',
      description: 'Mint is a perennial herb with very fragrant, toothed leaves and tiny purple, pink, or white flowers. It is fragrant, whether shiny, smooth, bright green. Mints are used as garden accents, ground covers, air fresheners, and herbal medicines.',
      appearance: 'Fragrant, toothed leaves, purple/pink/white flowers, bright green',
      uses: 'Garden accents, ground covers, air fresheners, herbal medicines',
      benefits: 'Cold symptom relief, anti-allergenic, antioxidant, anti-inflammatory',
      growth: 'Easy to grow, vigorous spreader, sun and shade tolerant'
    }
  ];

  // Show detail screen if product is selected
  if (selectedProduct) {
    return (
      <NurseryDetailScreen
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

  const renderProduct = (product) => (
    <TouchableOpacity
      key={product.id}
      style={styles.productItem}
      onPress={() => setSelectedProduct(product)}
    >
      <Image 
        source={product.image} 
        style={styles.productImage} 
        resizeMode="cover"
        onError={(error) => console.log('Image load error:', error)}
      />
      <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">
        {product.name}
      </Text>
      <Text style={styles.productPrice} numberOfLines={1} ellipsizeMode="tail">
        {product.price || 'Contact for pricing'}
      </Text>
      <Text style={styles.productDescription} numberOfLines={2} ellipsizeMode="tail">
        {product.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#2c5530" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nursery Products</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Products Grid */}
      <ScrollView style={styles.productsContainer}>
        <View style={styles.productsGrid}>
          {nurseryProducts.map(renderProduct)}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c5530',
  },
  placeholder: {
    width: 34,
  },
  productsContainer: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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

export default NurseryProductsScreen;
