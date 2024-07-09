import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import config from "../../config";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import { useTheme } from "../../context/ThemeContext";

const DeleteModal: React.FC = () => {
  const toast = useToast();
  const { state } = useAuth();
  const { modals, closeModal, projectId, issueId } = useModal();
  const { selectedTheme } = useTheme();
  const title = issueId ? "Issue" : "Project";
  const id = issueId ? issueId : projectId;

  const handleDelete = async () => {
    try {
      const token = state.token;
      const apiUrl = config.apiUrl;
      await fetch(`${apiUrl}/api/${title.toLowerCase()}?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: `${title} deleted successfully`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      closeModal("deleteModal");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal
      isOpen={modals.deleteModal}
      onClose={() => closeModal("deleteModal")}
    >
      <ModalOverlay />
      <ModalContent
        bg={selectedTheme.colors.modalBg}
        color={selectedTheme.colors.modalContent}
        borderRadius='md'
      >
        <ModalHeader borderBottomWidth='1px'>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to delete this {title.toLowerCase()}?
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme='red'
            mr={3}
            onClick={handleDelete}
            variant='solid'
          >
            Delete
          </Button>
          <Button
            variant='ghost'
            onClick={() => closeModal("deleteModal")}
            color={selectedTheme.colors.buttonPrimary}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
