import React from "react";
import { useTheme } from "../context/ThemeContext";
import { IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

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
      size='md'
      variant='ghost'
      mx='4'
      colorScheme={theme === "light" ? "gray" : "whiteAlpha"}
      color={theme === "light" ? "gray" : "white"}
    />
  );
};

export default ThemeToggle;
