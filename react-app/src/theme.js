import { createTheme } from '@mui/material/styles';

/**
 * Custom Material-UI theme for Math Fun
 * All styling is centralized here - no component-level styles
 */

const theme = createTheme({
  palette: {
    primary: {
      main: '#74b9ff',
      dark: '#0984e3',
    },
    secondary: {
      main: '#ff6b6b',
      light: '#ffecd2',
    },
    success: {
      main: '#00b894',
      light: '#00cec9',
    },
    error: {
      main: '#ff7675',
      light: '#fd79a8',
    },
    warning: {
      main: '#fdcb6e',
      dark: '#e17055',
    },
    info: {
      main: '#4ecdc4',
    },
    background: {
      default: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      paper: '#ffffff',
    },
  },

  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 'normal',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
      color: '#ff6b6b',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
      '@media (max-width:400px)': {
        fontSize: '1.8rem',
      },
    },
    h2: {
      fontSize: '2rem',
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
      color: '#4ecdc4',
      '@media (max-width:600px)': {
        fontSize: '1.6rem',
      },
      '@media (max-width:400px)': {
        fontSize: '1.4rem',
      },
    },
    h3: {
      fontSize: '2.2rem',
      fontWeight: 'bold',
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
      color: '#4ecdc4',
      '@media (max-width:600px)': {
        fontSize: '1.8rem',
      },
    },
    body1: {
      fontSize: '1.2rem',
      color: '#666',
      '@media (max-width:600px)': {
        fontSize: '1.1rem',
      },
      '@media (max-width:400px)': {
        fontSize: '1rem',
      },
    },
    body2: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: '#2d3436',
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 600,
      lg: 900,
      xl: 1200,
    },
  },

  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '500px !important',
          padding: '40px',
          '@media (max-width:600px)': {
            padding: '20px',
          },
          '@media (max-width:400px)': {
            padding: '15px',
            maxWidth: '350px !important',
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          padding: '40px',
          textAlign: 'center',
          '@media (max-width:600px)': {
            padding: '20px',
          },
          '@media (max-width:400px)': {
            padding: '15px',
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          borderRadius: '15px',
          textTransform: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-3px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #74b9ff, #0984e3)',
          color: 'white',
          boxShadow: '0 4px 15px rgba(116, 185, 255, 0.3)',
          fontSize: '1.5rem',
          padding: '15px 25px',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(116, 185, 255, 0.4)',
            background: 'linear-gradient(45deg, #74b9ff, #0984e3)',
          },
          '&.Mui-disabled': {
            opacity: 0.7,
          },
          '&.selected': {
            background: 'linear-gradient(45deg, #fdcb6e, #e17055)',
            boxShadow: '0 4px 15px rgba(253, 203, 110, 0.4)',
          },
          '@media (max-width:600px)': {
            fontSize: '1.3rem',
            padding: '12px 20px',
          },
        },
        outlined: {
          fontSize: '1.6rem',
          padding: '15px',
          border: '3px solid #ddd',
          backgroundColor: 'white',
          color: '#666',
          aspectRatio: '1',
          minHeight: '60px',
          minWidth: '44px',
          '&:hover': {
            borderColor: '#74b9ff',
            color: '#74b9ff',
            boxShadow: '0 4px 15px rgba(116, 185, 255, 0.2)',
            backgroundColor: 'white',
          },
          '&.selected': {
            background: 'linear-gradient(45deg, #74b9ff, #0984e3)',
            color: 'white',
            borderColor: '#0984e3',
            transform: 'translateY(-3px)',
            boxShadow: '0 6px 20px rgba(116, 185, 255, 0.4)',
          },
          '@media (max-width:600px)': {
            fontSize: '1.3rem',
            padding: '12px',
            minHeight: '50px',
          },
          '@media (max-width:400px)': {
            fontSize: '1.2rem',
            padding: '10px',
            minHeight: '44px',
          },
          '@media (max-width:360px)': {
            fontSize: '1.1rem',
            padding: '8px',
            border: '2px solid #ddd',
            minHeight: '44px',
          },
        },
      },
      variants: [
        {
          props: { variant: 'operation-multiply' },
          style: {
            background: 'linear-gradient(45deg, #ff7675, #fd79a8)',
            color: 'white',
            boxShadow: '0 4px 15px rgba(255, 118, 117, 0.3)',
            padding: '25px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
              background: 'linear-gradient(45deg, #ff7675, #fd79a8)',
            },
          },
        },
        {
          props: { variant: 'operation-divide' },
          style: {
            background: 'linear-gradient(45deg, #74b9ff, #0984e3)',
            color: 'white',
            boxShadow: '0 4px 15px rgba(116, 185, 255, 0.3)',
            padding: '25px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
              background: 'linear-gradient(45deg, #74b9ff, #0984e3)',
            },
          },
        },
        {
          props: { variant: 'operation-add' },
          style: {
            background: 'linear-gradient(45deg, #00b894, #00cec9)',
            color: 'white',
            boxShadow: '0 4px 15px rgba(0, 184, 148, 0.3)',
            padding: '25px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
              background: 'linear-gradient(45deg, #00b894, #00cec9)',
            },
          },
        },
        {
          props: { variant: 'operation-subtract' },
          style: {
            background: 'linear-gradient(45deg, #fdcb6e, #e17055)',
            color: 'white',
            boxShadow: '0 4px 15px rgba(253, 203, 110, 0.3)',
            padding: '25px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
              background: 'linear-gradient(45deg, #fdcb6e, #e17055)',
            },
          },
        },
        {
          props: { variant: 'continue' },
          style: {
            background: 'linear-gradient(45deg, #a29bfe, #6c5ce7)',
            color: 'white',
            boxShadow: '0 4px 15px rgba(162, 155, 254, 0.3)',
            fontSize: '1.3rem',
            padding: '12px 30px',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(162, 155, 254, 0.4)',
              background: 'linear-gradient(45deg, #a29bfe, #6c5ce7)',
            },
          },
        },
        {
          props: { variant: 'back' },
          style: {
            background: 'linear-gradient(45deg, #ddd6fe, #c4b5fd)',
            color: '#374151',
            boxShadow: '0 2px 10px rgba(196, 181, 253, 0.3)',
            fontSize: '1.1rem',
            padding: '12px 25px',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 15px rgba(196, 181, 253, 0.4)',
              background: 'linear-gradient(45deg, #ddd6fe, #c4b5fd)',
            },
            '@media (max-width:600px)': {
              fontSize: '1rem',
              padding: '10px 20px',
            },
          },
        },
        {
          props: { variant: 'start-practice' },
          style: {
            background: 'linear-gradient(45deg, #00b894, #00cec9)',
            color: 'white',
            boxShadow: '0 4px 15px rgba(0, 184, 148, 0.3)',
            fontSize: '1.4rem',
            padding: '15px 30px',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: '0 6px 20px rgba(0, 184, 148, 0.4)',
              background: 'linear-gradient(45deg, #00b894, #00cec9)',
            },
            '&.Mui-disabled': {
              background: '#ddd',
              color: '#999',
              boxShadow: 'none',
              transform: 'none',
            },
            '@media (max-width:600px)': {
              fontSize: '1.2rem',
              padding: '12px 25px',
            },
          },
        },
      ],
    },

    MuiBox: {
      styleOverrides: {
        root: {
          '&.feedback-correct': {
            background: 'linear-gradient(45deg, #00b894, #00cec9)',
            color: 'white',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            padding: '20px',
            borderRadius: '15px',
            marginBottom: '20px',
            animation: 'bounce 0.6s ease',
            '@keyframes bounce': {
              '0%, 20%, 60%, 100%': {
                transform: 'translateY(0)',
              },
              '40%': {
                transform: 'translateY(-10px)',
              },
              '80%': {
                transform: 'translateY(-5px)',
              },
            },
          },
          '&.feedback-incorrect': {
            background: 'linear-gradient(45deg, #ff7675, #fd79a8)',
            color: 'white',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            padding: '20px',
            borderRadius: '15px',
            marginBottom: '20px',
            animation: 'shake 0.6s ease',
            '@keyframes shake': {
              '0%, 100%': {
                transform: 'translateX(0)',
              },
              '10%, 30%, 50%, 70%, 90%': {
                transform: 'translateX(-5px)',
              },
              '20%, 40%, 60%, 80%': {
                transform: 'translateX(5px)',
              },
            },
          },
          '&.score-display': {
            marginTop: '20px',
            padding: '15px',
            background: 'linear-gradient(45deg, #ffeaa7, #fab1a0)',
            borderRadius: '15px',
            color: '#2d3436',
            fontSize: '1.2rem',
            fontWeight: 'bold',
          },
        },
      },
    },

    MuiGrid: {
      styleOverrides: {
        root: {
          '&.number-grid': {
            maxWidth: '400px',
            margin: '0 auto 30px',
            '@media (max-width:600px)': {
              maxWidth: '320px',
            },
            '@media (max-width:400px)': {
              maxWidth: '280px',
            },
          },
          '&.operation-grid': {
            marginBottom: '20px',
          },
        },
      },
    },
  },
});

export default theme;
