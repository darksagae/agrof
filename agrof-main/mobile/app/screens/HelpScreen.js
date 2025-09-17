import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Card, Title, Paragraph, List } from 'react-native-paper';

import { theme, cardStyles, textStyles, layoutStyles } from '../theme';

const HelpScreen = () => {
  const tips = [
    {
      title: 'Good Lighting',
      description: 'Take photos in bright, natural light. Avoid shadows and direct sunlight that can create glare.',
      icon: 'wb-sunny',
      color: theme.colors.warning,
    },
    {
      title: 'Focus on the Leaf',
      description: 'Make sure the leaf is clearly visible and in focus. The entire leaf should be captured in the frame.',
      icon: 'center-focus-strong',
      color: theme.colors.primary,
    },
    {
      title: 'Include Leaf Margins',
      description: 'Capture the entire leaf including the edges and margins, as disease symptoms often appear there first.',
      icon: 'crop-square',
      color: theme.colors.info,
    },
    {
      title: 'Clean Background',
      description: 'Use a simple, clean background. Avoid cluttered backgrounds that might confuse the analysis.',
      icon: 'format-clear',
      color: theme.colors.success,
    },
    {
      title: 'Multiple Angles',
      description: 'If possible, take photos from different angles to capture all visible symptoms of the disease.',
      icon: 'rotate-right',
      color: theme.colors.accent,
    },
    {
      title: 'Avoid Blur',
      description: 'Keep your hand steady and ensure the image is not blurry. A clear image leads to better analysis.',
      icon: 'blur-off',
      color: theme.colors.error,
    },
  ];

  const appFeatures = [
    {
      title: 'Camera Integration',
      description: 'Take photos directly within the app or select from your gallery.',
      icon: 'camera-alt',
    },
    {
      title: 'Instant Analysis',
      description: 'Get disease detection results within seconds using advanced AI technology.',
      icon: 'speed',
    },
    {
      title: 'Treatment Recommendations',
      description: 'Receive actionable treatment advice based on the detected disease.',
      icon: 'healing',
    },
    {
      title: 'Severity Assessment',
      description: 'Understand the severity level of the detected disease.',
      icon: 'assessment',
    },
    {
      title: 'Educational Resources',
      description: 'Access additional information and references for further learning.',
      icon: 'school',
    },
  ];

  const renderTip = (tip, index) => (
    <Card key={index} style={[cardStyles.container, { marginBottom: 12 }]}>
      <Card.Content>
        <View style={layoutStyles.row}>
          <MaterialIcons
            name={tip.icon}
            size={32}
            color={tip.color}
            style={{ marginRight: 12 }}
          />
          <View style={{ flex: 1 }}>
            <Title style={[textStyles.subtitle, { marginBottom: 4 }]}>
              {tip.title}
            </Title>
            <Paragraph style={textStyles.body}>
              {tip.description}
            </Paragraph>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  const renderFeature = (feature, index) => (
    <List.Item
      key={index}
      title={feature.title}
      description={feature.description}
      left={(props) => (
        <MaterialIcons
          {...props}
          name={feature.icon}
          size={24}
          color={theme.colors.primary}
        />
      )}
      titleStyle={textStyles.body}
      descriptionStyle={textStyles.caption}
      style={{ paddingVertical: 4 }}
    />
  );

  return (
    <SafeAreaView style={layoutStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Card style={cardStyles.container}>
          <Card.Content>
            <Title style={textStyles.title}>How to Take a Good Photo</Title>
            <Paragraph style={textStyles.body}>
              Follow these tips to get the best results from the disease detection system.
            </Paragraph>
          </Card.Content>
        </Card>

        {/* Photo Tips */}
        <View style={styles.section}>
          <Title style={[textStyles.subtitle, { marginBottom: 16 }]}>
            Photography Tips
          </Title>
          {tips.map(renderTip)}
        </View>

        {/* App Features */}
        <Card style={cardStyles.container}>
          <Card.Content>
            <Title style={textStyles.subtitle}>App Features</Title>
            {appFeatures.map(renderFeature)}
          </Card.Content>
        </Card>

        {/* Best Practices */}
        <Card style={cardStyles.container}>
          <Card.Content>
            <Title style={textStyles.subtitle}>Best Practices</Title>
            <List.Item
              title="Regular Monitoring"
              description="Check your crops regularly for early signs of disease."
              left={(props) => (
                <MaterialIcons
                  {...props}
                  name="schedule"
                  size={24}
                  color={theme.colors.primary}
                />
              )}
            />
            <List.Item
              title="Consult Experts"
              description="Always consult with local agricultural experts for treatment decisions."
              left={(props) => (
                <MaterialIcons
                  {...props}
                  name="person"
                  size={24}
                  color={theme.colors.primary}
                />
              )}
            />
            <List.Item
              title="Keep Records"
              description="Maintain records of detected diseases and treatments applied."
              left={(props) => (
                <MaterialIcons
                  {...props}
                  name="note"
                  size={24}
                  color={theme.colors.primary}
                />
              )}
            />
          </Card.Content>
        </Card>

        {/* Supported Crops */}
        <Card style={cardStyles.container}>
          <Card.Content>
            <Title style={textStyles.subtitle}>Supported Crops</Title>
            <View style={styles.cropGrid}>
              <View style={styles.cropItem}>
                <MaterialIcons name="grass" size={32} color={theme.colors.primary} />
                <Text style={textStyles.body}>Maize</Text>
              </View>
              <View style={styles.cropItem}>
                <MaterialIcons name="local-cafe" size={32} color={theme.colors.primary} />
                <Text style={textStyles.body}>Coffee</Text>
              </View>
            </View>
            <Paragraph style={[textStyles.caption, { marginTop: 12 }]}>
              More crops will be added in future updates.
            </Paragraph>
          </Card.Content>
        </Card>

        {/* Contact Information */}
        <Card style={cardStyles.container}>
          <Card.Content>
            <Title style={textStyles.subtitle}>Need Help?</Title>
            <Paragraph style={textStyles.body}>
              If you encounter any issues or have questions about the app, please contact your local agricultural extension office or technical support.
            </Paragraph>
            <View style={styles.contactInfo}>
              <MaterialIcons name="support-agent" size={24} color={theme.colors.info} />
              <Text style={[textStyles.body, { marginLeft: 8, color: theme.colors.info }]}>
                Contact Extension Officer
              </Text>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  cropGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  cropItem: {
    alignItems: 'center',
    padding: 16,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 12,
    backgroundColor: theme.colors.background,
    borderRadius: 8,
  },
});

export default HelpScreen;
