import React from "react";
import { Flex, Heading, Button, IconButton, Spacer } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

import { logout } from "../utils/authUtils";
import { useAuth } from "../context/AuthContext";
import { useProject } from "../context/ProjectContext";

const Header: React.FC = () => {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();
  const { setSelectedProjectId } = useProject();

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
      bg='gray.100'
      w='100vw'
    >
      <IconButton
        icon={<ArrowBackIcon />}
        aria-label='Go to Dashboard'
        onClick={handleOnClick}
      />
      <Spacer />
      <Flex align='center'>
        <Heading as='h4' size='md' mr='4'>
          {state.user?.username}
        </Heading>
        <Button colorScheme='red' onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
