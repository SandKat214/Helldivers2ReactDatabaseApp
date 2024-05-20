// Citation for fetch, add, & update functions:
// Date: 5/19/2024
// Copied & Adapted from React-Starter-App
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app
// Authors: Devin Daniels and Zachary Maes


import { useState, useEffect } from "react";
import { useToast, VStack } from "@chakra-ui/react";
import axios from "axios";
import TeamsTable from "./sections/TeamsTable";
import TeamsAddController from "./sections/TeamsAddController";
import TeamsEditController from "./sections/TeamsEditController";

const Teams = () => {
  const toast = useToast();

  const [teams, setTeams] = useState([]);
  const [missions, setMissions] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [updateTeam, setUpdateTeam] = useState(false);
  const [addTeam, setAddTeam] = useState(false);
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
      alert("Error fetching teams from the server.");
      console.error("Error fetching teams:", error);
    }
  };

  // // retrieve missions from database for drop-downs
  // const fetchMissions = async () => {
  //   try {
  //     const URL = import.meta.env.VITE_API_URL + "";
  //     const response = await axios.get(URL);
  //     setMissions(response.data);
  //   } catch (error) {
  //     alert("Error fetching missions from the server.");
  //     console.error("Error fetching missions:", error);
  //   }
  // };

  // // retrieve planets from database for drop-downs
  // const fetchPlanets = async () => {
  //   try {
  //     const URL = import.meta.env.VITE_API_URL + "";
  //     const response = await axios.get(URL);
  //     setPlanets(response.data);
  //   } catch (error) {
  //     alert("Error fetching planets from the server.");
  //     console.error("Error fetching planets:", error);
  //   }
  // };

  // retrieve languages from database for drop-downs
  const fetchLanguages = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "languages";
      const response = await axios.get(URL);
      setLanguages(response.data);
    } catch (error) {
      alert("Error fetching languages from the server.");
      console.error("Error fetching languages:", error);
    }
  };

  // keep track of new form data
  const handleDataChange = (e) => {
    let { name, value } = e.target;
    // date type to correct format
    if (name === "meet") {
      const tzoffset = (new Date()).getTimezoneOffset() * 60000;     //offset in milliseconds
      const valDate = new Date(value);
      value = new Date(valDate - tzoffset).toISOString().slice(0, 19);
    };
    setTeamData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // close/open language input based on chat boolean
  const handleChatChange = (e) => {
    setIsChat(e.target.value === "0" ? false : true);
    handleDataChange(e);
  };

  // Add team to database
  const handleAdd = async (e) => {
    // Prevent page reload & close modal
    e.preventDefault();
    setAddTeam(false);
    // Create a new team object from the teamData
    const newTeam = {
      teamTitle: teamData.title,
      teamMeet: teamData.meet,
      teamDifficulty: teamData.difficulty,
      team18Up: teamData.team18Up,
      teamChat: teamData.chat,
      teamImage: teamData.image,
      missionID: teamData.mission,
      planetID: teamData.planet,
      langID: teamData.language,
      teamID: teamData.id
    };
    try {
      const URL = import.meta.env.VITE_API_URL + "teams";
      const response = await axios.post(URL, newTeam);
      if (response.status === 201) {
        toast({ description: "Submission saved", status: "success" });
        fetchTeams();
      } else {
        toast({ description: "Error saving submission", status: "error" });
      };
    } catch (error) {
      alert("Error creating team");
      console.error("Error creating team:", error);
    };
    // Reset the form fields
    resetFormFields();
  };

  // update team in database
  const handleUpdate = async (e) => {
    // Prevent page reload & close modal
    e.preventDefault();
    setUpdateTeam(false);
    // Create a revised team object from the teamData
    const revisedTeam = {
      teamTitle: teamData.title,
      teamMeet: teamData.meet,
      teamDifficulty: teamData.difficulty,
      team18Up: teamData.team18Up,
      teamChat: teamData.chat,
      teamImage: teamData.image,
      missionID: teamData.mission,
      planetID: teamData.planet,
      langID: teamData.language
    };
    try {
      const URL = import.meta.env.VITE_API_URL + "teams/" + teamData.id;
      const response = await axios.put(URL, revisedTeam);
      if (response.status !== 200) {
        toast({ description: "Error saving submission", status: "error" });
      } else {
        toast({ description: "Submission saved", status: "success" });
        fetchTeams();
      };
    } catch (err) {
      console.log("Error updating person:", err);
    };
    // Reset the form fields
    resetFormFields();
  };

  // reset teamData to empty fields
  const resetFormFields = () => {
    setTeamData({
      id: null,
      title: "",
      meet: "",
      difficulty: "",
      team18Up: "",
      chat: "",
      mission: "",
      planet: "",
      language: null
    });
  };

  // automatic load on first render
  useEffect(() => {
    fetchTeams();
    // fetchMissions();
    // fetchPlanets();
    fetchLanguages();
  }, []);

  return (
    <VStack gap={20} alignItems="stretch" w="100%">
      <TeamsAddController
        addTeam={addTeam}
        setAddTeam={setAddTeam}
        isChat={isChat}
        handleChatChange={handleChatChange}
        handleChange={handleDataChange}
        handleSubmit={handleAdd}
        missions={missions}
        planets={planets}
        languages={languages}
      />
      <TeamsTable
        teams={teams}
        setUpdateTeam={setUpdateTeam}
        setPrevTeam={setTeamData}
        setIsChat={setIsChat}
      />
      <TeamsEditController
        prevTeam={teamData}
        updateTeam={updateTeam}
        setUpdateTeam={setUpdateTeam}
        isChat={isChat}
        handleChatChange={handleChatChange}
        handleChange={handleDataChange}
        handleSubmit={handleUpdate}
        missions={missions}
        planets={planets}
        languages={languages}
      />
    </VStack>
  );
};

export default Teams;
