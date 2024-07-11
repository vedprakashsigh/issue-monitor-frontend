import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
  Select,
  useToast,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useModal } from "../../context/ModalContext";
import { useTheme } from "../../context/ThemeContext";
import config from "../../config";
import { z } from "zod";
import { useAuth } from "../../context/AuthContext";

const issueSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(["Open", "In Progress", "Closed"]),
});

const EditIssueModal: React.FC = () => {
  const { modals, closeModal, projectId, issueId, forceUpdate } = useModal();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Open");
  const toast = useToast();
  const { selectedTheme } = useTheme();
  const { state } = useAuth();

  const handleCloseModal = () => {
    setTitle("");
    setDescription("");
    setStatus("Open");
    forceUpdate();
    closeModal("editIssue");
  };

  useEffect(() => {
    const fetchIssue = async () => {
      if (projectId && issueId) {
        const response = await fetch(
          `${config.apiUrl}/api/issue?project_id=${projectId}&id=${issueId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${state.token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setDescription(data.description);
          setStatus(data.status);
        }
      }
    };
    fetchIssue();
  }, [projectId, issueId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (!state.token) {
        throw new Error("No token found");
      }
      const validatedData = issueSchema.parse({ title, description, status });
      const apiUrl = config.apiUrl;
      const response = await fetch(`${apiUrl}/api/issues`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
        body: JSON.stringify({
          ...validatedData,
          project_id: projectId,
          issue_id: issueId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update issue");
      }

      toast({
        title: "Issue updated successfully",
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
    <Modal isOpen={modals.editIssue} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent
        bg={selectedTheme.colors.modalBg}
        color={selectedTheme.colors.modalContent}
        my='auto'
        mx='4'
      >
        <ModalHeader>Edit Issue</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl id='title' mb='4'>
              <FormLabel>Issue Title</FormLabel>
              <Input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                bg={selectedTheme.colors.inputBg}
                color={selectedTheme.colors.inputText}
              />
            </FormControl>
            <FormControl id='description' mb='4'>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                bg={selectedTheme.colors.inputBg}
                color={selectedTheme.colors.inputText}
              />
            </FormControl>
            <FormControl id='status' mb='4'>
              <FormLabel>Status</FormLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                bg={selectedTheme.colors.inputBg}
                color={selectedTheme.colors.inputText}
              >
                <option
                  color={selectedTheme.colors.text}
                  style={{ backgroundColor: selectedTheme.colors.option }}
                  value='Open'
                >
                  Open
                </option>
                <option
                  color={selectedTheme.colors.text}
                  style={{ backgroundColor: selectedTheme.colors.option }}
                  value='In Progress'
                >
                  In Progress
                </option>
                <option
                  color={selectedTheme.colors.text}
                  style={{ backgroundColor: selectedTheme.colors.option }}
                  value='Closed'
                >
                  Closed
                </option>
              </Select>
            </FormControl>
            <Button type='submit' colorScheme='green'>
              Save
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

export default EditIssueModal;
