import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import FuturisticAIAvatar from './FuturisticAIAvatar';

const { width, height } = Dimensions.get('window');

const FuturisticAIAnalysisScreen = ({ isVisible, onComplete, analysisData, imageUri }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stepDetails, setStepDetails] = useState({});
  const [showResults, setShowResults] = useState(false);


  const analysisSteps = [
    {
      key: 'image_preprocessing',
      title: 'SCANNING IMAGE MATRIX',
      description: 'Enhancing digital resolution and detecting edge patterns',
      progress: 25,
      avatar: 'scanner',
      color: '#00FFFF',
      sciFiDescription: 'QUANTUM IMAGE ENHANCEMENT PROTOCOL ACTIVATED'
    },
    {
      key: 'crop_identification',
      title: 'ANALYZING PLANT STRUCTURE',
      description: 'Neural network processing morphological characteristics',
      progress: 50,
      avatar: 'analyzer',
      color: '#FF00FF',
      sciFiDescription: 'BIOLOGICAL PATTERN RECOGNITION SYSTEMS ONLINE'
    },
    {
      key: 'disease_detection',
      title: 'DETECTING PATHOGEN PATTERNS',
      description: 'Advanced AI scanning for disease signatures',
      progress: 75,
      avatar: 'detector',
      color: '#FF6B35',
      sciFiDescription: 'PATHOGEN DETECTION MATRIX SCANNING'
    },
    {
      key: 'advanced_analysis',
      title: 'PROCESSING NEURAL NETWORKS',
      description: 'Deep learning algorithms calculating confidence metrics',
      progress: 90,
      avatar: 'processor',
      color: '#4ECDC4',
      sciFiDescription: 'QUANTUM NEURAL NETWORK PROCESSING'
    },
    {
      key: 'final_results',
      title: 'ANALYSIS COMPLETE',
      description: 'Comprehensive AI report generated successfully',
      progress: 100,
      avatar: 'oracle',
      color: '#FFD93D',
      sciFiDescription: 'AI ANALYSIS MATRIX COMPLETE'
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
    setShowResults(false);
    
    // Simulate AI analysis steps with futuristic timing
    analysisSteps.forEach((step, index) => {
      setTimeout(() => {
        console.log(`🔄 AI Analysis Step ${index + 1}: ${step.title} - Progress: ${step.progress}%`);
        setCurrentStep(index);
        setProgress(step.progress);
        setStepDetails(step);
        
        // If this is the last step, complete analysis and auto-launch 3D dashboard
        if (index === analysisSteps.length - 1) {
          setTimeout(() => {
            console.log('✅ AI Analysis Complete! Auto-launching 3D Dashboard...');
            setIsAnalyzing(false);
            setShowResults(true);
            
            // Automatically complete analysis and go to results
            setTimeout(() => {
              console.log('✅ Analysis Complete! Going to results...');
              setIsAnalyzing(false);
              setShowResults(true);
              // Complete the analysis flow
              onComplete && onComplete();
            }, 2000);
          }, 2000);
        }
      }, index * 4000); // 4 seconds per step for dramatic effect
    });
  };

  const renderFuturisticHeader = () => (
    <View style={styles.futuristicHeader}>
      <View style={styles.headerGlow} />
      <Text style={styles.headerTitle}>AGROF QUANTUM AI SYSTEM</Text>
      <Text style={styles.headerSubtitle}>ADVANCED PLANT PATHOLOGY ANALYSIS</Text>
      <View style={styles.headerStatus}>
        <View style={styles.statusIndicator} />
        <Text style={styles.statusText}>SYSTEM STATUS: OPERATIONAL</Text>
      </View>
    </View>
  );

  const renderFuturisticProgress = () => (
    <View style={styles.progressSection}>
      <Text style={styles.progressTitle}>QUANTUM PROGRESS MATRIX</Text>
      
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                width: `${progress}%`,
                backgroundColor: stepDetails.color || '#00FFFF',
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>
      
      {/* Current Step Info */}
      <Text style={styles.currentStepTitle}>
        {stepDetails.title || 'INITIALIZING AI SYSTEMS'}
      </Text>
      <Text style={styles.currentStepDescription}>
        {stepDetails.sciFiDescription || 'QUANTUM SYSTEMS BOOTING'}
      </Text>
      
      {/* Progress Animation */}
      <View style={styles.progressAnimation}>
        <Text style={styles.progressAnimationText}>
          {progress < 25 && '🔄 INITIALIZING...'}
          {progress >= 25 && progress < 50 && '🔍 SCANNING...'}
          {progress >= 50 && progress < 75 && '🧠 ANALYZING...'}
          {progress >= 75 && progress < 100 && '⚡ PROCESSING...'}
          {progress >= 100 && '✅ COMPLETE!'}
        </Text>
      </View>
      
      {/* Debug Info */}
      <View style={styles.debugInfo}>
        <Text style={styles.debugText}>Step: {currentStep + 1}/5</Text>
        <Text style={styles.debugText}>Progress: {progress}%</Text>
        <Text style={styles.debugText}>Status: {isAnalyzing ? 'ANALYZING' : 'COMPLETE'}</Text>
      </View>
    </View>
  );

  const renderFuturisticResults = () => {
    if (!showResults || !analysisData) return null;

    return (
      <View style={styles.resultsSection}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsTitle}>AI ANALYSIS COMPLETE</Text>
          <Text style={styles.resultsSubtitle}>QUANTUM RESULTS GENERATED</Text>
        </View>

        <View style={styles.resultsGrid}>
          <View style={styles.resultCard}>
            <MaterialIcons name="eco" size={32} color="#00FFFF" />
            <Text style={styles.resultLabel}>CROP DETECTED</Text>
            <Text style={styles.resultValue}>
              {analysisData.crop_detection?.identified_crop || 'UNKNOWN'}
            </Text>
          </View>

          <View style={styles.resultCard}>
            <MaterialIcons name="bug-report" size={32} color="#FF6B35" />
            <Text style={styles.resultLabel}>DISEASE STATUS</Text>
            <Text style={styles.resultValue}>
              {analysisData.disease_detection?.disease || 'HEALTHY'}
            </Text>
          </View>

          <View style={styles.resultCard}>
            <MaterialIcons name="memory" size={32} color="#4ECDC4" />
            <Text style={styles.resultLabel}>AI CONFIDENCE</Text>
            <Text style={styles.resultValue}>
              {((analysisData.crop_detection?.confidence || 0) * 100).toFixed(1)}%
            </Text>
          </View>

          <View style={styles.resultCard}>
            <MaterialIcons name="auto-awesome" size={32} color="#FFD93D" />
            <Text style={styles.resultLabel}>ANALYSIS QUALITY</Text>
            <Text style={styles.resultValue}>QUANTUM GRADE</Text>
          </View>
        </View>

        <View style={styles.launchMessage}>
          <Text style={styles.launchMessageText}>🚀 LAUNCHING 3D DASHBOARD IN 2 SECONDS...</Text>
        </View>
      </View>
    );
  };



  const renderFuturisticFooter = () => (
    <View style={styles.futuristicFooter}>
      <View style={styles.footerGlow} />
      <Text style={styles.footerText}>QUANTUM COMPUTING MATRIX ACTIVE</Text>
    </View>
  );

  // Don't render anything if not visible
  if (!isVisible) return null;



  return (
    <View style={styles.container}>
      {/* Background */}
      <View style={styles.background} />
      
      {/* Content */}
      <View style={styles.content}>
        {/* Header */}
        {renderFuturisticHeader()}
        
        {/* AI Avatar */}
        <FuturisticAIAvatar
          currentStep={currentStep}
          isAnalyzing={isAnalyzing}
          stepDetails={stepDetails}
        />
        
        {/* Progress Section */}
        {renderFuturisticProgress()}
        
        {/* Step Indicator */}
        <View style={styles.stepIndicator}>
          <Text style={styles.stepIndicatorTitle}>CURRENT STEP: {currentStep + 1}/5</Text>
          <View style={styles.stepDots}>
            {analysisSteps.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.stepDot,
                  index <= currentStep && styles.stepDotActive,
                  index === currentStep && styles.stepDotCurrent,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Results Section */}
        {renderFuturisticResults()}
        
        {/* Footer */}
        {renderFuturisticFooter()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  futuristicHeader: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  headerGlow: {
    position: 'absolute',
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00FFFF',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: '#00FFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#4ECDC4',
    textAlign: 'center',
    marginBottom: 20,
  },
  headerStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00FF00',
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00FF00',
    marginRight: 10,
  },
  statusText: {
    fontSize: 12,
    color: '#00FF00',
    fontWeight: 'bold',
  },
  progressSection: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'rgba(0, 255, 255, 0.05)',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#00FFFF',
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00FFFF',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: '#00FFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  progressBarBackground: {
    flex: 1,
    height: 15,
    backgroundColor: 'rgba(0, 255, 255, 0.2)',
    borderRadius: 8,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#00FFFF',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 6,
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    minWidth: 10,
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00FFFF',
    minWidth: 50,
    textAlign: 'center',
  },
  currentStepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF00FF',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: '#FF00FF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  currentStepDescription: {
    fontSize: 14,
    color: '#4ECDC4',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  progressAnimation: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFD93D',
    marginTop: 15,
    marginBottom: 15,
  },
  progressAnimationText: {
    fontSize: 16,
    color: '#FFD93D',
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: '#FFD93D',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
  debugInfo: {
    backgroundColor: 'rgba(255, 0, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF00FF',
    marginTop: 15,
  },
  debugText: {
    fontSize: 12,
    color: '#FF00FF',
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  stepIndicator: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'rgba(255, 0, 255, 0.05)',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FF00FF',
  },
  stepIndicatorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF00FF',
    marginBottom: 15,
    textAlign: 'center',
  },
  stepDots: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  stepDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#333',
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: '#666',
  },
  stepDotActive: {
    backgroundColor: '#FF00FF',
    borderColor: '#FF00FF',
  },
  stepDotCurrent: {
    backgroundColor: '#00FFFF',
    borderColor: '#00FFFF',
    transform: [{ scale: 1.2 }],
  },
  resultsSection: {
    marginBottom: 30,
    backgroundColor: 'rgba(0, 255, 0, 0.05)',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#00FF00',
  },
  resultsHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00FF00',
    textAlign: 'center',
    marginBottom: 10,
  },
  resultsSubtitle: {
    fontSize: 14,
    color: '#4ECDC4',
    textAlign: 'center',
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  resultCard: {
    width: '48%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#00FFFF',
  },
  resultLabel: {
    fontSize: 12,
    color: '#4ECDC4',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  resultValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00FFFF',
    textAlign: 'center',
  },
  launchMessage: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFD93D',
    alignItems: 'center',
  },
  launchMessageText: {
    fontSize: 18,
    color: '#FFD93D',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#FFD93D',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
  futuristicFooter: {
    alignItems: 'center',
    position: 'relative',
  },
  footerGlow: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    backgroundColor: 'rgba(0, 255, 255, 0.05)',
    borderRadius: 15,
  },
  footerText: {
    fontSize: 12,
    color: '#4ECDC4',
    textAlign: 'center',
  },
  

});

export default FuturisticAIAnalysisScreen;
