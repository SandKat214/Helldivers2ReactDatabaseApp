import { HStack, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import { FaSpaceAwesome } from "react-icons/fa6";

const Footer = () => {
  return (
    <VStack
      backgroundColor="background.300"
      w="100vw"
      h="400px"
      alignItems="center"
      justifyContent="center"
      borderTopWidth="1px"
      borderColor="gray.700"
      gap={32}
    >
      <HStack maxW="1200px" w="1300px" justifyContent="space-between">
        <HStack justifyContent="flex-start" flex={1}>
          <Icon as={FaSpaceAwesome} color="red.500" boxSize={10} />
          <Heading color="white">
            Planetary{" "}
            <Heading as="span" color="red.500">
              Liberators
            </Heading>
          </Heading>
        </HStack>
        <Text color="white" flex={1}>
          Our portfolio project submission for Introduction to Databases.<br/>
          The UI is built using React and Chakra UI.
        </Text>
      </HStack>
      <HStack>
        <Text color="white">
          &copy; 2024 Guy Cohen and Katherine Sandeen. All rights reserved.
        </Text>
      </HStack>
    </VStack>
  );
};

export default Footer;
