import { ukUA } from '@mui/material/locale';
import { createTheme } from '@mui/material/styles';

const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#2825ad',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#ffca28',
        contrastText: '#333333',
      },
      background: {
        default: '#f5f5f5',
        paper: '#ffffff',
      },
      text: {
        primary: '#333333',
        secondary: '#757575',
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
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    spacing: 8,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            padding: '8px 16px',
            minHeight: 44,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            minWidth: 44,
            minHeight: 44,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  },
  ukUA,
);

export default theme;
