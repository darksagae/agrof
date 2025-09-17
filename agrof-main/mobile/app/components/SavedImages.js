import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Dimensions,
  Modal
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const SavedImages = ({ savedAnalyses, onViewAnalysis, onDeleteAnalysis }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [filter, setFilter] = useState('all'); // all, crops, diseases, recent
  const [sortBy, setSortBy] = useState('date'); // date, crop, confidence

  // Filter and sort saved analyses
  const getFilteredAndSortedAnalyses = () => {
    let filtered = savedAnalyses || [];
    
    // Apply filters
    switch (filter) {
      case 'crops':
        filtered = filtered.filter(analysis => analysis.crop && analysis.crop !== 'Unknown');
        break;
      case 'diseases':
        filtered = filtered.filter(analysis => 
          analysis.disease && analysis.disease !== 'No disease detected'
        );
        break;
      case 'recent':
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        filtered = filtered.filter(analysis => 
          new Date(analysis.timestamp || Date.now()) > oneWeekAgo
        );
        break;
      default:
        break;
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'crop':
        filtered.sort((a, b) => (a.crop || '').localeCompare(b.crop || ''));
        break;
      case 'confidence':
        filtered.sort((a, b) => (b.confidence || 0) - (a.confidence || 0));
        break;
      case 'date':
      default:
        filtered.sort((a, b) => new Date(b.timestamp || Date.now()) - new Date(a.timestamp || Date.now()));
        break;
    }
    
    return filtered;
  };

  // Get crop icon
  const getCropIcon = (crop) => {
    if (!crop) return 'help';
    
    switch (crop.toLowerCase()) {
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
  };

  // Get disease severity color
  const getSeverityColor = (severity) => {
    if (!severity) return '#9e9e9e';
    
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

  // Get confidence level
  const getConfidenceLevel = (confidence) => {
    if (!confidence) return 'Unknown';
    if (confidence >= 0.8) return 'Very High';
    if (confidence >= 0.6) return 'High';
    if (confidence >= 0.4) return 'Medium';
    if (confidence >= 0.2) return 'Low';
    return 'Very Low';
  };

  // Get confidence color
  const getConfidenceColor = (confidence) => {
    if (!confidence) return '#9e9e9e';
    if (confidence >= 0.8) return '#4caf50';
    if (confidence >= 0.6) return '#8bc34a';
    if (confidence >= 0.4) return '#ff9800';
    if (confidence >= 0.2) return '#ff5722';
    return '#9e9e9e';
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Unknown';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    
    return date.toLocaleDateString();
  };

  // Handle image deletion
  const handleDelete = (analysis) => {
    Alert.alert(
      'Delete Analysis',
      `Are you sure you want to delete this ${analysis.crop || 'crop'} analysis?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            if (onDeleteAnalysis) {
              onDeleteAnalysis(analysis.id);
            }
          }
        }
      ]
    );
  };

  // View image in full screen
  const viewFullImage = (analysis) => {
    setSelectedImage(analysis);
    setShowImageModal(true);
  };

  const filteredAnalyses = getFilteredAndSortedAnalyses();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Saved Images</Text>
        <Text style={styles.subtitle}>
          {filteredAnalyses.length} image{filteredAnalyses.length !== 1 ? 's' : ''} saved
        </Text>
      </View>

      {/* Filter and Sort Controls */}
      <View style={styles.controlsContainer}>
        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          {[
            { key: 'all', label: 'All', count: (savedAnalyses || []).length },
            { key: 'crops', label: 'Crops', count: (savedAnalyses || []).filter(a => a.crop && a.crop !== 'Unknown').length },
            { key: 'diseases', label: 'Diseases', count: (savedAnalyses || []).filter(a => a.disease && a.disease !== 'No disease detected').length },
            { key: 'recent', label: 'Recent', count: (savedAnalyses || []).filter(a => {
              const oneWeekAgo = new Date();
              oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
              return new Date(a.timestamp || Date.now()) > oneWeekAgo;
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

        {/* Sort Options */}
        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortBy === 'date' && styles.activeSortButton
            ]}
            onPress={() => setSortBy('date')}
          >
            <Text style={[
              styles.sortButtonText,
              sortBy === 'date' && styles.activeSortButtonText
            ]}>Date</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortBy === 'crop' && styles.activeSortButton
            ]}
            onPress={() => setSortBy('crop')}
          >
            <Text style={[
              styles.sortButtonText,
              sortBy === 'crop' && styles.activeSortButtonText
            ]}>Crop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortBy === 'confidence' && styles.activeSortButton
            ]}
            onPress={() => setSortBy('confidence')}
          >
            <Text style={[
              styles.sortButtonText,
              sortBy === 'confidence' && styles.activeSortButtonText
            ]}>Confidence</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Images Grid */}
      <ScrollView style={styles.imagesContainer}>
        {filteredAnalyses.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialIcons name="photo-library" size={48} color="#ccc" />
            <Text style={styles.emptyStateText}>
              {filter === 'all' 
                ? 'No images saved yet. Start by analyzing your first crop image!'
                : `No ${filter} images found. Try a different filter or complete some scans.`
              }
            </Text>
          </View>
        ) : (
          <View style={styles.imagesGrid}>
            {filteredAnalyses.map((analysis, index) => (
              <View key={analysis.id || index} style={styles.imageCard}>
                {/* Image */}
                <TouchableOpacity
                  style={styles.imageContainer}
                  onPress={() => viewFullImage(analysis)}
                >
                  {analysis.image ? (
                    <Image
                      source={{ uri: analysis.image }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.noImagePlaceholder}>
                      <MaterialIcons name="image" size={32} color="#ccc" />
                      <Text style={styles.noImageText}>No Image</Text>
                    </View>
                  )}
                  
                  {/* Confidence Badge */}
                  {analysis.confidence && (
                    <View style={[
                      styles.confidenceBadge,
                      { backgroundColor: getConfidenceColor(analysis.confidence) }
                    ]}>
                      <Text style={styles.confidenceText}>
                        {Math.round(analysis.confidence * 100)}%
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>

                {/* Analysis Info */}
                <View style={styles.analysisInfo}>
                  <View style={styles.cropInfo}>
                    <MaterialIcons 
                      name={getCropIcon(analysis.crop)} 
                      size={16} 
                      color="#4CAF50" 
                    />
                    <Text style={styles.cropName}>
                      {analysis.crop || 'Unknown Crop'}
                    </Text>
                  </View>

                  {analysis.disease && analysis.disease !== 'No disease detected' && (
                    <View style={styles.diseaseInfo}>
                      <MaterialIcons name="warning" size={16} color="#FF9800" />
                      <Text style={styles.diseaseName}>{analysis.disease}</Text>
                      {analysis.severity && (
                        <View style={[
                          styles.severityDot,
                          { backgroundColor: getSeverityColor(analysis.severity) }
                        ]} />
                      )}
                    </View>
                  )}

                  <Text style={styles.timestamp}>
                    {formatTimestamp(analysis.timestamp)}
                  </Text>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => onViewAnalysis(analysis)}
                  >
                    <MaterialIcons name="visibility" size={16} color="#4CAF50" />
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => viewFullImage(analysis)}
                  >
                    <MaterialIcons name="fullscreen" size={16} color="#2196F3" />
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDelete(analysis)}
                  >
                    <MaterialIcons name="delete" size={16} color="#f44336" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Image Modal */}
      <Modal
        visible={showImageModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowImageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedImage?.crop || 'Crop'} Analysis
              </Text>
              <TouchableOpacity onPress={() => setShowImageModal(false)}>
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            {selectedImage && (
              <View style={styles.modalBody}>
                {selectedImage.image ? (
                  <Image
                    source={{ uri: selectedImage.image }}
                    style={styles.modalImage}
                    resizeMode="contain"
                  />
                ) : (
                  <View style={styles.modalNoImage}>
                    <MaterialIcons name="image" size={48} color="#ccc" />
                    <Text style={styles.modalNoImageText}>No Image Available</Text>
                  </View>
                )}
                
                <View style={styles.modalAnalysisDetails}>
                  <View style={styles.modalDetailRow}>
                    <Text style={styles.modalDetailLabel}>Crop:</Text>
                    <Text style={styles.modalDetailValue}>
                      {selectedImage.crop || 'Unknown'}
                    </Text>
                  </View>
                  
                  {selectedImage.disease && selectedImage.disease !== 'No disease detected' && (
                    <View style={styles.modalDetailRow}>
                      <Text style={styles.modalDetailLabel}>Disease:</Text>
                      <Text style={styles.modalDetailValue}>
                        {selectedImage.disease}
                      </Text>
                    </View>
                  )}
                  
                  {selectedImage.confidence && (
                    <View style={styles.modalDetailRow}>
                      <Text style={styles.modalDetailLabel}>Confidence:</Text>
                      <Text style={styles.modalDetailValue}>
                        {getConfidenceLevel(selectedImage.confidence)} ({Math.round(selectedImage.confidence * 100)}%)
                      </Text>
                    </View>
                  )}
                  
                  {selectedImage.severity && (
                    <View style={styles.modalDetailRow}>
                      <Text style={styles.modalDetailLabel}>Severity:</Text>
                      <Text style={styles.modalDetailValue}>
                        {selectedImage.severity.charAt(0).toUpperCase() + selectedImage.severity.slice(1)}
                      </Text>
                    </View>
                  )}
                  
                  <View style={styles.modalDetailRow}>
                    <Text style={styles.modalDetailLabel}>Date:</Text>
                    <Text style={styles.modalDetailValue}>
                      {formatTimestamp(selectedImage.timestamp)}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
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
  controlsContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
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
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  sortLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 12,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
  },
  activeSortButton: {
    backgroundColor: '#4CAF50',
  },
  sortButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  activeSortButtonText: {
    color: 'white',
  },
  imagesContainer: {
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
  imagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageCard: {
    width: (width - 60) / 2,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  noImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noImageText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  confidenceBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  confidenceText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  analysisInfo: {
    padding: 12,
  },
  cropInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cropName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c5530',
    marginLeft: 6,
    flex: 1,
  },
  diseaseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  diseaseName: {
    fontSize: 12,
    color: '#FF9800',
    marginLeft: 6,
    flex: 1,
  },
  severityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  timestamp: {
    fontSize: 10,
    color: '#999',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: '90%',
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c5530',
  },
  modalBody: {
    padding: 20,
  },
  modalImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 20,
  },
  modalNoImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  modalNoImageText: {
    fontSize: 16,
    color: '#999',
    marginTop: 8,
  },
  modalAnalysisDetails: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
  },
  modalDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  modalDetailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  modalDetailValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
});

export default SavedImages;

