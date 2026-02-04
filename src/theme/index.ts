import { createTheme } from '@mui/material/styles'

// Project colors
const colors = {
  primaryDark: '#30364F',
  accentBlueGray: '#ACBAC4',
  accentSand: '#E1D9BC',
  backgroundSoft: '#F0F0DB',
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.primaryDark,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: colors.accentSand,
    },
    background: {
      default: colors.backgroundSoft,
      paper: '#FFFFFF',
    },
    text: {
      primary: '#303030',
      secondary: colors.primaryDark,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
})

