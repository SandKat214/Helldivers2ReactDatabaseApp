import { Box, Grid, GridItem } from "@chakra-ui/react";
import TeamCard from "../components/TeamCard";
import { teams } from "../../../utils/mockup";
import { motion } from "framer-motion";

const Teams = ({ queryType }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 1.7,
        staggerChildren: 0.1,
        duration: 0.7,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 500 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.33,
      },
    },
  };

  const MotionGrid = motion(Grid);
  const MotionGridItem = motion(GridItem);

  return (
    <MotionGrid
      gridTemplateColumns="repeat(4,1fr)"
      gap={10}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {teams.map((team, index) => {
        return (
          <MotionGridItem key={index} variants={item}>
            <TeamCard data={team} />
          </MotionGridItem>
        );
      })}
    </MotionGrid>
  );
};

export default Teams;
