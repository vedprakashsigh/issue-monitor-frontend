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
import { useTheme } from "../context/ThemeContext"; // Import useTheme hook

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(4, "Username must be at least 4 characters"),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(24, "Password must be at most 24 characters"),
});

const RegisterPage: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { selectedTheme } = useTheme(); // Use the useTheme hook to get the current theme

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const validatedData = schema.parse({ name, username, email, password });
      const apiUrl = config.apiUrl;
      const response = await fetch(`${apiUrl}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      toast({
        title: "Registration Successful",
        description: "You have successfully registered.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setEmail("");
      setName("");
      setPassword("");
      setUsername("");

      // Redirect to login page after successful registration
      navigate("/login"); // Navigate to login page on success
    } catch (error: any) {
      toast({
        title: "Registration Error",
        description: error?.message ?? "An error occurred while registering.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  return (
    <Flex
      align='center'
      justify='center'
      w='100vw'
      h='100vh'
      bg={selectedTheme.colors.background}
      color={selectedTheme.colors.text}
    >
      <Box
        p='8'
        borderWidth='1px'
        borderRadius='lg'
        boxShadow='lg'
        bg={selectedTheme.colors.primary}
        color={selectedTheme.colors.text}
      >
        <Heading as='h2' mb='6' color={selectedTheme.colors.text}>
          Register
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id='name' mb='4'>
            <FormLabel color={selectedTheme.colors.text}>Name</FormLabel>
            <Input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              bg={selectedTheme.colors.background}
              color={selectedTheme.colors.text}
              borderColor={selectedTheme.colors.text}
            />
          </FormControl>
          <FormControl id='username' mb='4'>
            <FormLabel color={selectedTheme.colors.text}>Username</FormLabel>
            <Input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              bg={selectedTheme.colors.background}
              color={selectedTheme.colors.text}
              borderColor={selectedTheme.colors.text}
            />
          </FormControl>
          <FormControl id='email' mb='4'>
            <FormLabel color={selectedTheme.colors.text}>Email</FormLabel>
            <Input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg={selectedTheme.colors.background}
              color={selectedTheme.colors.text}
              borderColor={selectedTheme.colors.text}
            />
          </FormControl>
          <FormControl id='password' mb='4'>
            <FormLabel color={selectedTheme.colors.text}>Password</FormLabel>
            <Input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg={selectedTheme.colors.background}
              color={selectedTheme.colors.text}
              borderColor={selectedTheme.colors.text}
            />
          </FormControl>
          <Button m='4' type='submit' color={selectedTheme.colors.accent}>
            Register
          </Button>
          <Button
            m='4'
            color={selectedTheme.colors.secondary}
            onClick={handleNavigateToLogin}
          >
            Login
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default RegisterPage;
