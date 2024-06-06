import {
  Grid,
  GridItem,
  HStack,
  Heading,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import TeamCard from "../components/TeamCard";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const MotionGrid = motion(Grid);
const MotionGridItem = motion(GridItem);
// const item = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.33,
//     },
//   },
// };

const Teams = ({ teamTitle }) => {
  const toast = useToast();

  const { data: teamsData, isLoading } = useQuery({
    queryKey: [teamTitle],
    queryFn: async () => {
      if (teamTitle) {
        const resp = await axios.get(
          import.meta.env.VITE_API_URL + "teams/search/" + teamTitle
        );
        return resp.data;
      }
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

  return teamsData.length > 0 ? (
    <MotionGrid gridTemplateColumns="repeat(4,1fr)" gap={10}>
      {teamsData.map((team) => {
        return (
          <MotionGridItem key={team.teamMeet + team.teamName}>
            <TeamCard team={team} />
          </MotionGridItem>
        );
      })}
    </MotionGrid>
  ) : (
    <HStack
      width="100%"
      p={10}
      borderWidth={1}
      borderRadius="md"
      borderColor="gray.700"
    >
      <Heading color="white">No teams found</Heading>
    </HStack>
  );
};

export default Teams;
