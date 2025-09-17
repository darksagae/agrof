import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const NurseryBedScreen = ({ onBack }) => {
  const [imageLoadingStates, setImageLoadingStates] = useState({});

  // Optimized image loading handlers
  const handleImageLoad = useCallback((productId) => {
    setImageLoadingStates((prev) => ({ ...prev, [productId]: false }));
  }, []);

  const handleImageLoadStart = useCallback((productId) => {
    setImageLoadingStates((prev) => ({ ...prev, [productId]: true }));
  }, []);

  // Import all nursery bed images from simplified folder structure
  const nurseryImages = {
    nursery_1: require("../assets/NURSERY_BED_SIMPLE/nursery_1.jpg"),
    nursery_2: require("../assets/NURSERY_BED_SIMPLE/nursery_2.jpg"),
    nursery_3: require("../assets/NURSERY_BED_SIMPLE/nursery_3.jpg"),
    nursery_4: require("../assets/NURSERY_BED_SIMPLE/nursery_4.jpg"),
    nursery_5: require("../assets/NURSERY_BED_SIMPLE/nursery_5.jpg"),
    nursery_6: require("../assets/NURSERY_BED_SIMPLE/nursery_6.jpg"),
    nursery_7: require("../assets/NURSERY_BED_SIMPLE/nursery_7.jpg"),
    nursery_8: require("../assets/NURSERY_BED_SIMPLE/nursery_8.jpg"),
    nursery_9: require("../assets/NURSERY_BED_SIMPLE/nursery_9.jpg"),
    nursery_10: require("../assets/NURSERY_BED_SIMPLE/nursery_10.jpg"),
    nursery_11: require("../assets/NURSERY_BED_SIMPLE/nursery_11.jpg"),
    nursery_12: require("../assets/NURSERY_BED_SIMPLE/nursery_12.jpg"),
    nursery_13: require("../assets/NURSERY_BED_SIMPLE/nursery_13.jpg"),
    nursery_14: require("../assets/NURSERY_BED_SIMPLE/nursery_14.jpg"),
    nursery_15: require("../assets/NURSERY_BED_SIMPLE/nursery_15.jpg"),
    nursery_16: require("../assets/NURSERY_BED_SIMPLE/nursery_16.jpg"),
    nursery_17: require("../assets/NURSERY_BED_SIMPLE/nursery_17.jpg"),
    nursery_18: require("../assets/NURSERY_BED_SIMPLE/nursery_18.jpg"),
    nursery_19: require("../assets/NURSERY_BED_SIMPLE/nursery_19.jpg"),
    nursery_20: require("../assets/NURSERY_BED_SIMPLE/nursery_20.jpg"),
    nursery_21: require("../assets/NURSERY_BED_SIMPLE/nursery_21.jpg"),
    nursery_22: require("../assets/NURSERY_BED_SIMPLE/nursery_22.jpg"),
    nursery_23: require("../assets/NURSERY_BED_SIMPLE/nursery_23.jpg"),
  };

  const nurseryProducts = [
    {
      id: 1,
      name: "Oregano Seedling",
      image: nurseryImages.nursery_1,
      description: "Fresh oregano seedlings ready for planting",
    },
    {
      id: 2,
      name: "Lemon Grass (Kisubi)",
      image: nurseryImages.nursery_2,
      description: "Aromatic lemon grass seedlings for culinary use",
    },
    {
      id: 3,
      name: "Strawberry Chandler Seedlings",
      image: nurseryImages.nursery_3,
      description: "Premium strawberry seedlings for sweet fruit production",
    },
    {
      id: 4,
      name: "Musakala",
      image: nurseryImages.nursery_4,
      description: "Traditional banana variety plantlet",
    },
    {
      id: 5,
      name: "Kibuzi - Banana T.c Plantlet",
      image: nurseryImages.nursery_5,
      description: "Tissue culture banana plantlet for disease-free planting",
    },
    {
      id: 6,
      name: "Coriander Seedlings",
      image: nurseryImages.nursery_6,
      description: "Fresh coriander seedlings for cooking and garnishing",
    },
    {
      id: 7,
      name: "Sweet Basil Seedling (Mujaaja)",
      image: nurseryImages.nursery_7,
      description: "Aromatic sweet basil seedlings for culinary herbs",
    },
    {
      id: 8,
      name: "Parsley Seedling",
      image: nurseryImages.nursery_8,
      description: "Fresh parsley seedlings for cooking and garnishing",
    },
    {
      id: 9,
      name: "Celery Seedling",
      image: nurseryImages.nursery_9,
      description: "Healthy celery seedlings for vegetable gardens",
    },
    {
      id: 10,
      name: "Atwalira - Banana T.c Plantlet",
      image: nurseryImages.nursery_10,
      description: "Tissue culture banana plantlet variety",
    },
    {
      id: 11,
      name: "Pineapple Mint Seedling",
      image: nurseryImages.nursery_11,
      description: "Fragrant pineapple mint seedlings for herbal gardens",
    },
    {
      id: 12,
      name: "Lemon Balm Seedling",
      image: nurseryImages.nursery_12,
      description: "Aromatic lemon balm seedlings for herbal teas",
    },
    {
      id: 13,
      name: "M3 Banana Suckers",
      image: nurseryImages.nursery_13,
      description: "High-quality banana suckers for plantation establishment",
    },
    {
      id: 14,
      name: "Nakatansese - Banana T.c Plantlet",
      image: nurseryImages.nursery_14,
      description: "Tissue culture banana plantlet variety",
    },
    {
      id: 15,
      name: "Mbwazirume-banana T.c Plantlet",
      image: nurseryImages.nursery_15,
      description: "Tissue culture banana plantlet variety",
    },
    {
      id: 16,
      name: "Chocolate Mint Seedling",
      image: nurseryImages.nursery_16,
      description: "Unique chocolate mint seedlings for specialty gardens",
    },
    {
      id: 17,
      name: "Aloe Vera Seedling",
      image: nurseryImages.nursery_17,
      description: "Medicinal aloe vera seedlings for health and beauty",
    },
    {
      id: 18,
      name: "Mint Seedling",
      image: nurseryImages.nursery_18,
      description: "Fresh mint seedlings for culinary and medicinal use",
    },
    {
      id: 19,
      name: "Bogoya (Gros Michel) - Banana T.c Plantlet",
      image: nurseryImages.nursery_19,
      description: "Tissue culture Gros Michel banana plantlet",
    },
    {
      id: 20,
      name: "Cinnamon Seedling",
      image: nurseryImages.nursery_20,
      description: "Aromatic cinnamon seedlings for spice gardens",
    },
    {
      id: 21,
      name: "Kisansa - Banana T.c Plantlet",
      image: nurseryImages.nursery_21,
      description: "Tissue culture banana plantlet variety",
    },
    {
      id: 22,
      name: "Mpologoma-banana T.c Plantlet",
      image: nurseryImages.nursery_22,
      description: "Tissue culture banana plantlet variety",
    },
    {
      id: 23,
      name: "Rosemary Seedling",
      image: nurseryImages.nursery_23,
      description: "Aromatic rosemary seedlings for culinary herbs",
    },
  ];

  console.log(
    "🌱 NurseryBedScreen: Rendering with",
    nurseryProducts.length,
    "products",
  );

  // Optimized product rendering with memoization
  const renderProduct = useCallback(
    ({ item: product }) => (
      <View style={styles.productItem}>
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
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
      </View>
    ),
    [imageLoadingStates, handleImageLoad, handleImageLoadStart],
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <MaterialIcons name="local_florist" size={32} color="white" />
          <Text style={styles.headerTitle}>Nursery Bed Products</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Quality seedlings and plantlets for your garden
        </Text>
      </View>

      {/* Products Grid - Optimized FlatList */}
      <FlatList
        data={nurseryProducts}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
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
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2c5530",
    marginBottom: 5,
    marginTop: 8,
    textAlign: "center",
  },
  productDescription: {
    fontSize: 11,
    color: "#666",
    lineHeight: 16,
    textAlign: "center",
  },
  imageLoader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -10 }, { translateY: -10 }],
    zIndex: 1,
  },
});

export default NurseryBedScreen;
