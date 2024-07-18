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
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

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
        {state.user?.role === "admin" && (
          <Flex
            color={selectedTheme.colors.buttonPrimary}
            w='12rem'
            mx='auto'
            justify='ceter'
            boxShadow={{ base: "sm", md: "md" }}
            px='auto'
          >
            <Link to='/admin'>Go to Admin Dashboard</Link>
          </Flex>
        )}
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
      {state.user?.role !== "member" && (
        <Flex>
          <Button
            onClick={() => openModal("addUser")}
            color={selectedTheme.colors.buttonPrimary}
            variant='ghost'
            justifySelf='center'
            w='12rem'
            mx='4'
            boxShadow={{ base: "sm", md: "md" }}
            px='4'
          >
            Add Users
          </Button>
        </Flex>
      )}

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
              <Button
                leftIcon={<AddIcon />}
                onClick={() => openModal("comments", project.id, issue.id)}
              >
                Comments
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
