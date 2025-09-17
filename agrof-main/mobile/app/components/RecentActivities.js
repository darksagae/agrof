import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const RecentActivities = ({ savedAnalyses, onViewAnalysis }) => {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState('all'); // all, crops, diseases, recent

  useEffect(() => {
    if (savedAnalyses && savedAnalyses.length > 0) {
      // Convert saved analyses to activities with timestamps
      const activitiesData = savedAnalyses.map((analysis, index) => ({
        id: analysis.id || Date.now() + index,
        type: 'scan',
        crop: analysis.crop || 'Unknown Crop',
        disease: analysis.disease || 'No disease detected',
        confidence: analysis.confidence || 0,
        severity: analysis.severity || 'unknown',
        timestamp: analysis.timestamp || new Date(Date.now() - index * 86400000).toISOString(),
        image: analysis.image,
        stakeholder: analysis.stakeholder || 'farmers',
        recommendations: analysis.recommendations || [],
        economicImpact: analysis.economicImpact || 'Not calculated'
      }));

      // Sort by timestamp (most recent first)
      activitiesData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setActivities(activitiesData);
    }
  }, [savedAnalyses]);

  // Filter activities based on selected filter
  const getFilteredActivities = () => {
    switch (filter) {
      case 'crops':
        return activities.filter(activity => activity.type === 'scan');
      case 'diseases':
        return activities.filter(activity => 
          activity.type === 'scan' && activity.disease !== 'No disease detected'
        );
      case 'recent':
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return activities.filter(activity => 
          new Date(activity.timestamp) > oneWeekAgo
        );
      default:
        return activities;
    }
  };

  // Get activity icon based on type and crop
  const getActivityIcon = (activity) => {
    if (activity.type === 'scan') {
      switch (activity.crop.toLowerCase()) {
        case 'maize':
          return 'local-florist';
        case 'coffee':
          return 'local-cafe';
        case 'beans':
          return 'eco';
        case 'wheat':
          return 'grass';
        default:
          return 'agriculture';
      }
    }
    return 'info';
  };

  // Get severity color
  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return '#f44336';
      case 'medium':
        return '#ff9800';
      case 'low':
        return '#4caf50';
      default:
        return '#9e9e9e';
    }
  };

  // Get confidence level text
  const getConfidenceText = (confidence) => {
    if (confidence >= 0.8) return 'Very High';
    if (confidence >= 0.6) return 'High';
    if (confidence >= 0.4) return 'Medium';
    if (confidence >= 0.2) return 'Low';
    return 'Very Low';
  };

  // Get confidence color
  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return '#4caf50';
    if (confidence >= 0.6) return '#8bc34a';
    if (confidence >= 0.4) return '#ff9800';
    if (confidence >= 0.2) return '#ff5722';
    return '#9e9e9e';
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    
    return date.toLocaleDateString();
  };

  // Get stakeholder icon
  const getStakeholderIcon = (stakeholder) => {
    switch (stakeholder) {
      case 'farmers':
        return 'person';
      case 'agronomists':
        return 'school';
      case 'researchers':
        return 'science';
      case 'business':
        return 'business';
      default:
        return 'person';
    }
  };

  const filteredActivities = getFilteredActivities();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Recent Activities</Text>
        <Text style={styles.subtitle}>
          {activities.length} scan{activities.length !== 1 ? 's' : ''} completed
        </Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {[
          { key: 'all', label: 'All', count: activities.length },
          { key: 'crops', label: 'Crops', count: activities.filter(a => a.type === 'scan').length },
          { key: 'diseases', label: 'Diseases', count: activities.filter(a => a.disease !== 'No disease detected').length },
          { key: 'recent', label: 'Recent', count: activities.filter(a => {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            return new Date(a.timestamp) > oneWeekAgo;
          }).length }
        ].map(filterOption => (
          <TouchableOpacity
            key={filterOption.key}
            style={[
              styles.filterTab,
              filter === filterOption.key && styles.activeFilterTab
            ]}
            onPress={() => setFilter(filterOption.key)}
          >
            <Text style={[
              styles.filterTabText,
              filter === filterOption.key && styles.activeFilterTabText
            ]}>
              {filterOption.label}
            </Text>
            <View style={[
              styles.filterCount,
              filter === filterOption.key && styles.activeFilterCount
            ]}>
              <Text style={[
                styles.filterCountText,
                filter === filterOption.key && styles.activeFilterCountText
              ]}>
                {filterOption.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Activities List */}
      <ScrollView style={styles.activitiesList}>
        {filteredActivities.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialIcons name="inbox" size={48} color="#ccc" />
            <Text style={styles.emptyStateText}>
              {filter === 'all' 
                ? 'No scans completed yet. Start by analyzing your first crop image!'
                : `No ${filter} activities found. Try a different filter or complete some scans.`
              }
            </Text>
          </View>
        ) : (
          filteredActivities.map((activity) => (
            <TouchableOpacity
              key={activity.id}
              style={styles.activityCard}
              onPress={() => onViewAnalysis(activity)}
            >
              {/* Activity Header */}
              <View style={styles.activityHeader}>
                <View style={styles.activityIconContainer}>
                  <MaterialIcons 
                    name={getActivityIcon(activity)} 
                    size={24} 
                    color="#4CAF50" 
                  />
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>
                    {activity.crop} Analysis
                  </Text>
                  <Text style={styles.activityTimestamp}>
                    {formatTimestamp(activity.timestamp)}
                  </Text>
                </View>
                <View style={styles.activityStatus}>
                  <View style={[
                    styles.confidenceBadge,
                    { backgroundColor: getConfidenceColor(activity.confidence) }
                  ]}>
                    <Text style={styles.confidenceText}>
                      {getConfidenceText(activity.confidence)}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Activity Details */}
              <View style={styles.activityDetails}>
                <View style={styles.detailRow}>
                  <MaterialIcons name="agriculture" size={16} color="#666" />
                  <Text style={styles.detailLabel}>Crop:</Text>
                  <Text style={styles.detailValue}>{activity.crop}</Text>
                </View>
                
                {activity.disease !== 'No disease detected' && (
                  <View style={styles.detailRow}>
                    <MaterialIcons name="warning" size={16} color="#666" />
                    <Text style={styles.detailLabel}>Disease:</Text>
                    <Text style={styles.detailValue}>{activity.disease}</Text>
                    <View style={[
                      styles.severityIndicator,
                      { backgroundColor: getSeverityColor(activity.severity) }
                    ]} />
                  </View>
                )}

                <View style={styles.detailRow}>
                  <MaterialIcons name="person" size={16} color="#666" />
                  <Text style={styles.detailLabel}>Stakeholder:</Text>
                  <Text style={styles.detailValue}>
                    {activity.stakeholder.charAt(0).toUpperCase() + activity.stakeholder.slice(1)}
                  </Text>
                </View>

                {activity.economicImpact !== 'Not calculated' && (
                  <View style={styles.detailRow}>
                    <MaterialIcons name="attach-money" size={16} color="#666" />
                    <Text style={styles.detailLabel}>Economic Impact:</Text>
                    <Text style={styles.detailValue}>{activity.economicImpact}</Text>
                  </View>
                )}
              </View>

              {/* Quick Actions */}
              <View style={styles.quickActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => onViewAnalysis(activity)}
                >
                  <MaterialIcons name="visibility" size={16} color="#4CAF50" />
                  <Text style={styles.actionButtonText}>View Details</Text>
                </TouchableOpacity>
                
                {activity.recommendations && activity.recommendations.length > 0 && (
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => Alert.alert(
                      'Treatment Recommendations',
                      activity.recommendations.join('\n\n'),
                      [{ text: 'Got it!', style: 'default' }]
                    )}
                  >
                    <MaterialIcons name="healing" size={16} color="#FF9800" />
                    <Text style={styles.actionButtonText}>View Treatments</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Summary Stats */}
      {activities.length > 0 && (
        <View style={styles.summaryStats}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {activities.filter(a => a.disease !== 'No disease detected').length}
            </Text>
            <Text style={styles.statLabel}>Diseases Detected</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {[...new Set(activities.map(a => a.crop))].length}
            </Text>
            <Text style={styles.statLabel}>Crop Types</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {activities.filter(a => a.confidence >= 0.6).length}
            </Text>
            <Text style={styles.statLabel}>High Confidence</Text>
          </View>
        </View>
      )}
    </View>
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
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  activeFilterTab: {
    backgroundColor: '#4CAF50',
  },
  filterTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  activeFilterTabText: {
    color: 'white',
  },
  filterCount: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
  },
  activeFilterCount: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  filterCountText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666',
  },
  activeFilterCountText: {
    color: 'white',
  },
  activitiesList: {
    flex: 1,
    padding: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 40,
  },
  activityCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f8f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c5530',
    marginBottom: 2,
  },
  activityTimestamp: {
    fontSize: 12,
    color: '#999',
  },
  activityStatus: {
    alignItems: 'flex-end',
  },
  confidenceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confidenceText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  activityDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    marginRight: 8,
    minWidth: 80,
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },
  severityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
    marginLeft: 4,
  },
  summaryStats: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default RecentActivities;

