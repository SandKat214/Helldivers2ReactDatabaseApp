import { Box, Grid, GridItem, Spinner } from "@chakra-ui/react";
import TeamCard from "../components/TeamCard";
import { teams } from "../../../utils/mockup";
import { motion } from "framer-motion";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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

  const { data: teamsData, isLoading } = useQuery({
    queryKey: [queryType],
    queryFn: async () => {
      const resp = await axios.get(import.meta.env.VITE_API_URL + "teams");
      return resp.data;
    },
    onError: () => {
      toast({ description: "Error fetching players", status: "error" });
    },
  });

  if (isLoading) {
    return <Spinner color="red.500" size="xl" />;
  }

  return (
    <MotionGrid
      gridTemplateColumns="repeat(4,1fr)"
      gap={10}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {teamsData.map((team) => {
        return (
          <MotionGridItem key={team.teamMeet + team.teamName} variants={item}>
            <TeamCard team={team} />
          </MotionGridItem>
        );
      })}
    </MotionGrid>
  );
};

export default Teams;
