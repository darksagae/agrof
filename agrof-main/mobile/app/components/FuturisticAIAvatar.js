import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const FuturisticAIAvatar = ({ 
  currentStep, 
  isAnalyzing, 
  stepDetails 
}) => {
  const glowAnim = useRef(new Animated.Value(0)).current;
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const hologramAnim = useRef(new Animated.Value(0)).current;
  
  const [currentAvatar, setCurrentAvatar] = useState('scanner');
  const [avatarMessage, setAvatarMessage] = useState('INITIALIZING AI SYSTEMS');

  useEffect(() => {
    if (isAnalyzing) {
      startAvatarAnimation();
      updateAvatarForStep(currentStep);
    }
  }, [isAnalyzing, currentStep]);

  const startAvatarAnimation = () => {
    // Glowing effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Rotation effect
    Animated.loop(
      Animated.timing(rotationAnim, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    ).start();

    // Pulse effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Hologram effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(hologramAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(hologramAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const updateAvatarForStep = (step) => {
    switch (step) {
      case 0: // image_preprocessing
        setCurrentAvatar('scanner');
        setAvatarMessage('SCANNING IMAGE MATRIX');
        break;
      case 1: // crop_identification
        setCurrentAvatar('analyzer');
        setAvatarMessage('ANALYZING PLANT STRUCTURE');
        break;
      case 2: // disease_detection
        setCurrentAvatar('detector');
        setAvatarMessage('DETECTING PATHOGEN PATTERNS');
        break;
      case 3: // advanced_analysis
        setCurrentAvatar('processor');
        setAvatarMessage('PROCESSING NEURAL NETWORKS');
        break;
      case 4: // final_results
        setCurrentAvatar('oracle');
        setAvatarMessage('ANALYSIS COMPLETE');
        break;
      default:
        setCurrentAvatar('scanner');
        setAvatarMessage('INITIALIZING AI SYSTEMS');
    }
  };

  const getAvatarIcon = () => {
    switch (currentAvatar) {
      case 'scanner':
        return 'scanner';
      case 'analyzer':
        return 'psychology';
      case 'detector':
        return 'bug-report';
      case 'processor':
        return 'memory';
      case 'oracle':
        return 'auto-awesome';
      default:
        return 'scanner';
    }
  };

  const getAvatarColor = () => {
    return stepDetails?.color || '#00FFFF';
  };

  return (
    <View style={styles.container}>
      {/* Main Avatar */}
      <Animated.View style={[
        styles.avatarContainer,
        {
          transform: [
            { scale: pulseAnim },
            { rotate: rotationAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
              })
            }
          ]
        }
      ]}>
        {/* Glow Effect */}
        <Animated.View style={[
          styles.avatarGlow,
          {
            opacity: glowAnim,
            backgroundColor: getAvatarColor(),
          }
        ]} />
        
        {/* Avatar Icon */}
        <View style={[styles.avatarIcon, { backgroundColor: getAvatarColor() }]}>
          <MaterialIcons 
            name={getAvatarIcon()} 
            size={48} 
            color="#000" 
          />
        </View>
        
        {/* Hologram Effect */}
        <Animated.View style={[
          styles.hologramEffect,
          {
            opacity: hologramAnim,
            borderColor: getAvatarColor(),
          }
        ]} />
      </Animated.View>

      {/* Avatar Message */}
      <Text style={[styles.avatarMessage, { color: getAvatarColor() }]}>
        {avatarMessage}
      </Text>

      {/* Status Indicator */}
      <View style={styles.statusIndicator}>
        <View style={[styles.statusDot, { backgroundColor: getAvatarColor() }]} />
        <Text style={[styles.statusText, { color: getAvatarColor() }]}>
          AI SYSTEM: {isAnalyzing ? 'ACTIVE' : 'STANDBY'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  avatarGlow: {
    position: 'absolute',
    top: -30,
    left: -30,
    right: -30,
    bottom: -30,
    borderRadius: 60,
    opacity: 0.3,
  },
  avatarIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#00FFFF',
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  hologramEffect: {
    position: 'absolute',
    top: -40,
    left: -40,
    right: -40,
    bottom: -40,
    borderRadius: 80,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  avatarMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: '#00FFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00FFFF',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default FuturisticAIAvatar;
