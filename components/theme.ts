// Theme constants for the app

// Colors
export const colors = {
  primary:"#FFDA3D", 
  onPrimary: "#CCA300", 
  primaryContainer: "#FFFAE6", 
  onPrimaryContainer: "#2B2300",
  
  success: '#22C55E',

  error:"#EF4444",

  neutral:'#64748B',
  neutralContainer: "#E2E8F0",
  onNeutralContainer: "#94A3B8",
  onNeutral: '#334155',

  surface: '#1E293B',
  onSurface: '#F8FAFC',

  background: '#F1F5F9',
  onBackground: '#F8FAFC',

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

// Dark mode colors
export const darkColors = {
  ...colors,
  primary: '#FFE066',
  neutral:'#94A3B8',

  primaryContainer: "#FFFAE6",
  neutralContainer: "#94A3B8",

  background: '#0F172A',
  onBackground: '#F8FAFC',
  
  onNeutralContainer: "#2B2300",
  onNeutral: '#E2E8F0',
  
  white: '#1E293B', 
  black: '#F8FAFC',
};

// Spacing
export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Typography
export const typography = {
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 30,
    display: 36,
  },
  lineHeight: {
    tight: 1.2,  // For headings
    normal: 1.5, // For body text
    loose: 1.8,  // For spacious text
  },
};

// Border Radius
export const borderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

