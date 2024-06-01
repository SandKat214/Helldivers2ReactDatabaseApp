// Citation for fetch, add, & update functions:
// Date: 5/19/2024
// Copied & Adapted from React-Starter-App
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app
// Authors: Devin Daniels and Zachary Maes


import { useState, useEffect } from "react";
import { useToast, VStack, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import TeamsTable from "./sections/TeamsTable";
import TeamsController from "./sections/TeamsController";

const Teams = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [prevImage, setPrevImage] = useState(null);
  const [teams, setTeams] = useState([]);
  const [missions, setMissions] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [isChat, setIsChat] = useState(true);
  const [teamData, setTeamData] = useState({
    id: null,
    title: "",
    meet: "",
    difficulty: "",
    team18Up: "",
    chat: "",
    image: null,
    mission: "",
    planet: "",
    language: null
  });

  // retrieve teams from database
  const fetchTeams = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "teams";
      const response = await axios.get(URL);
      const teams = response.data;
      // set time to local time
      const tzoffset = (new Date()).getTimezoneOffset() * 60000;
      for (const team of teams) {
        const valDate = new Date(team.teamMeet);
        team.teamMeet = new Date(valDate - tzoffset).toISOString().slice(0, 19);
      };
      setTeams(teams);
    } catch (error) {
      toast({ description: "Error fetching teams from server", status: "error" });
      console.error("Error fetching teams:", error);
    }
  };

  // retrieve missions from database for drop-downs
  const fetchMissions = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "mission-types";
      const response = await axios.get(URL);
      setMissions(response.data);
    } catch (error) {
      toast({ description: "Error fetching missions from server", status: "error" });
      console.error("Error fetching missions:", error);
    }
  };

  // retrieve planets from database for drop-downs
  const fetchPlanets = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "planets";
      const response = await axios.get(URL);
      setPlanets(response.data);
    } catch (error) {
      toast({ description: "Error fetching planets from server", status: "error" });
      console.error("Error fetching planets:", error);
    }
  };

  // retrieve languages from database for drop-downs
  const fetchLanguages = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "languages";
      const response = await axios.get(URL);
      setLanguages(response.data);
    } catch (error) {
      toast({ description: "Error fetching languages from server", status: "error" });
      console.error("Error fetching languages:", error);
    }
  };

  // automatic load on first render
  useEffect(() => {
    fetchTeams();
    fetchMissions();
    fetchPlanets();
    fetchLanguages();
  }, []);

  return (
    <VStack gap={20} alignItems="stretch" w="100%">
      <TeamsController
        fetchTeams={fetchTeams}
        isChat={isChat}
        isOpen={isOpen}
        languages={languages}
        missions={missions}
        onClose={onClose}
        onOpen={onOpen}
        planets={planets}
        prevImage={prevImage}
        setIsChat={setIsChat}
        setTeamData={setTeamData}
        teamData={teamData}
      />
      <TeamsTable 
        onOpen={onOpen}
        setIsChat={setIsChat}
        setPrevImage={setPrevImage}
        setPrevTeam={setTeamData}
        teams={teams}
      />
    </VStack>
  );
};

export default Teams;
