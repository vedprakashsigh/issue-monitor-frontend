import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import config from "../config";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";
import { useProject } from "../context/ProjectContext";
import { useTheme } from "../context/ThemeContext";

const MainSection: React.FC = () => {
  const [project, setProject] = useState<any>(null);
  const { state } = useAuth();
  const { selectedProjectId } = useProject();
  const { openModal, modals } = useModal();
  const { selectedTheme } = useTheme();

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
    } else {
      setProject(null);
    }
  }, [selectedProjectId, state.token, modals]);

  if (!project) {
    return (
      <Flex
        as='main'
        justify='center'
        align='center'
        direction='column'
        p='4'
        w='85%'
        mx='auto'
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

  return (
    <Flex
      as='main'
      direction='column'
      p='4'
      w='85%'
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
        onClick={() => openModal("addIssue", project.id)}
        mt='4'
        colorScheme='green'
        alignSelf='center'
        size='sm'
      >
        Add New Issue
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
                onClick={() => openModal("editIssue", project.id, issue.id)}
                color={selectedTheme.colors.editButton}
                leftIcon={<EditIcon />}
                variant='outline'
                size='sm'
                mx='2'
                boxShadow='md'
              >
                Edit Issue
              </Button>
              <Button
                onClick={() => openModal("deleteModal", project.id, issue.id)}
                color={selectedTheme.colors.deleteButton}
                leftIcon={<DeleteIcon />}
                variant='outline'
                size='sm'
                mx='2'
                boxShadow='md'
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
