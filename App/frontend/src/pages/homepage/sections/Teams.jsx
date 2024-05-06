import { Grid } from "@chakra-ui/react";
import TeamCard from "../components/TeamCard";
import { teams } from "../../../utils/mockup";

const Teams = ({ queryType }) => {
  return (
    <Grid gridTemplateColumns="repeat(4,1fr)" gap={10}>
      {teams.map((team, index) => {
        return <TeamCard data={team} key={index} />;
      })}
    </Grid>
  );
};

export default Teams;
