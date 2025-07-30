import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2825adff', // Green for primary elements (e.g., headers, buttons)
      contrastText: '#ffffff', // White text for contrast
    },
    secondary: {
      main: '#ffca28', // Warm yellow for accents (e.g., call-to-action buttons)
      contrastText: '#333333', // Dark text for readability
    },
    background: {
      default: '#f5f5f5', // Light gray background for the app
      paper: '#ffffff', // White for card or paper components
    },
    text: {
      primary: '#333333', // Dark text for main content
      secondary: '#757575', // Gray for secondary text
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: 16,
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none', // Disable uppercase for buttons
      fontWeight: 500,
    },
  },
  spacing: 8, // Base unit for spacing (8px)
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4, // Rounded corners for buttons
          padding: '8px 16px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Subtle shadow for header
        },
      },
    },
  },
});

export default theme;
