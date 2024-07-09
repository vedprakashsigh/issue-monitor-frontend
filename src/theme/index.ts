import { extendTheme } from "@chakra-ui/react";

// Common styles
const commonStyles = {
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
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
  sizes: {
    container: "1200px", // Example size
  },
  space: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },
  breakpoints: ["30em", "48em", "62em", "80em"], // Example breakpoints
};

// Light theme
const lightTheme = extendTheme({
  colors: {
    background: "#F2F2F2",
    buttonPrimary: "#FFA700",
    buttonSecondary: "#EEEEEE",
    deleteButton: "#FF0000",
    editButton: "#00FF00",
    footerBg: "#E5E5E5",
    headerBg: "#E5E5E5",
    headerText: "#333333",
    iconColor: "#808080",
    inputBg: "#FFFFFF",
    inputText: "#333333",
    issueBg: "#FCFCFC",
    issueHeading: "#333333",
    issueStatus: "#8ABF96",
    issueText: "#808080",
    mainSectionBg: "#FAFAFA",
    mainSectionColor: "#808080",
    mainSectionHeading: "#333333",
    mainSectionText: "#333333",
    modalBg: "#EFEFEF",
    modalContent: "#333333",
    option: "#CCCCCC",
    sidebarBg: "#F2F2F2",
    sidebarButtonText: "#333333",
    sidebarHeadingText: "#333333",
    sidebarProjectName: "#808080",
    text: "#333333",
  },
  ...commonStyles,
});

// Dark theme
const darkTheme = extendTheme({
  colors: {
    background: "#3A3A3A",
    buttonPrimary: "#FFD700",
    buttonSecondary: "#666666",
    deleteButton: "#FF6347",
    editButton: "#00FF00",
    footerBg: "#292929",
    headerBg: "#292929",
    headerText: "#D9D9D9",
    iconColor: "#A6A6A6",
    inputBg: "#2E2E2E",
    inputText: "#D9D9D9",
    issueBg: "#3A3A3A",
    issueHeading: "#D9D9D9",
    issueStatus: "#8ABF96",
    issueText: "#A6A6A6",
    mainSectionBg: "#343434",
    mainSectionColor: "#A6A6A6",
    mainSectionHeading: "#D9D9D9",
    mainSectionText: "#D9D9D9",
    modalBg: "#2F2F2F",
    modalContent: "#D9D9D9",
    option: "#333333",
    sidebarBg: "#333333",
    sidebarButtonText: "#FFFFFF",
    sidebarHeadingText: "#FFFFFF",
    sidebarProjectName: "#CCCCCC",
    text: "#D9D9D9",
  },
  ...commonStyles,
});

export { lightTheme, darkTheme };
