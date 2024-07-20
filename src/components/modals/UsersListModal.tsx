import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useModal } from "../../context/ModalContext";
import config from "../../config";

const UsersListModal: React.FC = () => {
  const { state } = useAuth();
  const { selectedTheme } = useTheme();
  const { modals, closeModal, forceUpdate } = useModal();
  const [users, setUsers] = useState<any[]>([]);
  const toast = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!state.token) return;
        const response = await fetch(`${config.apiUrl}/api/users`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch users.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchUsers();
  }, [state.token, toast]);

  const handleCloseModal = () => {
    forceUpdate();
    closeModal("usersList");
  };

  return (
    <Modal isOpen={modals.usersList} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent
        bg={selectedTheme.colors.mainSectionBg}
        color={selectedTheme.colors.mainSectionText}
      >
        <ModalHeader>
          <Heading
            as='h2'
            size='xl'
            textAlign='center'
            color={selectedTheme.colors.mainSectionHeading}
          >
            Registered Users
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing='4'>
            {users.length > 0 ? (
              users.map((user) => (
                <Box
                  key={user.id}
                  p='4'
                  borderWidth='1px'
                  borderRadius='lg'
                  w='100%'
                  bg={selectedTheme.colors.issueBg}
                  color={selectedTheme.colors.issueText}
                  overflow='auto'
                >
                  <Text>
                    <strong>Id:</strong> {user.id}
                  </Text>
                  <Text>
                    <strong>Email:</strong> {user.email}
                  </Text>
                  <Text>
                    <strong>Username:</strong> {user.username}
                  </Text>
                  <Text>
                    <strong>Role:</strong> {user.role}
                  </Text>
                </Box>
              ))
            ) : (
              <Text>No users found.</Text>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleCloseModal} colorScheme='blue'>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UsersListModal;
