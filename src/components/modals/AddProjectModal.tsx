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
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { z } from "zod";
import config from "../../config";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import { useProject } from "../../context/ProjectContext";
import { useTheme } from "../../context/ThemeContext";

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  user_id: z.number(),
});

const AddProjectModal: React.FC = () => {
  const { modals, closeModal, forceUpdate } = useModal();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const toast = useToast();
  const { setSelectedProjectId } = useProject();
  const { state } = useAuth();
  const { selectedTheme } = useTheme(); // Use selectedTheme from ThemeContext

  const handleCloseModal = () => {
    setName("");
    setDescription("");
    forceUpdate();
    closeModal("addProject");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (!state.token) {
        throw new Error("No token found");
      }
      const validatedData = projectSchema.parse({
        name,
        description,
        user_id: state?.user?.user_id,
      });
      const apiUrl = config.apiUrl;
      const response = await fetch(`${apiUrl}/api/projects`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to add project");
      }

      const newProject = await response.json();
      setSelectedProjectId(newProject.id);
      toast({
        title: "Project added successfully",
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
    <Modal isOpen={modals.addProject} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent
        bg={selectedTheme.colors.modalBg}
        color={selectedTheme.colors.modalContent}
        my='auto'
        mx='4'
      >
        <ModalHeader>Add New Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl id='name' mb='4' isRequired>
              <FormLabel>Project Name</FormLabel>
              <Input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            <Button type='submit' colorScheme='green'>
              Add Project
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

export default AddProjectModal;
