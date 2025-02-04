import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import config from "../config";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext"; // Import useTheme hook
import { getCurrentUser, setToken } from "../utils/authUtils"; // Import setCurrentUser utility
import ThemeToggle from "./ThemeToggle";

const schema = z.object({
  username: z.string().min(4, "Username must be at least 4 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(24, "Password must be at most 24 characters"),
});

const LoginPage: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const { selectedTheme } = useTheme(); // Use the useTheme hook to get the current selectedTheme

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const validatedData = schema.parse({ username, password });
      const apiUrl = config.apiUrl;
      const response = await fetch(`${apiUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      const user = await getCurrentUser();
      setToken(data.access_token); // Set the JWT token

      dispatch({
        type: "LOGIN",
        payload: {
          user: {
            username: user?.username as string,
            user_id: user?.user_id as number,
            role: user?.role as string,
          },
          token: data.access_token,
        },
      }); // Dispatch login action

      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setPassword("");
      setUsername("");

      navigate("/"); // Navigate to dashboard on success
    } catch (error: any) {
      toast({
        title: "Login Error",
        description: error?.message ?? "An error occurred while logging in.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  return (
    <Flex
      align='center'
      justify='center'
      w='100vw'
      h='100vh'
      bg={selectedTheme.colors.background} // Use selectedTheme's background color
      color={selectedTheme.colors.text} // Use selectedTheme's text color
    >
      <ThemeToggle style={{ position: "absolute", top: "8px", right: "4px" }} />

      <Box
        p='8'
        borderWidth='1px'
        borderRadius='lg'
        boxShadow='lg'
        bg={selectedTheme.colors.modalBg}
        color={selectedTheme.colors.modalContent}
        my='auto'
        mx='4'
      >
        <Heading as='h2' mb='6' color={selectedTheme.colors.text}>
          {/* Use selectedTheme's text color */}
          Login
        </Heading>
        <form onSubmit={handleLogin}>
          <FormControl id='username' mb='4'>
            <FormLabel color={selectedTheme.colors.text}>Username</FormLabel>{" "}
            {/* Use selectedTheme's text color */}
            <Input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              bg={selectedTheme.colors.background} // Use selectedTheme's background color
              color={selectedTheme.colors.text} // Use selectedTheme's text color
              borderColor={selectedTheme.colors.text} // Use selectedTheme's text color for border
            />
          </FormControl>
          <FormControl id='password' mb='4'>
            <FormLabel color={selectedTheme.colors.text}>Password</FormLabel>{" "}
            {/* Use selectedTheme's text color */}
            <Input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg={selectedTheme.colors.background} // Use selectedTheme's background color
              color={selectedTheme.colors.text} // Use selectedTheme's text color
              borderColor={selectedTheme.colors.text} // Use selectedTheme's text color for border
            />
          </FormControl>
          <Button
            m='2'
            type='submit'
            color={selectedTheme.colors.buttonPrimary}
            variant='ghost'
            boxShadow='md'
          >
            {/* Use selectedTheme's accent color */}
            Login
          </Button>
          <Button
            m='2'
            color={selectedTheme.colors.editButton}
            onClick={handleNavigateToRegister}
            variant='ghost'
            boxShadow='md'
          >
            {/* Use selectedTheme's secondary color */}
            Register
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default LoginPage;
