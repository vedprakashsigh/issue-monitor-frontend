import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { z } from "zod";

import config from "../../config";
import { useModal } from "../../context/ModalContext";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const issueSchema = z.object({
  title: z.string().min(1, "Issue title is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["Open", "In Progress", "Closed"]),
});

const AddIssueModal: React.FC = () => {
  const { modals, closeModal, projectId } = useModal();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Open");
  const toast = useToast();
  const { selectedTheme } = useTheme();
  const { state } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (!state.token) {
        throw new Error("No token found");
      }
      const validatedData = issueSchema.parse({ title, description, status });
      const apiUrl = config.apiUrl;
      const response = await fetch(`${apiUrl}/api/issues`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...validatedData,
          project_id: projectId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add issue");
      }

      toast({
        title: "Issue added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTitle("");
      setDescription("");
      setStatus("Open");
      closeModal("addIssue");
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
    <Modal isOpen={modals.addIssue} onClose={() => closeModal("addIssue")}>
      <ModalOverlay />
      <ModalContent
        bg={selectedTheme.colors.modalBg}
        color={selectedTheme.colors.modalContent}
        my='auto'
        mx='4'
      >
        <ModalHeader>Add New Issue</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl id='title' mb='4' isRequired>
              <FormLabel>Issue Title</FormLabel>
              <Input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                bg={selectedTheme.colors.inputBg}
                color={selectedTheme.colors.inputText}
              />
            </FormControl>
            <FormControl id='description' mb='4' isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                bg={selectedTheme.colors.inputBg}
                color={selectedTheme.colors.inputText}
              />
            </FormControl>
            <FormControl id='status' mb='4' isRequired>
              <FormLabel>Status</FormLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                bg={selectedTheme.colors.inputBg}
                color={selectedTheme.colors.inputText}
              >
                <option
                  color={selectedTheme.colors.option}
                  style={{ backgroundColor: selectedTheme.colors.option }}
                  value='Open'
                >
                  Open
                </option>
                <option
                  color={selectedTheme.colors.option}
                  style={{ backgroundColor: selectedTheme.colors.option }}
                  value='In Progress'
                >
                  In Progress
                </option>
                <option
                  color={selectedTheme.colors.option}
                  style={{ backgroundColor: selectedTheme.colors.option }}
                  value='Closed'
                >
                  Closed
                </option>
              </Select>
            </FormControl>
            <Button type='submit' colorScheme='green'>
              Add Issue
            </Button>
          </form>
        </ModalBody>
        <ModalFooter
          bg={selectedTheme.colors.modalBg}
          color={selectedTheme.colors.modalContent}
        >
          <Button
            variant='ghost'
            onClick={() => closeModal("addIssue")}
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

export default AddIssueModal;
