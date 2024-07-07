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
import config from "../config";

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
    <Flex align='center' justify='center' w='100vw' h='100vh'>
      <Box p='8' borderWidth='1px' borderRadius='lg' boxShadow='lg'>
        <Heading as='h2' mb='6'>
          Register
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id='name' mb='4'>
            <FormLabel>Name</FormLabel>
            <Input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl id='username' mb='4'>
            <FormLabel>Username</FormLabel>
            <Input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id='email' mb='4'>
            <FormLabel>Email</FormLabel>
            <Input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            Register
          </Button>
          <Button m='4' color='teal.500' onClick={handleNavigateToLogin}>
            Login
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default RegisterPage;
