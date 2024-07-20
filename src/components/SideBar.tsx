import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import { useProject } from "../context/ProjectContext";
import { useTheme } from "../context/ThemeContext";
import { useModal } from "../context/ModalContext";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import config from "../config";

interface SidebarProps {
  showSidebar: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ showSidebar }: SidebarProps) => {
  const { setSelectedProjectId, projects, setProjects } = useProject();
  const { openModal } = useModal();
  const { selectedTheme } = useTheme();
  const { state } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      if (projects === null) {
        try {
          if (state?.user?.user_id && state?.token) {
            const apiUrl = `${config.apiUrl}/api/projects`;
            const response = await fetch(
              `${apiUrl}?user_id=${state.user.user_id}`,
              {
                headers: {
                  Authorization: `Bearer ${state.token}`,
                },
              }
            );

            if (!response.ok) {
              throw new Error("Failed to fetch projects");
            }

            const fetchedProjects = await response.json();
            setProjects(fetchedProjects);
          }
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      }
    };
    fetchProjects();
  }, []);

  return (
    <Box
      w={{ base: showSidebar ? "100%" : "0", md: "20%" }}
      h={{ base: showSidebar ? "100vh" : "0", md: "100%" }}
      bg={selectedTheme.colors.sidebarBg}
      color={selectedTheme.colors.sidebarText}
      display={{ base: showSidebar ? "block" : "none", md: "block" }}
      overflow='auto'
      as='aside'
      p='4'
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
        {projects?.map((project) => (
          <Flex
            key={project.id}
            direction='row'
            justify='center'
            flexWrap='wrap'
          >
            <Button
              variant='ghost'
              colorScheme={selectedTheme.colors.buttonPrimary}
              color={selectedTheme.colors.sidebarProjectName}
              onClick={() => setSelectedProjectId(project.id)}
              size='sm'
            >
              {project.name}
            </Button>
            <Flex>
              {state?.user?.role !== "member" && (
                <EditIcon
                  cursor='pointer'
                  my='auto'
                  color={selectedTheme.colors.editButton}
                  onClick={() => openModal("editProject", project.id)}
                  mx='1'
                />
              )}
              {state?.user?.role === "admin" && (
                <DeleteIcon
                  cursor='pointer'
                  my='auto'
                  color={selectedTheme.colors.deleteButton}
                  onClick={() => openModal("deleteModal", project.id)}
                  mx='1'
                />
              )}
            </Flex>
          </Flex>
        ))}
      </VStack>
      {state?.user?.role !== "member" && (
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
      )}
      <Button
        mt='4'
        onClick={() => openModal("usersList")}
        colorScheme={selectedTheme.colors.buttonPrimary}
        color={selectedTheme.colors.sidebarButtonText}
        variant='solid'
        size='sm'
        w='full'
      >
        Users List
      </Button>
    </Box>
  );
};

export default Sidebar;
