import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Card, Title, Paragraph, Chip, Button } from 'react-native-paper';

import { theme, diseaseColors, severityColors, cardStyles, textStyles, layoutStyles } from '../theme';

const ResultScreen = ({ route, navigation }) => {
  const { image, result } = route.params;
  const { prediction, treatment } = result;

  const getDiseaseColor = (disease) => {
    return diseaseColors[disease] || diseaseColors.unknown;
  };

  const getSeverityColor = (severity) => {
    return severityColors[severity] || severityColors.medium;
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'low':
        return 'check-circle';
      case 'medium':
        return 'warning';
      case 'high':
        return 'error';
      default:
        return 'info';
    }
  };

  const formatConfidence = (confidence) => {
    return `${(confidence * 100).toFixed(1)}%`;
  };

  const openReference = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Cannot open this link');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open link');
    }
  };

  const renderDiseaseInfo = () => {
    const diseaseColor = getDiseaseColor(prediction.disease);
    
    return (
      <Card style={[cardStyles.result, { borderLeftColor: diseaseColor }]}>
        <Card.Content>
          <View style={layoutStyles.row}>
            <MaterialIcons
              name={prediction.disease === 'healthy' ? 'check-circle' : 'warning'}
              size={32}
              color={diseaseColor}
            />
            <View style={styles.diseaseInfo}>
              <Title style={[textStyles.title, { color: diseaseColor }]}>
                {treatment.disease_name}
              </Title>
              <Text style={textStyles.caption}>
                Confidence: {formatConfidence(prediction.confidence)}
              </Text>
            </View>
          </View>
          
          <Paragraph style={[textStyles.body, { marginTop: 12 }]}>
            {treatment.description}
          </Paragraph>
        </Card.Content>
      </Card>
    );
  };

  const renderSeverityInfo = () => {
    const severityColor = getSeverityColor(treatment.severity_level);
    const severityIcon = getSeverityIcon(treatment.severity_level);
    
    return (
      <Card style={cardStyles.container}>
        <Card.Content>
          <Title style={textStyles.subtitle}>Severity Level</Title>
          <View style={layoutStyles.row}>
            <MaterialIcons
              name={severityIcon}
              size={24}
              color={severityColor}
            />
            <Chip
              mode="outlined"
              textStyle={{ color: severityColor, fontWeight: 'bold' }}
              style={[styles.severityChip, { borderColor: severityColor }]}
            >
              {treatment.severity_level.toUpperCase()}
            </Chip>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderRecommendedActions = () => {
    return (
      <Card style={cardStyles.container}>
        <Card.Content>
          <Title style={textStyles.subtitle}>Recommended Actions</Title>
          {treatment.recommended_actions.map((action, index) => (
            <View key={index} style={styles.actionItem}>
              <MaterialIcons
                name="check-circle"
                size={20}
                color={theme.colors.primary}
              />
              <Text style={[textStyles.body, { marginLeft: 8, flex: 1 }]}>
                {action}
              </Text>
            </View>
          ))}
        </Card.Content>
      </Card>
    );
  };

  const renderPreventionTips = () => {
    if (!treatment.prevention_tips || treatment.prevention_tips.length === 0) {
      return null;
    }

    return (
      <Card style={cardStyles.container}>
        <Card.Content>
          <Title style={textStyles.subtitle}>Prevention Tips</Title>
          {treatment.prevention_tips.map((tip, index) => (
            <View key={index} style={styles.actionItem}>
              <MaterialIcons
                name="lightbulb"
                size={20}
                color={theme.colors.warning}
              />
              <Text style={[textStyles.body, { marginLeft: 8, flex: 1 }]}>
                {tip}
              </Text>
            </View>
          ))}
        </Card.Content>
      </Card>
    );
  };

  const renderReferences = () => {
    if (!treatment.references || treatment.references.length === 0) {
      return null;
    }

    return (
      <Card style={cardStyles.container}>
        <Card.Content>
          <Title style={textStyles.subtitle}>Learn More</Title>
          {treatment.references.map((url, index) => (
            <TouchableOpacity
              key={index}
              style={styles.referenceItem}
              onPress={() => openReference(url)}
            >
              <MaterialIcons
                name="link"
                size={20}
                color={theme.colors.info}
              />
              <Text style={[textStyles.body, { marginLeft: 8, flex: 1, color: theme.colors.info }]}>
                Reference {index + 1}
              </Text>
              <MaterialIcons
                name="open-in-new"
                size={16}
                color={theme.colors.info}
              />
            </TouchableOpacity>
          ))}
        </Card.Content>
      </Card>
    );
  };

  const renderProbabilityChart = () => {
    const sortedProbs = Object.entries(prediction.probabilities)
      .sort(([,a], [,b]) => b - a);

    return (
      <Card style={cardStyles.container}>
        <Card.Content>
          <Title style={textStyles.subtitle}>All Probabilities</Title>
          {sortedProbs.map(([disease, prob]) => (
            <View key={disease} style={styles.probabilityItem}>
              <View style={styles.probabilityBar}>
                <View
                  style={[
                    styles.probabilityFill,
                    {
                      width: `${prob * 100}%`,
                      backgroundColor: getDiseaseColor(disease),
                    }
                  ]}
                />
              </View>
              <View style={styles.probabilityText}>
                <Text style={textStyles.body}>
                  {disease.replace('_', ' ').toUpperCase()}
                </Text>
                <Text style={textStyles.caption}>
                  {formatConfidence(prob)}
                </Text>
              </View>
            </View>
          ))}
        </Card.Content>
      </Card>
    );
  };

  return (
    <SafeAreaView style={layoutStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Original Image */}
        <Card style={cardStyles.container}>
          <Card.Content>
            <Title style={textStyles.subtitle}>Analyzed Image</Title>
            <Image
              source={{ uri: image.uri }}
              style={styles.analyzedImage}
              resizeMode="cover"
            />
          </Card.Content>
        </Card>

        {/* Disease Information */}
        {renderDiseaseInfo()}

        {/* Severity Level */}
        {renderSeverityInfo()}

        {/* Recommended Actions */}
        {renderRecommendedActions()}

        {/* Prevention Tips */}
        {renderPreventionTips()}

        {/* References */}
        {renderReferences()}

        {/* Probability Chart */}
        {renderProbabilityChart()}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Upload')}
            style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
          >
            Analyze Another Image
          </Button>
          
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Help')}
            style={styles.actionButton}
          >
            Get Help
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
  },
  diseaseInfo: {
    flex: 1,
    marginLeft: 12,
  },
  severityChip: {
    marginLeft: 8,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 4,
  },
  referenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    paddingVertical: 8,
  },
  probabilityItem: {
    marginVertical: 8,
  },
  probabilityBar: {
    height: 8,
    backgroundColor: theme.colors.disabled,
    borderRadius: 4,
    overflow: 'hidden',
  },
  probabilityFill: {
    height: '100%',
    borderRadius: 4,
  },
  probabilityText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  analyzedImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
  actionButtons: {
    marginTop: 16,
  },
  actionButton: {
    marginVertical: 8,
  },
});

export default ResultScreen;
