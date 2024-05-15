import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import TeamPlayersTable from "./sections/TeamPlayersTable";
import TeamPlayersController from "./sections/TeamPlayersController";

const TeamPlayers = () => {
  const { teamID } = useParams();
  const location = useLocation();
  const team = location.state.teamToManage;

  const [status, setStatus] = useState(true);

  return (
    <VStack gap={20} alignItems="center" w="100%">
      <TeamPlayersController status={status} />
      <TeamPlayersTable team={team} status={status} setStatus={setStatus} />
    </VStack>
  );
};

export default TeamPlayers;
