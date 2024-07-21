import { AddIcon, MinusIcon, WarningIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";

interface ProjectDetailsProps {
  project: any;
  isSmallerScreen: boolean;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  project,
  isSmallerScreen,
}) => {
  const { selectedTheme } = useTheme();
  const { state } = useAuth();
  const { openModal } = useModal();

  return (
    <>
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

      {state?.user?.role !== "member" && (
        <Flex>
          <Button
            onClick={() => openModal("addUser")}
            leftIcon={<AddIcon />}
            color={selectedTheme.colors.buttonPrimary}
            variant='ghost'
            justifySelf='center'
            w='12rem'
            mx='auto'
            size={{ base: "sm", md: "md" }}
            boxShadow={{ base: "sm", md: "md" }}
            px='4'
          >
            Add Users
          </Button>
          <Button
            onClick={() => openModal("removeUser")}
            leftIcon={<MinusIcon />}
            color={selectedTheme.colors.deleteButton}
            variant='ghost'
            justifySelf='center'
            w='12rem'
            mx='auto'
            size={{ base: "sm", md: "md" }}
            boxShadow={{ base: "sm", md: "md" }}
            px='4'
          >
            Remove Users
          </Button>
        </Flex>
      )}
      {!isSmallerScreen && (
        <Flex>
          <Button
            onClick={() => openModal("addIssue", project.id)}
            leftIcon={<WarningIcon />}
            variant='ghost'
            boxShadow='md'
            color={selectedTheme.colors.editButton}
            alignSelf='center'
            size='md'
            mx='auto'
            my='1.5rem'
          >
            Add New Issue
          </Button>
        </Flex>
      )}
    </>
  );
};

export default ProjectDetails;
