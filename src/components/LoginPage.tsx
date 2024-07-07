import { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCurrentUser, setToken } from "../utils/authUtils"; // Import setCurrentUser utility
import config from "../config";

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
    <Flex align='center' justify='center' w='100vw' h='100vh'>
      <Box p='8' borderWidth='1px' borderRadius='lg' boxShadow='lg'>
        <Heading as='h2' mb='6'>
          Login
        </Heading>
        <form onSubmit={handleLogin}>
          <FormControl id='username' mb='4'>
            <FormLabel>Username</FormLabel>
            <Input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id='password' mb='4'>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button m='4' type='submit' color='blue.500'>
            Login
          </Button>
          <Button m='4' color='teal.500' onClick={handleNavigateToRegister}>
            Register
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default LoginPage;
