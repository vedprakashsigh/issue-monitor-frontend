import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import config from "../../config";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import { useTheme } from "../../context/ThemeContext";

const CommentsModal: React.FC = () => {
  const { modals, openModal, closeModal, projectId, issueId, forceUpdate } =
    useModal();
  const { state } = useAuth();
  const { selectedTheme } = useTheme();
  const [comments, setComments] = useState<any[]>([]);
  const toast = useToast();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const apiUrl = `${config.apiUrl}/api/comments?issue_id=${issueId}`;
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }

        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
        toast({
          title: "Error",
          description: "Failed to fetch comments",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    if (modals.comments && issueId) {
      fetchComments();
    }
  }, [modals.comments, issueId, state.token, toast]);

  const handleCloseModal = () => {
    setComments([]);
    forceUpdate();
    closeModal("comments");
  };

  const handleAddComment = () => {
    openModal("addComment");
  };

  const handleEditComment = (commentId: number) => {
    openModal("editComment", projectId as number, issueId as number, commentId);
  };

  const handleDeleteComment = (commentId: number) => {
    openModal("deleteModal", projectId as number, issueId as number, commentId);
  };

  return (
    <Modal isOpen={modals.comments} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent
        bg={selectedTheme.colors.modalBg}
        color={selectedTheme.colors.modalContent}
        my='auto'
        mx='4'
      >
        <ModalHeader>Comments for Issue #{issueId}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {comments.map((comment) => (
            <div key={comment.id} style={{ marginBottom: "10px" }}>
              <p>{comment.content}</p>
              <small>Posted by User #{comment.user_id}</small>
              <div style={{ marginTop: "5px" }}>
                <Button
                  size='sm'
                  colorScheme='blue'
                  mr='2'
                  onClick={() => handleEditComment(comment.id)}
                >
                  Edit
                </Button>
                <Button
                  size='sm'
                  colorScheme='red'
                  mr='2'
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </ModalBody>
        <ModalFooter
          bg={selectedTheme.colors.modalBg}
          color={selectedTheme.colors.modalContent}
        >
          <Button
            variant='ghost'
            onClick={handleAddComment}
            _hover={{ bg: selectedTheme.colors.buttonSecondary }}
            color={selectedTheme.colors.buttonPrimary}
          >
            Add Comment
          </Button>
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

export default CommentsModal;
