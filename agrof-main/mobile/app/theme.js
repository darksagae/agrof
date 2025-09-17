import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2E7D32', // Green - represents healthy crops
    accent: '#FF8F00', // Orange - for warnings/alerts
    background: '#F5F5F5', // Light gray background
    surface: '#FFFFFF', // White surface
    text: '#212121', // Dark text
    error: '#D32F2F', // Red for errors
    warning: '#F57C00', // Orange for warnings
    success: '#388E3C', // Green for success
    info: '#1976D2', // Blue for info
    disabled: '#BDBDBD', // Gray for disabled elements
    placeholder: '#757575', // Gray for placeholders
    backdrop: 'rgba(0, 0, 0, 0.5)', // Semi-transparent backdrop
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'System',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'System',
      fontWeight: 'bold',
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300',
    },
  },
  roundness: 8,
  animation: {
    scale: 1.0,
  },
};

// Disease-specific colors
export const diseaseColors = {
  healthy: '#4CAF50', // Green
  maize_blight: '#FF5722', // Red-Orange
  maize_rust: '#FF9800', // Orange
  maize_msv: '#F44336', // Red
  coffee_rust: '#795548', // Brown
  coffee_miner: '#607D8B', // Blue-Gray
  unknown: '#9E9E9E', // Gray
};

// Severity colors
export const severityColors = {
  low: '#4CAF50', // Green
  medium: '#FF9800', // Orange
  high: '#F44336', // Red
};

// Button styles
export const buttonStyles = {
  primary: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    paddingVertical: 12,
    paddingHorizontal: 24,
    elevation: 2,
  },
  secondary: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: theme.roundness,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  danger: {
    backgroundColor: theme.colors.error,
    borderRadius: theme.roundness,
    paddingVertical: 12,
    paddingHorizontal: 24,
    elevation: 2,
  },
};

// Card styles
export const cardStyles = {
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
  },
  result: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 3,
    borderLeftWidth: 4,
  },
};

// Text styles
export const textStyles = {
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: 4,
  },
  body: {
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    color: theme.colors.placeholder,
    marginTop: 4,
  },
  button: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
};

// Layout styles
export const layoutStyles = {
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};
