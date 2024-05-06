import { Box, Heading, Text, VStack } from "@chakra-ui/react";

const HeroSection = () => {
  return (
    <VStack gap={16}>
      <Box p={0.5} backgroundColor="red.500" borderRadius="full">
        <Box
          backgroundColor="background.700"
          borderRadius="full"
          px={10}
          py={1}
        >
          <Text color="gray.100" fontSize="lg">
            Recruit for Your Next Mission
          </Text>
        </Box>
      </Box>
      <VStack gap={8}>
        <Heading color="white" textAlign="center" fontSize="7xl">
          Spread Democracy{" "}
          <Heading
            as="span"
            color="red.500"
            display="block"
            fontSize="7xl"
            sx={{
              textShadow: "0 0 5px #E53E3E, 0 0 2px #E53E3E, 0 0 5px #E53E3E",
            }}
          >
            Like Never Before.
          </Heading>
        </Heading>
        <Text
          color="gray.100"
          fontWeight="bold"
          fontSize="xl"
          textAlign="center"
        >
          Find you liberation squad with a
          <Text
            as="span"
            display="block"
            sx={{
              background: "linear-gradient(to top, #FC8181, #C53030)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            click of a button
          </Text>
        </Text>
      </VStack>
    </VStack>
  );
};

export default HeroSection;
