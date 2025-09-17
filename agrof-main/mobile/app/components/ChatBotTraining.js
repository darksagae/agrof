import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';

const ChatBotTraining = ({ onClose, onTrain }) => {
  const [trainingData, setTrainingData] = useState({
    question: '',
    answer: '',
    category: 'general',
    confidence: 0.8
  });

  const categories = [
    { id: 'diseases', name: '🌱 Crop Diseases' },
    { id: 'crops', name: '🌾 Crop Management' },
    { id: 'pests', name: '🐛 Pest Control' },
    { id: 'soil', name: '🌍 Soil Health' },
    { id: 'weather', name: '🌤️ Weather' },
    { id: 'market', name: '💰 Market' },
    { id: 'general', name: '📚 General' }
  ];

  const handleTrain = () => {
    if (!trainingData.question.trim() || !trainingData.answer.trim()) {
      Alert.alert('Error', 'Please fill in both question and answer fields');
      return;
    }

    // Here you would typically send this to your ML training pipeline
    const trainingExample = {
      ...trainingData,
      timestamp: new Date(),
      id: Date.now()
    };

    Alert.alert(
      'Training Data Added',
      'This example has been added to the training dataset. The bot will learn from this interaction.',
      [
        { text: 'OK', onPress: () => {
          setTrainingData({ question: '', answer: '', category: 'general', confidence: 0.8 });
          onTrain && onTrain(trainingExample);
        }}
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🤖 ChatBot Training</Text>
        <Text style={styles.headerSubtitle}>Improve AgrofBot's responses</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Add Training Example</Text>
          <Text style={styles.sectionDescription}>
            Help AgrofBot learn by providing question-answer pairs. This will improve the bot's responses over time.
          </Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Question/Query:</Text>
          <TextInput
            style={styles.textInput}
            value={trainingData.question}
            onChangeText={(text) => setTrainingData({...trainingData, question: text})}
            placeholder="e.g., How to treat coffee leaf rust?"
            placeholderTextColor="#999"
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Answer/Response:</Text>
          <TextInput
            style={styles.textInput}
            value={trainingData.answer}
            onChangeText={(text) => setTrainingData({...trainingData, answer: text})}
            placeholder="e.g., Coffee leaf rust can be treated with copper-based fungicides..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category:</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryChip,
                  trainingData.category === category.id && styles.selectedCategoryChip
                ]}
                onPress={() => setTrainingData({...trainingData, category: category.id})}
              >
                <Text style={[
                  styles.categoryChipText,
                  trainingData.category === category.id && styles.selectedCategoryChipText
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confidence Level: {Math.round(trainingData.confidence * 100)}%</Text>
          <View style={styles.sliderContainer}>
            <TouchableOpacity 
              style={styles.sliderButton}
              onPress={() => setTrainingData({...trainingData, confidence: Math.max(0.1, trainingData.confidence - 0.1)})}
            >
              <Text style={styles.sliderButtonText}>-</Text>
            </TouchableOpacity>
            <View style={styles.sliderTrack}>
              <View style={[styles.sliderFill, { width: `${trainingData.confidence * 100}%` }]} />
            </View>
            <TouchableOpacity 
              style={styles.sliderButton}
              onPress={() => setTrainingData({...trainingData, confidence: Math.min(1.0, trainingData.confidence + 0.1)})}
            >
              <Text style={styles.sliderButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.trainButton} onPress={handleTrain}>
          <Text style={styles.trainButtonText}>🚀 Add Training Example</Text>
        </TouchableOpacity>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>💡 How Training Works</Text>
          <Text style={styles.infoText}>
            • Your examples are added to the training dataset{'\n'}
            • The ML model learns from these patterns{'\n'}
            • Responses improve over time{'\n'}
            • Categories help organize knowledge{'\n'}
            • Confidence indicates answer quality
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>🔬 Current Capabilities</Text>
          <Text style={styles.infoText}>
            • 5+ crop diseases with detailed info{'\n'}
            • 3+ crop management guides{'\n'}
            • Weather and market advice{'\n'}
            • Pest control recommendations{'\n'}
            • Soil health guidance
          </Text>
        </View>
      </ScrollView>
    </View>
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
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 50,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c5530',
    marginBottom: 10,
  },
  sectionDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c5530',
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: 'white',
    textAlignVertical: 'top',
  },
  categoryScroll: {
    marginBottom: 10,
  },
  categoryChip: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedCategoryChip: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  categoryChipText: {
    fontSize: 14,
    color: '#666',
  },
  selectedCategoryChipText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  sliderButton: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sliderTrack: {
    flex: 1,
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
    marginHorizontal: 15,
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  trainButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  trainButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoSection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c5530',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});

export default ChatBotTraining;
