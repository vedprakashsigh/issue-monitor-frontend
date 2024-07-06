import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      50: "#f0f4ff",
      100: "#d9e4ff",
      200: "#afc8ff",
      300: "#85aaff",
      400: "#5c8eff",
      500: "#4070ff",
      600: "#3359cc",
      700: "#264699",
      800: "#192c66",
      900: "#0c1333",
    },
    secondary: {
      50: "#f6faff",
      100: "#e0f0ff",
      200: "#b3d9ff",
      300: "#85c1ff",
      400: "#58aaff",
      500: "#3a8fff",
      600: "#2c6fb2",
      700: "#1f4f84",
      800: "#112f56",
      900: "#040f28",
    },
    accent: {
      50: "#fff7f0",
      100: "#ffe0cc",
      200: "#ffb999",
      300: "#ff9d66",
      400: "#ff8033",
      500: "#ff6600",
      600: "#cc5200",
      700: "#994000",
      800: "#662d00",
      900: "#331900",
    },
    // Define additional color palettes as needed
  },
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
    // Customize fonts here
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "4rem",
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: "2",
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  // Other theme configurations like breakpoints, spacings, etc.
});

export default theme;
