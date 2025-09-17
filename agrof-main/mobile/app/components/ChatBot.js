import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';

const ChatBot = ({ onShowTraining }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm AgrofBot, your AI agricultural assistant. I can help you with:\n\n🌱 Crop disease identification\n💊 Treatment recommendations\n🌾 Farming best practices\n🌿 Pest control advice\n📚 General agricultural knowledge\n🌤️ Weather-based advice\n💰 Market insights\n\nWhat would you like to know today?",
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userContext, setUserContext] = useState({});
  const scrollViewRef = useRef();

  // Enhanced agricultural knowledge database
  const knowledgeBase = {
    greetings: [
      "Hello! How can I help with your farming today?",
      "Hi there! What agricultural question do you have?",
      "Welcome! I'm here to help with your crops and farming needs.",
      "Greetings! Ready to help you grow better crops today!"
    ],
    diseases: {
      "maize rust": {
        symptoms: "Reddish-brown pustules on leaves, stems, and husks. Leaves may turn yellow and die prematurely.",
        treatment: "Apply fungicides containing azoxystrobin or pyraclostrobin. Remove infected plant debris. Plant resistant varieties like DK777 or SC719.",
        prevention: "Ensure proper spacing (75cm between rows), avoid overhead irrigation, rotate crops annually, and use certified seeds.",
        severity: "High - Can reduce yield by 30-50% if not controlled early"
      },
      "coffee leaf rust": {
        symptoms: "Yellow-orange spots on leaves that turn brown, premature leaf drop, reduced photosynthesis.",
        treatment: "Apply copper-based fungicides or systemic fungicides. Prune infected branches. Maintain good air circulation.",
        prevention: "Plant resistant varieties like Catimor, avoid dense planting, monitor regularly, and maintain proper shade.",
        severity: "Critical - Can destroy entire plantations if not managed"
      },
      "tomato blight": {
        symptoms: "Dark brown lesions on leaves, stems, and fruits. White fungal growth in humid conditions.",
        treatment: "Remove infected plants immediately. Apply copper fungicides or chlorothalonil. Improve air circulation.",
        prevention: "Water at soil level, avoid overhead irrigation, use resistant varieties, and maintain proper spacing.",
        severity: "High - Can spread rapidly in wet conditions"
      },
      "banana wilt": {
        symptoms: "Yellowing leaves, wilting, internal vascular discoloration, plant death.",
        treatment: "Remove and destroy infected plants. Apply systemic fungicides. Use clean planting material.",
        prevention: "Use disease-free suckers, avoid waterlogging, maintain good drainage, and rotate crops.",
        severity: "Critical - Can wipe out entire plantations"
      },
      "cassava mosaic": {
        symptoms: "Yellow mosaic patterns on leaves, stunted growth, reduced tuber yield.",
        treatment: "Remove infected plants. Use virus-free cuttings. Control whitefly vectors.",
        prevention: "Use certified disease-free cuttings, control whiteflies, and practice crop rotation.",
        severity: "Medium - Reduces yield but plants may survive"
      }
    },
    crops: {
      "maize": {
        planting: "Plant 2-3 seeds per hole, 5cm deep, 75cm between rows, 25cm within rows.",
        season: "Plant at onset of rains (March-April in Uganda).",
        fertilizer: "Apply NPK 17:17:17 at planting, top-dress with CAN at 6 weeks.",
        harvesting: "Harvest when kernels are hard and moisture is 20-25%."
      },
      "coffee": {
        planting: "Plant 2.5m x 2.5m spacing, 30cm deep holes.",
        season: "Plant at onset of long rains (March-May).",
        fertilizer: "Apply NPK 20:10:10 annually, organic matter every 2 years.",
        harvesting: "Harvest red ripe cherries, process within 24 hours."
      },
      "beans": {
        planting: "Plant 2-3 seeds per hole, 3cm deep, 50cm between rows.",
        season: "Plant in both short and long rains.",
        fertilizer: "Apply DAP at planting, top-dress with CAN.",
        harvesting: "Harvest when pods are dry and seeds rattle."
      }
    },
    general: {
      "fertilizer": "Use organic fertilizers like compost, manure, or NPK fertilizers based on soil test results. Apply during planting and growing seasons. Organic options improve soil health long-term.",
      "irrigation": "Water deeply but less frequently. Early morning watering reduces evaporation. Use drip irrigation for efficiency. Monitor soil moisture regularly.",
      "pest control": "Use integrated pest management: natural predators, crop rotation, resistant varieties, and minimal chemical use. Start with cultural practices.",
      "soil health": "Test soil pH annually, add organic matter, practice crop rotation, and avoid over-tilling. Healthy soil = healthy crops.",
      "weather": "Monitor weather forecasts regularly. Adjust planting times based on rainfall patterns. Protect crops during extreme weather events.",
      "market": "Research market prices before planting. Consider contract farming. Diversify crops to spread risk. Store properly to sell during off-season."
    }
  };

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return knowledgeBase.greetings[Math.floor(Math.random() * knowledgeBase.greetings.length)];
    }
    
    // Check for disease queries
    for (const [disease, info] of Object.entries(knowledgeBase.diseases)) {
      if (lowerMessage.includes(disease) || lowerMessage.includes(disease.replace(' ', ''))) {
        return `🌱 **${disease.charAt(0).toUpperCase() + disease.slice(1)}**\n\n🔍 **Symptoms:** ${info.symptoms}\n\n💊 **Treatment:** ${info.treatment}\n\n🛡️ **Prevention:** ${info.prevention}\n\n⚠️ **Severity:** ${info.severity}`;
      }
    }
    
    // Check for crop-specific queries
    for (const [crop, info] of Object.entries(knowledgeBase.crops)) {
      if (lowerMessage.includes(crop)) {
        if (lowerMessage.includes('plant') || lowerMessage.includes('grow')) {
          return `🌱 **Growing ${crop.charAt(0).toUpperCase() + crop.slice(1)}:**\n\n📅 **Planting:** ${info.planting}\n\n🌦️ **Season:** ${info.season}\n\n💩 **Fertilizer:** ${info.fertilizer}\n\n🌾 **Harvesting:** ${info.harvesting}`;
        }
        return `🌱 **${crop.charAt(0).toUpperCase() + crop.slice(1)} Information:**\n\n📅 **Planting:** ${info.planting}\n\n🌦️ **Season:** ${info.season}\n\n💩 **Fertilizer:** ${info.fertilizer}\n\n🌾 **Harvesting:** ${info.harvesting}`;
      }
    }
    
    // Check for general topics
    for (const [topic, info] of Object.entries(knowledgeBase.general)) {
      if (lowerMessage.includes(topic)) {
        return `📚 **${topic.charAt(0).toUpperCase() + topic.slice(1)}:**\n\n${info}`;
      }
    }
    
    // Check for specific questions
    if (lowerMessage.includes('how to') || lowerMessage.includes('what is') || lowerMessage.includes('when to')) {
      if (lowerMessage.includes('plant')) {
        return "🌱 **Planting Tips:**\n\n• Choose the right season for your crop\n• Prepare soil with organic matter\n• Plant at proper depth and spacing\n• Water immediately after planting\n• Protect young plants from pests\n• Use certified seeds when possible";
      }
      if (lowerMessage.includes('water') || lowerMessage.includes('irrigate')) {
        return "💧 **Watering Guidelines:**\n\n• Water deeply but less frequently\n• Water early morning to reduce evaporation\n• Check soil moisture before watering\n• Use drip irrigation for efficiency\n• Adjust based on weather conditions\n• Avoid waterlogging";
      }
      if (lowerMessage.includes('harvest')) {
        return "🌾 **Harvesting Tips:**\n\n• Harvest at peak ripeness\n• Use clean, sharp tools\n• Handle produce gently\n• Harvest in cool morning hours\n• Store properly after harvest\n• Check for disease before storage";
      }
      if (lowerMessage.includes('fertilize')) {
        return "💩 **Fertilization Guide:**\n\n• Test soil before applying\n• Use organic options when possible\n• Apply at right growth stages\n• Don't over-fertilize\n• Water after application\n• Consider crop-specific needs";
      }
    }
    
    // Check for weather-related queries
    if (lowerMessage.includes('weather') || lowerMessage.includes('rain') || lowerMessage.includes('drought')) {
      return "🌤️ **Weather & Farming:**\n\n• Monitor forecasts regularly\n• Adjust planting times based on rainfall\n• Use irrigation during dry spells\n• Protect crops from extreme weather\n• Consider drought-resistant varieties\n• Plan for climate variability";
    }
    
    // Check for market queries
    if (lowerMessage.includes('market') || lowerMessage.includes('price') || lowerMessage.includes('sell')) {
      return "💰 **Market & Sales:**\n\n• Research prices before planting\n• Consider contract farming\n• Diversify crops to spread risk\n• Store properly for off-season sales\n• Build relationships with buyers\n• Monitor market trends";
    }
    
    // Default responses for unknown queries
    const defaultResponses = [
      "I'm not sure about that specific question, but I can help with crop diseases, farming practices, pest control, and general agricultural advice. Could you rephrase your question?",
      "That's an interesting question! While I don't have specific information on that, I'm knowledgeable about common crop diseases, treatment methods, and farming best practices. What else would you like to know?",
      "I'm still learning about that topic. However, I can help you with identifying plant diseases, treatment recommendations, and general farming advice. What would you like to know about?",
      "Great question! I specialize in crop diseases, farming techniques, pest management, and agricultural best practices. Could you ask about something in those areas?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const sendMessage = async () => {
    if (inputText.trim() === '') return;
    
    const userMessage = {
      id: Date.now(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    
    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = generateBotResponse(inputText);
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const clearChat = () => {
    Alert.alert(
      'Clear Chat',
      'Are you sure you want to clear all messages?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => {
            setMessages([{
              id: Date.now(),
              text: "Hello! I'm AgrofBot, your AI agricultural assistant. I can help you with:\n\n🌱 Crop disease identification\n💊 Treatment recommendations\n🌾 Farming best practices\n🌿 Pest control advice\n📚 General agricultural knowledge\n🌤️ Weather-based advice\n💰 Market insights\n\nWhat would you like to know today?",
              isBot: true,
              timestamp: new Date(),
            }]);
          }
        }
      ]
    );
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>💬 AgrofBot</Text>
        <Text style={styles.headerSubtitle}>AI Agricultural Assistant</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.trainingButton} onPress={onShowTraining}>
            <Text style={styles.trainingButtonText}>🤖</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={clearChat}>
            <Text style={styles.clearButtonText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View 
            key={message.id} 
            style={[
              styles.messageContainer,
              message.isBot ? styles.botMessage : styles.userMessage
            ]}
          >
            <View style={[
              styles.messageBubble,
              message.isBot ? styles.botBubble : styles.userBubble
            ]}>
              <Text style={[
                styles.messageText,
                message.isBot ? styles.botText : styles.userText
              ]}>
                {message.text}
              </Text>
              <Text style={[
                styles.timestamp,
                message.isBot ? styles.botTimestamp : styles.userTimestamp
              ]}>
                {formatTime(message.timestamp)}
              </Text>
            </View>
          </View>
        ))}
        
        {isTyping && (
          <View style={[styles.messageContainer, styles.botMessage]}>
            <View style={[styles.messageBubble, styles.botBubble]}>
              <Text style={styles.typingText}>AgrofBot is typing...</Text>
            </View>
          </View>
        )}
      </ScrollView>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask me about crops, diseases, farming..."
          placeholderTextColor="#999"
          multiline
          maxLength={500}
        />
        <TouchableOpacity 
          style={[styles.sendButton, inputText.trim() === '' && styles.sendButtonDisabled]} 
          onPress={sendMessage}
          disabled={inputText.trim() === ''}
        >
          <Text style={styles.sendButtonText}>📤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'relative',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  headerButtons: {
    flexDirection: 'row',
    position: 'absolute',
    right: 20,
    top: 50,
  },
  trainingButton: {
    padding: 10,
  },
  trainingButtonText: {
    fontSize: 20,
    color: 'white',
  },
  clearButton: {
    padding: 10,
  },
  clearButtonText: {
    fontSize: 20,
    color: 'white',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  messageContainer: {
    marginBottom: 15,
    flexDirection: 'row',
  },
  botMessage: {
    justifyContent: 'flex-start',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 15,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  botBubble: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 5,
  },
  userBubble: {
    backgroundColor: '#4CAF50',
    borderBottomRightRadius: 5,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  botText: {
    color: '#333',
  },
  userText: {
    color: 'white',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 8,
    opacity: 0.7,
  },
  botTimestamp: {
    color: '#666',
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  typingText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    backgroundColor: '#f8f9fa',
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  sendButtonText: {
    fontSize: 20,
  },
});

export default ChatBot;
