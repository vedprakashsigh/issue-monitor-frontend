import React, { useState } from "react";
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
  useToast,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useModal } from "../../context/ModalContext";
import { useTheme } from "../../context/ThemeContext";
import config from "../../config";
import { useProject } from "../../context/ProjectContext";
import { useAuth } from "../../context/AuthContext";
import { z } from "zod";

const projectSchema = z.object({
  name: z.string(),
  description: z.string(),
  user_id: z.number(),
});

const EditProjectModal: React.FC = () => {
  const { modals, closeModal, projectId } = useModal();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const toast = useToast();
  const { setSelectedProjectId } = useProject();
  const { state } = useAuth();
  const { selectedTheme } = useTheme();

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
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${state?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...validatedData, project_id: projectId }),
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      const newProject = await response.json();
      setSelectedProjectId(newProject.id);
      toast({
        title: "Project updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setName("");
      setDescription("");

      closeModal("editProject");
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
      isOpen={modals.editProject}
      onClose={() => closeModal("editProject")}
    >
      <ModalOverlay />
      <ModalContent
        bg={selectedTheme.colors.modalBg}
        color={selectedTheme.colors.modalContent}
        my='auto'
        mx='4'
      >
        <ModalHeader>Edit Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl id='name' mb='4'>
              <FormLabel>Project Name</FormLabel>
              <Input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            onClick={() => closeModal("editProject")}
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

export default EditProjectModal;
