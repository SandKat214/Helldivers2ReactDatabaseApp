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

  const { data, isLoading, refetch } = useQuery({
    queryKey: [queryType],
    queryFn: async () => {
      const resp = await axios.get(import.meta.env.VITE_API_URL + "teams");
      return resp.data;
    },
    onError: () => {
      toast({ description: "Error fetching players", status: "error" });
    },
  });

  if(isLoading){
    return(
      <Spinner color="red.500" size="xl"/>
    )
  }

//   {
//     "teamID": 5,
//     "teamTitle": "Freedom Fight",
//     "teamMeet": "2024-06-01T19:00:00.000Z",
//     "teamDifficulty": 4,
//     "team18Up": 1,
//     "teamChat": 1,
//     "teamCount": 1,
//     "teamImage": null,
//     "missionID": 5,
//     "missionName": "Eradicate Terminid Swarm",
//     "planetID": 4,
//     "planetName": "Electra Bay",
//     "langID": "ENGL",
//     "langName": "English"
// },

  return (
    <MotionGrid
      gridTemplateColumns="repeat(4,1fr)"
      gap={10}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {data.map((team, index) => {
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
