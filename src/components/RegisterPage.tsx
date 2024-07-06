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

const schema = z.object({
  name: z.string().min(1),
  username: z.string().min(4),
  password: z.string().min(8).max(24),
});

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const validatedData = schema.parse({ name, username, password });
      const apiUrl = process.env.API_URL;
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
    <Flex align='center' justify='center' h='100vh'>
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
          <FormControl id='password' mb='4'>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type='submit' colorScheme='blue'>
            Register
          </Button>

          <Button mt='4' colorScheme='grey' onClick={handleNavigateToLogin}>
            Login
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default RegisterPage;
