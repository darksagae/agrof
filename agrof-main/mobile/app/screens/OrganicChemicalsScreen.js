import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useCart } from "../contexts/CartContext";
import OrganicChemicalDetailScreen from "./OrganicChemicalDetailScreen";
import SimplePricingWidget from "../components/SimplePricingWidget";

const { width } = Dimensions.get("window");

const OrganicChemicalsScreen = ({ onBack }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [pricingWidgetVisible, setPricingWidgetVisible] = useState(false);
  const [selectedProductForPricing, setSelectedProductForPricing] =
    useState(null);
  const [imageLoadingStates, setImageLoadingStates] = useState({});

  // Helper function to check if product has multiple prices
  const hasMultiplePrices = (product) => {
    if (!product.packaging || typeof product.packaging !== "string") {
      return false;
    }
    return product.packaging.includes(",") && product.packaging.includes("UGX");
  };

  // Helper function to get unit price for display
  const getUnitPrice = (product) => {
    if (!product.packaging || typeof product.packaging !== "string") {
      return product.price || "Price not available";
    }

    const priceRanges = product.packaging.split(",").map((item) => item.trim());
    if (priceRanges.length > 0) {
      const firstPrice = priceRanges[0];
      const match = firstPrice.match(
        /(\d+(?:\.\d+)?)\s*([a-zA-Z]+):\s*UGX\s*([\d,]+)/i,
      );
      if (match) {
        const [, quantity, unit, price] = match;
        const pricePerUnit =
          parseInt(price.replace(/,/g, "")) / parseFloat(quantity);
        return `From UGX ${pricePerUnit.toFixed(0)} per ${unit}`;
      }
    }
    return product.price || "Price not available";
  };

  // Handle pricing widget
  const handlePricingPress = (product) => {
    setSelectedProductForPricing(product);
    setPricingWidgetVisible(true);
  };

  // Optimized image loading handlers
  const handleImageLoad = useCallback((productId) => {
    setImageLoadingStates((prev) => ({ ...prev, [productId]: false }));
  }, []);

  const handleImageLoadStart = useCallback((productId) => {
    setImageLoadingStates((prev) => ({ ...prev, [productId]: true }));
  }, []);

  // Import all organic chemicals images from simplified folder structure
  const organicImages = {
    organic_1: require("../assets/ORGANIC_CHEMICALS_SIMPLE/organic_1.png"),
    organic_2: require("../assets/ORGANIC_CHEMICALS_SIMPLE/organic_2.jpg"),
    organic_3: require("../assets/ORGANIC_CHEMICALS_SIMPLE/organic_3.png"),
    organic_4: require("../assets/ORGANIC_CHEMICALS_SIMPLE/organic_4.jpg"),
    organic_5: require("../assets/ORGANIC_CHEMICALS_SIMPLE/organic_5.jpeg"),
    organic_6: require("../assets/ORGANIC_CHEMICALS_SIMPLE/organic_6.png"),
    organic_7: require("../assets/ORGANIC_CHEMICALS_SIMPLE/organic_7.png"),
    organic_8: require("../assets/ORGANIC_CHEMICALS_SIMPLE/organic_8.jpeg"),
    organic_9: require("../assets/ORGANIC_CHEMICALS_SIMPLE/organic_9.png"),
    organic_10: require("../assets/ORGANIC_CHEMICALS_SIMPLE/organic_10.jpg"),
    organic_11: require("../assets/ORGANIC_CHEMICALS_SIMPLE/organic_11.jpg"),
    organic_12: require("../assets/ORGANIC_CHEMICALS_SIMPLE/organic_12.jpg"),
    organic_13: require("../assets/ORGANIC_CHEMICALS_SIMPLE/organic_13.png"),
    organic_14: require("../assets/ORGANIC_CHEMICALS_SIMPLE/organic_14.jpeg"),
  };

  const organicProducts = [
    {
      id: 1,
      name: "SG1000 - Photosynthesis Enhancer",
      image: organicImages.organic_1,
      description:
        "SG1000 enhances the process of photosynthesis. It is a formula that has been developed to enhance photosynthesis and biological functions by allowing plants to capture and utilize radiant energy more efficiently. It speeds up uptake and distribution of macro and micro nutrients required for plant growth and increased yields whilst reducing input costs.",
      price: "UGX 53,000",
      manufacturer: "Vermipro Limited",
      activeIngredient:
        "Biostimulants are made up of a variety of biological substances, micro-organisms, and compounds",
      category: "Photosynthesis Enhancer",
      applicationRate:
        "For Crops and Vegetables apply 1L of SG1000 in 200L to water (100ml in 20L). Spray on the soil in the morning. Spray 200L per acre",
      keyBenefits: [
        "Decomposes toxic matters like the organic materials",
        "hydrogen Sulfide, Nitrous acid and Ammonia",
        "Removes soil toxicity",
      ],
      crops: ["Crops", "Vegetables"],
      usageInstructions:
        "For Crops and Vegetables apply 1L of SG1000 in 200L to water (100ml in 20L). Spray on the soil in the morning. Spray 200L per acre",
      packaging: "1 Ltr: UGX 53,000, 3 Ltr: UGX 180,800",
    },
    {
      id: 2,
      name: "Oscars Oligo (Organic EC Fertilizer)",
      image: organicImages.organic_2,
      description:
        "Prevents occurrence of defects in fruits and vegetables such as colour, shape, taste, by balancing nutrient uptake by the plants.",
      price: "UGX 64,800",
      manufacturer: "Trax Holdings Ltd",
      activeIngredient: "Organic EC fertilizer with essential micronutrients",
      category: "Organic Fertilizer",
      applicationRate: "As per label instructions",
      keyBenefits: [
        "Prevents defects in fruits and vegetables",
        "Balances nutrient uptake",
        "Improves color, shape, and taste",
      ],
      crops: ["Fruits", "Vegetables"],
      usageInstructions:
        "Apply as per label instructions for balanced nutrient uptake",
      packaging: "1 Kg: UGX 64,800",
      availability: "Out of stock",
    },
    {
      id: 3,
      name: "Vermicompost 100",
      image: organicImages.organic_3,
      description:
        "Vermicompost 100 contain higher percentage of both macro and micronutrients than the garden compost. Apart from other nutrients, a fine worm cast is rich in NPK which are in readily available form. Vermicompost enhances plant growth, suppresses disease in plants, increases porosity and microbial activity in soil, and improves water retention and aeration.",
      price: "UGX 27,500",
      manufacturer: "Vermipro Limited",
      activeIngredient:
        "Earthworm castings, organic matter, natural enzymes and hormones",
      category: "Organic Fertilizer",
      applicationRate:
        "Mix vermicompost100 in a ratio of 1:4 to soil. Top dress in potted plants, gardens or lawns. In general gardening, apply 1000kg/ha. In horticulture, apply 50-100g per plant. In tree plantations like coffee, apply 250-500g per plant per season",
      keyBenefits: [
        "Soil Conditioner",
        "Nutrient Retention of Soil",
        "Pest Resistant",
        "Better Aeration",
        "Water Retention",
        "Healthier Plants",
        "Root Penetration",
        "100% Organic",
      ],
      crops: [
        "General gardening",
        "Horticulture",
        "Tree plantations",
        "Coffee",
      ],
      usageInstructions:
        "Mix vermicompost100 in a ratio of 1:4 to soil. Top dress in potted plants, gardens or lawns",
      packaging: "5 Kg: UGX 27,500, 10 Kg: UGX 53,000",
    },
    {
      id: 4,
      name: "Oscars Primo (Organic Fertilizer)",
      image: organicImages.organic_4,
      description:
        "OSCARS PRIMO, is very effective and increase efficiency of all nutrients during spraying. It causes the leaves to release high life energy and the process rise up chlorophyll quantity and accelerates photosynthesis. The plant fixes all the nutrients itself by increasing resistance against diseases. Its effective in flowering, sprouting of new shoots, and fruiting.",
      price: "UGX 90,700",
      manufacturer: "Trax Holdings Ltd",
      activeIngredient: "Organic fertilizer components",
      category: "Organic Fertilizer",
      applicationRate: "As per label instructions",
      keyBenefits: [
        "Increases nutrient efficiency",
        "Releases high life energy",
        "Increases chlorophyll quantity",
        "Accelerates photosynthesis",
        "Increases disease resistance",
        "Effective in flowering and fruiting",
      ],
      crops: ["Various crops"],
      usageInstructions:
        "Apply as per label instructions for enhanced nutrient efficiency",
      packaging: "1 Kg: UGX 90,700",
      availability: "Out of stock",
    },
    {
      id: 5,
      name: "Superagric Soil & Vegetable",
      image: organicImages.organic_5,
      description:
        "The combination of microbes in Super Agric, have a reviving action on an ecosystem and are completely safe to use. In the soil Super Agric will function by increasing the beneficial microbes which will improve soil health and function. Super Agric will also improve fertiliser effectiveness by reducing leaching and improving plant availability leading to increased performance in your farming system, and improves seeds germination.",
      price: "UGX 37,800",
      manufacturer: "Vermipro Limited",
      activeIngredient: "Beneficial Microorganisms and Organic Preservatives",
      category: "Soil Amendment",
      applicationRate:
        "Dilute 1L to 50L of non-chlorine water. Apply 150 - 250L per acre during growth stages. Irrigation system. Rates of 250L per acre are recommended",
      keyBenefits: [
        "Converting organic matter to plant nutrients",
        "Fixing atmospheric nitrogen",
        "Decomposing organic residues",
        "Recycling soil nutrients",
      ],
      crops: ["Soil", "Vegetables"],
      usageInstructions:
        "Dilute 1L to 50L of non-chlorine water. Apply 150 - 250L per acre during growth stages",
      packaging: "1 Ltr: UGX 37,800, 5 Ltr: UGX 180,800",
    },
    {
      id: 6,
      name: "Seek Bamboo Biochar Fertilizer",
      image: organicImages.organic_6,
      description:
        "Product that gives excellent plant growth, rebuilds soil and offers higher production yields. It is made from Bamboo products, food grade organic matter, beneficial micro-organisms and amino acids of vegetable origin.",
      price: "UGX 90,000",
      manufacturer: "Bukoola Chemical Industries (U) Ltd",
      activeIngredient:
        "Bamboo products, food grade organic matter, beneficial micro-organisms and amino acids of vegetable origin",
      category: "Biochar Fertilizer",
      applicationRate:
        "Vegetables: 80-100kgs per acre, Fruits: 0.5-1kg per tree, Horticulture: 5-10kgs mixed with 100 kg substrate, Field crops: 100-120kgs per acre",
      keyBenefits: [
        "Excellent plant growth",
        "Rebuilds soil",
        "Higher production yields",
        "Made from sustainable bamboo",
      ],
      crops: ["Vegetables", "Fruits", "Horticulture", "Field crops"],
      usageInstructions:
        "Put into furrows or holes or broadcast and then cover with soil timely",
      packaging: "25kgs: UGX 90,000",
    },
    {
      id: 7,
      name: "Solum2soil (Vermicompost)",
      image: organicImages.organic_7,
      description:
        "Solum2Soil is 100% solid organic vermicompost and it is produced as a bottom fertilizer with intent to feed the soil and increase biological variability in the soil. As required, plants should be enabled to receive their feed elements from the soil and this event is directly connected to the structure of the soil, where they are grown, amount of the organic substances, pH, being free from stress, disease and pests that will create obstacle for growing of them.",
      price: "UGX 75,000",
      manufacturer: "Trax Holdings Ltd",
      activeIngredient: "100% solid organic vermicompost",
      category: "Vermicompost",
      applicationRate: "As per label instructions",
      keyBenefits: [
        "100% solid organic vermicompost",
        "Increases biological variability in soil",
        "Improves soil structure",
        "Sustainable agriculture",
        "Increases productivity",
      ],
      crops: ["Various crops"],
      usageInstructions: "Apply as per label instructions for soil enrichment",
      packaging: "bag: UGX 75,000",
    },
    {
      id: 8,
      name: "Superagric Germination Booster",
      image: organicImages.organic_8,
      description:
        "Super germination booster is a natural safe technology with many applications around farm, orchard, and vineyard environments. The organic product, superagric germination booster works by getting the natural processes to function, the way nature intended.",
      price: "UGX 17,000",
      manufacturer: "Vermipro Limited",
      activeIngredient: "Beneficial micro-organisms",
      category: "Germination Booster",
      applicationRate:
        "Soak seeds in a solution at rate of 1:20 litres. Small seeds: 20-30 mins, Medium seeds: 30-60 mins, Large seeds: 2-3 Hrs",
      keyBenefits: [
        "Improves seed viability, germination",
        "Enhances plant growth",
        "Natural safe technology",
      ],
      crops: ["Farm crops", "Orchard", "Vineyard"],
      usageInstructions:
        "Soak seeds in a solution at rate of 1:20 litres. Spread them in a shade to dry, then plant",
      packaging: "250 ml: UGX 17,000, 1 Ltr: UGX 37,800",
    },
    {
      id: 9,
      name: "Organic Fungicide",
      image: organicImages.organic_9,
      description:
        "A fungicide for the control of powdery mildew and other diseases on terrestrial and indoor ornamental plants, greenhouse and garden crops, and turf.",
      price: "UGX 12,500",
      manufacturer: "Vermipro Limited",
      activeIngredient:
        "Potassium Bicarbonate 35.00% + Other Ingredients 65.00%",
      category: "Organic Fungicide",
      applicationRate:
        "Mature Plantation: Mix 3.5kg of fungicide into 300L of water (25 tablespoons in 20L). Apply 100L per acre. Vegetables/Nurseries: Mix 1kg of fungicide into 200L of water (5 tablespoons in 20L). Apply 100L per acre",
      keyBenefits: [
        "Controls powdery mildew",
        "Controls other fungal diseases",
        "Safe for organic use",
        "Suitable for various crops",
      ],
      crops: [
        "Terrestrial plants",
        "Indoor ornamental plants",
        "Greenhouse crops",
        "Garden crops",
        "Turf",
      ],
      usageInstructions:
        "Start application at first sign of disease. For best protection, repeat at one to two week intervals until conditions are no longer favourable for disease development",
      packaging: "700 g: UGX 12,500, 3.5 Kg: UGX 55,800",
    },
    {
      id: 10,
      name: "Humate - Pure Organic Fertilizer",
      image: organicImages.organic_10,
      description:
        "Humate is the purest form of organic matter that has completely decayed and offers a great range of benefits to rejuvenate a soil and significantly allow for optimum output from agricultural soils.",
      price: "UGX 12,000",
      manufacturer: "Bukoola Chemical Industries (U) Ltd",
      activeIngredient: "Pure organic matter (humate)",
      category: "Organic Fertilizer",
      applicationRate:
        "During dry season: Mix 1kg per 20ltrs of water and apply on the soil and allow ground to drain. During wet season: Mix 3 table spoons of Humate and apply directly to the root zone of the plant",
      keyBenefits: [
        "Builds a stronger root system by increasing root respiration and root formation",
        "Facilitates nutrient absorption and lessens soil salinity",
        "Great source of energy for beneficial soil organisms",
        "Improves aeration of soil and water retention",
        "Prevents water and nutrient losses",
        "Healthier roots hold soil, minimizing erosions",
      ],
      crops: ["Agricultural soils"],
      usageInstructions:
        "During dry season: Mix 1kg per 20ltrs of water and apply on the soil. During wet season: Mix 3 table spoons and apply directly to the root zone",
      packaging: "1 Kg: UGX 12,000",
    },
    {
      id: 11,
      name: "Fertiplus 4-3-3-65 (Organic Matter)",
      image: organicImages.organic_11,
      description:
        "Fertiplus Organic Fertilizer 4-3-3-65 OM is a well-known 100% Organic Fertilizer pellet, ecologic/ environmentally friendly and hygienic. The organic material in this excellent, natural plant Fertilizer contains mostly humic acid structures which benefit soils in facilitating its nutrient availability, they release gradually the minerals present in the ground and therefore, minerals become more available for absorption by the roots of plants.",
      price: "UGX 79,875",
      manufacturer: "Fertiplus Organic Ltd",
      activeIngredient:
        "Dry Matter 88% min; Moisture 12% max; Organic Matter 65%; Nitrogen (Total) 4.2%; Phosphorus 3.0%; Potassium 2.8%; Calcium 9%; Magnesium 1%; Sulphur 1.5% + Trace elements",
      category: "Organic Fertilizer",
      applicationRate: "As per label instructions",
      keyBenefits: [
        "100% Organic Fertilizer pellet",
        "Ecologic and environmentally friendly",
        "Contains humic acid structures",
        "Facilitates nutrient availability",
        "Gradual mineral release",
        "Improves microbiological activity of soil",
      ],
      crops: ["Various crops"],
      usageInstructions:
        "Apply as per label instructions for organic fertilization",
      packaging: "25kgs: UGX 79,875",
    },
    {
      id: 12,
      name: "ORB-L - Organic Rooting Booster",
      image: organicImages.organic_12,
      description:
        "ORB-L is a Hormonal Rooting for Plant Cuttings, Organic Natural Plant Hormone that Stimulates & Speeds Root Development on Cuttings. Promotes Strong Healthy Roots",
      price: "UGX 27,500",
      manufacturer: "Vermipro Limited",
      activeIngredient:
        "Fructose, glucose, fructo-oligosaccharides, amino acids, vitamins, minerals and enzymes, cinnamaldehyde and trans-cinnamaldehyde",
      category: "Rooting Booster",
      applicationRate:
        "Dip cutting in ORB-L to a desired depth. Insert cutting into rooting medium. Mist cuttings and place in a propagator or a warm, clean moist and humid environment",
      keyBenefits: [
        "For plant propagation & plant cutting",
        "For promoting root development",
        "For softwood, semi ripe, & hardwood cuttings",
        "Allows for greater success rates in plant propagation",
        "Stimulates roots development",
        "Improve chances of cuttings survival",
        "Faster root establishment for more healthy and vigorous plant",
      ],
      crops: [
        "Plant cuttings",
        "Softwood cuttings",
        "Semi ripe cuttings",
        "Hardwood cuttings",
      ],
      usageInstructions:
        "Dip cutting in ORB-L to a desired depth. Insert cutting into rooting medium. Mist cuttings and place in a propagator",
      packaging: "250 mls: UGX 27,500, 500 mls: UGX 53,000",
    },
    {
      id: 13,
      name: "Vermichar - Organic Soil Supplement",
      image: organicImages.organic_13,
      description:
        "Vermichar is used as a sustainable approach for improving plant Growth and soil properties. Vermichar application to the soil is a practical method to increase crop yield and enhance pesticide degradation.",
      price: "UGX 22,500",
      manufacturer: "Vermipro Limited",
      activeIngredient:
        "Activated carbon, Enzymes and beneficial micro-organisms",
      category: "Soil Supplement",
      applicationRate:
        "In general gardening, Incorporate 1-5kg/m2 into the soil to a depth of 10cm before planting. In horticulture, incorporate 10% volume into soil before planting. In tree plantations like coffee, put into furrows or holes, or broadcast, and then cover with soil timely",
      keyBenefits: [
        "Enhances plant growth",
        "Habitat for microbes",
        "Retains moisture",
        "Holds nutrients",
        "Revolutionary soil improvement",
      ],
      crops: [
        "General gardening",
        "Horticulture",
        "Tree plantations",
        "Coffee",
      ],
      usageInstructions:
        "Incorporate 1-5kg/m2 into the soil to a depth of 10cm before planting",
      packaging: "5 Kg: UGX 22,500, 10 Kg: UGX 42,800",
    },
    {
      id: 14,
      name: "Calphos - Fruit & Flower Development",
      image: organicImages.organic_14,
      description:
        "Calphos is a nutrient solution for plants just entering the flowering cycle. In natural farming, apply Calphos before the flower initiation to reduce flower abortion and support the eventual fruit. Calcium is used to strengthen the plant in preparation for heavy flowers/fruits.",
      price: "UGX 16,000",
      manufacturer: "Vermipro Limited",
      activeIngredient: "Natural source of calcium and phosphorous",
      category: "Fruit & Flower Development",
      applicationRate:
        "Apply 200ml of Calphos diluted in 20L of water for fruits and vegetables before flowering. Apply 100L for 1 Acre",
      keyBenefits: [
        "Reduces flower abortion",
        "Improves fruit development",
        "Improves fruit ripening and quality",
      ],
      crops: ["Fruits", "Vegetables"],
      usageInstructions:
        "Apply 200ml of Calphos diluted in 20L of water for fruits and vegetables before flowering",
      packaging: "250 ml: UGX 16,000, 1 Ltr: UGX 53,000",
    },
  ];

  console.log(
    "🧪 OrganicChemicalsScreen: Rendering with",
    organicProducts.length,
    "products",
  );

  // Optimized product rendering with memoization
  const renderProduct = useCallback(
    ({ item: product }) => (
      <TouchableOpacity
        style={styles.productItem}
        onPress={() => {
          console.log("🧪 Product selected:", product.name);
          setSelectedProduct(product);
        }}
      >
        {imageLoadingStates[product.id] && (
          <View style={styles.imageLoader}>
            <ActivityIndicator size="small" color="#2c5530" />
          </View>
        )}
        <Image
          source={product.image}
          style={styles.productImage}
          resizeMode="cover"
          onLoadStart={() => handleImageLoadStart(product.id)}
          onLoad={() => handleImageLoad(product.id)}
          onError={(error) => {
            console.log(
              "❌ Image load error for product",
              product.id,
              ":",
              error,
            );
            handleImageLoad(product.id);
          }}
        />

        <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">
          {product.name}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {hasMultiplePrices(product) ? getUnitPrice(product) : product.price}
          </Text>
          {product.availability === "Out of stock" && (
            <Text style={styles.outOfStock}>Out of Stock</Text>
          )}
        </View>

        <Text style={styles.manufacturer}>by {product.manufacturer}</Text>
      </TouchableOpacity>
    ),
    [
      imageLoadingStates,
      handleImageLoad,
      handleImageLoadStart,
      hasMultiplePrices,
      getUnitPrice,
    ],
  );

  // Show detail screen if product is selected
  if (selectedProduct) {
    return (
      <OrganicChemicalDetailScreen
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
        onViewPackages={handlePricingPress}
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
          <Text style={styles.headerTitle}>Organic Chemicals</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Sustainable organic solutions for healthy farming
        </Text>
      </View>

      {/* Products Grid - Optimized FlatList */}
      <FlatList
        data={organicProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        style={styles.productsContainer}
        showsVerticalScrollIndicator={false}
        initialNumToRender={8}
        maxToRenderPerBatch={6}
        windowSize={10}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={50}
        getItemLayout={(data, index) => ({
          length: 320,
          offset: 320 * Math.floor(index / 2),
          index,
        })}
      />

      {/* Pricing Widget */}
      {selectedProductForPricing && (
        <SimplePricingWidget
          visible={pricingWidgetVisible}
          onClose={() => setPricingWidgetVisible(false)}
          product={selectedProductForPricing}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#2c5530",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 50,
    zIndex: 1,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  productsContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: "transparent",
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productItem: {
    width: "48%",
    marginBottom: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  productImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2c5530",
    marginBottom: 5,
    marginTop: 8,
    textAlign: "center",
  },
  priceContainer: {
    alignItems: "center",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e74c3c",
    textAlign: "center",
  },
  outOfStock: {
    fontSize: 12,
    color: "#e74c3c",
    fontWeight: "bold",
    marginTop: 2,
  },
  manufacturer: {
    fontSize: 12,
    color: "#7f8c8d",
    textAlign: "center",
    fontStyle: "italic",
  },
  imageLoader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -10 }, { translateY: -10 }],
    zIndex: 1,
  },
});

export default OrganicChemicalsScreen;
