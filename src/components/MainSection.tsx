import { Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";
import { useProject } from "../context/ProjectContext";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import ProjectDetails from "./ProjectDetails";
import IssueList from "./IssueList";

interface MainSectionProps {
  showSidebar: boolean;
}

const MainSection: React.FC<MainSectionProps> = ({ showSidebar }) => {
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
        <Text textAlign='center' p='4'>
          Select a project to see details
        </Text>
        {state.user?.role === "admin" && (
          <Flex
            color={selectedTheme.colors.buttonPrimary}
            w='12rem'
            mx='auto'
            justify='center'
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
      <ProjectDetails
        project={project}
        isSmallerScreen={isSmallerScreen as boolean}
        openModal={openModal}
        selectedTheme={selectedTheme}
        userRole={state.user?.role}
      />
      <IssueList
        issues={project?.issues}
        projectId={project.id}
        openModal={openModal}
        selectedTheme={selectedTheme}
        isSmallerScreen={isSmallerScreen as boolean}
      />
    </Flex>
  );
};

export default MainSection;
