import React, { useState, useEffect } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';

const LazyImage = ({ 
  source, 
  style, 
  resizeMode = 'cover', 
  placeholder = null,
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <View style={[styles.container, style]}>
      {!hasError && (
        <Image
          source={source}
          style={[styles.image, style]}
          resizeMode={resizeMode}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
          {...props}
        />
      )}
      
      {/* Loading indicator */}
      {isLoading && !hasError && (
        <View style={[styles.loadingContainer, style]}>
          {placeholder ? (
            <Image source={placeholder} style={[styles.placeholder, style]} resizeMode={resizeMode} />
          ) : (
            <View style={[styles.placeholderDefault, style]}>
              <ActivityIndicator size="small" color="#2c5530" />
            </View>
          )}
        </View>
      )}
      
      {/* Error fallback */}
      {hasError && (
        <View style={[styles.errorContainer, style]}>
          <View style={[styles.errorPlaceholder, style]} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  placeholderDefault: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorPlaceholder: {
    backgroundColor: '#e8e8e8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default LazyImage;