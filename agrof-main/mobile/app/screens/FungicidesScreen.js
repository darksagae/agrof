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
import FungicideDetailScreen from "./FungicideDetailScreen";
import SimplePricingWidget from "../components/SimplePricingWidget";

const FungicidesScreen = ({ onBack }) => {
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

  // Import all fungicide images from simplified folder structure
  const fungicideImages = {
    fungicide_1: require("../assets/FUNGICIDES/fungicide_1.jpg"),
    fungicide_2: require("../assets/FUNGICIDES/fungicide_2.png"),
    fungicide_3: require("../assets/FUNGICIDES/fungicide_3.png"),
    fungicide_4: require("../assets/FUNGICIDES/fungicide_4.png"),
    fungicide_5: require("../assets/FUNGICIDES/fungicide_5.png"),
    fungicide_6: require("../assets/FUNGICIDES/fungicide_6.png"),
    fungicide_7: require("../assets/FUNGICIDES/fungicide_7.png"),
    fungicide_8: require("../assets/FUNGICIDES/fungicide_8.jpg"),
    fungicide_9: require("../assets/FUNGICIDES/fungicide_9.jpg"),
    fungicide_10: require("../assets/FUNGICIDES/fungicide_10.png"),
    fungicide_11: require("../assets/FUNGICIDES/fungicide_11.png"),
    fungicide_12: require("../assets/FUNGICIDES/fungicide_12.jpg"),
    fungicide_13: require("../assets/FUNGICIDES/fungicide_13.png"),
    fungicide_14: require("../assets/FUNGICIDES/fungicide_14.jpg"),
    fungicide_15: require("../assets/FUNGICIDES/fungicide_15.jpg"),
    fungicide_16: require("../assets/FUNGICIDES/fungicide_16.jpg"),
    fungicide_17: require("../assets/FUNGICIDES/fungicide_17.png"),
    fungicide_18: require("../assets/FUNGICIDES/fungicide_18.jpg"),
    fungicide_19: require("../assets/FUNGICIDES/fungicide_19.jpg"),
    fungicide_20: require("../assets/FUNGICIDES/fungicide_20.jpg"),
    fungicide_21: require("../assets/FUNGICIDES/fungicide_21.png"),
    fungicide_22: require("../assets/FUNGICIDES/fungicide_22.png"),
    fungicide_23: require("../assets/FUNGICIDES/fungicide_23.jpg"),
    fungicide_24: require("../assets/FUNGICIDES/fungicide_24.jpg"),
    fungicide_25: require("../assets/FUNGICIDES/fungicide_25.png"),
    fungicide_26: require("../assets/FUNGICIDES/fungicide_26.jpg"),
    fungicide_27: require("../assets/FUNGICIDES/fungicide_27.jpeg"),
    fungicide_28: require("../assets/FUNGICIDES/fungicide_28.png"),
    fungicide_29: require("../assets/FUNGICIDES/fungicide_29.png"),
    fungicide_30: require("../assets/FUNGICIDES/fungicide_30.jpg"),
    fungicide_31: require("../assets/FUNGICIDES/fungicide_31.jpeg"),
    fungicide_32: require("../assets/FUNGICIDES/fungicide_32.jpg"),
    fungicide_33: require("../assets/FUNGICIDES/fungicide_33.jpg"),
    fungicide_34: require("../assets/FUNGICIDES/fungicide_34.jpg"),
    fungicide_35: require("../assets/FUNGICIDES/fungicide_35.jpg"),
    fungicide_36: require("../assets/FUNGICIDES/fungicide_36.jpg"),
    fungicide_37: require("../assets/FUNGICIDES/fungicide_37.jpg"),
    fungicide_38: require("../assets/FUNGICIDES/fungicide_38.jpg"),
    fungicide_39: require("../assets/FUNGICIDES/fungicide_39.jpg"),
    fungicide_40: require("../assets/FUNGICIDES/fungicide_40.jpg"),
  };

  const fungicideProducts = [
    {
      id: 1,
      name: "Nemasol – Soil Fumigant",
      image: fungicideImages.fungicide_1,
      description:
        "Nemasol is a soil fumigant for the control of soil fungi and nematodes in agricultural soils and seedbeds. Nemasol is a soil disinfectant which gives effective control of fungi and nematodes prior to crop seeding or planting. When it comes into contact with wet soil, Metam sodium decomposes into Methyl isothiocyanate, a gas which is the active substance. Metam Sodium acts quickly after application, decomposes and does not damage or leave residue in the planted field.",
      price: "UGX 830,800",
      manufacturer: "Uganda Crop Care Limited",
      activeIngredient: "Metam Sodium 510g/L",
      targetDiseases: [
        "Fusarium",
        "Pythium",
        "Rhizoctonia",
        "Pyrenochaeta",
        "Sclerotium spp",
        "Meloidogyne spp",
        "Pratylenchus spp",
        "Trichodorus spp",
      ],
      category: "Soil Treatment",
      applicationRate:
        "Soil Fungi: 13-18mls/20ltrs (650-900ltrs/Ha), Nematodes: 13-18mls/20ltrs (650-900ltrs/Ha)",
      reEntryPeriod: "48 hours",
      preHarvestInterval: "N/A",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction:
        "Decomposes into Methyl isothiocyanate gas which acts quickly after application",
      crops: ["Agricultural soils", "Seedbeds"],
      usageInstructions:
        "Apply by drenching infected soils. Do not apply Nemasol when soil temperature are below 10°C. For optimal efficacy, apply when soil temperatures are between 10°C and 25°C. Prepare the surface to be treated up to a depth of 40-50 cm and remove undecayed organic matter. Bring soil moisture to field capacity and at least 14 days before application and keep the soil moist up to application time. To prevent excessive evaporation, seal treated areas with either follow-up irrigation or plastic sheet. Aerate treated area thoroughly 2-3 weeks after application by cultivating the soil.",
      useLimitations:
        "Do not treat within 5m of existing trees and field crops. Do not apply when soil temperature below 10°C. Sub-optimal efficacy of Nemasol may occur on turf soils due to insufficient water penetration and soils with high organic matter content.",
      packaging: "60 Ltrs",
    },
    {
      id: 2,
      name: "Proplant 722Sl – Systemic Fungicide",
      image: fungicideImages.fungicide_2,
      description:
        "Proplant 722SL is a fungicide for the control of Downy mildew on Roses and dumping off on pepper. Proplant is a fungicide with systemic activity for the control of downy mildew on Roses and Dumping off on Pepper.",
      price: "UGX 95,800",
      manufacturer: "Uganda Crop Care Limited",
      activeIngredient: "Propamocarb hydrochloride 722g/L",
      targetDiseases: ["Downy Mildew (Roses)", "Damping off (Pepper)"],
      category: "Systemic Fungicide",
      applicationRate:
        "Roses (Downy Mildew): Foliar spray - 1.5-3ltrs/Ha, 150-300mls/100ltrs of water or 30-60mls/20ltrs of water at a spray interval of 7-10 days; Drenching - 3-6ltrs/Ha, apply on moist soil. Pepper (Dumping off): Foliar spray – 0.8ltrs/Ha, 80mls/100ltrs of water, 15mls/20ltrs of water at an application interval of 7-10 days. Drenching – 1ltr/Ha, apply on moist soil.",
      reEntryPeriod: "6 hours",
      preHarvestInterval: "Pepper 3 days",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction:
        "Proplant is a systemic fungicide that is absorbed by roots and translocated throughout the plant to aerial parts. It disrupts the formation of fungal cell walls by interfering with synthesis of phospholipids and Fatty Acids. It affects mycelia growth, spore production and germination. It has limited systemic activity when applied to the leaves.",
      crops: ["Roses", "Pepper"],
      usageInstructions:
        "Half fill the spray tank (Knapsack) with water. Add the required amount of Proplant then fill water to the required level and mix or agitate thoroughly to uniformity. Ensure that the mixture is used the same day.",
      useLimitations:
        "Half fill the spray tank (Knapsack) with water. Add the required amount of Proplant then fill water to the required level and mix or agitate thoroughly to uniformity. Ensure that the mixture is used the same day.",
      packaging: "1ltr",
    },
    {
      id: 3,
      name: "Goldazim 500 Sc - Fungicide For The Control Of Botrytis And Black Spots",
      image: fungicideImages.fungicide_3,
      description:
        "This is a Systemic Curative fungicide with Carbendazim 500g/L active ingredient. It is effective for the control of Powdery Mildew, Botrytis blight, Anthracnose spots, Fusarium Root rot, Ascochyta spots, Helminthosporium spots/ blight, Septoria leaf spots and Rhizoctonia root.",
      price: "UGX 90,700",
      manufacturer: "Uganda Crop Care Limited",
      activeIngredient: "Carbendazim 500g/L",
      targetDiseases: [
        "Powdery Mildew",
        "Botrytis Blight",
        "Anthracnose",
        "Fusarium Root Rot",
        "Ascochyta Spots",
        "Helminthosporium Spots",
        "Septoria Leaf Spots",
        "Rhizoctonia Root",
      ],
      category: "Systemic Curative",
      applicationRate: "20mls/20ltrs of water",
      reEntryPeriod: "6 days",
      preHarvestInterval: "10-14 days",
      whoClassification: "Class III (slightly hazardous)",
      registrationNumber: "N/A",
      modeOfAction: "Systemic curative action",
      crops: ["Various crops"],
      usageInstructions:
        "Dosage: 20mls/20ltrs of water. Re-Entry interval: 6 days. Spray Interval: 10-14 days. Formulation: Suspension Concentrate (SC).",
      packaging: "1 Ltr",
    },
    {
      id: 4,
      name: "Alliete Flash Wg 80 - Systemic Fungicide For The Control Of Downy Mildew In Roses",
      image: fungicideImages.fungicide_4,
      description:
        "Alliete Flash WG 80 is a systemic fungicide for the control of downy mildew in Roses. It can be Applied as a preventive schedule or during early disease symptoms.",
      price: "UGX 148,500",
      manufacturer: "Uganda Crop Care Limited",
      activeIngredient: "Fosetyl-Aluminium 800g/kg",
      targetDiseases: ["Downy Mildew"],
      category: "Systemic Fungicide",
      applicationRate:
        "Roses (Foliar spray): 20-25g/20ltrs of water (2.0-2.5kg/Ha in 1200 – 2000ltrs of water). Roses (Soil drench application): 5-6kg/Ha in 1000ltrs of water at a 2 weeks interval",
      reEntryPeriod: "N/A",
      preHarvestInterval: "N/A",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction: "Systemic action",
      crops: ["Roses"],
      usageInstructions:
        "Roses (Foliar spray): 20-25g/20ltrs of water (2.0-2.5kg/Ha in 1200 – 2000ltrs of water). Roses (Soil drench application): 5-6kg/Ha in 1000ltrs of water at a 2 weeks interval. Formulation: Water Dispersible Granules.",
      packaging: "1 Kg",
    },
    {
      id: 5,
      name: "Folio Gold 537.5 Sc - Fungicide For Control Of Downy Mildew",
      image: fungicideImages.fungicide_5,
      description:
        "Folio Gold 537.5 SC is a systemic and residual fungicide for the control of Downy Mildew and white rust in ornamentals/flowers. It can be Applied as a preventive schedule or during early disease symptoms.",
      price: "UGX 153,600",
      manufacturer: "Uganda Crop Care Limited",
      activeIngredient: "37.5g/ltr Metalaxyl-M + 500g/ltr Chlorothalonil",
      targetDiseases: ["Downy Mildew", "White Rust", "Botrytis"],
      category: "Systemic and Residual",
      applicationRate:
        "Roses: Apply a maximum of 3 Folio Gold® 537.5 SC sprays per season. Downy mildew: Apply at 2.0-2.5 lt./ha (200-250 g/100litres water or 40-50g/20ltr Knapsack sprayer). Do not exceed the recommended rate per hectare when using the hector-liter recommendations.",
      reEntryPeriod: "N/A",
      preHarvestInterval: "10-14 days",
      whoClassification: "Class III",
      registrationNumber: "N/A",
      modeOfAction:
        "Metalaxyl-M is a systemic fungicide which is rapidly taken up by the green plant part (within 30 min.) transported upwards in the sap stream and is distributed thus provides control of fungi from within the plant. Chlorothalonil provides a protective film over plant surfaces hence inhibits germination of the spores.",
      crops: ["Ornamentals", "Flowers"],
      usageInstructions:
        "Begin applications when conditions are favorable for disease, but before infection, and continue at 10–14-day intervals. An innovative fungicide mix developed and introduced in order to improve the control in the key plant diseases like downy mildew, botrytis and white rust.",
      packaging: "1 Ltr",
    },
    {
      id: 6,
      name: "Amistar 250 Sc – Broad Spectrum Fungicide",
      image: fungicideImages.fungicide_6,
      description:
        "Amistar is a broad-spectrum fungicide ideally suited for use in IPM programs in a wide range of crops to control fungal diseases such as Net blotch, leaf rust, spot blotch and scald. Amistar is a strobilurin fungicide based on naturally occurring substances found in certain species of wild mushrooms. The active ingredient in Amistar, azoxystrobin, controls a very wide spectrum of disease in wheat and barley. Amistar not only controls the key late-season flag leaf and ear diseases that erode yield and quality, but also promotes a range of beneficial physiological and greening effects, so helping the crop towards its full genetic potential.",
      price: "UGX 1,142,500",
      manufacturer: "Uganda Crop Care Limited",
      activeIngredient: "Azoxystrobin 250g/L",
      targetDiseases: ["Net Blotch", "Leaf Rust", "Spot Blotch", "Scald"],
      category: "Broad Spectrum",
      applicationRate: "Apply at 0.75 ltrs/ha",
      reEntryPeriod: "N/A",
      preHarvestInterval: "N/A",
      whoClassification: "Class III",
      registrationNumber: "UgC/2017/001576/Fu/R",
      modeOfAction:
        "Strobilurin fungicide based on naturally occurring substances from wild mushrooms",
      crops: ["Wheat", "Barley"],
      usageInstructions:
        "Apply at 0.75 ltrs/ha. Formulations: Soluble concentrate (SC). WHO classification: III.",
      keyBenefits:
        "Stops disease even before it starts. Delays onset senescence hence prolonging Green leaf Area (GLA). Treated crop able to cope better with water stress (water use efficiency). Treated crop has improved ability to use nitrogen efficiently and assimilate it into proteins.",
      packaging: "5 Ltrs",
    },
    {
      id: 7,
      name: "Apron Star 42Ws - Seed Treatment Fungicide-insecticide",
      image: fungicideImages.fungicide_7,
      description:
        "APRON STAR is a seed treatment fungicide-insecticide mixture for controlling downy mildew, damping-off diseases as well as for protection of seeds and seedlings against early season insect pests and soil borne diseases in beans, sorghum, maize, cotton and vegetables. It offers outstanding control of early season insect pests and diseases, Increased crop vigour and Greater yields.",
      price: "UGX 438,300",
      manufacturer: "Uganda Crop Care Limited",
      activeIngredient:
        "Thiamethoxam 20% + Metalaxyl - 20% + Difenoconazole 2%",
      targetDiseases: [
        "Downy Mildew",
        "Damping Off",
        "Early Season Pests",
        "Pythium spp",
        "Fusarium spp",
        "Septoria spp",
      ],
      category: "Seed Treatment",
      applicationRate: "Seed treatment",
      reEntryPeriod: "N/A",
      preHarvestInterval: "N/A",
      whoClassification: "Not specified",
      registrationNumber: "UgC/2018/001803/Fu/RRRRR",
      modeOfAction:
        "Thiamethoxam: Interferes with the receptor protein nicotinic and acetyl choline of the nervous system. It has contact, stomach and systemic activity. Insects susceptible to Thiamethoxam almost die instantly. Metalaxyl -M: Penetrates the seed coat and is systemically translocated to both shoots and roots during germination. Difenoconazole: Systemic triazole fungicide with a broad spectrum anti-fungal activity.",
      crops: [
        "Beans",
        "Sorghum",
        "Maize",
        "Cotton",
        "Vegetables",
        "French beans",
        "Runner beans",
        "Snow peas",
        "Sugar snaps",
        "Garden peas",
        "Baby corn",
      ],
      usageInstructions:
        "APRON STAR shows root, leaf and stem systemic activity. The three-way powered seedling protection is based on modern chemistry. Some of the vegetable crops where APRON STAR has been used successfully include: French beans, Runner beans, Snow peas, Sugar snaps, Garden peas and Baby corn. Compatibility: APRON STAR has a broad spectrum of activity and is not expected to be mixed with other products.",
      keyBenefits:
        "It stimulates root development leading to vigorous starts, uniform growth and higher yields. Strong against critical early season diseases - Pythium, Fusarium and early seasons pests - Bean Fly, Termites, Thrips, Jassids, Whiteflies etc. Controls sucking pests for about 21 days / 3 weeks after planting",
      packaging: "1 Kg",
    },
    {
      id: 8,
      name: "Tata Master 72Wp",
      image: fungicideImages.fungicide_8,
      description:
        "Systemic and contact fungicide for the control of early and late blight on potatoes, tomatoes, grapes; downy mildew in all crops including roses; fungal leaf spot diseases and damping off in vegetables. Tata Master 72WP is a fungicide trusted by farmers for control of diseases such as downy mildew, damping off and blight. The action on downy mildew disease is remarkably fast. And also very effective in preventing damping off invading young tomatoes, potatoes, and other vegetables.",
      price: "UGX 5,300 - 40,000",
      manufacturer: "Nsanja Agrochemicals Ltd",
      activeIngredient: "Metalaxyl + Mancozeb",
      targetDiseases: [
        "Early Blight",
        "Late Blight",
        "Downy Mildew",
        "Fungal Leaf Spot",
        "Damping Off",
      ],
      category: "Systemic and Contact",
      applicationRate:
        "Dosage: Use 50g of Tata Master 72WP per 20 Ltrs water and ensure 2.5kg per Ha is used for thorough coverage",
      reEntryPeriod: "N/A",
      preHarvestInterval: "PHI: 14 days",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction:
        "Systemic and contact action with remarkably fast action on downy mildew",
      crops: ["Potatoes", "Tomatoes", "Grapes", "Roses", "Vegetables"],
      usageInstructions:
        "Use 50g of Tata Master 72WP per 20 Ltrs water and ensure 2.5kg per Ha is used for thorough coverage, PHI: 14 days",
      packaging:
        "100 g: UGX 5,300, 250 g: UGX 10,800, 500 g: UGX 21,600, 1 Kg: UGX 40,000",
    },
    {
      id: 9,
      name: "Ascozeb 80 Wp - Broad Spectrum Preventive Fungicide",
      image: fungicideImages.fungicide_9,
      description:
        "Broad spectrum preventive fungicide for use against early and late blight in potatoes, tomatoes, blotch and downy mildew in onions and botrytis in roses.",
      price: "UGX 6,800 - 365,900",
      manufacturer: "Syova Seed (U) Ltd",
      activeIngredient: "Mancozeb 800g/kg",
      targetDiseases: [
        "Early Blight",
        "Late Blight",
        "Blotch",
        "Downy Mildew",
        "Botrytis",
      ],
      category: "Preventive",
      applicationRate:
        "1kg/acre (40-60g/20ltrs for tomatoes/potatoes/onions, 50-60g/20ltrs for roses)",
      reEntryPeriod: "7 days",
      preHarvestInterval: "7 days",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction: "Preventive contact action",
      crops: ["Potatoes", "Tomatoes", "Onions", "Roses"],
      usageInstructions:
        "Rate of use: 1kg/acre. Mix 40-60g/20ltrs water for tomatoes, potatoes and onions. 50-60g/20ltrs water for roses.",
      packaging:
        "250g: UGX 6,800, 1Kg: UGX 22,000, 25Kg: UGX 365,900, 10Kg: UGX 179,900",
    },
    {
      id: 10,
      name: "Milraz Wp 76 - Broad Spectrum Preventive & Curative Fungicide",
      image: fungicideImages.fungicide_10,
      description:
        "Broad-spectrum preventive & curative fungicide for control of early and late blight in potatoes, downy mildew and anthracnose in cucurbits, downy mildew and purple blotch in onions. Foliar applied combination product of two active ingredients – Propineb, the contact fungicide, and Cymoxanil, the local systemic fungicide.",
      price: "UGX 80,100 - 148,500",
      manufacturer: "Uganda Crop Care Limited",
      activeIngredient: "Propineb + Cymoxanil",
      targetDiseases: [
        "Early Blight",
        "Late Blight",
        "Downy Mildew",
        "Anthracnose",
        "Purple Blotch",
      ],
      category: "Preventive & Curative",
      applicationRate: "2kgs/ha or 40g/20ltrs of water",
      reEntryPeriod: "7-14 days",
      preHarvestInterval:
        "Potatoes: 14 days, Tomatoes: 7 days, Cucurbits: 7 days, Onions: 14 days",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction:
        "Foliar applied combination of Propineb (contact) and Cymoxanil (local systemic)",
      crops: [
        "Potatoes",
        "Tomatoes",
        "Cucurbits (Watermelon, Sweet melon, Squash)",
        "Onions",
      ],
      usageInstructions:
        "Apply first spray early before disease symptoms appear and as soon as climatic conditions are conducive to disease development. Repeat at 14 days interval, reduce to 7-10 days when infection occurs or in irrigated crops.",
      packaging: "1Kg: UGX 148,500, 500gms: UGX 80,100",
    },
    {
      id: 11,
      name: "Daconil 720 Sc – Fungicide For Controlling A Wide Range Of Fungal Infections",
      image: fungicideImages.fungicide_11,
      description:
        "Contact fungicide for coffee berry disease and vegetable diseases. The built-in surfactant makes the active ingredient cover and stick to the leaves and berries for unsurpassed protection, even after heavy rain or watering. The surfactant prolongs the anti-fungal effect up to 21 days when used at recommended rates.",
      price: "UGX 31,465 - 1,552,100",
      manufacturer: "Uganda Crop Care Limited",
      activeIngredient: "Chlorothalonil 720g/L",
      targetDiseases: [
        "Coffee Berry Disease",
        "Bean Rust",
        "Angular Leaf Spot",
        "Anthracnose",
        "Botrytis",
        "Aschochytes",
        "Early Blight",
        "Late Blight",
      ],
      category: "Contact",
      applicationRate: "Vegetables: 2ltrs/ha, Coffee: 2.2ltrs/ha",
      reEntryPeriod: "N/A",
      preHarvestInterval: "N/A",
      whoClassification: "Class III",
      registrationNumber: "UgC/2017/001597/Fu/R",
      modeOfAction:
        "Contact action with built-in surfactant, multi-site mode of action",
      crops: [
        "Coffee",
        "Cereals",
        "Ornamentals",
        "Potatoes",
        "Vegetables",
        "French beans",
        "Snow peas",
        "Roses",
      ],
      usageInstructions:
        "Apply at 2ltrs/ha in vegetables, 2.2ltrs/ha in coffee. Built-in surfactant makes active ingredient cover and stick to leaves and berries for unsurpassed protection. Mixes quickly and completely into suspension for up to six hours.",
      keyBenefits:
        "Does not wash off, stops spread of many fungal diseases, attacks disease cells from multiple sites, minimizes fungicide resistance development, consistent application from start to finish",
      packaging: "20 Ltrs: UGX 1,552,100, 500ml: UGX 31,465",
    },
    {
      id: 12,
      name: "Thiovit Jet – Broad Spectrum Fungicide",
      image: fungicideImages.fungicide_12,
      description:
        "Broad spectrum fungicide with contact, fumigant and residual activity against mites and powdery mildew, due to its optimum particle size. Used in a wide range of fruits, vegetables, ornamentals, coffee, tea, cashews and field crops.",
      price: "UGX 28,500",
      manufacturer: "Uganda Crop Care Limited",
      activeIngredient: "Sulphur 80g/L (elemental)",
      targetDiseases: ["Powdery Mildew", "Mites"],
      category: "Contact",
      applicationRate:
        "Citrus: 40-160g/20ltrs, Coffee: 0-80g/20ltrs, Grapes: 80-160g/20ltrs, Ornamentals: 40-160g/20ltrs, Tea: 60g/20ltrs",
      reEntryPeriod: "N/A",
      preHarvestInterval: "N/A",
      whoClassification: "Class III",
      registrationNumber: "UgC/2018/001799/Fu/RRRRRR",
      modeOfAction:
        "Contact and vapour action enhanced by sublimation of sulphur. Uptake through roots as sulphate and through roots and leaf cuticle as sulphur dioxide",
      crops: [
        "Citrus",
        "Coffee",
        "Grapes",
        "Ornamentals",
        "Tea",
        "Cashews",
        "Field crops",
      ],
      usageInstructions:
        "Apply at recommended rates for specific crops. Contact action relies upon good leaf coverage and close proximity with fungus. Vapour action depends upon surface contact with air and level of sublimation.",
      keyBenefits:
        "Highly preventive against powdery mildew, prevents and corrects sulphur deficiency, broad spectrum solution, suppresses mites infestation, safe dustless formulation",
      packaging: "1 Kg",
    },
    {
      id: 13,
      name: "Equation Pro – Broad Spectrum Fungicide Against Blights And Many Fungal Infections",
      image: fungicideImages.fungicide_13,
      description:
        "Broad spectrum contact and systemic fungicide used against early and late blight on potatoes; late blight on tomatoes; downy mildew on snow peas, onions, and roses; bean rust, bean anthracnose, powdery mildew on cucurbits and angular leaf spot on French beans.",
      price: "UGX 6,600 - 189,500",
      manufacturer: "Uganda Crop Care Limited",
      activeIngredient: "Famoxadone 225g/kg + Cymoxanil 300g/kg",
      targetDiseases: [
        "Early Blight",
        "Late Blight",
        "Downy Mildew",
        "Bean Rust",
        "Bean Anthracnose",
        "Powdery Mildew",
        "Angular Leaf Spot",
      ],
      category: "Systemic",
      applicationRate: "400gms/ha (10gms/20ltrs)",
      reEntryPeriod: "3-28 days",
      preHarvestInterval:
        "Vineyard: 28 days, Vegetables: 3 days, Potatoes: 14 days",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction: "Contact and systemic action",
      crops: [
        "Potatoes",
        "Tomatoes",
        "Snow peas",
        "Onions",
        "Roses",
        "Cucurbits",
        "French beans",
      ],
      usageInstructions:
        "Apply at 400gms/ha (10gms/20ltrs). In times of serious disease pressure, spraying recommended every 7-10 days interval. Do not exceed 4 applications per growing season.",
      packaging: "80g: UGX 43,600, 10g: UGX 6,600, 400g: UGX 189,500",
    },
    {
      id: 14,
      name: "Uthane 80 Wp - Broad Spectrum Preventive Fungicide",
      image: fungicideImages.fungicide_14,
      description:
        "Broad spectrum preventive fungicide for use against early and late blight in potatoes, tomatoes, blotch and downy mildew in onions and botrytis in roses.",
      price: "UGX 142,000 - 320,000",
      manufacturer: "Syova Seed (U) Ltd",
      activeIngredient: "Mancozeb 800g/kg",
      targetDiseases: [
        "Early Blight",
        "Late Blight",
        "Blotch",
        "Downy Mildew",
        "Botrytis",
      ],
      category: "Preventive",
      applicationRate:
        "1kg/acre (40-60g/20ltrs for tomatoes/potatoes/onions, 50-60g/20ltrs for roses)",
      reEntryPeriod: "7 days",
      preHarvestInterval: "7 days",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction: "Preventive contact action",
      crops: ["Potatoes", "Tomatoes", "Onions", "Roses"],
      usageInstructions:
        "Rate of use: 1kg/acre. Mix 40-60g/20ltrs water for tomatoes, potatoes and onions. 50-60g/20ltrs water for roses.",
      packaging: "25 Kgs: UGX 320,000, 10 Kg: UGX 142,000",
    },
    {
      id: 15,
      name: "Topilite 70%W.p - Systemic Broad-spectrum Protective And Curative Fungicide",
      image: fungicideImages.fungicide_15,
      description:
        "Systemic broad-spectrum protective and curative fungicide that is very effective against Mildew, anthracnose, scabs, rust, early blight and with a considerable degree of control of fusarium wilt.",
      price: "UGX 6,000",
      manufacturer: "Bukoola Chemical Industries (U) Ltd",
      activeIngredient: "Thiophanate-methyl 70%",
      targetDiseases: [
        "Mildew",
        "Anthracnose",
        "Scabs",
        "Rust",
        "Early Blight",
        "Fusarium Wilt",
      ],
      category: "Systemic",
      applicationRate: "30-40g/20ltrs",
      reEntryPeriod: "1 day",
      preHarvestInterval: "1 day (24hours)",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction: "Systemic broad-spectrum protective and curative action",
      crops: ["Various crops"],
      usageInstructions:
        "Mix 30-40g of Topilite in 20L of water. Application Interval: 7-10days.",
      packaging: "100 g",
    },
    {
      id: 16,
      name: "Pearl 500 Sc",
      image: fungicideImages.fungicide_16,
      description:
        "Systemic, broad-spectrum fungicide with protective and curative action. It is absorbed through the green tissues and roots, with translocation acropetally. Can be used to control Anthracnose, white mould, Fusarium wilt, Damping off, leaf spot, Botrytis, Ascochyta, Powdery Mildew, Stem rot, Alternaria blight and fruit rot.",
      price: "UGX 6,100 - 69,500",
      manufacturer: "Osho Chemical Industries Ltd",
      activeIngredient: "Carbendazim 500g/L",
      targetDiseases: [
        "Anthracnose",
        "White Mould",
        "Fusarium Wilt",
        "Damping Off",
        "Leaf Spot",
        "Botrytis",
        "Ascochyta",
        "Powdery Mildew",
        "Stem Rot",
        "Alternaria Blight",
        "Fruit Rot",
      ],
      category: "Systemic",
      applicationRate: "20mls/20ltrs (200mls per acre)",
      reEntryPeriod: "N/A",
      preHarvestInterval: "N/A",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction:
        "Systemic action absorbed through green tissues and roots with translocation acropetally",
      crops: ["Various crops"],
      usageInstructions:
        "Mix 20mls per 20ltrs of water. Application rate: 200mls per acre.",
      packaging:
        "1 Ltr: UGX 69,500, 50 ml: UGX 6,100, 100 ml: UGX 6,600, 250 ml: UGX 15,300",
    },
    {
      id: 17,
      name: "Bellis 38% Wg – Systemic And Protective Fungicide",
      image: fungicideImages.fungicide_17,
      description:
        "Protectant and systemic fungicide for control of apple scab and powdery mildew in apples and scab control in pears. Will provide reduction of storage rots caused by Gloeosporium, Alternaria, Botrytis and Penicillium species in apples and pears.",
      price: "UGX 350,000",
      manufacturer: "Uganda Crop Care Limited",
      activeIngredient: "Boscalid 25.2% + Pyraclostrobin 12.8%",
      targetDiseases: [
        "Apple Scab",
        "Powdery Mildew",
        "Storage Rots",
        "Gloeosporium",
        "Alternaria",
        "Botrytis",
        "Penicillium",
      ],
      category: "Systemic",
      applicationRate: "0.8 kg/ha",
      reEntryPeriod: "7 days",
      preHarvestInterval: "7 days before harvest",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction: "Protectant and systemic action",
      crops: ["Apples", "Pears"],
      usageInstructions:
        "Maximum individual dose: 0.8 kg per hectare. Latest time of application: 7 days before harvest. Maximum number of treatments: 4 per year. Water volume: 300 to 1500 litres per hectare.",
      keyBenefits:
        "Protection of quality in storage through control of flower infecting diseases, improved plant health for increased yield and quality, short Pre-Harvest Interval (PHI)",
      packaging: "1kg",
    },
    {
      id: 18,
      name: "Ascopper 50 Wp - A Copper Based Fungicide",
      image: fungicideImages.fungicide_18,
      description:
        "Copper based fungicide used for control of bacterial diseases like leaf spots, fruit rots, anthracnose, cankers etc in Vegetables and fruit trees. Controls coffee leaf rust and leaf rusts in various crops.",
      price: "UGX 15,000 - 45,200",
      manufacturer: "Syova Seed (U) Ltd",
      activeIngredient: "Copper oxychloride 500g/kg",
      targetDiseases: [
        "Leaf Spots",
        "Fruit Rots",
        "Anthracnose",
        "Cankers",
        "Coffee Leaf Rust",
      ],
      category: "Contact",
      applicationRate: "1kg/acre (50g/20ltrs)",
      reEntryPeriod: "N/A",
      preHarvestInterval: "N/A",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction: "Copper based contact action",
      crops: ["Vegetables", "Fruit trees", "Coffee"],
      usageInstructions: "Rate of use: 1kg/acre. Mixing: 50g/20ltrs of water.",
      packaging: "500 gms: UGX 24,300, 1 Kg: UGX 45,200",
    },
    {
      id: 19,
      name: "Oshothane 80 Wp",
      image: fungicideImages.fungicide_19,
      description:
        "Broad-spectrum protective fungicide that controls a wide range of fungal diseases on a variety of crops. Can be used to control early and late blight, Downy mildew, Anthracnose, leaf spots and botrytis.",
      price: "UGX 22,000 - 455,700",
      manufacturer: "Osho Chemical Industries Ltd",
      activeIngredient: "Mancozeb 80%",
      targetDiseases: [
        "Early Blight",
        "Late Blight",
        "Downy Mildew",
        "Anthracnose",
        "Leaf Spots",
        "Botrytis",
      ],
      category: "Preventive",
      applicationRate: "50grams per 20ltrs of water (500grams per acre)",
      reEntryPeriod: "N/A",
      preHarvestInterval: "N/A",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction: "Broad-spectrum protective action",
      crops: ["Various crops"],
      usageInstructions:
        "Mixing: 50grams per 20ltrs of water. Application rate: 500grams per acre.",
      packaging:
        "1 Kg: UGX 22,000, 2.5kg: UGX 34,100, 5 Kg: UGX 98,000, 25 Kg: UGX 455,700",
    },
    {
      id: 20,
      name: "Ascosulph 80 Wdg - A Broad-spectrum Contact Fungicideacaricide",
      image: fungicideImages.fungicide_20,
      description:
        "Broad-spectrum contact fungicide/acaricide for control of powdery Mildew, Rust, leaf spot in vegetables and fruit trees. It has an effect of mite control.",
      price: "UGX 3,400 - 18,500",
      manufacturer: "Syova Seed (U) Ltd",
      activeIngredient: "Sulphur 800g/kg",
      targetDiseases: ["Powdery Mildew", "Rust", "Leaf Spot", "Mites"],
      category: "Contact",
      applicationRate:
        "40g/20ltrs for vegetables and ornamentals, 80-100g/20ltrs for citrus and mango trees",
      reEntryPeriod: "N/A",
      preHarvestInterval: "N/A",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction: "Broad-spectrum contact fungicide/acaricide action",
      crops: ["Vegetables", "Fruit trees", "Ornamentals", "Citrus", "Mango"],
      usageInstructions:
        "Rate of use: 40g/20ltrs of water for vegetables and ornamentals, 80-100g/20ltrs of water for citrus and mango trees.",
      packaging: "100 gms: UGX 3,400, 500 gms: UGX 10,400, 1 Kg: UGX 18,500",
    },
    {
      id: 21,
      name: "Fighter",
      image: fungicideImages.fungicide_21,
      description:
        "Insecticide formulated to effectively control weeds & certain grasses. Crop damage by weeds is a major problem and can affect yields.",
      price: "UGX 11,250 - 17,500",
      manufacturer: "Nsanja Agrochemicals Ltd",
      activeIngredient: "Herbicide",
      targetDiseases: ["Weeds", "Grasses"],
      category: "Herbicide",
      applicationRate: "As per label",
      reEntryPeriod: "N/A",
      preHarvestInterval: "N/A",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction: "Herbicide action",
      crops: ["Various crops"],
      usageInstructions:
        "Apply as per label instructions for effective weed and grass control.",
      packaging: "500 gms: UGX 17,500, 250 gms: UGX 11,250",
    },
    {
      id: 22,
      name: "Goldazim 500 Sc",
      image: fungicideImages.fungicide_22,
      description:
        "Systemic / Curative fungicide with Carbendazim 500g/L active ingredient. It is effective for control of Powdery Mildew, Botrytis blight, Anthracnose spots, Fusarium Root rot, Ascochyta spots, Helminthosporium spots/ blight, Septoria leaf spots and Rhizoctonia root.",
      price: "UGX 10,600 - 76,000",
      manufacturer: "Balton Uganda Ltd",
      activeIngredient: "Carbendazim 500g/L",
      targetDiseases: [
        "Powdery Mildew",
        "Botrytis Blight",
        "Anthracnose",
        "Fusarium Root Rot",
        "Ascochyta Spots",
        "Helminthosporium Spots",
        "Septoria Leaf Spots",
        "Rhizoctonia Root",
      ],
      category: "Systemic",
      applicationRate: "20mls/20ltrs of water",
      reEntryPeriod: "6 days",
      preHarvestInterval: "N/A",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction: "Systemic curative action",
      crops: ["Various crops"],
      usageInstructions:
        "Dosage: 20mls/20ltrs of water. Re-Entry interval: 6 days.",
      packaging: "100mls: UGX 10,600, 1ltr: UGX 76,000",
    },
    {
      id: 23,
      name: "Nordox Super 75 Wg",
      image: fungicideImages.fungicide_23,
      description:
        "Inorganic copper-based fungicide used to control Coffee Berry disease, Bacterial blight of coffee and Leaf rust in vegetables and other crops.",
      price: "UGX 70,200",
      manufacturer: "Balton Uganda Ltd",
      activeIngredient: "Copper oxychloride 75%",
      targetDiseases: ["Coffee Berry Disease", "Bacterial Blight", "Leaf Rust"],
      category: "Contact",
      applicationRate:
        "Coffee: 3.8kg/Ha, Other crops: 2.4kg/Ha (70grams/20ltrs)",
      reEntryPeriod: "6 days",
      preHarvestInterval: "N/A",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction: "Inorganic copper-based contact action",
      crops: ["Coffee", "Vegetables", "Other crops"],
      usageInstructions:
        "Re-entry interval: 6 days. Rate: 3.8kg/Ha in coffee and 2.4kg/Ha in other crops. Mixing: 70grams/20ltrs of water.",
      packaging: "1 Kg",
    },
    {
      id: 24,
      name: "Mister 72 Wp",
      image: fungicideImages.fungicide_24,
      description:
        "Systemic and contact, broad spectrum, protective and curative fungicide. It is used to control late blight, downy mildew, Anthracnose, cercospora leaf spot and botrytis.",
      price: "UGX 4,500 - 40,000",
      manufacturer: "Osho Chemical Industries Ltd",
      activeIngredient: "Metalaxyl + Mancozeb",
      targetDiseases: [
        "Late Blight",
        "Downy Mildew",
        "Anthracnose",
        "Cercospora Leaf Spot",
        "Botrytis",
      ],
      category: "Systemic",
      applicationRate: "50grams per 20ltrs of water (500grams per acre)",
      reEntryPeriod: "N/A",
      preHarvestInterval: "N/A",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction:
        "Systemic and contact broad spectrum protective and curative action",
      crops: ["Various crops"],
      usageInstructions:
        "Mixing: 50grams per 20ltrs of water. Application rate: 500grams per acre.",
      packaging:
        "500 g: UGX 19,000, 100 g: UGX 4,500, 250 g: UGX 8,600, 1 Kg: UGX 40,000",
    },
    {
      id: 25,
      name: "Fungo Force 72 Wp – Contact, Systemic, Preventive And Curative Fungicide",
      image: fungicideImages.fungicide_25,
      description:
        "Dual action broad-spectrum Fungicide that controls a wide range of fungal disease by its preventive as well as curative action. It's mode of action is both systemic and contact. Used for preventing or delaying resistance development to Fungi.",
      price: "UGX 2,836 - 25,145",
      manufacturer: "Jubaili Agrotec Limited",
      activeIngredient: "Metalaxyl 8% + Mancozeb 64%",
      targetDiseases: [
        "Downy Mildew",
        "Late Blight",
        "Damping Off",
        "Phytophthora Rots",
        "Early Blight",
        "Powdery Mildew",
        "Leaf Blight",
      ],
      category: "Systemic",
      applicationRate: "50g/20ltrs of water (1-2kg per hectare)",
      reEntryPeriod: "48 hours",
      preHarvestInterval: "14 days",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction:
        "Dual action broad-spectrum with preventive and curative action, both systemic and contact",
      crops: [
        "Coffee",
        "Tobacco",
        "Potato",
        "Tomato",
        "Pepper",
        "Onion",
        "Carrot",
        "Lettuce",
        "Cabbage",
        "Okra",
        "Watermelon",
        "Beans",
        "French beans",
      ],
      usageInstructions:
        "Calibrate sprayer before use. Half fill sprayer with clean water and add recommended quantity. Agitate during completion of filling. Coffee/tobacco: 50g/20ltrs (1-2kg/ha). Vegetables: 50g/20ltrs (1-2kg/ha). Beans: 50g/20ltrs (1-2kg/ha).",
      keyBenefits:
        "Prevents or delays resistance development to Fungi, controls foliar and soil diseases, can be used as seed treatment, foliar spray and nursery drench",
      packaging: "1 Kg: UGX 25,145, 250 gms: UGX 6,420, 100 gms: UGX 2,836",
    },
    {
      id: 26,
      name: "Z-force",
      image: fungicideImages.fungicide_26,
      description:
        "Preventive, contact, fungicide recommended for field crops, vegetables, orchards.",
      price: "UGX 4,708 - 327,420",
      manufacturer: "Jubaili Agrotec Limited",
      activeIngredient: "Mancozeb 80%",
      targetDiseases: ["Fungal Diseases"],
      category: "Preventive",
      applicationRate: "1.5 kg/ha (50g/20ltrs)",
      reEntryPeriod: "N/A",
      preHarvestInterval: "N/A",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction: "Preventive contact action",
      crops: ["Field crops", "Vegetables", "Orchards"],
      usageInstructions: "Rate of use: 1.5 kg/ha. Mixing: 50g/20ltrs of water.",
      packaging:
        "25 Kg: UGX 327,420, 10 Kg: UGX 140,170, 1 Kg: UGX 17,120, 250 g: UGX 4,708",
    },
    {
      id: 27,
      name: "1Kg Sulcop-tomatoes Fungicide",
      image: fungicideImages.fungicide_27,
      description:
        "Broad spectrum, inorganic green copper fungicide. It is a contact, preventive fungicide for control of a wide range of diseases such as late blight of potatoes, tomatoes and other vegetables, leaf spot diseases, Downey mildews, cankers, scab and asparagus rust etc. It is a multi-fungicide that prevents germination of fungal spores killing them.",
      price: "UGX 47,000",
      manufacturer: "Osho Chemical Industries Ltd",
      activeIngredient: "Copper oxychloride",
      targetDiseases: [
        "Late Blight",
        "Early Blight",
        "Bacterial Spot",
        "Anthracnose",
        "Leaf Spot Diseases",
        "Downey Mildews",
        "Cankers",
        "Scab",
        "Asparagus Rust",
        "Rust",
        "Bacterial Blight",
        "White Rust",
        "Fusarium Wilt",
        "Stem Rot",
        "Alternaria Blight",
        "Fruit Rot",
      ],
      category: "Contact",
      applicationRate: "50g/20Lt (2.5 kg/Ha)",
      reEntryPeriod: "N/A",
      preHarvestInterval: "N/A",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction:
        "Contact, preventive fungicide that prevents germination of fungal spores",
      crops: [
        "French beans",
        "Brassica",
        "Lettuce",
        "Tomatoes",
        "Pepper",
        "Squash",
        "Egg plant",
        "Potatoes",
        "Vegetables",
      ],
      usageInstructions:
        "Rate: 50g/20Lt 2.5 kg/Ha. It disperses readily in water and spread evenly on the leaf surface.",
      packaging: "1kg",
    },
    {
      id: 28,
      name: "Control 70 Wgd",
      image: fungicideImages.fungicide_28,
      description:
        "Systemic fungicide with curative and protective action. Targets: Scab, powdery mildews, canker, Botrytis and Sclerotinia spp.",
      price: "UGX 35,000 - 65,000",
      manufacturer: "Osho Chemical Industries Ltd",
      activeIngredient: "Thiophanate Methyl 70%",
      targetDiseases: [
        "Scab",
        "Powdery Mildew",
        "Canker",
        "Botrytis",
        "Sclerotinia spp",
      ],
      category: "Systemic",
      applicationRate: "16g/20Ltrs of water (800g/Ha)",
      reEntryPeriod: "N/A",
      preHarvestInterval: "N/A",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction: "Systemic fungicide with curative and protective action",
      crops: ["Various crops"],
      usageInstructions: "Rate of use: 16g/20Ltrs of water (800g/Ha).",
      packaging: "1kg: UGX 65,000, 500g: UGX 35,000",
    },
    {
      id: 29,
      name: "Ridomil Gold Mz 68Wg - Systemic And Contact Fungicide",
      image: fungicideImages.fungicide_29,
      description:
        "Systemic and contact fungicide for control of early and late blight, damping off and downy mildew in potatoes, tomatoes and vegetables. It is that one fungicide you can rely on for Healthy crops, increased yields, high quality harvests.",
      price: "UGX 23,900 - 85,800",
      manufacturer: "Uganda Crop Care Limited",
      activeIngredient: "Metalaxyl-M 40g/Kg + Mancozeb 640g/Kg",
      targetDiseases: [
        "Early Blight",
        "Late Blight",
        "Damping Off",
        "Downy Mildew",
      ],
      category: "Systemic",
      applicationRate:
        "50g/20ltrs of water (2.5kg/ha in ornamentals & vegetables)",
      reEntryPeriod: "7 days",
      preHarvestInterval: "7 days",
      whoClassification: "Class III",
      registrationNumber: "UgC/2018/001806/Fu/RRRRRRRR",
      modeOfAction:
        "Metalaxyl-M: systemic uptake within 30 min, Mancozeb: protective film inhibiting spore germination",
      crops: ["Potatoes", "Tomatoes", "Vegetables", "Ornamentals"],
      usageInstructions:
        "Mixing: 50g/20ltrs of water. Application Interval: 7-14 days depending on crop. Check product label for specific mixing according to crop.",
      keyBenefits:
        "Excellent disease control under difficult conditions, longer period of disease control hence less applications, environment friendly due to pure formulation",
      packaging: "1 Kg: UGX 85,800, 250 g: UGX 23,900",
    },
    {
      id: 30,
      name: "Harvestor Xl - Broadest Spectrum Fungicide With Protective Ability",
      image: fungicideImages.fungicide_30,
      description:
        "Harverster XL possesses the broadest spectrum of activity of all known antifungals. It is the only counteragent that has the ability to protect against the four big groups of fungal diseases. It inhibits spore germination and mycelial growth. It has worldwide uses on cereals, vines, rice, citrus, potatoes and tomatoes.",
      price: "UGX 9,000 - 58,500",
      manufacturer: "Bukoola Chemical Industries (U) Ltd",
      activeIngredient: "Broad spectrum antifungal",
      targetDiseases: [
        "Anthracnose",
        "Mildew",
        "Rots",
        "Blight",
        "Leaf Spots",
        "Mold",
        "Rust",
      ],
      category: "Broad Spectrum",
      applicationRate: "25-30ml of Harvestor XL in 20L of water",
      reEntryPeriod: "N/A",
      preHarvestInterval: "N/A",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction: "Inhibits spore germination and mycelial growth",
      crops: ["Cereals", "Vines", "Rice", "Citrus", "Potatoes", "Tomatoes"],
      usageInstructions:
        "Application rate: Mix 25-30ml of Harvestor XL in 20L of water and apply on crop to control fungal diseases.",
      packaging:
        "1 Ltr: UGX 58,500, 100 mls: UGX 9,000, 500 mls: UGX 31,500, 250 mls: UGX 16,500",
    },
    {
      id: 31,
      name: "Victory 72Wp",
      image: fungicideImages.fungicide_31,
      description:
        "Systemic and contact fungicide for control of early and late blight on potatoes, tomatoes, grapes and downy mildew and suppression of leak and pink rot in vegetables.",
      price: "UGX 6,000 - 48,700",
      manufacturer: "Agritab Uganda Limited",
      activeIngredient: "Metalaxyl + Mancozeb",
      targetDiseases: [
        "Early Blight",
        "Late Blight",
        "Downy Mildew",
        "Leak",
        "Pink Rot",
      ],
      category: "Systemic",
      applicationRate: "As per label",
      reEntryPeriod: "N/A",
      preHarvestInterval: "N/A",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction: "Systemic and contact action",
      crops: ["Potatoes", "Tomatoes", "Grapes", "Vegetables"],
      usageInstructions:
        "Apply as per label instructions for control of early and late blight, downy mildew and suppression of leak and pink rot.",
      packaging: "100gms: UGX 6,000, 1kg: UGX 48,700",
    },
    {
      id: 32,
      name: "Orius 25 Ew",
      image: fungicideImages.fungicide_32,
      description:
        "Systemic / Curative fungicide with Tebuconazole 250g/L active ingredient. It is used to control fungal infections such as Leaf Rust, Net Blotch, Helminthosporium spots/ Blight, Septoria Leaf Spot.",
      price: "UGX 75,000",
      manufacturer: "Agritab Uganda Limited",
      activeIngredient: "Tebuconazole 250g/L",
      targetDiseases: [
        "Leaf Rust",
        "Net Blotch",
        "Helminthosporium Spots",
        "Septoria Leaf Spot",
      ],
      category: "Systemic",
      applicationRate: "10-15ml/20Ltrs of water",
      reEntryPeriod: "6 days",
      preHarvestInterval: "N/A",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction: "Systemic curative action",
      crops: ["Various crops"],
      usageInstructions:
        "Dosage: 10-15ml/20Ltrs of water. Re-Entry interval: 6 days.",
      packaging: "1ltr",
    },
    {
      id: 33,
      name: "Mistress 72 Wp",
      image: fungicideImages.fungicide_33,
      description:
        "Broad-spectrum unique fungicide formulation containing a mixture of both systemic, curative, preventive and contact fungicides thus providing outstanding control of diseases such as blights, leaf spot, Anthracnose, botrytis, downy mildew, purple blotch on a variety of crops. It ensures durable protection of the target plants during periods of active growth.",
      price: "UGX 6,600 - 45,000",
      manufacturer: "Osho Chemical Industries Ltd",
      activeIngredient: "Cymoxanil 8% + Mancozeb 72%",
      targetDiseases: [
        "Blight",
        "Leaf Spot",
        "Anthracnose",
        "Botrytis",
        "Downy Mildew",
        "Purple Blotch",
      ],
      category: "Systemic",
      applicationRate: "30grams per 20ltrs of water (300grams per acre)",
      reEntryPeriod: "N/A",
      preHarvestInterval: "N/A",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction:
        "Broad-spectrum unique fungicide with systemic, curative, preventive and contact action",
      crops: ["Various crops"],
      usageInstructions:
        "Mixing: 30grams per 20ltrs of water. Application rate: 300grams per acre.",
      packaging:
        "120 g: UGX 6,600, 240 g: UGX 12,700, 500 g: UGX 25,000, 1 Kg: UGX 45,000",
    },
    {
      id: 34,
      name: "Copper Fungcure 500 Wp – Copper Based Fungicide",
      image: fungicideImages.fungicide_34,
      description:
        "Copper based fungicide for control of Damping off in Chilies, Bud rot and leaf rot in Coconuts, Blackarm in Cotton, Blister blight in Coffee, Downy mildew and Anthracnose in Peas, Early and late blight in Potatoes, Damping off and black shank in Tobacco.",
      price: "UGX 15,000 - 556,000",
      manufacturer: "Nsanja Agrochemicals Ltd",
      activeIngredient: "Copper Oxychloride 500g/Kg",
      targetDiseases: [
        "Damping Off",
        "Bud Rot",
        "Leaf Rot",
        "Blackarm",
        "Blister Blight",
        "Downy Mildew",
        "Anthracnose",
        "Early Blight",
        "Late Blight",
        "Black Shank",
      ],
      category: "Contact",
      applicationRate:
        "Chilies: 50g/20ltrs, Tomatoes: 50g/20ltrs, Coffee & Cotton: 70g/20ltrs",
      reEntryPeriod: "7-14 days",
      preHarvestInterval:
        "Chilies: 7 days, Tomatoes: 7 days, Coffee & Cotton: 14 days",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction: "Copper based contact action",
      crops: [
        "Chilies",
        "Coconuts",
        "Cotton",
        "Coffee",
        "Peas",
        "Potatoes",
        "Tobacco",
      ],
      usageInstructions:
        "Apply when first signs of disease are observed. Repeat at 10 days interval for effective control. Apply using enough water and ensure adequate coverage of crop foliage.",
      packaging: "25 Kg: UGX 556,000, 1 Kg: UGX 26,500, 500 GM: UGX 15,000",
    },
    {
      id: 35,
      name: "Winner 72 Wp – A Systemic And Contact Fungicide For The Control A Wide Range Of Fungal Infections",
      image: fungicideImages.fungicide_35,
      description:
        "Systemic and contact fungicide for control of foliar and root diseases in vegetables, and downy mildew in ornamentals and field crops.",
      price: "UGX 5,000 - 35,000",
      manufacturer: "Syova Seed (U) Ltd",
      activeIngredient: "Mancozeb 640g/kg + Metalaxyl 80g/kg",
      targetDiseases: ["Foliar Diseases", "Root Diseases", "Downy Mildew"],
      category: "Systemic",
      applicationRate: "1-1.5kgs/acre (50-70gms/20ltrs)",
      reEntryPeriod: "N/A",
      preHarvestInterval: "N/A",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction: "Systemic and contact action",
      crops: ["Vegetables", "Ornamentals", "Field crops"],
      usageInstructions:
        "Rate of use: 1-1.5kgs/acre. Mixing: 50-70gms/20ltrs of water. Spray at first sign of disease and repeat every 10-14 days. Ensure even and full coverage of the plant. Always alternate with chemicals with different mode of action.",
      packaging:
        "100 gms: UGX 5,000, 250 gms: UGX 12,700, 500 gms: UGX 24,300, 1 Kg: UGX 35,000",
    },
    {
      id: 36,
      name: "Emthane M-45 Mancozeb 80% W.p",
      image: fungicideImages.fungicide_36,
      description:
        "Contact broad spectrum fungicide for Fungal diseases of Agricultural and horticultural crops. It contains Mancozeb 80% active ingredient which provides protective action at early stages.",
      price: "UGX 17,000 - 330,000",
      manufacturer: "Nsanja Agrochemicals Ltd",
      activeIngredient: "Mancozeb 80%",
      targetDiseases: ["Fungal Diseases"],
      category: "Contact",
      applicationRate: "Foliar spray: 200-250g/100L (40-50g/20ltrs)",
      reEntryPeriod: "N/A",
      preHarvestInterval: "N/A",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction:
        "Contact broad spectrum fungicide with protective action at early stages",
      crops: ["Agricultural crops", "Horticultural crops"],
      usageInstructions:
        "Mode/rate of use: Foliar spray: 200-250g/100L (40-50g/20ltrs). Dosage varies depending on crop and disease.",
      packaging:
        "25 Kg: UGX 330,000, 10 Kg: UGX 135,000, 1 Kg: UGX 33,000, 500 gm: UGX 17,000",
    },
    {
      id: 37,
      name: "Indofil M-45 – Non-systemic Protective Fungicide",
      image: fungicideImages.fungicide_37,
      description:
        "Non-systemic protective fungicide for crop protection. Similar to Ascozeb 80 WP with Mancozeb 800g/kg active ingredient.",
      price: "UGX 6,800 - 365,900",
      manufacturer: "Syova Seed (U) Ltd",
      activeIngredient: "Mancozeb 800g/kg",
      targetDiseases: [
        "Early Blight",
        "Late Blight",
        "Downy Mildew",
        "Botrytis",
      ],
      category: "Preventive",
      applicationRate:
        "1kg/acre (40-60g/20ltrs for tomatoes/potatoes/onions, 50-60g/20ltrs for roses)",
      reEntryPeriod: "7 days",
      preHarvestInterval: "7 days",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction: "Non-systemic protective action",
      crops: ["Potatoes", "Tomatoes", "Onions", "Roses"],
      usageInstructions:
        "Rate of use: 1kg/acre. Mix 40-60g/20ltrs water for tomatoes, potatoes and onions. 50-60g/20ltrs water for roses.",
      packaging:
        "250g: UGX 6,800, 1Kg: UGX 22,000, 25Kg: UGX 365,900, 10Kg: UGX 179,900",
    },
    {
      id: 38,
      name: "Harveseter",
      image: fungicideImages.fungicide_38,
      description:
        "Broad spectrum fungicide for crop protection. Similar to Harvestor XL with broad spectrum activity against fungal diseases.",
      price: "UGX 23,900 - 85,800",
      manufacturer: "Uganda Crop Care Limited",
      activeIngredient: "Broad spectrum antifungal",
      targetDiseases: [
        "Early Blight",
        "Late Blight",
        "Damping Off",
        "Downy Mildew",
      ],
      category: "Broad Spectrum",
      applicationRate: "50g/20ltrs",
      reEntryPeriod: "7 days",
      preHarvestInterval: "N/A",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction: "Broad spectrum fungicide action",
      crops: ["Various crops"],
      usageInstructions:
        "Apply as per label instructions for broad spectrum fungal disease control.",
      packaging: "100gms: UGX 6,000, 1kg: UGX 48,700",
    },
    {
      id: 39,
      name: "Fangocil - Contact And Systemic Fungicide With Preventive And Curative Properties",
      image: fungicideImages.fungicide_39,
      description:
        "Contact and systemic fungicide with preventive and curative properties. Similar to Daconil 720 SC with Chlorothalonil 720g/L active ingredient.",
      price: "UGX 31,465 - 1,552,100",
      manufacturer: "Uganda Crop Care Limited",
      activeIngredient: "Chlorothalonil 720g/L",
      targetDiseases: [
        "Coffee Berry Disease",
        "Bean Rust",
        "Anthracnose",
        "Botrytis",
      ],
      category: "Systemic",
      applicationRate: "Vegetables: 2ltrs/ha, Coffee: 2.2ltrs/ha",
      reEntryPeriod: "N/A",
      preHarvestInterval: "N/A",
      whoClassification: "Class III",
      registrationNumber: "N/A",
      modeOfAction: "Contact and systemic action with built-in surfactant",
      crops: ["Coffee", "Cereals", "Ornamentals", "Potatoes", "Vegetables"],
      usageInstructions:
        "Apply at 2ltrs/ha in vegetables, 2.2ltrs/ha in coffee. Built-in surfactant makes active ingredient cover and stick to leaves and berries for unsurpassed protection.",
      packaging: "20 Ltrs: UGX 1,552,100, 500ml: UGX 31,465",
    },
    {
      id: 40,
      name: "Bio-cure B – Biological Fungicide For The Control Of A Wide Range Of Fungal Diseases",
      image: fungicideImages.fungicide_40,
      description:
        "Biological fungicide for control of fungal diseases using natural methods. Uses beneficial microorganisms to control various fungal diseases in an environmentally friendly way.",
      price: "Contact for pricing",
      manufacturer: "Biological Solutions",
      activeIngredient: "Beneficial microorganisms",
      targetDiseases: ["Various Fungal Diseases"],
      category: "Biological",
      applicationRate: "As per label",
      reEntryPeriod: "N/A",
      preHarvestInterval: "N/A",
      whoClassification: "Not specified",
      registrationNumber: "N/A",
      modeOfAction: "Biological control using beneficial microorganisms",
      crops: ["Various crops"],
      usageInstructions:
        "Apply as per label instructions for biological control of fungal diseases.",
      packaging: "Contact for pricing",
    },
  ];

  console.log(
    "🦠 FungicidesScreen: Rendering with",
    fungicideProducts.length,
    "products",
  );

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
        onError={(error) => console.log("Image load error:", error)}
      />

      <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">
        {product.name}
      </Text>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>
          {hasMultiplePrices(product) ? getUnitPrice(product) : product.price}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // Show detail screen if product is selected
  if (selectedProduct) {
    return (
      <FungicideDetailScreen
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
          <MaterialIcons name="bug_report" size={32} color="white" />
          <Text style={styles.headerTitle}>Fungicide Products</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Complete range of agricultural fungicides
        </Text>
      </View>

      {/* Products Grid */}
      <ScrollView
        style={styles.productsContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.productsGrid}>
          {fungicideProducts.map(renderProduct)}
        </View>
      </ScrollView>

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
});

export default FungicidesScreen;
