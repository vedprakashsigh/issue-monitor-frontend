import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, IconButton, Spacer } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

import ThemeToggle from "./ThemeToggle";

import { useAuth } from "../context/AuthContext";
import { useProject } from "../context/ProjectContext";
import { useTheme } from "../context/ThemeContext";
import { logout } from "../utils/authUtils";

const Header: React.FC = () => {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();
  const { setSelectedProjectId } = useProject();
  const { selectedTheme } = useTheme();

  const handleLogout = () => {
    logout();
    dispatch({ type: "LOGOUT" });
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
      w='100vw'
    >
      <IconButton
        icon={<ArrowBackIcon />}
        aria-label='Go to Dashboard'
        onClick={handleOnClick}
        colorScheme={selectedTheme.colors.iconColor}
        color={selectedTheme.colors.headerText}
      />
      <Spacer />
      <Flex align='center'>
        <Heading as='h4' size='md' mr='4'>
          {state.user?.username}
        </Heading>
        <ThemeToggle />
        <Button colorScheme='red' onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
