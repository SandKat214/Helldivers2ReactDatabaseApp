// Citation for fetch function:
// Date: 5/19/2024
// Copied & Adapted from React-Starter-App
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app
// Authors: Devin Daniels and Zachary Maes


import axios from "axios";
import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import TeamPlayersTable from "./sections/TeamPlayersTable";
import TeamPlayersController from "./sections/TeamPlayersController";

const TeamPlayers = () => {
  const location = useLocation();

  const [status, setStatus] = useState(true);
  const [team, setTeam] = useState(location.state.teamToManage);

  return (
    <VStack gap={20} alignItems="center" w="100%">
      <TeamPlayersController status={status} team={team} setTeam={setTeam}/>
      <TeamPlayersTable team={team} setStatus={setStatus} />
    </VStack>
  );
};

export default TeamPlayers;
