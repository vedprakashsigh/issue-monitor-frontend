import { useState, useEffect } from "react";
import { Flex, Heading, Button, VStack } from "@chakra-ui/react";

import { useAuth } from "../context/AuthContext";
import { useProject } from "../context/ProjectContext";
import { useModal } from "../context/ModalContext";
import { useTheme } from "../context/ThemeContext";

import config from "../config";

const Sidebar: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const { state } = useAuth();
  const { setSelectedProjectId } = useProject();
  const { openModal } = useModal();
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
  }, [state.token, state.user?.user_id]);

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
        ))}
      </VStack>
      <Button
        mt='4'
        onClick={() => openModal("projectModal")}
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
