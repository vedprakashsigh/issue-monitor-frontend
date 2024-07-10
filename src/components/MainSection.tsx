import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";
import { useProject } from "../context/ProjectContext";
import { useTheme } from "../context/ThemeContext";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

interface MainSectionProps {
  showSidebar: boolean;
}

const MainSection: React.FC<MainSectionProps> = ({
  showSidebar,
}: MainSectionProps) => {
  const [project, setProject] = useState<any>(null);
  const { state } = useAuth();
  const { selectedProjectId, projects } = useProject();
  const { selectedTheme } = useTheme();
  const { openModal, modals } = useModal();
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (selectedProjectId !== null) {
      setProject(projects?.find((project) => project.id === selectedProjectId));
    } else {
      setProject(null);
    }
  }, [selectedProjectId, state, modals]);

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
        display={{ base: !showSidebar ? "block" : "none", md: "block" }}
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
      display={{ base: !showSidebar ? "block" : "none", md: "block" }}
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
      {!isSmallerScreen && (
        <Button
          onClick={() => openModal("addIssue", project.id)}
          colorScheme='green'
          alignSelf='center'
          size={{ base: "xs", md: "md" }}
          mx='auto'
          my='4'
        >
          Add New Issue
        </Button>
      )}
      <VStack mt='8' align='stretch' spacing='4'>
        {project?.issues?.map((issue: any) => (
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
                variant='ghost'
                size={{ base: "xs", md: "md" }}
                mx='2'
                boxShadow={{ base: "sm", md: "md" }}
              >
                Edit Issue
              </Button>
              <Button
                onClick={() => openModal("deleteModal", project.id, issue.id)}
                color={selectedTheme.colors.deleteButton}
                leftIcon={<DeleteIcon />}
                variant='primary'
                size={{ base: "xs", md: "md" }}
                mx='2'
                boxShadow={{ base: "sm", md: "md" }}
              >
                Delete Issue
              </Button>
            </Flex>
          </Box>
        ))}
      </VStack>
      {isSmallerScreen && (
        <Button
          onClick={() => openModal("addIssue", project.id)}
          mt='4'
          colorScheme='green'
          alignSelf='center'
          size={{ base: "sm", md: "md" }}
        >
          Add New Issue
        </Button>
      )}
    </Flex>
  );
};

export default MainSection;
