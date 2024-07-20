import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { ChatIcon, DeleteIcon, EditIcon, WarningIcon } from "@chakra-ui/icons";

interface IssueListProps {
  issues: any[];
  projectId: number;
  openModal: (modal: string, projectId: number, issueId?: number) => void;
  selectedTheme: any;
  isSmallerScreen: boolean;
}

const IssueList: React.FC<IssueListProps> = ({
  issues,
  projectId,
  openModal,
  selectedTheme,
  isSmallerScreen,
}) => {
  return (
    <VStack mt='8' align='stretch' spacing='4'>
      {issues?.map((issue) => (
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
          <Flex
            p={{ base: "2", md: "4" }}
            direction={{ base: "column", md: "row" }}
            align={{ base: "center", md: "start" }}
            justify={{ base: "center", md: "space-between" }}
            gap={{ base: "2", md: "4" }}
          >
            <Button
              onClick={() => openModal("editIssue", projectId, issue.id)}
              color={selectedTheme.colors.editButton}
              leftIcon={<EditIcon />}
              variant='ghost'
              size={{ base: "sm", md: "md" }}
              boxShadow={{ base: "sm", md: "md" }}
              width={{ base: "full", md: "auto" }}
            >
              Edit Issue
            </Button>
            <Button
              onClick={() => openModal("deleteModal", projectId, issue.id)}
              leftIcon={<DeleteIcon />}
              color={selectedTheme.colors.deleteButton}
              variant='ghost'
              size={{ base: "sm", md: "md" }}
              boxShadow={{ base: "sm", md: "md" }}
              width={{ base: "full", md: "auto" }}
            >
              Delete Issue
            </Button>
            <Button
              onClick={() => openModal("comments", projectId, issue.id)}
              leftIcon={<ChatIcon />}
              color={selectedTheme.colors.buttonPrimary}
              variant='ghost'
              size={{ base: "sm", md: "md" }}
              boxShadow={{ base: "sm", md: "md" }}
              width={{ base: "full", md: "auto" }}
            >
              Comments
            </Button>
          </Flex>
        </Box>
      ))}
      {isSmallerScreen && (
        <Button
          onClick={() => openModal("addIssue", projectId)}
          leftIcon={<WarningIcon />}
          variant='ghost'
          mt='4'
          color={selectedTheme.colors.editButton}
          alignSelf='center'
          size='sm'
        >
          Add New Issue
        </Button>
      )}
    </VStack>
  );
};

export default IssueList;
