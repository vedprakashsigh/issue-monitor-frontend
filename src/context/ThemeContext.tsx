import React, { createContext, useState, useContext } from "react";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { lightTheme, darkTheme } from "../theme";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  selectedTheme: typeof lightTheme | typeof darkTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const selectedTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, selectedTheme, toggleTheme }}>
      <ChakraProvider theme={selectedTheme}>
        <ColorModeProvider
          options={{
            initialColorMode: theme,
            useSystemColorMode: false,
          }}
        >
          {children}
        </ColorModeProvider>
      </ChakraProvider>
    </ThemeContext.Provider>
  );
};
