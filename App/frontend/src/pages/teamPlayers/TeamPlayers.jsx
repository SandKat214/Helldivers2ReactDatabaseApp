// Citation for fetch function:
// Date: 5/19/2024
// Copied & Adapted from React-Starter-App
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app
// Authors: Devin Daniels and Zachary Maes


import axios from "axios";
import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import TeamPlayersTable from "./sections/TeamPlayersTable";
import TeamPlayersController from "./sections/TeamPlayersController";

const TeamPlayers = () => {
  const location = useLocation();

  const [status, setStatus] = useState(true);
  const [team, setTeam] = useState(location.state.teamToManage);
  const archived = new Date(team.teamMeet) < new Date();

  // fetch updated team from db backend
  const fetchTeam = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "teams/" + team.teamID;
      const response = await axios.get(URL);
      const updatedTeam = response.data;
      // set time to local time
      const tzoffset = (new Date()).getTimezoneOffset() * 60000;
      const valDate = new Date(updatedTeam.teamMeet);
      updatedTeam.teamMeet = new Date(valDate - tzoffset).toISOString().slice(0, 19);
      setTeam(updatedTeam);
    } catch (error) {
      toast({ description: "Error fetching team from server", status: "error" });
      console.error("Error fetching team:", error);
    }
  };

  return (
    <VStack gap={20} alignItems="center" w="100%">
      <TeamPlayersController 
        status={status} 
        team={team} 
        archived={archived}
        fetchTeam={fetchTeam}
      />
      <TeamPlayersTable 
        team={team} 
        setStatus={setStatus} 
        archived={archived}
        fetchTeam={fetchTeam}/>
    </VStack>
  );
};

export default TeamPlayers;
