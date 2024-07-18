import {
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import config from "../../config";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import { useTheme } from "../../context/ThemeContext";

const commentSchema = z.object({
  content: z.string().min(1, "Comment content is required"),
  user_id: z.number(),
  project_id: z.number(),
  issue_id: z.number(),
});

const EditCommentModal: React.FC = () => {
  const { modals, closeModal, forceUpdate, issueId, projectId, commentId } =
    useModal();
  const [content, setContent] = useState("");
  const toast = useToast();
  const { state } = useAuth();
  const { selectedTheme } = useTheme(); // Use selectedTheme from ThemeContext

  useEffect(() => {
    if (commentId === null) return;
    const fetchComment = async () => {
      const res = await fetch(
        `${config.apiUrl}/api/comment?comment_id=${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${state?.token}`,
          },
        }
      );
      const data = await res.json();
      setContent(data.content);
    };
    fetchComment();
  }, [state.token, commentId]);

  const handleCloseModal = () => {
    setContent("");
    forceUpdate();
    closeModal("editComment");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (!state.token) {
        throw new Error("No token found");
      }
      const validatedData = commentSchema.parse({
        content,
        user_id: state?.user?.user_id,
        project_id: projectId,
        issue_id: issueId,
      });
      const apiUrl = config.apiUrl;
      const response = await fetch(`${apiUrl}/api/comments/${commentId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${state?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update comment");
      }

      toast({
        title: "Comment updated successfully",
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
    <Modal isOpen={modals.editComment} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent
        bg={selectedTheme.colors.modalBg}
        color={selectedTheme.colors.modalContent}
        my='auto'
        mx='4'
      >
        <ModalHeader>Edit Comment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl id='content' mb='4' isRequired>
              <FormLabel>Comment</FormLabel>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                bg={selectedTheme.colors.inputBg}
                color={selectedTheme.colors.inputText}
              />
            </FormControl>
            <Button type='submit' colorScheme='green'>
              Update Comment
            </Button>
          </form>
        </ModalBody>
        <ModalFooter
          bg={selectedTheme.colors.modalBg}
          color={selectedTheme.colors.modalContent}
        >
          <Button
            variant='ghost'
            onClick={handleCloseModal}
            _hover={{ bg: selectedTheme.colors.buttonSecondary }}
            color={selectedTheme.colors.buttonPrimary}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditCommentModal;
