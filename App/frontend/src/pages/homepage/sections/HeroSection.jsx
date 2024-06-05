import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionText = motion(Text);
const HeroSection = () => {
  return (
    <VStack gap={16}>
      <MotionBox
        p={0.5}
        backgroundColor="red.500"
        borderRadius="full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.4, duration: 0.2 } }}
      >
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
      </MotionBox>
      <VStack gap={8}>
        <MotionVStack
          gap={0}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.8, duration: 0.2 } }}
        >
          <Heading color="white" textAlign="center" fontSize="7xl">
            <Typewriter
              options={{
                strings: [
                  "Spread Democracy",
                  "Liberate Planets",
                  "Build Communities",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </Heading>
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
        </MotionVStack>
        <MotionText
          color="gray.100"
          fontWeight="bold"
          fontSize="xl"
          textAlign="center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1.2, duration: 0.2 } }}
        >
          Find your liberation squad with a
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
        </MotionText>
      </VStack>
    </VStack>
  );
};

export default HeroSection;
