import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <VStack h="100%" justifyContent="center" flexGrow={1}>
      <Heading color="red.500" fontSize="7xl">
        Error
      </Heading>
      <Text color="white" fontSize="2xl">
        There was an error please retry the operation
      </Text>
      <Link to="/">
        <Button
          colorScheme="red"
          mt={10}
          size="lg"
          rightIcon={<IoHome />}
          boxShadow="red"
        >
          Home
        </Button>
      </Link>
    </VStack>
  );
};

export default Error;
