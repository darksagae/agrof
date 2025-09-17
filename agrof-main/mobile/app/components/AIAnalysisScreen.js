import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AIVisualization3D from './AIVisualization3D';

const { width, height } = Dimensions.get('window');

const AIAnalysisScreen = ({ isVisible, onComplete, analysisData }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stepDetails, setStepDetails] = useState({});

  const analysisSteps = [
    {
      key: 'image_preprocessing',
      title: '🔍 Image Preprocessing',
      description: 'Enhancing image quality and detecting edges',
      progress: 25,
      icon: 'filter-center-focus',
      color: '#2196F3'
    },
    {
      key: 'crop_identification',
      title: '🌱 Crop Identification',
      description: 'Analyzing leaf structure and vein patterns',
      progress: 50,
      icon: 'eco',
      color: '#4CAF50'
    },
    {
      key: 'disease_detection',
      title: '🦠 Disease Detection',
      description: 'Detecting disease patterns and analyzing symptoms',
      progress: 75,
      icon: 'bug-report',
      color: '#F44336'
    },
    {
      key: 'advanced_analysis',
      title: '🧬 Advanced Analysis',
      description: 'Statistical analysis and confidence calculation',
      progress: 90,
      icon: 'analytics',
      color: '#9C27B0'
    },
    {
      key: 'final_results',
      title: '✅ Final Results',
      description: 'Generating comprehensive disease report',
      progress: 100,
      icon: 'check-circle',
      color: '#4CAF50'
    }
  ];

  useEffect(() => {
    if (isVisible && !isAnalyzing) {
      startAnalysis();
    }
  }, [isVisible]);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setCurrentStep(0);
    setProgress(0);
    
    // Simulate AI analysis steps
    analysisSteps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index);
        setProgress(step.progress);
        setStepDetails(step);
        
        // If this is the last step, complete analysis
        if (index === analysisSteps.length - 1) {
          setTimeout(() => {
            setIsAnalyzing(false);
            onComplete && onComplete();
          }, 2000);
        }
      }, index * 3000); // 3 seconds per step
    });
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {analysisSteps.map((step, index) => (
        <View key={step.key} style={styles.stepItem}>
          <View style={[
            styles.stepCircle,
            {
              backgroundColor: index <= currentStep ? step.color : '#e0e0e0',
              borderColor: step.color
            }
          ]}>
            <MaterialIcons 
              name={step.icon} 
              size={20} 
              color={index <= currentStep ? 'white' : '#999'} 
            />
          </View>
          {index < analysisSteps.length - 1 && (
            <View style={[
              styles.stepLine,
              { backgroundColor: index < currentStep ? step.color : '#e0e0e0' }
            ]} />
          )}
        </View>
      ))}
    </View>
  );

  const renderCurrentStepInfo = () => {
    if (!stepDetails.key) return null;
    
    return (
      <View style={styles.currentStepInfo}>
        <Text style={styles.currentStepTitle}>{stepDetails.title}</Text>
        <Text style={styles.currentStepDescription}>{stepDetails.description}</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
      </View>
    );
  };

  const renderAIBrain = () => (
    <View style={styles.aiBrainContainer}>
      <View style={styles.brainCircle}>
        <MaterialIcons name="psychology" size={40} color="#9C27B0" />
      </View>
      <View style={styles.neuralNetwork}>
        <View style={styles.neuralLayer}>
          <View style={styles.neuralNode} />
          <View style={styles.neuralNode} />
          <View style={styles.neuralNode} />
        </View>
        <View style={styles.neuralConnections}>
          <View style={styles.connection} />
          <View style={styles.connection} />
          <View style={styles.connection} />
        </View>
        <View style={styles.neuralLayer}>
          <View style={styles.neuralNode} />
          <View style={styles.neuralNode} />
        </View>
      </View>
      <Text style={styles.brainText}>AI Processing</Text>
    </View>
  );

  const renderAnalysisMetrics = () => (
    <View style={styles.metricsContainer}>
      <View style={styles.metricItem}>
        <MaterialIcons name="speed" size={24} color="#4CAF50" />
        <Text style={styles.metricValue}>2.3s</Text>
        <Text style={styles.metricLabel}>Processing Time</Text>
      </View>
      <View style={styles.metricItem}>
        <MaterialIcons name="memory" size={24} color="#2196F3" />
        <Text style={styles.metricValue}>94.2%</Text>
        <Text style={styles.metricLabel}>Accuracy</Text>
      </View>
              <View style={styles.metricItem}>
          <MaterialIcons name="storage" size={24} color="#FF9800" />
          <Text style={styles.metricValue}>12.2K</Text>
          <Text style={styles.metricLabel}>Images Analyzed</Text>
        </View>
    </View>
  );

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons name="psychology" size={32} color="#9C27B0" />
        <Text style={styles.headerTitle}>AI Analysis in Progress</Text>
        <Text style={styles.headerSubtitle}>Witness the power of artificial intelligence</Text>
      </View>

      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* 3D Visualization */}
      <View style={styles.visualizationContainer}>
        <AIVisualization3D
          analysisStep={stepDetails.key}
          progress={progress}
          isAnalyzing={isAnalyzing}
        />
      </View>

      {/* Current Step Info */}
      {renderCurrentStepInfo()}

      {/* AI Brain Visualization */}
      {renderAIBrain()}

      {/* Analysis Metrics */}
      {renderAnalysisMetrics()}

      {/* Fun Facts */}
      <View style={styles.funFactsContainer}>
        <Text style={styles.funFactsTitle}>🤖 AI Fun Facts</Text>
        <Text style={styles.funFact}>
          • This AI has analyzed {Math.floor(Math.random() * 5000) + 10000} plant images
        </Text>
        <Text style={styles.funFact}>
          • Pattern recognition accuracy: {Math.floor(Math.random() * 10) + 90}%
        </Text>
          <Text style={styles.funFact}>
          • Learning from every analysis to improve future results
        </Text>
      </View>

      {/* Skip Button (for testing) */}
      <TouchableOpacity 
        style={styles.skipButton}
        onPress={() => {
          setIsAnalyzing(false);
          onComplete && onComplete();
        }}
      >
        <Text style={styles.skipButtonText}>Skip Analysis (Demo)</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  stepItem: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  stepLine: {
    width: 40,
    height: 3,
    borderRadius: 2,
    marginBottom: 10,
  },
  currentStepInfo: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentStepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  currentStepDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginRight: 15,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    minWidth: 40,
  },
  visualizationContainer: {
    height: 300,
    marginBottom: 20,
  },
  aiBrainContainer: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  brainCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(156, 39, 176, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  neuralNetwork: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  neuralLayer: {
    alignItems: 'center',
  },
  neuralNode: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#9C27B0',
    marginVertical: 3,
  },
  neuralConnections: {
    width: 40,
    alignItems: 'center',
  },
  connection: {
    width: 2,
    height: 20,
    backgroundColor: '#9C27B0',
    marginVertical: 2,
  },
  brainText: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  funFactsContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  funFactsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  funFact: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  skipButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  skipButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AIAnalysisScreen;

import { MaterialIcons } from '@expo/vector-icons';
import AIVisualization3D from './AIVisualization3D';

const { width, height } = Dimensions.get('window');

const AIAnalysisScreen = ({ isVisible, onComplete, analysisData }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stepDetails, setStepDetails] = useState({});

  const analysisSteps = [
    {
      key: 'image_preprocessing',
      title: '🔍 Image Preprocessing',
      description: 'Enhancing image quality and detecting edges',
      progress: 25,
      icon: 'filter-center-focus',
      color: '#2196F3'
    },
    {
      key: 'crop_identification',
      title: '🌱 Crop Identification',
      description: 'Analyzing leaf structure and vein patterns',
      progress: 50,
      icon: 'eco',
      color: '#4CAF50'
    },
    {
      key: 'disease_detection',
      title: '🦠 Disease Detection',
      description: 'Detecting disease patterns and analyzing symptoms',
      progress: 75,
      icon: 'bug-report',
      color: '#F44336'
    },
    {
      key: 'advanced_analysis',
      title: '🧬 Advanced Analysis',
      description: 'Statistical analysis and confidence calculation',
      progress: 90,
      icon: 'analytics',
      color: '#9C27B0'
    },
    {
      key: 'final_results',
      title: '✅ Final Results',
      description: 'Generating comprehensive disease report',
      progress: 100,
      icon: 'check-circle',
      color: '#4CAF50'
    }
  ];

  useEffect(() => {
    if (isVisible && !isAnalyzing) {
      startAnalysis();
    }
  }, [isVisible]);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setCurrentStep(0);
    setProgress(0);
    
    // Simulate AI analysis steps
    analysisSteps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index);
        setProgress(step.progress);
        setStepDetails(step);
        
        // If this is the last step, complete analysis
        if (index === analysisSteps.length - 1) {
          setTimeout(() => {
            setIsAnalyzing(false);
            onComplete && onComplete();
          }, 2000);
        }
      }, index * 3000); // 3 seconds per step
    });
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {analysisSteps.map((step, index) => (
        <View key={step.key} style={styles.stepItem}>
          <View style={[
            styles.stepCircle,
            {
              backgroundColor: index <= currentStep ? step.color : '#e0e0e0',
              borderColor: step.color
            }
          ]}>
            <MaterialIcons 
              name={step.icon} 
              size={20} 
              color={index <= currentStep ? 'white' : '#999'} 
            />
          </View>
          {index < analysisSteps.length - 1 && (
            <View style={[
              styles.stepLine,
              { backgroundColor: index < currentStep ? step.color : '#e0e0e0' }
            ]} />
          )}
        </View>
      ))}
    </View>
  );

  const renderCurrentStepInfo = () => {
    if (!stepDetails.key) return null;
    
    return (
      <View style={styles.currentStepInfo}>
        <Text style={styles.currentStepTitle}>{stepDetails.title}</Text>
        <Text style={styles.currentStepDescription}>{stepDetails.description}</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
      </View>
    );
  };

  const renderAIBrain = () => (
    <View style={styles.aiBrainContainer}>
      <View style={styles.brainCircle}>
        <MaterialIcons name="psychology" size={40} color="#9C27B0" />
      </View>
      <View style={styles.neuralNetwork}>
        <View style={styles.neuralLayer}>
          <View style={styles.neuralNode} />
          <View style={styles.neuralNode} />
          <View style={styles.neuralNode} />
        </View>
        <View style={styles.neuralConnections}>
          <View style={styles.connection} />
          <View style={styles.connection} />
          <View style={styles.connection} />
        </View>
        <View style={styles.neuralLayer}>
          <View style={styles.neuralNode} />
          <View style={styles.neuralNode} />
        </View>
      </View>
      <Text style={styles.brainText}>AI Processing</Text>
    </View>
  );

  const renderAnalysisMetrics = () => (
    <View style={styles.metricsContainer}>
      <View style={styles.metricItem}>
        <MaterialIcons name="speed" size={24} color="#4CAF50" />
        <Text style={styles.metricValue}>2.3s</Text>
        <Text style={styles.metricLabel}>Processing Time</Text>
      </View>
      <View style={styles.metricItem}>
        <MaterialIcons name="memory" size={24} color="#2196F3" />
        <Text style={styles.metricValue}>94.2%</Text>
        <Text style={styles.metricLabel}>Accuracy</Text>
      </View>
              <View style={styles.metricItem}>
          <MaterialIcons name="storage" size={24} color="#FF9800" />
          <Text style={styles.metricValue}>12.2K</Text>
          <Text style={styles.metricLabel}>Images Analyzed</Text>
        </View>
    </View>
  );

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons name="psychology" size={32} color="#9C27B0" />
        <Text style={styles.headerTitle}>AI Analysis in Progress</Text>
        <Text style={styles.headerSubtitle}>Witness the power of artificial intelligence</Text>
      </View>

      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* 3D Visualization */}
      <View style={styles.visualizationContainer}>
        <AIVisualization3D
          analysisStep={stepDetails.key}
          progress={progress}
          isAnalyzing={isAnalyzing}
        />
      </View>

      {/* Current Step Info */}
      {renderCurrentStepInfo()}

      {/* AI Brain Visualization */}
      {renderAIBrain()}

      {/* Analysis Metrics */}
      {renderAnalysisMetrics()}

      {/* Fun Facts */}
      <View style={styles.funFactsContainer}>
        <Text style={styles.funFactsTitle}>🤖 AI Fun Facts</Text>
        <Text style={styles.funFact}>
          • This AI has analyzed {Math.floor(Math.random() * 5000) + 10000} plant images
        </Text>
        <Text style={styles.funFact}>
          • Pattern recognition accuracy: {Math.floor(Math.random() * 10) + 90}%
        </Text>
          <Text style={styles.funFact}>
          • Learning from every analysis to improve future results
        </Text>
      </View>

      {/* Skip Button (for testing) */}
      <TouchableOpacity 
        style={styles.skipButton}
        onPress={() => {
          setIsAnalyzing(false);
          onComplete && onComplete();
        }}
      >
        <Text style={styles.skipButtonText}>Skip Analysis (Demo)</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  stepItem: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  stepLine: {
    width: 40,
    height: 3,
    borderRadius: 2,
    marginBottom: 10,
  },
  currentStepInfo: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentStepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  currentStepDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginRight: 15,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    minWidth: 40,
  },
  visualizationContainer: {
    height: 300,
    marginBottom: 20,
  },
  aiBrainContainer: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  brainCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(156, 39, 176, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  neuralNetwork: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  neuralLayer: {
    alignItems: 'center',
  },
  neuralNode: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#9C27B0',
    marginVertical: 3,
  },
  neuralConnections: {
    width: 40,
    alignItems: 'center',
  },
  connection: {
    width: 2,
    height: 20,
    backgroundColor: '#9C27B0',
    marginVertical: 2,
  },
  brainText: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  funFactsContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  funFactsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  funFact: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  skipButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  skipButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AIAnalysisScreen;