import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Heading, Box, Text, Button, VStack } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { useAuth } from "../context/AuthContext";
import { useProject } from "../context/ProjectContext";
import { useModal } from "../context/ModalContext";
import { useTheme } from "../context/ThemeContext";
import config from "../config";

const MainSection: React.FC = () => {
  const [project, setProject] = useState<any>(null);
  const { state } = useAuth();
  const { selectedProjectId } = useProject();
  const { openModal } = useModal();
  const { selectedTheme } = useTheme(); // Use selectedTheme from ThemeContext
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedProjectId !== null) {
      const fetchProject = async () => {
        const token = state.token;
        const apiUrl = config.apiUrl;
        const response = await fetch(
          `${apiUrl}/api/project?project_id=${selectedProjectId}&user_id=${state.user?.user_id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setProject(data);
        }
      };
      fetchProject();
    }
  }, [selectedProjectId, state.token]);

  if (!project) {
    return (
      <Flex
        as='main'
        justify='center'
        align='center'
        direction='column'
        p='4'
        flex='1'
        boxShadow='md'
        bg={selectedTheme.colors.mainSectionBg}
        color={selectedTheme.colors.mainSectionText}
      >
        <Box
          textAlign='center'
          p='4'
          color={selectedTheme.colors.mainSectionText}
        >
          Select a project to see details
        </Box>
      </Flex>
    );
  }

  const handleDeleteIssue = async (id: number) => {
    const token = state.token;
    const apiUrl = config.apiUrl;
    await fetch(`${apiUrl}/api/issues?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    navigate("/");
  };

  return (
    <Flex
      as='main'
      direction='column'
      p='4'
      w='75%'
      mx='auto'
      boxShadow='md'
      borderRadius='md'
      bg={selectedTheme.colors.mainSectionBg}
      color={selectedTheme.colors.mainSectionText}
    >
      <Heading
        as='h2'
        size='xl'
        mb='4'
        textAlign='center'
        color={selectedTheme.colors.mainSectionHeading}
      >
        {project.name}
      </Heading>
      <Text
        mb='4'
        textAlign='center'
        color={selectedTheme.colors.mainSectionText}
      >
        {project.description}
      </Text>
      <Button
        onClick={() => openModal("issueModal")}
        mt='4'
        colorScheme='green'
        alignSelf='center'
        size='sm'
      >
        Create New Issue
      </Button>
      <VStack mt='8' align='stretch' spacing='4'>
        {project?.issues.map((issue: any) => (
          <Box
            key={issue.id}
            borderWidth='1px'
            borderRadius='lg'
            overflow='hidden'
            boxShadow='md'
            bg={selectedTheme.colors.issueBg}
          >
            <Box p='4'>
              <Heading
                as='h3'
                size='md'
                color={selectedTheme.colors.issueHeading}
              >
                {issue.title}
              </Heading>
              <Text fontSize='sm' mt='1' color={selectedTheme.colors.issueText}>
                {issue.description}
              </Text>
              <Text
                fontSize='sm'
                mt='1'
                fontWeight='bold'
                color={selectedTheme.colors.issueStatus}
              >
                Status: {issue.status}
              </Text>
            </Box>
            <Flex p='4' justify='flex-end'>
              <Button
                onClick={() => handleDeleteIssue(issue.id)}
                colorScheme='red'
                leftIcon={<DeleteIcon />}
                variant='outline'
                size='sm'
              >
                Delete Issue
              </Button>
            </Flex>
          </Box>
        ))}
      </VStack>
    </Flex>
  );
};

export default MainSection;
