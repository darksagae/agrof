import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useCart } from "../contexts/CartContext";
import SeedsDetailScreen from "./SeedsDetailScreen";
import SimplePricingWidget from "../components/SimplePricingWidget";

const { width } = Dimensions.get("window");

const SeedsProductsScreen = ({ onBack }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [pricingWidgetVisible, setPricingWidgetVisible] = useState(false);
  const [selectedProductForPricing, setSelectedProductForPricing] =
    useState(null);
  const [imageLoadingStates, setImageLoadingStates] = useState({});
  const { addToCart } = useCart();

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

  // Import all seeds images from simplified folder structure
  const seedsImages = {
    "Sugar Baby Watermelon": require("../assets/SEEDS_SIMPLE/sugar_baby.jpg"),
    "Okra Seeds": require("../assets/SEEDS_SIMPLE/pusa_sawani.jpg"),
    "Julie F1 Watermelon": require("../assets/SEEDS_SIMPLE/sugar_baby.jpg"), // Using sugar_baby as fallback
    "Frey - Pepper Hybrid F1": require("../assets/SEEDS_SIMPLE/frey.jpg"),
    "Habanero Yellow – Bonnet Pepper": require("../assets/SEEDS_SIMPLE/habanero_yellow.jpg"),
    "Grace - Barley Seed": require("../assets/SEEDS_SIMPLE/grace.jpg"),
    'California Wonder "Bamba" - Pepper': require("../assets/SEEDS_SIMPLE/california_wonder_bamba.jpg"),
    "Habanero Red – Bonnet Pepper": require("../assets/SEEDS_SIMPLE/habanero_red.jpg"),
    "Ashley – Open Pollinated Cucumber": require("../assets/SEEDS_SIMPLE/ashley.jpg"),
    "Mak Soy 3N (Brac Seed)": require("../assets/SEEDS_SIMPLE/mak_soy_3n.jpg"),
    "Cal-j Tomato Compact And Determinate Variety": require("../assets/SEEDS_SIMPLE/maxim_f1.jpg"), // Using maxim_f1 as fallback
    "Green Bunching – Onion": require("../assets/SEEDS_SIMPLE/green_bunching.jpg"),
    "Terere – Amaranthus": require("../assets/SEEDS_SIMPLE/terere.jpg"),
    "Galia F1 – Sweet Melon": require("../assets/SEEDS_SIMPLE/galia_f1.jpg"),
    "Green Gold F1 – Pepper": require("../assets/SEEDS_SIMPLE/green_gold_f1.jpg"),
    "Green Coronet F1 – Cabbage": require("../assets/SEEDS_SIMPLE/green_coronet_f1.jpg"),
    "Tall Utah – Celery": require("../assets/SEEDS_SIMPLE/tall_utah.jpg"),
    "California Wonder": require("../assets/SEEDS_SIMPLE/california_wonder.jpg"),
    "Maxim F1 – Tomato": require("../assets/SEEDS_SIMPLE/maxim_f1.jpg"),
    "Coatmeal - Coriander": require("../assets/SEEDS_SIMPLE/coatmeal.jpg"),
    "Rambo F1 – Tomato Seed": require("../assets/SEEDS_SIMPLE/rambo_f1.jpg"),
    "Zawadi F1 – Cabbage": require("../assets/SEEDS_SIMPLE/zawadi_f1.jpg"),
    "Fanaka F1- Cabbage": require("../assets/SEEDS_SIMPLE/green_coronet_f1.jpg"), // Using green_coronet_f1 as fallback
    "Namuche 3": require("../assets/SEEDS_SIMPLE/sugar_baby.jpg"), // Using sugar_baby as fallback
    "Great Lakes Mesa 659 – Lettuce": require("../assets/SEEDS_SIMPLE/great_lakes_mesa_659.jpg"),
    "Sukari F1 – Watermelon": require("../assets/SEEDS_SIMPLE/sukari_f1.jpg"),
    "Arjuna F1 – Pumpkin": require("../assets/SEEDS_SIMPLE/arjuna_f1.jpg"),
    "Nouvelle F1 - Tomatoes": require("../assets/SEEDS_SIMPLE/nouvelle_f1.jpg"),
    "E107 (Simsim)": require("../assets/SEEDS_SIMPLE/e107.jpg"),
    "Tengeru 97 - Determinate Round Tomato": require("../assets/SEEDS_SIMPLE/tengeru_97.jpg"),
    "Roma Vfn – High Yielding Determinate Oval Shape Tomato": require("../assets/SEEDS_SIMPLE/roma_vfn.jpg"),
    "Kilele F1hybrid": require("../assets/SEEDS_SIMPLE/green_coronet_f1.jpg"), // Using green_coronet_f1 as fallback
    "F1-cabbage": require("../assets/SEEDS_SIMPLE/green_coronet_f1.jpg"), // Using green_coronet_f1 as fallback
    "Kifaru F1 – Red Cabbage": require("../assets/SEEDS_SIMPLE/kifaru_f1.jpg"),
    "Poornima 008 F1- Cauliflower": require("../assets/SEEDS_SIMPLE/green_coronet_f1.jpg"), // Using green_coronet_f1 as fallback
    "Arjani F1 - Eggplants": require("../assets/SEEDS_SIMPLE/arjani_f1.jpg"),
    "Femi F1 – Hybrid Eggplant Variety": require("../assets/SEEDS_SIMPLE/femi_f1.jpg"),
    "Demon F1- Hotpaper": require("../assets/SEEDS_SIMPLE/frey.jpg"), // Using frey as fallback
    "Maradona F1 – Hybrid Papaya/pawpaw": require("../assets/SEEDS_SIMPLE/maradona_f1.jpg"),
    "Georgia Sukuma Wiki – Collard Variety": require("../assets/SEEDS_SIMPLE/georgia_sukuma_wiki.jpg"),
    "Long Purple – Eggplant Variety": require("../assets/SEEDS_SIMPLE/long_purple.jpg"),
    "California Wonder – Sweet Pepper": require("../assets/SEEDS_SIMPLE/california_wonder.jpg"),
    "Nakati - Local Vegetable": require("../assets/SEEDS_SIMPLE/nakati.jpg"),
    "Pusa Sawani – Okra Variety": require("../assets/SEEDS_SIMPLE/pusa_sawani.jpg"),
    "Swiss Chard Ford Hook Giant – Spinach Variety": require("../assets/SEEDS_SIMPLE/swiss_chard_ford_hook_giant.jpg"),
    "Anita – Watermelon": require("../assets/SEEDS_SIMPLE/anita.jpg"),
    "Tomato Assila": require("../assets/SEEDS_SIMPLE/maxim_f1.jpg"), // Using maxim_f1 as fallback
    "Water Melon Pata Negra": require("../assets/SEEDS_SIMPLE/sugar_baby.jpg"), // Using sugar_baby as fallback
    "Red Bugga-amaranthus": require("../assets/SEEDS_SIMPLE/terere.jpg"), // Using terere as fallback
    "Red Beauty": require("../assets/SEEDS_SIMPLE/habanero_red.jpg"), // Using habanero_red as fallback
    "Bitter Gourd -Palee F1": require("../assets/SEEDS_SIMPLE/arjuna_f1.jpg"), // Using arjuna_f1 as fallback
    "Black Beauty - Eggplants": require("../assets/SEEDS_SIMPLE/black_beauty.jpg"),
    "Merdan F1- African Eggplants": require("../assets/SEEDS_SIMPLE/arjani_f1.jpg"), // Using arjani_f1 as fallback
    "Efia - Hot Paper": require("../assets/SEEDS_SIMPLE/efia.jpg"),
    "Katana F1 -Pumpkin": require("../assets/SEEDS_SIMPLE/arjuna_f1.jpg"), // Using arjuna_f1 as fallback
    "Yubi F1 Pakchoy- Chinese Cabbage": require("../assets/SEEDS_SIMPLE/green_coronet_f1.jpg"), // Using green_coronet_f1 as fallback
    "Sugar Baby – Most Popular Watermelon Variety": require("../assets/SEEDS_SIMPLE/sugar_baby.jpg"),
    "Kaveri F1 – Sweet Pepper": require("../assets/SEEDS_SIMPLE/kaveri_f1.jpg"),
  };

  // Comprehensive seeds products data
  const seedsProducts = [
    {
      id: 1,
      name: "Sugar Baby Watermelon",
      category: "Watermelon",
      manufacturer: "Simlaw Seeds Company (U) Ltd",
      price: "UGX 2,100",
      packaging:
        "10g: 1+ units UGX2,100, 20g: 1+ units UGX3,200, 25g: 1+ units UGX3,800, 50g: 1+ units UGX8,700, 250g: 1+ units UGX34,900, 500g: 1+ units UGX67,200, 1kg: 1+ units UGX128,900",
      description:
        "Most popular and grown watermelon variety due to its early maturity. Potential fruit weight: 5-8kgs, Yield potential: 48-50 tons per acre, Duration to maturity: 80 days, Spacing: 100x100cm, Seed rate: 500 grams per acre, Approximate seed count per gram: 20 seeds, Special attributes: Dark green, round watermelon, Very uniform growth, Very adoptable and grows on wide range of soils.",
      composition: "High sugar content, early maturing variety",
      applicationRate: "Plant 2-3 seeds per hole, 1m spacing",
      targetCrops: "Watermelon cultivation",
      image: "sugar_baby.jpg",
    },
    {
      id: 2,
      name: "Okra Seeds",
      category: "Vegetable",
      manufacturer: "Simlaw Seeds Company (U) Ltd",
      price: "UGX 1,400",
      packaging:
        "10g: 1+ units UGX1,400, 5+ units UGX1,322, 10+ units UGX1,308, 20+ units UGX1,303, 50g: 1+ units UGX4,300, 5+ units UGX4,154, 10+ units UGX4,137, 20+ units UGX4,124, 250g: 1+ units UGX16,500, 5+ units UGX16,302, 10+ units UGX16,253, 20+ units UGX16,220, 500g: 1+ units UGX23,300, 5+ units UGX23,230, 10+ units UGX23,160, 20+ units UGX23,067, 1kg: 1+ units UGX46,300, 5+ units UGX46,207, 10+ units UGX46,022, 20+ units UGX40,142, 20g: 1+ units UGX2,600, 5+ units UGX2,452, 10+ units UGX2,436, 20+ units UGX2,428",
      description:
        "Green slender and attractive pods with good storage ability, Good fruit setting, Maturity: Harvesting start 40-45 days from planting, Tolerant to Yellow Vein Mosaic Virus (YVMV)",
      composition: "Pusa Sawani variety, heat tolerant",
      applicationRate: "Plant 2-3 seeds per hole, 30cm spacing",
      targetCrops: "Okra cultivation",
      image: "pusa_sawani.jpg",
    },
    {
      id: 3,
      name: "Julie F1 Watermelon",
      category: "Watermelon",
      manufacturer: "Simlaw Seeds Company (U) Ltd",
      price: "UGX 3,800",
      packaging:
        "5g: 1+ units UGX3,800, 5+ units UGX3,648, 10+ units UGX3,633, 20+ units UGX3,621, 10g: 1+ units UGX7,200, 5+ units UGX7,049, 10+ units UGX7,020, 20+ units UGX6,998, 25g: 1+ units UGX17,600, 5+ units UGX17,406, 10+ units UGX17,354, 20+ units UGX17,318, 50g: 1+ units UGX33,800, 5+ units UGX33,462, 10+ units UGX33,394, 20+ units UGX33,293, 100g: 1+ units UGX64,900, 5+ units UGX64,316, 10+ units UGX64,121, 20+ units UGX56,074, 250g: 1+ units UGX163,700, 5+ units UGX140,618, 10+ units UGX142,583, 20+ units UGX142,419, 500g: 1+ units UGX324,600, 5+ units UGX285,323, 10+ units UGX285,323, 20+ units UGX285,323",
      description:
        "Potential fruit weight: 10-12kgs, Yield potential: 35-40 tons per acre, Duration to maturity: 85 days, Seed rate: 500 grams per acre, Approximate seed count per gram: 20 seeds, Special attributes: -A very popular hybrid with oblong shaped fruit. -Very sweet red flesh. -Tolerant to fusarium wilt and anthracnose.",
      composition: "F1 hybrid, disease resistant",
      applicationRate: "Plant 2-3 seeds per hole, 1.2m spacing",
      targetCrops: "Watermelon cultivation",
      image: "julie_f1.jpg",
    },
    {
      name: "Frey - Pepper Hybrid F1",
      category: "Pepper",
      manufacturer: "Home Harvest (U) Ltd",
      price: "UGX 38,800",
      packaging:
        "5g: 1+ units UGX38,800, 5+ units UGX37,403, 10+ units UGX37,287, 20+ units UGX37,209",
      description:
        "Frey is a versatile hybrid sweet pepper that can be grown outdoors or, if market dictates, indoors. Fruits measure 12x10cm and go from green to red. The fruits have thick walls. Strong plant with short internodes and good lead cover. Disease Resistance/Tolerance: Potato Virus Y (PVY:0,1), Tobamovirus (TM:0-3). Walls: Thick, Shape: Blocky, Colour: Green -> Red, Vigour: Strong, Leaf cover: Good, Internode Length: Short, Height: Medium (indoors), Semi-compact (outdoors), Cultivation: Open Field, Tunnel, Uniformity: High, Maturity: Early, Hybrid: F1.",
      composition: "F1 hybrid, heat tolerant",
      applicationRate: "Plant 2-3 seeds per hole, 40cm spacing",
      targetCrops: "Pepper cultivation",
      image: "frey.jpg",
    },
    {
      name: "Habanero Yellow – Bonnet Pepper",
      category: "Pepper",
      manufacturer: "Home Harvest (U) Ltd",
      price: "UGX 54,200",
      packaging:
        "50g: 1+ units UGX54,200, 5+ units UGX53,224, 10+ units UGX52,899, 20+ units UGX52,682",
      description:
        "Habanero Yellow Pepper is a very vigorous and high yielding pepper type with reliable performance in a wide range of different growing conditions. It has a long harvesting period with makes it good commercial horticultural crop with a high profitability potential. Yellow hot pepper fruits, Each plant produces about 5kg per season, Maturity is 70 days from transplanting, Harvesting takes 4-6 months, Seed rate/acre: 120g, Spacing: 60cm x 75cm",
      composition: "High capsaicin content, ornamental value",
      applicationRate: "Plant 2-3 seeds per hole, 50cm spacing",
      targetCrops: "Hot pepper cultivation",
      image: "habanero_yellow.jpg",
    },
    {
      name: "Grace - Barley Seed",
      category: "Cereal",
      manufacturer: "Sebei Farmers Sacco",
      price: "UGX 2,500",
      packaging: "1kg: UGX 2,500",
      description:
        "Grace barley is a good yielding variety, Maturity: 100days, Yield potential: 1500 kg/ Acre, Seed rate: 50kgs/Acre.",
      composition: "Two-row barley, high protein content",
      applicationRate: "Sow 25-30kg per hectare",
      targetCrops: "Barley cultivation",
      image: "grace.jpg",
    },
    {
      name: 'California Wonder "Bamba" - Pepper',
      category: "Pepper",
      manufacturer: "Home Harvest (U) Ltd",
      price: "UGX 23,300",
      packaging:
        "50g: 1+ units UGX23,300, 5+ units UGX21,995, 10+ units UGX21,809, 20+ units UGX21,809",
      description:
        'California Wonder "Bamba" has an erect plant with good vigor. It has a very good production of green deep blocky fruits with smooth skin. Yield potential is 15 – 20 tons under good management, Seed rate/acre: 100g, Spacing: 60cm x 45cm.',
      composition: "Blocky fruit shape, thick walls",
      applicationRate: "Plant 2-3 seeds per hole, 40cm spacing",
      targetCrops: "Sweet pepper cultivation",
      image: "california_wonder_bamba.jpg",
    },
    {
      name: "Habanero Red – Bonnet Pepper",
      category: "Pepper",
      manufacturer: "Home Harvest (U) Ltd",
      price: "UGX 16,400",
      packaging:
        "10g: 1+ units UGX16,400, 5+ units UGX15,793, 10+ units UGX15,695, 20+ units UGX15,695, 50g: 1+ units UGX59,600, 5+ units UGX58,289, 10+ units UGX57,991, 20+ units UGX57,812",
      description:
        "Habanero Red is a high yielding pepper variety with great demand both locally and more so internationally. It can be grown for export to various countries globally. Red hot pepper fruits, Each plant produces 4 – 5kg per season, Maturity is 70 days from transplanting, Harvesting takes 4-6 months, Seed rate/acre: 120g, Spacing: 60cm x 75cm",
      composition: "High capsaicin content, ornamental value",
      applicationRate: "Plant 2-3 seeds per hole, 50cm spacing",
      targetCrops: "Hot pepper cultivation",
      image: "habanero_red.jpg",
    },
    {
      name: "Ashley – Open Pollinated Cucumber",
      category: "Cucumber",
      manufacturer: "Agro Supply",
      price: "UGX 2,500",
      packaging: "10g: 1+ units UGX2,500, 5+ units UGX2,300",
      description:
        "Open pollinated cucumber variety with prolific productivity",
      composition: "High yielding, disease resistant",
      applicationRate: "Plant 2-3 seeds per hole, 30cm spacing",
      targetCrops: "Cucumber cultivation",
      image: "ashley.jpg",
    },
    {
      name: "Mak Soy 3N (Brac Seed)",
      category: "Legume",
      manufacturer: "Agro Supply",
      price: "UGX 3,000",
      packaging: "1kg: 1+ units UGX3,000, 5+ units UGX2,800",
      description: "High protein soybean variety with nitrogen fixing ability",
      composition: "High protein content, nitrogen fixing",
      applicationRate: "Sow 40-50kg per hectare",
      targetCrops: "Soybean cultivation",
      image: "mak_soy_3n.jpg",
    },
    {
      name: "Cal-j Tomato Compact And Determinate Variety",
      category: "Tomato",
      manufacturer: "Agro Supply",
      price: "UGX 3,500",
      packaging: "10g: 1+ units UGX3,500, 5+ units UGX3,200",
      description:
        "Compact and determinate variety suitable for processing and fresh market",
      composition: "Determinate growth, processing quality",
      applicationRate: "Plant 2-3 seeds per hole, 50cm spacing",
      targetCrops: "Tomato cultivation",
      image:
        "cal-j_tomato_compact_and_determinate_variety_suitable_for_processing_and_fresh_market.jpg",
    },
    {
      name: "Green Bunching – Onion",
      category: "Onion",
      manufacturer: "Agro Supply",
      price: "UGX 2,800",
      packaging: "50g: 1+ units UGX2,800, 5+ units UGX2,600",
      description: "Non-bulbing alliums that produce yummy green stems",
      composition: "Green bunching type, no bulb formation",
      applicationRate: "Sow densely, harvest green",
      targetCrops: "Green onion cultivation",
      image: "green_bunching.jpg",
    },
    {
      name: "Terere – Amaranthus",
      category: "Leafy Vegetable",
      manufacturer: "Agro Supply",
      price: "UGX 1,800",
      packaging: "50g: 1+ units UGX1,800, 5+ units UGX1,600",
      description: "Indigenous, highly nutritious green leafy vegetable",
      composition: "High iron and protein content",
      applicationRate: "Sow densely, harvest young leaves",
      targetCrops: "Leafy vegetable cultivation",
      image: "terere.jpg",
    },
    {
      name: "Galia F1 – Sweet Melon",
      category: "Melon",
      manufacturer: "Agro Supply",
      price: "UGX 4,000",
      packaging: "10g: 1+ units UGX4,000, 5+ units UGX3,700",
      description: "Sweet melon with firm fruits and aromatic flavour",
      composition: "F1 hybrid, high sugar content",
      applicationRate: "Plant 2-3 seeds per hole, 1m spacing",
      targetCrops: "Melon cultivation",
      image: "galia_f1.jpg",
    },
    {
      name: "Green Gold F1 – Pepper",
      category: "Pepper",
      manufacturer: "Agro Supply",
      price: "UGX 3,600",
      packaging: "10g: 1+ units UGX3,600, 5+ units UGX3,300",
      description: "High yielding variety with excellent fruit set",
      composition: "F1 hybrid, blocky fruit shape",
      applicationRate: "Plant 2-3 seeds per hole, 40cm spacing",
      targetCrops: "Pepper cultivation",
      image: "green_gold_f1.jpg",
    },
    {
      name: "Green Coronet F1 – Cabbage",
      category: "Cabbage",
      manufacturer: "Agro Supply",
      price: "UGX 2,900",
      packaging: "10g: 1+ units UGX2,900, 5+ units UGX2,700",
      description: "Medium-large, semi-upright hybrid cabbage",
      composition: "F1 hybrid, heat tolerant",
      applicationRate: "Plant 2-3 seeds per hole, 45cm spacing",
      targetCrops: "Cabbage cultivation",
      image: "green_coronet_f1.jpg",
    },
    {
      name: "Tall Utah – Celery",
      category: "Celery",
      manufacturer: "Agro Supply",
      price: "UGX 3,200",
      packaging: "5g: 1+ units UGX3,200, 5+ units UGX2,900",
      description:
        "Celery variety with crisp, stringless green tightly folded hearts",
      composition: "Stringless, crisp texture",
      applicationRate: "Transplant seedlings, 30cm spacing",
      targetCrops: "Celery cultivation",
      image: "tall_utah.jpg",
    },
    {
      name: "California Wonder",
      category: "Pepper",
      manufacturer: "Agro Supply",
      price: "UGX 3,000",
      packaging: "10g: 1+ units UGX3,000, 5+ units UGX2,700",
      description: "Sweet pepper variety suitable for home and market gardens",
      composition: "Blocky fruit shape, thick walls",
      applicationRate: "Plant 2-3 seeds per hole, 40cm spacing",
      targetCrops: "Sweet pepper cultivation",
      image: "california_wonder.jpg",
    },
    {
      name: "Maxim F1 – Tomato",
      category: "Tomato",
      manufacturer: "Agro Supply",
      price: "UGX 3,800",
      packaging: "10g: 1+ units UGX3,800, 5+ units UGX3,500",
      description: "High yielding tomato variety with excellent fruit quality",
      composition: "F1 hybrid, disease resistant",
      applicationRate: "Plant 2-3 seeds per hole, 50cm spacing",
      targetCrops: "Tomato cultivation",
      image: "maxim_f1.jpg",
    },
    {
      name: "Coatmeal - Coriander",
      category: "Herb",
      manufacturer: "Agro Supply",
      price: "UGX 2,200",
      packaging: "50g: 1+ units UGX2,200, 5+ units UGX2,000",
      description: "Coriander variety with vigorous and fast growing plants",
      composition: "High essential oil content",
      applicationRate: "Sow densely, harvest leaves and seeds",
      targetCrops: "Herb cultivation",
      image: "coatmeal.jpg",
    },
    {
      name: "Rambo F1 – Tomato Seed",
      category: "Tomato",
      manufacturer: "Agro Supply",
      price: "UGX 4,000",
      packaging: "10g: 1+ units UGX4,000, 5+ units UGX3,700",
      description: "High yielding tomato variety with excellent fruit quality",
      composition: "F1 hybrid, disease resistant",
      applicationRate: "Plant 2-3 seeds per hole, 50cm spacing",
      targetCrops: "Tomato cultivation",
      image: "rambo_f1.jpg",
    },
    {
      name: "Zawadi F1 – Cabbage",
      category: "Cabbage",
      manufacturer: "Agro Supply",
      price: "UGX 3,100",
      packaging: "10g: 1+ units UGX3,100, 5+ units UGX2,900",
      description:
        "High yielding variety that withstands long distance transportation",
      composition: "F1 hybrid, transport tolerant",
      applicationRate: "Plant 2-3 seeds per hole, 45cm spacing",
      targetCrops: "Cabbage cultivation",
      image: "zawadi_f1.jpg",
    },
    {
      name: "Fanaka F1- Cabbage",
      category: "Cabbage",
      manufacturer: "Agro Supply",
      price: "UGX 3,300",
      packaging: "10g: 1+ units UGX3,300, 5+ units UGX3,100",
      description: "Hybrid with excellent heat tolerance and high adaptability",
      composition: "F1 hybrid, heat tolerant",
      applicationRate: "Plant 2-3 seeds per hole, 45cm spacing",
      targetCrops: "Cabbage cultivation",
      image:
        "fanaka_f1-_cabbage,_hybrid_with_excellent_heat_tolerance_and_high_adaptability.jpg",
    },
    {
      name: "Namuche 3",
      category: "Maize",
      manufacturer: "Agro Supply",
      price: "UGX 2,500",
      packaging: "2kg: 1+ units UGX2,500, 5+ units UGX2,300",
      description: "High yielding maize variety with good drought tolerance",
      composition: "Open pollinated, drought tolerant",
      applicationRate: "Sow 20-25kg per hectare",
      targetCrops: "Maize cultivation",
      image: "namuche_3.jpg",
    },
    {
      name: "Great Lakes Mesa 659 – Lettuce",
      category: "Lettuce",
      manufacturer: "Agro Supply",
      price: "UGX 2,400",
      packaging: "10g: 1+ units UGX2,400, 5+ units UGX2,200",
      description:
        "Lettuce variety with tip-burn resistance and medium-large, solid heads",
      composition: "Tip-burn resistant, solid heads",
      applicationRate: "Sow thinly, 30cm spacing",
      targetCrops: "Lettuce cultivation",
      image: "great_lakes_mesa_659.jpg",
    },
    {
      name: "Sukari F1 – Watermelon",
      category: "Watermelon",
      manufacturer: "Agro Supply",
      price: "UGX 3,800",
      packaging: "10g: 1+ units UGX3,800, 5+ units UGX3,500",
      description:
        "High yielding watermelon variety with excellent fruit quality",
      composition: "F1 hybrid, high sugar content",
      applicationRate: "Plant 2-3 seeds per hole, 1m spacing",
      targetCrops: "Watermelon cultivation",
      image: "sukari_f1.jpg",
    },
    {
      name: "Arjuna F1 – Pumpkin",
      category: "Pumpkin",
      manufacturer: "Agro Supply",
      price: "UGX 3,200",
      packaging: "10g: 1+ units UGX3,200, 5+ units UGX2,900",
      description: "High yielding pumpkin variety with excellent fruit quality",
      composition: "F1 hybrid, high yielding",
      applicationRate: "Plant 2-3 seeds per hole, 1.5m spacing",
      targetCrops: "Pumpkin cultivation",
      image: "arjuna_f1.jpg",
    },
    {
      name: "Nouvelle F1 - Tomatoes",
      category: "Tomato",
      manufacturer: "Agro Supply",
      price: "UGX 3,600",
      packaging: "10g: 1+ units UGX3,600, 5+ units UGX3,300",
      description: "High yielding tomato variety with excellent fruit quality",
      composition: "F1 hybrid, disease resistant",
      applicationRate: "Plant 2-3 seeds per hole, 50cm spacing",
      targetCrops: "Tomato cultivation",
      image: "nouvelle_f1.jpg",
    },
    {
      name: "E107 (Simsim)",
      category: "Oilseed",
      manufacturer: "Agro Supply",
      price: "UGX 2,800",
      packaging: "1kg: 1+ units UGX2,800, 5+ units UGX2,600",
      description: "High yielding sesame variety with excellent oil content",
      composition: "High oil content, drought tolerant",
      applicationRate: "Sow 3-4kg per hectare",
      targetCrops: "Sesame cultivation",
      image: "e107.jpg",
    },
    {
      name: "Tengeru 97 - Determinate Round Tomato",
      category: "Tomato",
      manufacturer: "Agro Supply",
      price: "UGX 3,400",
      packaging: "10g: 1+ units UGX3,400, 5+ units UGX3,100",
      description: "Determinate round tomato with a high yield potential",
      composition: "Determinate growth, high yielding",
      applicationRate: "Plant 2-3 seeds per hole, 50cm spacing",
      targetCrops: "Tomato cultivation",
      image: "tengeru_97.jpg",
    },
    {
      name: "Roma Vfn – High Yielding Determinate Oval Shape Tomato",
      category: "Tomato",
      manufacturer: "Agro Supply",
      price: "UGX 3,200",
      packaging: "10g: 1+ units UGX3,200, 5+ units UGX2,900",
      description: "High yielding determinate oval shape tomato",
      composition: "Determinate growth, processing quality",
      applicationRate: "Plant 2-3 seeds per hole, 50cm spacing",
      targetCrops: "Tomato cultivation",
      image: "roma_vfn.jpg",
    },
    {
      name: "Kilele F1hybrid",
      category: "Cabbage",
      manufacturer: "Agro Supply",
      price: "UGX 3,000",
      packaging: "10g: 1+ units UGX3,000, 5+ units UGX2,800",
      description: "High yielding cabbage hybrid with excellent head formation",
      composition: "F1 hybrid, uniform heads",
      applicationRate: "Plant 2-3 seeds per hole, 45cm spacing",
      targetCrops: "Cabbage cultivation",
      image: "kilele_f1hybrid.jpg",
    },
    {
      name: "F1-cabbage",
      category: "Cabbage",
      manufacturer: "Agro Supply",
      price: "UGX 2,800",
      packaging: "10g: 1+ units UGX2,800, 5+ units UGX2,600",
      description: "High yielding cabbage hybrid with excellent head formation",
      composition: "F1 hybrid, uniform heads",
      applicationRate: "Plant 2-3 seeds per hole, 45cm spacing",
      targetCrops: "Cabbage cultivation",
      image: "indica_f1-cabbage.jpg",
    },
    {
      name: "Kifaru F1 – Red Cabbage",
      category: "Cabbage",
      manufacturer: "Agro Supply",
      price: "UGX 3,500",
      packaging: "10g: 1+ units UGX3,500, 5+ units UGX3,200",
      description: "High yielding red cabbage variety with excellent color",
      composition: "F1 hybrid, deep red color",
      applicationRate: "Plant 2-3 seeds per hole, 45cm spacing",
      targetCrops: "Red cabbage cultivation",
      image: "kifaru_f1.jpg",
    },
    {
      name: "Poornima 008 F1- Cauliflower",
      category: "Cauliflower",
      manufacturer: "Agro Supply",
      price: "UGX 3,800",
      packaging: "10g: 1+ units UGX3,800, 5+ units UGX3,500",
      description:
        "High yielding cauliflower variety with excellent curd formation",
      composition: "F1 hybrid, white curds",
      applicationRate: "Plant 2-3 seeds per hole, 50cm spacing",
      targetCrops: "Cauliflower cultivation",
      image: "poornima_008_f1-_cauliflower.jpg",
    },
    {
      name: "Arjani F1 - Eggplants",
      category: "Eggplant",
      manufacturer: "Agro Supply",
      price: "UGX 3,200",
      packaging: "10g: 1+ units UGX3,200, 5+ units UGX2,900",
      description:
        "High yielding eggplant variety with excellent fruit quality",
      composition: "F1 hybrid, high yielding",
      applicationRate: "Plant 2-3 seeds per hole, 60cm spacing",
      targetCrops: "Eggplant cultivation",
      image: "arjani_f1.jpg",
    },
    {
      name: "Femi F1 – Hybrid Eggplant Variety",
      category: "Eggplant",
      manufacturer: "Agro Supply",
      price: "UGX 3,400",
      packaging: "10g: 1+ units UGX3,400, 5+ units UGX3,100",
      description:
        "High yielding hybrid eggplant variety with excellent fruit quality",
      composition: "F1 hybrid, disease resistant",
      applicationRate: "Plant 2-3 seeds per hole, 60cm spacing",
      targetCrops: "Eggplant cultivation",
      image: "femi_f1.jpg",
    },
    {
      name: "Demon F1- Hotpaper",
      category: "Pepper",
      manufacturer: "Agro Supply",
      price: "UGX 3,600",
      packaging: "10g: 1+ units UGX3,600, 5+ units UGX3,300",
      description:
        "High yielding hot pepper variety with excellent fruit quality",
      composition: "F1 hybrid, high heat level",
      applicationRate: "Plant 2-3 seeds per hole, 50cm spacing",
      targetCrops: "Hot pepper cultivation",
      image: "demon_f1-_hotpaper.jpg",
    },
    {
      name: "Maradona F1 – Hybrid Papaya/pawpaw",
      category: "Papaya",
      manufacturer: "Agro Supply",
      price: "UGX 4,500",
      packaging: "10g: 1+ units UGX4,500, 5+ units UGX4,200",
      description:
        "High yielding hybrid papaya variety with excellent fruit quality",
      composition: "F1 hybrid, high yielding",
      applicationRate: "Plant 2-3 seeds per hole, 2m spacing",
      targetCrops: "Papaya cultivation",
      image: "maradona_f1.jpg",
    },
    {
      name: "Georgia Sukuma Wiki – Collard Variety",
      category: "Leafy Vegetable",
      manufacturer: "Agro Supply",
      price: "UGX 2,200",
      packaging: "50g: 1+ units UGX2,200, 5+ units UGX2,000",
      description:
        "Vigorous and hardy collard variety with excellent leaf quality",
      composition: "High nutritional value, heat tolerant",
      applicationRate: "Sow densely, harvest young leaves",
      targetCrops: "Leafy vegetable cultivation",
      image: "georgia_sukuma_wiki.jpg",
    },
    {
      name: "Long Purple – Eggplant Variety",
      category: "Eggplant",
      manufacturer: "Agro Supply",
      price: "UGX 3,000",
      packaging: "10g: 1+ units UGX3,000, 5+ units UGX2,800",
      description: "Eggplant variety with a high yield potential",
      composition: "Long purple fruit, high yielding",
      applicationRate: "Plant 2-3 seeds per hole, 60cm spacing",
      targetCrops: "Eggplant cultivation",
      image: "long_purple.jpg",
    },
    {
      name: "California Wonder – Sweet Pepper",
      category: "Pepper",
      manufacturer: "Agro Supply",
      price: "UGX 3,200",
      packaging: "10g: 1+ units UGX3,200, 5+ units UGX2,900",
      description: "Sweet pepper variety suitable for home and market gardens",
      composition: "Blocky fruit shape, thick walls",
      applicationRate: "Plant 2-3 seeds per hole, 40cm spacing",
      targetCrops: "Sweet pepper cultivation",
      image: "california_wonder.jpg",
    },
    {
      name: "Nakati - Local Vegetable",
      category: "Leafy Vegetable",
      manufacturer: "Agro Supply",
      price: "UGX 1,800",
      packaging: "50g: 1+ units UGX1,800, 5+ units UGX1,600",
      description:
        "Highly nutritious local vegetable with excellent nutritional value",
      composition: "High iron and protein content",
      applicationRate: "Sow densely, harvest young leaves",
      targetCrops: "Leafy vegetable cultivation",
      image: "nakati.jpg",
    },
    {
      name: "Pusa Sawani – Okra Variety",
      category: "Vegetable",
      manufacturer: "Agro Supply",
      price: "UGX 2,800",
      packaging: "50g: 1+ units UGX2,800, 5+ units UGX2,600",
      description: "Okra variety with wide adaptability and high yield",
      composition: "Heat tolerant, high yielding",
      applicationRate: "Plant 2-3 seeds per hole, 30cm spacing",
      targetCrops: "Okra cultivation",
      image: "pusa_sawani.jpg",
    },
    {
      name: "Swiss Chard Ford Hook Giant – Spinach Variety",
      category: "Leafy Vegetable",
      manufacturer: "Agro Supply",
      price: "UGX 2,500",
      packaging: "50g: 1+ units UGX2,500, 5+ units UGX2,300",
      description:
        "Tall and vigorous spinach variety with excellent leaf quality",
      composition: "High nutritional value, heat tolerant",
      applicationRate: "Sow densely, harvest young leaves",
      targetCrops: "Leafy vegetable cultivation",
      image: "swiss_chard_ford_hook_giant.jpg",
    },
    {
      name: "Anita – Watermelon",
      category: "Watermelon",
      manufacturer: "Agro Supply",
      price: "UGX 3,600",
      packaging: "10g: 1+ units UGX3,600, 5+ units UGX3,300",
      description:
        "High yielding watermelon variety with excellent fruit quality",
      composition: "F1 hybrid, high sugar content",
      applicationRate: "Plant 2-3 seeds per hole, 1m spacing",
      targetCrops: "Watermelon cultivation",
      image: "anita.jpg",
    },
    {
      name: "Tomato Assila",
      category: "Tomato",
      manufacturer: "Agro Supply",
      price: "UGX 3,000",
      packaging: "10g: 1+ units UGX3,000, 5+ units UGX2,800",
      description: "High yielding tomato variety with excellent fruit quality",
      composition: "Disease resistant, high yielding",
      applicationRate: "Plant 2-3 seeds per hole, 50cm spacing",
      targetCrops: "Tomato cultivation",
      image: "tomato_assila.jpg",
    },
    {
      name: "Water Melon Pata Negra",
      category: "Watermelon",
      manufacturer: "Agro Supply",
      price: "UGX 4,000",
      packaging: "10g: 1+ units UGX4,000, 5+ units UGX3,700",
      description:
        "High yielding watermelon variety with excellent fruit quality",
      composition: "F1 hybrid, high sugar content",
      applicationRate: "Plant 2-3 seeds per hole, 1m spacing",
      targetCrops: "Watermelon cultivation",
      image: "water_melon_pata_negra.jpg",
    },
    {
      name: "Red Bugga-amaranthus",
      category: "Leafy Vegetable",
      manufacturer: "Agro Supply",
      price: "UGX 2,000",
      packaging: "50g: 1+ units UGX2,000, 5+ units UGX1,800",
      description: "Highly nutritious amaranthus variety with red coloration",
      composition: "High iron and protein content",
      applicationRate: "Sow densely, harvest young leaves",
      targetCrops: "Leafy vegetable cultivation",
      image: "red_bugga-amaranthus.jpg",
    },
    {
      name: "Red Beauty",
      category: "Pepper",
      manufacturer: "Agro Supply",
      price: "UGX 3,400",
      packaging: "10g: 1+ units UGX3,400, 5+ units UGX3,100",
      description:
        "High yielding red pepper variety with excellent fruit quality",
      composition: "F1 hybrid, deep red color",
      applicationRate: "Plant 2-3 seeds per hole, 40cm spacing",
      targetCrops: "Pepper cultivation",
      image: "red_beauty.jpg",
    },
    {
      name: "Bitter Gourd -Palee F1",
      category: "Vegetable",
      manufacturer: "Agro Supply",
      price: "UGX 3,200",
      packaging: "10g: 1+ units UGX3,200, 5+ units UGX2,900",
      description:
        "High yielding bitter gourd variety with excellent fruit quality",
      composition: "F1 hybrid, high yielding",
      applicationRate: "Plant 2-3 seeds per hole, 1m spacing",
      targetCrops: "Bitter gourd cultivation",
      image: "bitter_gourd_-palee_f1.jpg",
    },
    {
      name: "Black Beauty - Eggplants",
      category: "Eggplant",
      manufacturer: "Agro Supply",
      price: "UGX 2,800",
      packaging: "10g: 1+ units UGX2,800, 5+ units UGX2,600",
      description:
        "High yielding eggplant variety with excellent fruit quality",
      composition: "Dark purple fruit, high yielding",
      applicationRate: "Plant 2-3 seeds per hole, 60cm spacing",
      targetCrops: "Eggplant cultivation",
      image: "black_beauty.jpg",
    },
    {
      name: "Merdan F1- African Eggplants",
      category: "Eggplant",
      manufacturer: "Agro Supply",
      price: "UGX 3,600",
      packaging: "10g: 1+ units UGX3,600, 5+ units UGX3,300",
      description:
        "High yielding African eggplant variety with excellent fruit quality",
      composition: "F1 hybrid, heat tolerant",
      applicationRate: "Plant 2-3 seeds per hole, 60cm spacing",
      targetCrops: "African eggplant cultivation",
      image: "merdan_f1-_african_eggplants.jpg",
    },
    {
      name: "Efia - Hot Paper",
      category: "Pepper",
      manufacturer: "Agro Supply",
      price: "UGX 3,800",
      packaging: "10g: 1+ units UGX3,800, 5+ units UGX3,500",
      description:
        "High yielding hot pepper variety with excellent fruit quality",
      composition: "F1 hybrid, high heat level",
      applicationRate: "Plant 2-3 seeds per hole, 50cm spacing",
      targetCrops: "Hot pepper cultivation",
      image: "efia.jpg",
    },
    {
      name: "Katana F1 -Pumpkin",
      category: "Pumpkin",
      manufacturer: "Agro Supply",
      price: "UGX 3,400",
      packaging: "10g: 1+ units UGX3,400, 5+ units UGX3,100",
      description: "High yielding pumpkin variety with excellent fruit quality",
      composition: "F1 hybrid, high yielding",
      applicationRate: "Plant 2-3 seeds per hole, 1.5m spacing",
      targetCrops: "Pumpkin cultivation",
      image: "katana_f1_-pumpkin.jpg",
    },
    {
      name: "Yubi F1 Pakchoy- Chinese Cabbage",
      category: "Cabbage",
      manufacturer: "Agro Supply",
      price: "UGX 3,200",
      packaging: "10g: 1+ units UGX3,200, 5+ units UGX2,900",
      description:
        "High yielding Chinese cabbage variety with excellent head formation",
      composition: "F1 hybrid, uniform heads",
      applicationRate: "Plant 2-3 seeds per hole, 30cm spacing",
      targetCrops: "Chinese cabbage cultivation",
      image: "yubi_f1_pakchoy-_chinese_cabbage.jpg",
    },
    {
      name: "Sugar Baby – Most Popular Watermelon Variety",
      category: "Watermelon",
      manufacturer: "Agro Supply",
      price: "UGX 3,500",
      packaging: "10g: 1+ units UGX3,500, 5+ units UGX3,300",
      description:
        "Most popular and grown watermelon variety due to its early maturity",
      composition: "High sugar content, early maturing variety",
      applicationRate: "Plant 2-3 seeds per hole, 1m spacing",
      targetCrops: "Watermelon cultivation",
      image: "sugar_baby.jpg",
    },
    {
      name: "Kaveri F1 – Sweet Pepper",
      category: "Pepper",
      manufacturer: "Agro Supply",
      price: "UGX 3,600",
      packaging: "10g: 1+ units UGX3,600, 5+ units UGX3,300",
      description:
        "High yielding sweet pepper variety with excellent fruit quality",
      composition: "F1 hybrid, blocky fruit shape",
      applicationRate: "Plant 2-3 seeds per hole, 40cm spacing",
      targetCrops: "Sweet pepper cultivation",
      image: "kaveri_f1.jpg",
    },
  ];

  // Optimized product rendering with memoization
  const renderProduct = useCallback(
    ({ item: product }) => {
      const imageSource =
        seedsImages[product.name] || seedsImages["Sugar Baby Watermelon"];

      return (
        <TouchableOpacity
          style={styles.productItem}
          onPress={() => {
            console.log("🌱 Product selected:", product.name);
            setSelectedProduct(product);
          }}
        >
          {imageLoadingStates[product.id] && (
            <View style={styles.imageLoader}>
              <ActivityIndicator size="small" color="#2c5530" />
            </View>
          )}
          <Image
            source={imageSource}
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

          <Text
            style={styles.productName}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {product.name}
          </Text>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              {hasMultiplePrices(product)
                ? getUnitPrice(product)
                : product.price}
            </Text>
            {product.availability === "Out of stock" && (
              <Text style={styles.outOfStock}>Out of Stock</Text>
            )}
          </View>

          <Text style={styles.manufacturer} numberOfLines={1}>
            by {product.manufacturer}
          </Text>
        </TouchableOpacity>
      );
    },
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
      <SeedsDetailScreen
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
          <Text style={styles.headerTitle}>Seed Products</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Complete range of agricultural seeds
        </Text>
      </View>

      {/* Products Grid - Optimized FlatList */}
      <FlatList
        data={seedsProducts}
        renderItem={renderProduct}
        keyExtractor={(item) =>
          item.id ? item.id.toString() : Math.random().toString()
        }
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
    padding: 5,
    backgroundColor: "white",
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productItem: {
    width: "48%",
    marginBottom: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 0,
  },
  productImage: {
    width: "100%",
    height: 150,
  },
  productName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2c5530",
    marginBottom: 2,
    marginTop: 20,
    textAlign: "center",
    lineHeight: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e74c3c",
    textAlign: "center",
    marginBottom: 8,
    marginTop: 0,
  },
  priceContainer: {
    alignItems: "center",
    marginBottom: 8,
  },
  imageLoader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -10 }, { translateY: -10 }],
    zIndex: 1,
  },
  outOfStock: {
    fontSize: 12,
    color: "#e74c3c",
    textAlign: "center",
  },
  manufacturer: {
    fontSize: 10,
    color: "#999",
    textAlign: "center",
  },
});

export default SeedsProductsScreen;
