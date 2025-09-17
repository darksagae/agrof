"""
Treatment recommendations for crop diseases.
"""

import json
from pathlib import Path
from typing import Dict, List, Optional

# Disease treatment mappings
DISEASE_TREATMENTS = {
    "maize_blight": {
        "name": "Maize Leaf Blight",
        "description": "A fungal disease that causes brown lesions on maize leaves",
        "recommended_actions": [
            "Remove and destroy infected plant debris",
            "Apply fungicide containing mancozeb or chlorothalonil",
            "Consult with local extension officer for specific treatment options",
            "Practice crop rotation to reduce disease pressure"
        ],
        "prevention": [
            "Plant resistant varieties when available",
            "Ensure proper spacing between plants for good air circulation",
            "Avoid overhead irrigation to keep leaves dry",
            "Monitor plants regularly for early signs of disease"
        ],
        "references": [
            "https://www.cabi.org/isc/datasheet/26526",
            "https://extension.umn.edu/corn-pest-management/northern-corn-leaf-blight"
        ],
        "severity_levels": {
            "low": "Monitor closely and apply preventive measures",
            "medium": "Apply fungicide treatment and remove infected parts",
            "high": "Immediate fungicide application and consider replanting"
        }
    },
    
    "maize_rust": {
        "name": "Maize Common Rust",
        "description": "A fungal disease that produces reddish-brown pustules on maize leaves",
        "recommended_actions": [
            "Apply fungicide containing azoxystrobin or pyraclostrobin",
            "Remove infected plant material from the field",
            "Consult with extension officer for resistant variety recommendations",
            "Monitor weather conditions for disease development"
        ],
        "prevention": [
            "Plant rust-resistant maize varieties",
            "Avoid planting in areas with high humidity",
            "Maintain proper plant spacing for air circulation",
            "Time planting to avoid peak rust season"
        ],
        "references": [
            "https://www.cabi.org/isc/datasheet/26527",
            "https://extension.umn.edu/corn-pest-management/common-rust-corn"
        ],
        "severity_levels": {
            "low": "Monitor and apply preventive fungicide if needed",
            "medium": "Apply fungicide treatment and remove infected leaves",
            "high": "Immediate fungicide application and consider early harvest"
        }
    },
    
    "maize_msv": {
        "name": "Maize Streak Virus",
        "description": "A viral disease transmitted by leafhoppers that causes yellow streaks on leaves",
        "recommended_actions": [
            "Remove and destroy infected plants immediately",
            "Control leafhopper vectors with appropriate insecticides",
            "Consult with extension officer for virus-resistant varieties",
            "Monitor for early symptoms and remove infected plants"
        ],
        "prevention": [
            "Plant virus-resistant maize varieties",
            "Control weeds that may harbor leafhoppers",
            "Use reflective mulches to deter leafhoppers",
            "Plant early to avoid peak leafhopper activity"
        ],
        "references": [
            "https://www.cabi.org/isc/datasheet/26528",
            "https://www.apsnet.org/edcenter/disandpath/viral/pdlessons/Pages/MaizeStreakVirus.aspx"
        ],
        "severity_levels": {
            "low": "Remove infected plants and monitor for spread",
            "medium": "Apply insecticide for vector control and remove infected plants",
            "high": "Consider replanting with resistant varieties"
        }
    },
    
    "coffee_rust": {
        "name": "Coffee Leaf Rust",
        "description": "A fungal disease that causes orange-yellow spots on coffee leaves",
        "recommended_actions": [
            "Apply copper-based fungicides or systemic fungicides",
            "Prune infected branches and remove fallen leaves",
            "Consult with extension officer for specific treatment protocols",
            "Monitor weather conditions for disease development"
        ],
        "prevention": [
            "Plant rust-resistant coffee varieties",
            "Maintain proper shade and spacing",
            "Avoid overhead irrigation",
            "Regular monitoring and early detection"
        ],
        "references": [
            "https://www.cabi.org/isc/datasheet/26529",
            "https://www.coffeeresearch.org/agriculture/leafrust.htm"
        ],
        "severity_levels": {
            "low": "Monitor closely and apply preventive fungicide",
            "medium": "Apply fungicide treatment and prune infected parts",
            "high": "Intensive fungicide program and consider replanting"
        }
    },
    
    "coffee_miner": {
        "name": "Coffee Leaf Miner",
        "description": "An insect pest that creates tunnels in coffee leaves",
        "recommended_actions": [
            "Apply appropriate insecticides for leaf miner control",
            "Remove and destroy heavily infested leaves",
            "Consult with extension officer for integrated pest management",
            "Monitor for natural enemies and beneficial insects"
        ],
        "prevention": [
            "Maintain healthy soil and proper nutrition",
            "Use pheromone traps for monitoring",
            "Encourage natural enemies through habitat management",
            "Regular scouting for early detection"
        ],
        "references": [
            "https://www.cabi.org/isc/datasheet/26530",
            "https://www.coffeeresearch.org/agriculture/leafminer.htm"
        ],
        "severity_levels": {
            "low": "Monitor and apply preventive measures",
            "medium": "Apply insecticide treatment and remove infested leaves",
            "high": "Intensive insecticide program and consider biological control"
        }
    },
    
    "healthy": {
        "name": "Healthy Plant",
        "description": "No disease detected - plant appears healthy",
        "recommended_actions": [
            "Continue current management practices",
            "Monitor regularly for any signs of disease",
            "Maintain good agricultural practices",
            "Keep records of healthy plant appearance for future reference"
        ],
        "prevention": [
            "Practice crop rotation",
            "Maintain proper plant spacing",
            "Use disease-free seeds and planting material",
            "Regular monitoring and early detection"
        ],
        "references": [
            "https://extension.umn.edu/plant-diseases/preventing-plant-diseases",
            "https://www.extension.org/pages/plant-disease-prevention"
        ],
        "severity_levels": {
            "low": "Continue monitoring and preventive practices",
            "medium": "Increase monitoring frequency",
            "high": "Review and improve management practices"
        }
    }
}

# Localization strings (placeholder for Luganda/Runyankole)
LOCALIZATION = {
    "en": {
        "disease_detected": "Disease Detected",
        "confidence": "Confidence",
        "recommended_actions": "Recommended Actions",
        "prevention": "Prevention",
        "consult_extension": "Consult with extension officer",
        "monitor_closely": "Monitor closely",
        "apply_treatment": "Apply treatment",
        "remove_infected": "Remove infected parts",
        "healthy_plant": "Healthy Plant",
        "no_disease": "No disease detected"
    },
    "lg": {
        "disease_detected": "Endwadde Ezuuliddwa",
        "confidence": "Obwesige",
        "recommended_actions": "Ebikolebwa Ebikakasiddwa",
        "prevention": "Okuziyiza",
        "consult_extension": "Kubuuza omukugu",
        "monitor_closely": "Okulonda bulungi",
        "apply_treatment": "Okukozesa eddagala",
        "remove_infected": "Okusangula ebintu ebirwadde",
        "healthy_plant": "Ekibala Ekiwadde",
        "no_disease": "Tewali endwadde ezuuliddwa"
    },
    "rn": {
        "disease_detected": "Endwara Ezuulwe",
        "confidence": "Obwesige",
        "recommended_actions": "Ebikorwa Ebikakaswe",
        "prevention": "Okuziriza",
        "consult_extension": "Kubuuza omukugu",
        "monitor_closely": "Okulonda bulungi",
        "apply_treatment": "Okukozesa eddagala",
        "remove_infected": "Okusangula ebintu ebirwadde",
        "healthy_plant": "Ekibala Ekiwadde",
        "no_disease": "Tewali endwara ezuulwe"
    }
}

def get_treatment_info(disease: str, language: str = "en") -> Dict:
    """
    Get treatment information for a disease.
    
    Args:
        disease: Disease name
        language: Language code (en, lg, rn)
    
    Returns:
        dict: Treatment information
    """
    if disease not in DISEASE_TREATMENTS:
        return {
            "name": "Unknown Disease",
            "description": "Disease not recognized",
            "recommended_actions": ["Consult with extension officer for proper diagnosis"],
            "prevention": ["Regular monitoring and good agricultural practices"],
            "references": [],
            "severity_levels": {}
        }
    
    treatment = DISEASE_TREATMENTS[disease].copy()
    
    # Add localized strings
    if language in LOCALIZATION:
        treatment["localized"] = LOCALIZATION[language]
    
    return treatment

def get_recommended_actions(disease: str, confidence: float, max_actions: int = 3) -> List[str]:
    """
    Get recommended actions for a disease based on confidence level.
    
    Args:
        disease: Disease name
        confidence: Prediction confidence (0-1)
        max_actions: Maximum number of actions to return
    
    Returns:
        list: Recommended actions
    """
    treatment = get_treatment_info(disease)
    actions = treatment.get("recommended_actions", [])
    
    # Filter actions based on confidence
    if confidence < 0.7:
        # Low confidence - emphasize consultation
        filtered_actions = [action for action in actions if "consult" in action.lower()]
        if not filtered_actions:
            filtered_actions = ["Consult with extension officer for proper diagnosis"]
    else:
        # High confidence - include treatment actions
        filtered_actions = actions
    
    # Limit number of actions
    return filtered_actions[:max_actions]

def get_severity_level(confidence: float) -> str:
    """
    Determine severity level based on confidence.
    
    Args:
        confidence: Prediction confidence (0-1)
    
    Returns:
        str: Severity level (low, medium, high)
    """
    if confidence < 0.6:
        return "low"
    elif confidence < 0.8:
        return "medium"
    else:
        return "high"

def format_treatment_response(disease: str, confidence: float, language: str = "en") -> Dict:
    """
    Format treatment response for API.
    
    Args:
        disease: Disease name
        confidence: Prediction confidence
        language: Language code
    
    Returns:
        dict: Formatted response
    """
    treatment = get_treatment_info(disease, language)
    severity = get_severity_level(confidence)
    
    response = {
        "disease": disease,
        "disease_name": treatment["name"],
        "confidence": confidence,
        "severity_level": severity,
        "recommended_actions": get_recommended_actions(disease, confidence),
        "prevention_tips": treatment.get("prevention", [])[:2],  # Limit to 2 prevention tips
        "references": treatment.get("references", []),
        "description": treatment["description"]
    }
    
    # Add localized strings if available
    if "localized" in treatment:
        response["localized"] = treatment["localized"]
    
    return response

def save_treatments_to_file(output_path: str):
    """
    Save treatment mappings to JSON file.
    
    Args:
        output_path: Path to save the JSON file
    """
    data = {
        "disease_treatments": DISEASE_TREATMENTS,
        "localization": LOCALIZATION
    }
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"Treatment mappings saved to: {output_path}")

def load_treatments_from_file(file_path: str) -> Dict:
    """
    Load treatment mappings from JSON file.
    
    Args:
        file_path: Path to JSON file
    
    Returns:
        dict: Treatment mappings
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    return data

# Example usage
if __name__ == "__main__":
    # Test treatment retrieval
    diseases = ["maize_blight", "coffee_rust", "healthy"]
    
    for disease in diseases:
        print(f"\n=== {disease.upper()} ===")
        treatment = get_treatment_info(disease)
        print(f"Name: {treatment['name']}")
        print(f"Description: {treatment['description']}")
        print("Recommended Actions:")
        for action in treatment['recommended_actions']:
            print(f"  - {action}")
    
    # Test API response formatting
    print("\n=== API RESPONSE EXAMPLE ===")
    response = format_treatment_response("maize_blight", 0.85)
    print(json.dumps(response, indent=2))
    
    # Save treatments to file
    save_treatments_to_file("treatments.json")
