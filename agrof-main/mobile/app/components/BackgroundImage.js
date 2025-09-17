import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const BackgroundImage = ({ children, overlayOpacity = 0.3, backgroundImage = 'welcome' }) => {
  // Map background names to actual image sources
  const getBackgroundSource = (bgName) => {
    try {
      switch (bgName) {
        case 'welcome':
          return require('../assets/welcome.png');
        case 'background1':
          return require('../assets/background-image.png');
        case 'background2':
          return require('../assets/background-image.png');
        case 'background3':
          return require('../assets/landing.png');
        case 'fertilizers':
          return require('../assets/fertilizers.png');
        case 'fungicides':
          return require('../assets/fungicides.png');
        case 'herbicides':
          return require('../assets/herbicides.png');
        case 'seeds':
          return require('../assets/seeds.png');
        case 'nursery':
          return require('../assets/nurserybed.png');
        case 'organic':
          return require('../assets/organic_chemicals.png');
        case 'splash':
          return require('../assets/splash.png');
        case 'landing':
          return require('../assets/landing.png');
        default:
          return require('../assets/welcome.png');
      }
    } catch (error) {
      console.log('Error loading background image:', bgName, error);
      return require('../assets/welcome.png');
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={getBackgroundSource(backgroundImage)} 
        style={styles.backgroundImage}
        resizeMode="cover"
        onError={(error) => {
          console.log('Image load error:', error.nativeEvent.error);
        }}
        onLoad={() => {
          console.log('Background image loaded successfully:', backgroundImage);
        }}
      />
      <View style={[styles.overlay, { backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }]}>
        {children}
      </View>
    </View>
  );
};

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
  },
  overlay: {
    flex: 1,
  },
});

export default BackgroundImage;
