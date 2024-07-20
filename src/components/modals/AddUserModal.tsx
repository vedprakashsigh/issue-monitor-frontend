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
import { useTheme } from "../../context/ThemeContext";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const AddUserModal: React.FC = () => {
  const { state } = useAuth();
  const { modals, closeModal, forceUpdate } = useModal();
  const { selectedProjectId } = useProject();
  const { selectedTheme } = useTheme();
  const [users, setUsers] = useState<User[]>([]);
  const [projectMembers, setProjectMembers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const toast = useToast();

  const handleCloseModal = () => {
    setSelectedUserId(null);
    forceUpdate();
    closeModal("addUser");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (selectedProjectId === null) return;
        const [allUsersResponse, projectMembersResponse] = await Promise.all([
          fetch(`${config.apiUrl}/api/users`, {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }),
          fetch(`${config.apiUrl}/api/projects/${selectedProjectId}/users`, {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }),
        ]);

        const allUsersData = await allUsersResponse.json();
        const projectMembersData = await projectMembersResponse.json();

        setUsers(allUsersData.users);
        setProjectMembers(projectMembersData.members);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch users or project members.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchUsers();
  }, [selectedProjectId, state.token]);

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

  const availableUsers = users.filter(
    (user) => !projectMembers.some((member) => member.id === user.id)
  );

  return (
    <Modal isOpen={modals.addUser} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent
        bg={selectedTheme.colors.modalBg}
        color={selectedTheme.colors.modalContent}
        my='auto'
        mx='4'
      >
        <ModalHeader>Add User to Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Select
            placeholder={
              availableUsers.length > 0 ? "Select user" : "No users available"
            }
            onChange={(e) => setSelectedUserId(Number(e.target.value))}
            bg={selectedTheme.colors.inputBg}
            color={selectedTheme.colors.inputText}
            disabled={availableUsers.length === 0}
          >
            {availableUsers.length > 0 &&
              availableUsers.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                  color={selectedTheme.colors.option}
                  style={{ backgroundColor: selectedTheme.colors.option }}
                >
                  {user.name} - ({user.email}) - ({user.role})
                </option>
              ))}
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='green' mr={3} onClick={handleAddUser}>
            Add User
          </Button>
          <Button
            variant='ghost'
            onClick={handleCloseModal}
            _hover={{ bg: selectedTheme.colors.buttonSecondary }}
            color={selectedTheme.colors.buttonPrimary}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddUserModal;
