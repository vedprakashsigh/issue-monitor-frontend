import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import React from "react";
import { useTheme } from "../context/ThemeContext";

interface ThemeToggleProps {
  style: any | null;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  style,
}: ThemeToggleProps) => {
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
      my='auto'
      mx='1'
      variant='ghost'
      colorScheme={theme === "light" ? "gray" : "whiteAlpha"}
      color={theme === "light" ? "gray" : "white"}
      style={style}
    />
  );
};

export default ThemeToggle;
