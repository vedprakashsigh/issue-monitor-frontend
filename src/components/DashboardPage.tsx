import { Link } from "react-router-dom";
import { Flex, Heading } from "@chakra-ui/react";
import { getCurrentUser } from "../utils/authUtils"; // Import getCurrentUser utility

const DashboardPage: React.FC = () => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return (
      <Flex align='center' justify='center' h='100vh'>
        <Heading as='h2' size='xl'>
          You are not logged in!
          <br />
          Please <Link to='/login'>login</Link> first.
        </Heading>
      </Flex>
    );
  }

  return (
    <Flex align='center' justify='center' h='100vh'>
      <Heading as='h2' size='xl'>
        {currentUser ? `Welcome, ${currentUser.username}!` : "DASHBOARD"}
      </Heading>
    </Flex>
  );
};

export default DashboardPage;
