// src/theme/colors.js
export const colors = {
  // Primary Colors
  primary: '#2C2C2C',        // Deep charcoal
  secondary: '#D4AF37',      // Gold accent
  background: '#FFFFFF',     // Clean white
  text: '#333333',          // Dark gray for text
  
  // Additional utility colors
  backgroundSecondary: '#F8F9FA',  // Subtle gray sections
  textLight: '#666666',            // Lighter text
  textMuted: '#999999',            // Muted text
  border: '#E5E5E5',              // Border color
  hover: '#1A1A1A',               // Darker hover state
  success: '#10B981',             // Success green
  error: '#EF4444',               // Error red
  warning: '#F59E0B',             // Warning orange
};

// Theme object for styled-components
export const theme = {
  colors,
  // We can add more theme properties later
  fonts: {
    primary: "'Inter', sans-serif",
    secondary: "'Playfair Display', serif",
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  },
};
