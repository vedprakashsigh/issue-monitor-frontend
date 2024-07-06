import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Flex, Heading } from "@chakra-ui/react";

import { getCurrentUser, logout } from "../utils/authUtils"; // Import getCurrentUser utility

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  if (!user) {
    return (
      <Flex align='center' w='100vw' h='100vh' pt='8'>
        <Heading as='h2' size='xl'>
          You are not logged in!
          <br />
          Please <Link to='/login'>login</Link> first.
        </Heading>
      </Flex>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <Flex align='center' w='100vw' h='100vh' direction='column' pt='8'>
      <Heading as='h2' size='xl'>
        {user ? `Welcome, ${user.username}!` : "DASHBOARD"}
      </Heading>
      <Button mt='4' color='red.500' onClick={handleLogout}>
        Log Out
      </Button>
    </Flex>
  );
};

export default DashboardPage;
