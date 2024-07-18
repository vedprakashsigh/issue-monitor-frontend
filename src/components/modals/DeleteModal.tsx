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
  const { modals, closeModal, projectId, issueId, commentId, forceUpdate } =
    useModal();
  const { selectedTheme } = useTheme();
  const title = commentId ? "Comment" : issueId ? "Issue" : "Project";
  const id = issueId ? issueId : projectId;

  const handleCloseModal = () => {
    forceUpdate();
    closeModal("deleteModal");
  };

  const handleDelete = async () => {
    try {
      if (!state.token) {
        throw new Error("No token found");
      }
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

      handleCloseModal();
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
    <Modal isOpen={modals.deleteModal} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent
        bg={selectedTheme.colors.modalBg}
        color={selectedTheme.colors.modalContent}
        borderRadius='md'
        my='auto'
        mx='4'
      >
        <ModalHeader borderBottomWidth='1px'>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to delete this {title.toLowerCase()}{" "}
          {title === "Issue" && "and all its comments"}
          {title === "Project" && "and all its issues"}?
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
            onClick={handleCloseModal}
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
