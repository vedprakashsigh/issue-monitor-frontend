import { Button, Flex, Heading, VStack } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";
import { useProject } from "../context/ProjectContext";
import { useTheme } from "../context/ThemeContext";

import config from "../config";

const Sidebar: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const { state } = useAuth();
  const { setSelectedProjectId } = useProject();
  const { openModal, modals } = useModal();
  const { selectedTheme } = useTheme();

  useEffect(() => {
    // Fetch the projects of the logged-in user
    const fetchProjects = async () => {
      const token = state.token;
      const apiUrl = config.apiUrl;
      const user_id = state.user?.user_id as number;

      try {
        const response = await fetch(
          `${apiUrl}/api/projects?user_id=${user_id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        // Handle error as needed
      }
    };

    fetchProjects();
  }, [state.token, state.user?.user_id, modals]);

  return (
    <Flex
      as='aside'
      direction='column'
      p='4'
      bg={selectedTheme.colors.sidebarBg}
      w='20%'
      h='100%'
      boxShadow='lg'
    >
      <Heading
        as='h3'
        size='md'
        mb='6'
        textAlign='center'
        color={selectedTheme.colors.sidebarHeadingText}
      >
        Projects
      </Heading>
      <VStack spacing='4' align='stretch' flex='1' overflowY='auto'>
        {projects.map((project) => (
          <Flex key={project.id} direction='row' justify='center'>
            <Button
              key={project.id}
              variant='ghost'
              colorScheme={selectedTheme.colors.buttonPrimary}
              color={selectedTheme.colors.sidebarProjectName}
              onClick={() => setSelectedProjectId(project.id)}
              size='sm'
            >
              {project.name}
            </Button>
            <EditIcon
              cursor='pointer'
              my='auto'
              color={selectedTheme.colors.editButton}
              onClick={() => openModal("editProject", project.id)}
              mx='1'
            />
            <DeleteIcon
              cursor='pointer'
              my='auto'
              color={selectedTheme.colors.deleteButton}
              onClick={() => openModal("deleteModal", project.id)}
              mx='1'
            />
          </Flex>
        ))}
      </VStack>
      <Button
        mt='4'
        onClick={() => openModal("addProject")}
        colorScheme={selectedTheme.colors.buttonPrimary}
        color={selectedTheme.colors.sidebarButtonText}
        variant='solid'
        size='sm'
        w='full'
      >
        Add New Project
      </Button>
    </Flex>
  );
};

export default Sidebar;
