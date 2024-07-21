import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useTheme } from "../context/ThemeContext";

const Loader = () => {
  const { selectedTheme } = useTheme();

  return (
    <Flex
      as='main'
      justify='center'
      align='center'
      direction='column'
      p='4'
      w='100vw'
      h='100vh'
      mx='auto'
      flex='1'
      boxShadow='md'
      bg={selectedTheme.colors.mainSectionBg}
      color={selectedTheme.colors.mainSectionText}
    >
      <Spinner
        size='xl'
        thickness='4px'
        speed='0.65s'
        color={selectedTheme.colors.mainSectionHeading}
      />
      <Text
        mt='4'
        fontSize='lg'
        fontWeight='md'
        color={selectedTheme.colors.mainSectionHeading}
      >
        Loading, please wait...
      </Text>
    </Flex>
  );
};

export default Loader;
