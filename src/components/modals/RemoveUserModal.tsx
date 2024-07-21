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

const RemoveUserModal: React.FC = () => {
  const { state } = useAuth();
  const { modals, closeModal, forceUpdate } = useModal();
  const { selectedProjectId } = useProject();
  const { selectedTheme } = useTheme();
  const [members, setMembers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const toast = useToast();

  const handleCloseModal = () => {
    setSelectedUserId(null);
    forceUpdate();
    closeModal("removeUser");
  };

  useEffect(() => {
    const fetchProjectMembers = async () => {
      try {
        if (selectedProjectId === null || state?.token === null) return;
        const response = await fetch(
          `${config.apiUrl}/api/projects/${selectedProjectId}/users`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );
        const data = await response.json();
        const filteredMembers = data.members.filter(
          (user: User) => user.id !== state?.user?.user_id
        );

        setMembers(filteredMembers);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch project members.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchProjectMembers();
  }, [selectedProjectId, state.token]);

  const handleRemoveUser = async () => {
    if (selectedUserId === null) return;

    try {
      const response = await fetch(
        `${config.apiUrl}/api/projects/${selectedProjectId}/remove_user`,
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
        description: "Failed to remove user from project.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={modals.removeUser} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent
        bg={selectedTheme.colors.modalBg}
        color={selectedTheme.colors.modalContent}
        my='auto'
        mx='4'
      >
        <ModalHeader>Remove User from Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Select
            placeholder={
              members.length > 0 ? "Select user" : "No users available"
            }
            onChange={(e) => setSelectedUserId(Number(e.target.value))}
            bg={selectedTheme.colors.inputBg}
            color={selectedTheme.colors.inputText}
            disabled={members.length === 0}
          >
            {members.length > 0 &&
              members.map((user) => (
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
          <Button colorScheme='red' mr={3} onClick={handleRemoveUser}>
            Remove User
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

export default RemoveUserModal;
