import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ManagementOverview = ({ savedAnalyses, cropPlans = [] }) => {
  const [stats, setStats] = useState({});
  const [trends, setTrends] = useState([]);
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    if (savedAnalyses) {
      calculateStats();
      generateTrends();
      generateInsights();
    }
  }, [savedAnalyses, cropPlans]);

  // Calculate comprehensive statistics
  const calculateStats = () => {
    if (!savedAnalyses || savedAnalyses.length === 0) {
      setStats({
        totalScans: 0,
        uniqueCrops: 0,
        diseasesDetected: 0,
        avgConfidence: 0,
        totalBudget: 0,
        activePlans: cropPlans.length
      });
      return;
    }

    const totalScans = savedAnalyses.length;
    const uniqueCrops = [...new Set(savedAnalyses.map(a => a.crop).filter(Boolean))].length;
    const diseasesDetected = savedAnalyses.filter(a => 
      a.disease && a.disease !== 'No disease detected'
    ).length;
    const avgConfidence = savedAnalyses.reduce((sum, a) => sum + (a.confidence || 0), 0) / totalScans;
    const totalBudget = cropPlans.reduce((sum, plan) => sum + (parseFloat(plan.budget) || 0), 0);

    setStats({
      totalScans,
      uniqueCrops,
      diseasesDetected,
      avgConfidence: Math.round(avgConfidence * 100),
      totalBudget: Math.round(totalBudget),
      activePlans: cropPlans.length
    });
  };

  // Generate trends based on scan data
  const generateTrends = () => {
    if (!savedAnalyses || savedAnalyses.length === 0) {
      setTrends([]);
      return;
    }

    const trendsData = [];
    
    // Crop distribution trend
    const cropCounts = {};
    savedAnalyses.forEach(analysis => {
      const crop = analysis.crop || 'Unknown';
      cropCounts[crop] = (cropCounts[crop] || 0) + 1;
    });
    
    const topCrops = Object.entries(cropCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);
    
    if (topCrops.length > 0) {
      trendsData.push({
        type: 'crop_distribution',
        title: 'Most Analyzed Crops',
        description: `Top crops: ${topCrops.map(([crop, count]) => `${crop} (${count})`).join(', ')}`,
        icon: 'local-florist',
        color: '#4CAF50',
        trend: 'up'
      });
    }

    // Disease detection trend
    const diseaseCounts = {};
    savedAnalyses.forEach(analysis => {
      if (analysis.disease && analysis.disease !== 'No disease detected') {
        const disease = analysis.disease;
        diseaseCounts[disease] = (diseaseCounts[disease] || 0) + 1;
      }
    });
    
    if (Object.keys(diseaseCounts).length > 0) {
      const mostCommonDisease = Object.entries(diseaseCounts)
        .sort(([,a], [,b]) => b - a)[0];
      
      trendsData.push({
        type: 'disease_trend',
        title: 'Disease Patterns',
        description: `Most common: ${mostCommonDisease[0]} (${mostCommonDisease[1]} cases)`,
        icon: 'warning',
        color: '#FF9800',
        trend: 'alert'
      });
    }

    // Confidence trend
    const highConfidenceScans = savedAnalyses.filter(a => (a.confidence || 0) >= 0.6).length;
    const confidencePercentage = Math.round((highConfidenceScans / savedAnalyses.length) * 100);
    
    trendsData.push({
      type: 'confidence_trend',
      title: 'Analysis Quality',
      description: `${confidencePercentage}% of scans have high confidence`,
      icon: 'trending-up',
      color: confidencePercentage >= 70 ? '#4CAF50' : '#FF9800',
      trend: confidencePercentage >= 70 ? 'up' : 'stable'
    });

    setTrends(trendsData);
  };

  // Generate actionable insights
  const generateInsights = () => {
    if (!savedAnalyses || savedAnalyses.length === 0) {
      setInsights([
        {
          type: 'general',
          title: 'Get Started',
          description: 'Begin by analyzing your first crop image to see insights here',
          icon: 'lightbulb',
          color: '#2196F3',
          priority: 'high'
        }
      ]);
      return;
    }

    const insightsData = [];

    // Disease management insights
    const diseasedScans = savedAnalyses.filter(a => 
      a.disease && a.disease !== 'No disease detected'
    );
    
    if (diseasedScans.length > 0) {
      const diseasePercentage = Math.round((diseasedScans.length / savedAnalyses.length) * 100);
      
      if (diseasePercentage > 30) {
        insightsData.push({
          type: 'disease_management',
          title: 'High Disease Incidence',
          description: `${diseasePercentage}% of crops show disease symptoms. Consider implementing preventive measures.`,
          icon: 'healing',
          color: '#f44336',
          priority: 'high'
        });
      } else if (diseasePercentage > 10) {
        insightsData.push({
          type: 'disease_management',
          title: 'Moderate Disease Risk',
          description: `${diseasePercentage}% disease detection. Monitor closely and prepare treatment plans.`,
          icon: 'visibility',
          color: '#FF9800',
          priority: 'medium'
        });
      }
    }

    // Crop diversity insights
    const uniqueCrops = [...new Set(savedAnalyses.map(a => a.crop).filter(Boolean))];
    if (uniqueCrops.length === 1) {
      insightsData.push({
        type: 'crop_diversity',
        title: 'Limited Crop Variety',
        description: 'You\'re only analyzing ${uniqueCrops[0]}. Consider diversifying for better risk management.',
        icon: 'eco',
        color: '#FF9800',
        priority: 'medium'
      });
    } else if (uniqueCrops.length >= 3) {
      insightsData.push({
        type: 'crop_diversity',
        title: 'Good Crop Diversity',
        description: 'Analyzing ${uniqueCrops.length} different crops. This helps with risk management.',
        icon: 'check-circle',
        color: '#4CAF50',
        priority: 'low'
      });
    }

    // Budget planning insights
    if (cropPlans.length > 0) {
      const totalBudget = cropPlans.reduce((sum, plan) => sum + (parseFloat(plan.budget) || 0), 0);
      const avgBudgetPerPlan = totalBudget / cropPlans.length;
      
      if (avgBudgetPerPlan > 1000) {
        insightsData.push({
          type: 'budget_planning',
          title: 'High Investment Plans',
          description: `Average plan budget: UGX ${Math.round(avgBudgetPerPlan).toLocaleString()}. Ensure proper ROI tracking.`,
          icon: 'attach-money',
          color: '#2196F3',
          priority: 'medium'
        });
      }
    }

    // Analysis frequency insights
    const recentScans = savedAnalyses.filter(a => {
      const scanDate = new Date(a.timestamp || Date.now());
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return scanDate > oneWeekAgo;
    });
    
    if (recentScans.length === 0) {
      insightsData.push({
        type: 'activity',
        title: 'Low Recent Activity',
        description: 'No scans in the last week. Regular monitoring helps catch issues early.',
        icon: 'schedule',
        color: '#FF9800',
        priority: 'medium'
      });
    } else if (recentScans.length >= 5) {
      insightsData.push({
        type: 'activity',
        title: 'Active Monitoring',
        description: '${recentScans.length} scans this week. Great proactive approach!',
        icon: 'thumb-up',
        color: '#4CAF50',
        priority: 'low'
      });
    }

    setInsights(insightsData);
  };

  // Get trend icon
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'trending-up';
      case 'down':
        return 'trending-down';
      case 'stable':
        return 'trending-flat';
      case 'alert':
        return 'warning';
      default:
        return 'trending-up';
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#f44336';
      case 'medium':
        return '#FF9800';
      case 'low':
        return '#4CAF50';
      default:
        return '#2196F3';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Management Overview</Text>
        <Text style={styles.subtitle}>
          Real-time insights from your agricultural operations
        </Text>
      </View>

      {/* Key Statistics */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Key Metrics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <MaterialIcons name="camera-alt" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.statNumber}>{stats.totalScans || 0}</Text>
            <Text style={styles.statLabel}>Total Scans</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <MaterialIcons name="local-florist" size={24} color="#2196F3" />
            </View>
            <Text style={styles.statNumber}>{stats.uniqueCrops || 0}</Text>
            <Text style={styles.statLabel}>Crop Types</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <MaterialIcons name="warning" size={24} color="#FF9800" />
            </View>
            <Text style={styles.statNumber}>{stats.diseasesDetected || 0}</Text>
            <Text style={styles.statLabel}>Diseases Found</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <MaterialIcons name="trending-up" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.statNumber}>{stats.avgConfidence || 0}%</Text>
            <Text style={styles.statLabel}>Avg Confidence</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <MaterialIcons name="attach-money" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.statNumber}>UGX {(stats.totalBudget || 0).toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Budget</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <MaterialIcons name="schedule" size={24} color="#2196F3" />
            </View>
            <Text style={styles.statNumber}>{stats.activePlans || 0}</Text>
            <Text style={styles.statLabel}>Active Plans</Text>
          </View>
        </View>
      </View>

      {/* Trends Analysis */}
      {trends.length > 0 && (
        <View style={styles.trendsSection}>
          <Text style={styles.sectionTitle}>Trends & Patterns</Text>
          {trends.map((trend, index) => (
            <View key={index} style={styles.trendCard}>
              <View style={styles.trendHeader}>
                <View style={[styles.trendIconContainer, { backgroundColor: trend.color + '20' }]}>
                  <MaterialIcons name={trend.icon} size={20} color={trend.color} />
                </View>
                <View style={styles.trendInfo}>
                  <Text style={styles.trendTitle}>{trend.title}</Text>
                  <Text style={styles.trendDescription}>{trend.description}</Text>
                </View>
                <MaterialIcons 
                  name={getTrendIcon(trend.trend)} 
                  size={20} 
                  color={trend.color} 
                />
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Actionable Insights */}
      <View style={styles.insightsSection}>
        <Text style={styles.sectionTitle}>Actionable Insights</Text>
        {insights.map((insight, index) => (
          <View key={index} style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <View style={[styles.insightIconContainer, { backgroundColor: insight.color + '20' }]}>
                <MaterialIcons name={insight.icon} size={20} color={insight.color} />
              </View>
              <View style={styles.insightInfo}>
                <Text style={styles.insightTitle}>{insight.title}</Text>
                <Text style={styles.insightDescription}>{insight.description}</Text>
              </View>
              <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(insight.priority) }]}>
                <Text style={styles.priorityText}>
                  {insight.priority.charAt(0).toUpperCase() + insight.priority.slice(1)}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard}>
            <MaterialIcons name="camera-alt" size={24} color="#4CAF50" />
            <Text style={styles.actionText}>New Scan</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard}>
            <MaterialIcons name="calendar-today" size={24} color="#2196F3" />
            <Text style={styles.actionText}>View Calendar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard}>
            <MaterialIcons name="assessment" size={24} color="#FF9800" />
            <Text style={styles.actionText}>Reports</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard}>
            <MaterialIcons name="settings" size={24} color="#9C27B0" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Performance Summary */}
      {savedAnalyses && savedAnalyses.length > 0 && (
        <View style={styles.performanceSection}>
          <Text style={styles.sectionTitle}>Performance Summary</Text>
          <View style={styles.performanceCard}>
            <View style={styles.performanceRow}>
              <Text style={styles.performanceLabel}>Scan Success Rate</Text>
              <Text style={styles.performanceValue}>
                {Math.round((stats.totalScans / Math.max(stats.totalScans, 1)) * 100)}%
              </Text>
            </View>
            <View style={styles.performanceRow}>
              <Text style={styles.performanceLabel}>Disease Detection Rate</Text>
              <Text style={styles.performanceValue}>
                {Math.round((stats.diseasesDetected / Math.max(stats.totalScans, 1)) * 100)}%
              </Text>
            </View>
            <View style={styles.performanceRow}>
              <Text style={styles.performanceLabel}>High Confidence Rate</Text>
              <Text style={styles.performanceValue}>
                {Math.round((stats.avgConfidence || 0))}%
              </Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c5530',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  statsSection: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c5530',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 80) / 2,
    alignItems: 'center',
    marginBottom: 16,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f8f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c5530',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  trendsSection: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
  },
  trendCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  trendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  trendInfo: {
    flex: 1,
  },
  trendTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c5530',
    marginBottom: 2,
  },
  trendDescription: {
    fontSize: 12,
    color: '#666',
  },
  insightsSection: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
  },
  insightCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  insightIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  insightInfo: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c5530',
    marginBottom: 2,
  },
  insightDescription: {
    fontSize: 12,
    color: '#666',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  actionsSection: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 80) / 2,
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2c5530',
    marginTop: 8,
  },
  performanceSection: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
  },
  performanceCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
  },
  performanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  performanceLabel: {
    fontSize: 14,
    color: '#666',
  },
  performanceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c5530',
  },
});

export default ManagementOverview;
