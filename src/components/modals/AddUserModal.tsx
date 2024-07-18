import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import config from "../../config";
import { useModal } from "../../context/ModalContext";
import { useProject } from "../../context/ProjectContext";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const AddUserModal = () => {
  const { state } = useAuth();
  const { modals, closeModal } = useModal();
  const { selectedProjectId } = useProject();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const toast = useToast();

  const handleCloseModal = () => {
    setSelectedUserId(null);
    closeModal("addUser");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/users`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
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

  const handleAddUser = async () => {
    if (selectedUserId === null) return;

    try {
      const response = await fetch(
        `${config.apiUrl}/api/projects/${selectedProjectId}/add_user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.token}`,
          },
          body: JSON.stringify({ user_id: selectedUserId }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Success",
          description: data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        handleCloseModal();
      } else {
        toast({
          title: "Error",
          description: data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add user to project.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Modal isOpen={modals.addUser} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add User to Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              placeholder='Select user'
              onChange={(e) => setSelectedUserId(Number(e.target.value))}
            >
              {users.length > 0 &&
                users?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleAddUser}>
              Add User
            </Button>
            <Button variant='ghost' onClick={handleCloseModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddUserModal;
