import { HStack, Heading, Text, VStack } from "@chakra-ui/react";

const TableLayout = ({ children, header, desc }) => {
  return (
    <VStack gap={16}>
      <HStack>
        <Heading color="gray.100" flex={1}>
          <Text as="span" color="red.500">
            {header.split(" ")[0]}
          </Text>{" "}
          {header.split(" ").slice(1)}
        </Heading>
        <Text flex={1} color="gray.100">
          {desc}
        </Text>
      </HStack>
      {children}
    </VStack>
  );
};

export default TableLayout;
