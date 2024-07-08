import { Flex, Text } from "@chakra-ui/react";
import { useTheme } from "../context/ThemeContext";

const Footer: React.FC = () => {
  const { selectedTheme } = useTheme(); // Access selectedTheme from ThemeContext

  return (
    <Flex
      as='footer'
      p='4'
      bg={selectedTheme.colors.footerBg}
      w='100%'
      align='center'
      justify='center'
    >
      <Text color={selectedTheme.colors.headerText}>© 2024 Issue Monitor</Text>
    </Flex>
  );
};

export default Footer;
