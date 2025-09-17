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
import HerbicideDetailScreen from "./HerbicideDetailScreen";
import SimplePricingWidget from "../components/SimplePricingWidget";

const { width } = Dimensions.get("window");

const HerbicidesScreen = ({ onBack }) => {
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

  // Import all herbicide images from simplified folder structure
  const herbicideImages = {
    herbicide_1: require("../assets/HERBICIDES_SIMPLE/herbicide_1.jpg"),
    herbicide_2: require("../assets/HERBICIDES_SIMPLE/herbicide_2.jpg"),
    herbicide_3: require("../assets/HERBICIDES_SIMPLE/herbicide_3.jpg"),
    herbicide_4: require("../assets/HERBICIDES_SIMPLE/herbicide_4.png"),
    herbicide_5: require("../assets/HERBICIDES_SIMPLE/herbicide_5.jpg"),
    herbicide_6: require("../assets/HERBICIDES_SIMPLE/herbicide_6.jpg"),
    herbicide_7: require("../assets/HERBICIDES_SIMPLE/herbicide_7.png"),
    herbicide_8: require("../assets/HERBICIDES_SIMPLE/herbicide_8.png"),
    herbicide_9: require("../assets/HERBICIDES_SIMPLE/herbicide_9.png"),
    herbicide_10: require("../assets/HERBICIDES_SIMPLE/herbicide_10.jpg"),
    herbicide_11: require("../assets/HERBICIDES_SIMPLE/herbicide_11.png"),
    herbicide_12: require("../assets/HERBICIDES_SIMPLE/herbicide_12.jpg"),
    herbicide_13: require("../assets/HERBICIDES_SIMPLE/herbicide_13.jpg"),
    herbicide_14: require("../assets/HERBICIDES_SIMPLE/herbicide_14.jpg"),
    herbicide_15: require("../assets/HERBICIDES_SIMPLE/herbicide_15.png"),
    herbicide_16: require("../assets/HERBICIDES_SIMPLE/herbicide_16.png"),
    herbicide_17: require("../assets/HERBICIDES_SIMPLE/herbicide_17.jpg"),
    herbicide_18: require("../assets/HERBICIDES_SIMPLE/herbicide_18.jpg"),
    herbicide_19: require("../assets/HERBICIDES_SIMPLE/herbicide_19.png"),
    herbicide_20: require("../assets/HERBICIDES_SIMPLE/herbicide_20.png"),
    herbicide_21: require("../assets/HERBICIDES_SIMPLE/herbicide_21.jpg"),
    herbicide_22: require("../assets/HERBICIDES_SIMPLE/herbicide_22.jpg"),
    herbicide_23: require("../assets/HERBICIDES_SIMPLE/herbicide_23.jpg"),
    herbicide_24: require("../assets/HERBICIDES_SIMPLE/herbicide_24.jpg"),
    herbicide_25: require("../assets/HERBICIDES_SIMPLE/herbicide_25.jpg"),
    herbicide_26: require("../assets/HERBICIDES_SIMPLE/herbicide_26.jpg"),
    herbicide_27: require("../assets/HERBICIDES_SIMPLE/herbicide_27.png"),
    herbicide_28: require("../assets/HERBICIDES_SIMPLE/herbicide_28.png"),
    herbicide_29: require("../assets/HERBICIDES_SIMPLE/herbicide_29.jpg"),
    herbicide_30: require("../assets/HERBICIDES_SIMPLE/herbicide_30.jpg"),
    herbicide_31: require("../assets/HERBICIDES_SIMPLE/herbicide_31.png"),
    herbicide_32: require("../assets/HERBICIDES_SIMPLE/herbicide_32.png"),
    herbicide_33: require("../assets/HERBICIDES_SIMPLE/herbicide_33.jpg"),
    herbicide_34: require("../assets/HERBICIDES_SIMPLE/herbicide_34.png"),
    herbicide_35: require("../assets/HERBICIDES_SIMPLE/herbicide_35.png"),
    herbicide_36: require("../assets/HERBICIDES_SIMPLE/herbicide_36.png"),
    herbicide_37: require("../assets/HERBICIDES_SIMPLE/herbicide_37.jpg"),
    herbicide_38: require("../assets/HERBICIDES_SIMPLE/herbicide_38.jpg"),
    herbicide_39: require("../assets/HERBICIDES_SIMPLE/herbicide_39.jpg"),
    herbicide_40: require("../assets/HERBICIDES_SIMPLE/herbicide_40.png"),
    herbicide_41: require("../assets/HERBICIDES_SIMPLE/herbicide_41.png"),
    herbicide_42: require("../assets/HERBICIDES_SIMPLE/herbicide_42.png"),
    herbicide_43: require("../assets/HERBICIDES_SIMPLE/herbicide_43.jpg"),
    herbicide_44: require("../assets/HERBICIDES_SIMPLE/herbicide_44.jpg"),
    herbicide_45: require("../assets/HERBICIDES_SIMPLE/herbicide_45.jpg"),
    herbicide_46: require("../assets/HERBICIDES_SIMPLE/herbicide_46.png"),
    herbicide_47: require("../assets/HERBICIDES_SIMPLE/herbicide_47.jpg"),
    herbicide_48: require("../assets/HERBICIDES_SIMPLE/herbicide_48.jpg"),
    herbicide_49: require("../assets/HERBICIDES_SIMPLE/herbicide_49.jpg"),
    herbicide_50: require("../assets/HERBICIDES_SIMPLE/herbicide_50.jpg"),
    herbicide_51: require("../assets/HERBICIDES_SIMPLE/herbicide_51.jpg"),
    herbicide_52: require("../assets/HERBICIDES_SIMPLE/herbicide_52.jpg"),
    herbicide_53: require("../assets/HERBICIDES_SIMPLE/herbicide_53.png"),
    herbicide_54: require("../assets/HERBICIDES_SIMPLE/herbicide_54.png"),
  };

  const herbicideProducts = [
    {
      id: 1,
      name: "Auxo EC – Selective Herbicide For Weed Control In Maize",
      image: herbicideImages.herbicide_1,
      description:
        "Auxo EC is a post-emergence herbicide for control of Grasses & Broadleaf weeds in Maize varieties grown in mid and high altitudes only.",
      price: "UGX 126,500",
      manufacturer: "Uganda Crop Care Limited",
      activeIngredient: "Tembotrione 50g/l + Bromoxynil Octanoate 262g/l",
      category: "Selective Herbicide",
      applicationRate:
        "Post-emergence application for maize varieties in mid and high altitudes",
      keyBenefits: [
        "Controls grasses and broadleaf weeds",
        "Selective for maize",
        "Suitable for mid and high altitudes",
      ],
      crops: ["Maize"],
      usageInstructions:
        "Apply post-emergence to maize varieties grown in mid and high altitudes only",
      packaging: "5ltrs: UGX 605,600, 1ltr: UGX 126,500",
      formulation: "Emulsifiable concentrate",
    },
    {
      id: 2,
      name: "Stomp 455 CS – Pre-emergent Herbicide",
      image: herbicideImages.herbicide_2,
      description:
        "Stomp 455 CS is a pre-emergent herbicide for the control of Setaria spp. in barley, annual grasses and some broad leaf weeds in wheat, sugarcane and maize.",
      price: "UGX 523,700",
      manufacturer: "Uganda Crop Care Limited",
      activeIngredient: "Pendimethalin 455 g/l",
      category: "Pre-emergent Herbicide",
      applicationRate:
        "Barley, wheat, maize: 3.0ltrs/ha or 300 ml in 20ltrs of water. Sugarcane: 3.5ltrs/ha or 350 ml in 20ltrs of water",
      keyBenefits: [
        "Controls Setaria spp in barley",
        "Controls annual grasses and broad leaf weeds",
        "Meristematic inhibitor",
        "Capsulated formulation",
      ],
      crops: ["Barley", "Wheat", "Sugarcane", "Maize"],
      usageInstructions:
        "Half fill the spray tank with clean water and start agitation. Shake the product before opening and measure the required amount",
      packaging: "10 Ltr: UGX 523,700",
      formulation: "Capsulated Suspension",
      modeOfAction:
        "Meristematic inhibitor that interferes with cellular division or mitosis",
      reEntryPeriod: "24 Hour, unless wearing protective clothing",
      preHarvestInterval: "90 days",
    },
    {
      id: 3,
      name: "Fusilade Forte 150 EC- Post Emergence Herbicide For Use In Snow Peas And French Beans",
      image: herbicideImages.herbicide_3,
      description:
        "Fusilade Forte is a superior post emergence grass weed herbicide which is used in fruits and vegetables. Fusilade Forte is applied when weeds are between 2- 8 leaf stage.",
      price: "UGX 153,600",
      manufacturer: "Uganda Crop Care Limited",
      activeIngredient: "Fluazifop-p-butyl 150 g/l",
      category: "Post Emergence Herbicide",
      applicationRate:
        "Apply at a recommended rate of 150ml/20L of water, 1.5l/Ha or 600ml per Acre",
      keyBenefits: [
        "Optimal penetration hence giving immediate kill of all grass weeds",
        "Economical - gives all season grass weed control",
        "Eliminates competition hence higher yields",
      ],
      crops: ["Snow Peas", "French Beans", "Fruits", "Vegetables"],
      usageInstructions:
        "Apply when weeds are between 2-8 leaf stage for best results",
      packaging: "1ltr: UGX 153,600",
      formulation: "Emulsifiable Concentrate (EC)",
      whoClassification: "III",
      modeOfAction:
        "Systemic herbicide which moves from treated foliage into shoots, roots, rhizomes, stolons, and growing points",
      registrationNumber: "UgC/2018/001804/He/RRRRR",
    },
    {
      id: 4,
      name: "Basagran 480 SL – Herbicide For Weed Control In Dry Beans, Maize And Potato",
      image: herbicideImages.herbicide_4,
      description:
        "Basagran 480 SL is a post-emergence Herbicide for the control of Broad leaf weeds in dry beans, maize and potato.",
      price: "UGX 305,200",
      manufacturer: "Uganda Crop Care Limited",
      activeIngredient: "Bentazone 480 g/l",
      category: "Post Emergence Herbicide",
      applicationRate:
        "Beans: 1.5-3.0 L/ha (150-300 ml/ 20ltrs of water), Maize: 2.0-3.0 L/ha (200-300 ml/20ltrs of water), Potatoes: 1.75 - 3.0 l/ha (175-300 ml/20L of water)",
      keyBenefits: [
        "Controls broad leaf weeds",
        "Suitable for multiple crops",
        "Post-emergence application",
      ],
      crops: ["Dry Beans", "Maize", "Potato"],
      usageInstructions:
        "Apply post-emergence when weeds have already emerged. After treatment no rain should fall for six hours",
      packaging: "5 Ltr: UGX 305,200",
      formulation: "Suspension Liquid",
      whoClassification: "Class II: Moderately Hazardous",
      modeOfAction:
        "Taken up through the green parts of the plant. The leaves and stems must be adequately wetted with the spray solution",
    },
    {
      id: 5,
      name: "Dualgold 960 EC - Herbicide For Control Of Annual Grass Weeds In Maize",
      image: herbicideImages.herbicide_5,
      description:
        "Dual Gold 960 EC is a pre-emergence herbicide for the control of annual grass weeds in beans, maize and sugarcane.",
      price: "UGX 392,300",
      manufacturer: "Uganda Crop Care Limited",
      activeIngredient: "960g/L S-metolachlor",
      category: "Pre-emergence Herbicide",
      applicationRate:
        "Maize: 0.6-1.6 lt./ha. Use the higher rates in heavier soil or with heavy weed infestation. Knapsack rate: Use 160 ml per 20 litres of water",
      keyBenefits: [
        "Controls annual grass weeds",
        "Pre-emergence application",
        "Suitable for multiple crops",
      ],
      crops: ["Beans", "Maize", "Sugarcane"],
      usageInstructions:
        "Apply pre-emergence or pre-plant incorporation. Shake well before use. Apply shortly before rain or irrigation",
      packaging: "5 Ltrs: UGX 392,300",
      formulation: "Emulsifiable concentrate (EC)",
      whoClassification: "III",
      modeOfAction:
        "Mainly taken up through the shoots of germinating plants and seedlings",
    },
    // Additional products will be added here - truncated for brevity
    {
      id: 6,
      name: "Sicometryn 500 SC - Pre And Post-emergence Herbicide For The Control Of Most Annual Grasses And Broad Leaved",
      image: herbicideImages.herbicide_6,
      description:
        "Sicometryn 500 SC is a pre and post-emergence herbicide for the control of most annual grasses and broad leaved weeds in Pineapples, Sugarcane, banana, cotton, maize and non-crop land.",
      price: "UGX 14,800",
      manufacturer: "Syova Seed (U) Ltd",
      activeIngredient: "Ametryn 500g/ltr",
      category: "Pre and Post-emergence Herbicide",
      applicationRate:
        "Rate of use: 3-3.5ltrs/Ha in 300-500ltrs of water (1-1.5ltrs/acre in 120-200ltrs of water)",
      keyBenefits: [
        "Controls annual grasses and broad leaved weeds",
        "Pre and post-emergence application",
        "Suitable for multiple crops",
      ],
      crops: [
        "Pineapples",
        "Sugarcane",
        "Banana",
        "Cotton",
        "Maize",
        "Non-crop land",
      ],
      usageInstructions:
        "Apply at recommended rates for pre and post-emergence weed control",
      packaging: "500 mls: UGX 14,800, 1 Ltr: UGX 41,800",
    },
    {
      id: 7,
      name: "Megazine (Atrazine) 500 SC",
      image: herbicideImages.herbicide_7,
      description:
        "A suspension concentrated herbicide for the control of annual broadleaf weeds and grasses in maize sorghum and sugarcane",
      price: "UGX 25,500",
      manufacturer: "Nsanja Agrochemicals Ltd",
      activeIngredient: "Atrazine 500g/L",
      category: "Suspension Concentrate Herbicide",
      applicationRate:
        "Maize and Sorghum: Use 200ml/20 Ltr water (2.5-5 Ltr/Ha). Sugarcane: Use 200ml/20Ltr water (2.5 Ltr/Ha)",
      keyBenefits: [
        "Controls annual broadleaf weeds and grasses",
        "Suitable for multiple crops",
        "Suspension concentrate formulation",
      ],
      crops: ["Maize", "Sorghum", "Sugarcane"],
      usageInstructions:
        "Spray on actively growing broad-leaved weeds when not taller than 10cm. Don't apply under wet conditions",
      packaging: "1 Ltr: UGX 25,500",
    },
  ];

  console.log(
    "🌿 HerbicidesScreen: Rendering with",
    herbicideProducts.length,
    "products",
  );

  // Optimized product rendering with memoization
  const renderProduct = useCallback(
    ({ item: product }) => (
      <TouchableOpacity
        style={styles.productItem}
        onPress={() => {
          console.log("🌿 Product selected:", product.name);
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
      <HerbicideDetailScreen
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
          <Text style={styles.headerTitle}>Herbicide Products</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Complete range of agricultural herbicides
        </Text>
      </View>

      {/* Products Grid - Optimized FlatList */}
      <FlatList
        data={herbicideProducts}
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
          length: 280,
          offset: 280 * Math.floor(index / 2),
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

export default HerbicidesScreen;
