import {
  HStack,
  Heading,
  Text,
  VStack,
  List,
  ListItem,
  ListIcon,
  Flex,
} from "@chakra-ui/react";
import { IoIosLink } from "react-icons/io";

const TableLayout = ({ children, header, desc, relationships }) => {
  return (
    <VStack gap={16} alignItems="stretch">
      <HStack gap={16} alignItems="stretch">
        <Flex
          flex={1}
          alignItems={relationships ? "flex-start" : "center"}
          flexDir={relationships ? "column" : "row"}
          justifyContent={relationships ? "flex-start" : "unset"}
          gap={2}
        >
          <Heading color="gray.100" flex={relationships ? "unset" : 1}>
            <Text as="span" color="red.500">
              {header.split(" ")[0]}
            </Text>{" "}
            {header.split(" ").slice(1)}
          </Heading>
          <Text color="gray.100" flex={relationships ? "unset" : 1}>
            {desc}
          </Text>
        </Flex>
        {relationships && (
          <VStack flex={1} alignItems="flex-start">
            <Heading color="red.500">
              Relationship{relationships.length > 1 && "s"}
            </Heading>
            <List spacing={2}>
              {relationships.map((relationship) => {
                return (
                  <ListItem color="white" key={relationship}>
                    <ListIcon as={IoIosLink} color="red.500" />
                    {relationship}
                  </ListItem>
                );
              })}
            </List>
          </VStack>
        )}
      </HStack>
      {children}
    </VStack>
  );
};

export default TableLayout;
