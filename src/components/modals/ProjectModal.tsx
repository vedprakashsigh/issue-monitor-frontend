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
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { z } from "zod";
import { useModal } from "../../context/ModalContext";
import { useProject } from "../../context/ProjectContext";
import config from "../../config";
import { useAuth } from "../../context/AuthContext";

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  user_id: z.number(),
});

const ProjectModal: React.FC = () => {
  const { isProjectModalOpen, closeProjectModal } = useModal();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const toast = useToast();
  const { setSelectedProjectId } = useProject();
  const { state } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const validatedData = projectSchema.parse({
        name,
        description,
        user_id: state?.user?.user_id,
      });
      const apiUrl = config.apiUrl;
      const response = await fetch(`${apiUrl}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      const newProject = await response.json();
      setSelectedProjectId(newProject.id);
      toast({
        title: "Project created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      closeProjectModal();
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
    <Modal isOpen={isProjectModalOpen} onClose={closeProjectModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl id='name' mb='4' isRequired>
              <FormLabel>Project Name</FormLabel>
              <Input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl id='description' mb='4' isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <Button type='submit' colorScheme='blue'>
              Create Project
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost' onClick={closeProjectModal}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProjectModal;
