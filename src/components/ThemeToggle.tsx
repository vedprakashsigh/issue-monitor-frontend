import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  const handleToggleClick = () => {
    toggleTheme();
  };

  return (
    <IconButton
      aria-label='Toggle Theme'
      icon={isDark ? <SunIcon /> : <MoonIcon />}
      onClick={handleToggleClick}
      size={{ base: "sm", md: "md" }}
      m='auto'
      variant='ghost'
      colorScheme={theme === "light" ? "gray" : "whiteAlpha"}
      color={theme === "light" ? "gray" : "white"}
    />
  );
};

export default ThemeToggle;
