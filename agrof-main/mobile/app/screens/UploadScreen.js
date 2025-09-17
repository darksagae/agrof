import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

import { sendImageWithRetry, testConnection } from '../api';
import { theme, buttonStyles, cardStyles, textStyles, layoutStyles } from '../theme';

const UploadScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionChecking, setConnectionChecking] = useState(true);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    setConnectionChecking(true);
    try {
      const connected = await testConnection();
      setIsConnected(connected);
    } catch (error) {
      console.error('Connection check failed:', error);
      setIsConnected(false);
    } finally {
      setConnectionChecking(false);
    }
  };

  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
      Alert.alert(
        'Permissions Required',
        'Camera and photo library permissions are required to use this app.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0]);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      Alert.alert('No Image', 'Please select an image first.');
      return;
    }

    if (!isConnected) {
      Alert.alert(
        'Connection Error',
        'Cannot connect to the server. Please check your internet connection and try again.',
        [
          { text: 'Retry', onPress: checkConnection },
          { text: 'OK' }
        ]
      );
      return;
    }

    setIsLoading(true);

    try {
      const result = await sendImageWithRetry(selectedImage.uri);
      
      navigation.navigate('Result', {
        image: selectedImage,
        result: result,
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      Alert.alert(
        'Analysis Failed',
        error.message || 'Failed to analyze image. Please try again.',
        [
          { text: 'Retry', onPress: analyzeImage },
          { text: 'OK' }
        ]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
  };

  const renderConnectionStatus = () => {
    if (connectionChecking) {
      return (
        <Card style={[cardStyles.container, { marginBottom: 16 }]}>
          <Card.Content>
            <View style={layoutStyles.row}>
              <ActivityIndicator size="small" color={theme.colors.primary} />
              <Text style={[textStyles.body, { marginLeft: 8 }]}>
                Checking connection...
              </Text>
            </View>
          </Card.Content>
        </Card>
      );
    }

    return (
      <Card style={[cardStyles.container, { marginBottom: 16 }]}>
        <Card.Content>
          <View style={layoutStyles.row}>
            <MaterialIcons
              name={isConnected ? 'check-circle' : 'error'}
              size={24}
              color={isConnected ? theme.colors.success : theme.colors.error}
            />
            <Text style={[textStyles.body, { marginLeft: 8 }]}>
              {isConnected ? 'Connected to server' : 'Not connected to server'}
            </Text>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderImagePreview = () => {
    if (!selectedImage) return null;

    return (
      <Card style={[cardStyles.container, { marginBottom: 16 }]}>
        <Card.Content>
          <Title>Selected Image</Title>
          <Image
            source={{ uri: selectedImage.uri }}
            style={styles.imagePreview}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearImage}
          >
            <MaterialIcons name="clear" size={20} color={theme.colors.error} />
            <Text style={[textStyles.caption, { color: theme.colors.error, marginLeft: 4 }]}>
              Remove Image
            </Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    );
  };

  return (
    <SafeAreaView style={layoutStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Connection Status */}
        {renderConnectionStatus()}

        {/* Welcome Card */}
        <Card style={cardStyles.container}>
          <Card.Content>
            <Title style={textStyles.title}>Crop Disease Detector</Title>
            <Paragraph style={textStyles.body}>
              Take a photo or select an image of a crop leaf to detect diseases.
              The app will analyze the image and provide treatment recommendations.
            </Paragraph>
          </Card.Content>
        </Card>

        {/* Image Selection Buttons */}
        <Card style={cardStyles.container}>
          <Card.Content>
            <Title style={textStyles.subtitle}>Select Image</Title>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
                onPress={takePhoto}
                disabled={isLoading}
              >
                <MaterialIcons name="camera-alt" size={32} color="white" />
                <Text style={styles.buttonText}>Take Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: theme.colors.info }]}
                onPress={pickImage}
                disabled={isLoading}
              >
                <MaterialIcons name="photo-library" size={32} color="white" />
                <Text style={styles.buttonText}>Choose from Gallery</Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>

        {/* Image Preview */}
        {renderImagePreview()}

        {/* Analyze Button */}
        {selectedImage && (
          <Card style={cardStyles.container}>
            <Card.Content>
              <TouchableOpacity
                style={[
                  styles.analyzeButton,
                  { backgroundColor: isConnected ? theme.colors.primary : theme.colors.disabled }
                ]}
                onPress={analyzeImage}
                disabled={isLoading || !isConnected}
              >
                {isLoading ? (
                  <ActivityIndicator size="large" color="white" />
                ) : (
                  <>
                    <MaterialIcons name="search" size={24} color="white" />
                    <Text style={styles.analyzeButtonText}>Analyze Image</Text>
                  </>
                )}
              </TouchableOpacity>
            </Card.Content>
          </Card>
        )}

        {/* Help Button */}
        <TouchableOpacity
          style={styles.helpButton}
          onPress={() => navigation.navigate('Help')}
        >
          <MaterialIcons name="help" size={20} color={theme.colors.primary} />
          <Text style={[textStyles.body, { color: theme.colors.primary, marginLeft: 8 }]}>
            How to take a good photo
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 12,
    width: '45%',
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    padding: 8,
  },
  analyzeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  analyzeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    padding: 12,
  },
});

export default UploadScreen;
