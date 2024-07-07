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
  Select,
  useToast,
} from "@chakra-ui/react";
import { z } from "zod";
import { useModal } from "../../context/ModalContext";
import { useProject } from "../../context/ProjectContext";
import config from "../../config";

const issueSchema = z.object({
  title: z.string().min(1, "Issue title is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["Open", "In Progress", "Closed"]),
});

const IssueModal: React.FC = () => {
  const { isIssueModalOpen, closeIssueModal } = useModal();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Open");
  const toast = useToast();
  const { selectedProjectId } = useProject();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const validatedData = issueSchema.parse({ title, description, status });
      const apiUrl = config.apiUrl;
      const response = await fetch(`${apiUrl}/api/issues`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...validatedData,
          project_id: selectedProjectId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create issue");
      }

      toast({
        title: "Issue created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      closeIssueModal();
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
    <Modal isOpen={isIssueModalOpen} onClose={closeIssueModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Issue</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl id='title' mb='4' isRequired>
              <FormLabel>Issue Title</FormLabel>
              <Input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl id='description' mb='4' isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl id='status' mb='4' isRequired>
              <FormLabel>Status</FormLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value='Open'>Open</option>
                <option value='In Progress'>In Progress</option>
                <option value='Closed'>Closed</option>
              </Select>
            </FormControl>
            <Button type='submit' colorScheme='blue'>
              Create Issue
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost' onClick={closeIssueModal}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default IssueModal;
