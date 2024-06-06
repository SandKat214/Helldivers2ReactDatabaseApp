import { Box, VStack } from "@chakra-ui/react";
import HeroSection from "./sections/HeroSection";
import SearchBox from "./sections/SearchBox";
import Teams from "./sections/Teams";
import { useState } from "react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const HomePage = () => {
  const [teamTitle, setTeamTitle] = useState("");

  return (
    <VStack gap={20}>
      <HeroSection />
      <SearchBox setTeamTitle={setTeamTitle} teamTitle={teamTitle} />
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1.9, duration: 0.7 } }}
      >
        <Teams teamTitle={teamTitle} />
      </MotionBox>
    </VStack>
  );
};

export default HomePage;
