import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { teamsTable } from "../../utils/mockup";
import TeamPlayersTable from "./sections/TeamPlayersTable";
import TeamPlayersController from "./sections/TeamPlayersController";

const TeamPlayers = () => {
  const { teamID } = useParams();

  const [status, setStatus] = useState(true);
  const [team, setTeam] = useState(
    teamsTable.filter((teamTable) => teamTable.teamID == parseInt(teamID))[0]
  );

  const fetchTeam = () => {
    // this will be an async function to get team data from the BE,
    // for now it sorts the info from the mockup.
    setTeam(teamsTable.filter((teamTable) => teamTable.teamID == parseInt(teamID))[0]);
  };

  return (
    <VStack gap={20} alignItems="center" w="100%">
      <TeamPlayersController status={status} team={team} fetchTeam={fetchTeam}/>
      <TeamPlayersTable team={team} setStatus={setStatus} />
    </VStack>
  );
};

export default TeamPlayers;
