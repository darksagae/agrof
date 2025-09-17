import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Easing, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function FuturisticTechShowcase() {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Simple animation values
  const agrofFallAnim = useRef(new Animated.Value(-200)).current; // Start closer for normal fall
  const agrofOpacityAnim = useRef(new Animated.Value(0)).current; // Start invisible
  const leafFallAnim = useRef(new Animated.Value(-300)).current; // Start closer for normal fall
  const leafScaleAnim = useRef(new Animated.Value(0.2)).current; // Start much smaller for dramatic effect
  const leafRotateAnim = useRef(new Animated.Value(0)).current; // Start no rotation

  useEffect(() => {
    startAnimations();
  }, []);

  const startAnimations = () => {
    // AGROF falls to center with normal fall effect
    Animated.parallel([
      Animated.timing(agrofFallAnim, {
        toValue: 0,
        duration: 2000, // Normal fall speed
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(agrofOpacityAnim, {
        toValue: 1,
        duration: 1500, // Fade in faster
        easing: Easing.in(Easing.ease),
        useNativeDriver: false,
      })
    ]).start(() => {
      // After AGROF lands, start leaf animation
      setTimeout(() => {
        // Leaves fall with zoom and rotation effect
        Animated.parallel([
          Animated.timing(leafFallAnim, {
            toValue: 100,
            duration: 3000,
            easing: Easing.out(Easing.bounce),
            useNativeDriver: false,
          }),
          Animated.timing(leafScaleAnim, {
            toValue: 4.0, // Much bigger size increase for dramatic effect
            duration: 3000,
            easing: Easing.out(Easing.bounce),
            useNativeDriver: false,
          }),
          Animated.timing(leafRotateAnim, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: false,
          })
        ]).start(() => {
          // All animations complete
        });
      }, 500);
    });
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/background-image.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
        onLoad={() => setImageLoaded(true)}
        fadeDuration={0}
        loading="eager"
      />
      <View style={styles.content}>
        {/* AGROF falling to center */}
        <Animated.View style={[
          styles.agrofContainer,
          {
            transform: [
              { translateY: agrofFallAnim }
            ],
            opacity: agrofOpacityAnim
          }
        ]}>
          <Text style={styles.agrofTitle}>AGROF</Text>
          <View style={styles.agrofGlow} />
        </Animated.View>

        {/* Leaves falling with zoom and rotation effect */}
        <Animated.View style={[
          styles.leafContainer,
          {
            transform: [
              { translateY: leafFallAnim },
              { scale: leafScaleAnim },
              { rotate: leafRotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg']
                })
              }
            ]
          }
        ]}>
          <Text style={styles.leafText}>🍃</Text>
        </Animated.View>

        {/* Welcome message at the top */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>AGROF</Text>
          <Text style={styles.welcomeSubtitle}>Your AI Powered Crop Health Companion</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 2,
  },
  agrofContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: height / 2 - 50,
    left: width / 2 - 100,
    zIndex: 10,
  },
  agrofTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    textShadowColor: '#4CAF50',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    zIndex: 2,
  },
  agrofGlow: {
    position: 'absolute',
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    backgroundColor: 'rgba(76, 175, 80, 0.3)',
    borderRadius: 50,
    zIndex: 1,
  },
  leafContainer: {
    position: 'absolute',
    top: height / 2 - 100,
    left: width / 2 - 50,
    zIndex: 5,
  },
  leafText: {
    fontSize: 60,
    textAlign: 'center',
  },
  welcomeSection: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c5530',
    textAlign: 'center',
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 10,
  },

});
