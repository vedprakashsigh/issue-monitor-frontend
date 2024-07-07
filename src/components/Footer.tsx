import { Flex, Text } from "@chakra-ui/react";

const Footer: React.FC = () => {
  return (
    <Flex
      as='footer'
      p='4'
      bg='gray.100'
      w='100%'
      align='center'
      justify='center'
    >
      <Text>© 2024 Issue Monitor</Text>
    </Flex>
  );
};

export default Footer;
