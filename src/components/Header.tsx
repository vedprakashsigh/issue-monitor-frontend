import {
  ArrowBackIcon,
  CloseIcon,
  HamburgerIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import { Button, Flex, Heading, IconButton, Spacer } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

import ThemeToggle from "./ThemeToggle";

import { useAuth } from "../context/AuthContext";
import { useProject } from "../context/ProjectContext";
import { useTheme } from "../context/ThemeContext";
import { logout } from "../utils/authUtils";

interface HeaderProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({
  showSidebar,
  setShowSidebar,
}: HeaderProps) => {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();
  const { setSelectedProjectId, setProjects } = useProject();
  const { selectedTheme } = useTheme();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleLogout = () => {
    logout();
    dispatch({ type: "LOGOUT" });
    setProjects(null);
    navigate("/login");
  };

  const handleOnClick = () => {
    setSelectedProjectId(null);
    navigate("/");
  };

  return (
    <Flex
      as='header'
      align='center'
      justify='space-between'
      p='4'
      bg={selectedTheme.colors.headerBg}
      color={selectedTheme.colors.headerText}
      w='100%'
    >
      <IconButton
        icon={<ArrowBackIcon />}
        aria-label='Go to Dashboard'
        onClick={handleOnClick}
        colorScheme={selectedTheme.colors.iconColor}
        color={selectedTheme.colors.headerText}
        pt='1'
      />
      <IconButton
        icon={showSidebar ? <SmallCloseIcon /> : <HamburgerIcon />}
        aria-label={showSidebar ? "Close Sidebar" : "Open Sidebar"}
        onClick={toggleSidebar}
        display={{ base: "block", md: "none" }}
        colorScheme={selectedTheme.colors.iconColor}
        color={selectedTheme.colors.headerText}
        size='md'
      />
      <Spacer />
      <Flex align='center'>
        <Heading as='h5' size={{ base: "xs", md: "md" }} m='auto'>
          {state.user?.username}
        </Heading>
        <ThemeToggle />
        <Button
          colorScheme='red'
          onClick={handleLogout}
          size={{ base: "xs", md: "md" }}
          m='auto'
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
