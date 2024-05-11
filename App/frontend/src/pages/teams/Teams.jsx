import { useState } from "react";
import { VStack } from "@chakra-ui/react";
import TeamsTable from "./sections/TeamsTable";
import TeamsAddController from "./sections/TeamsAddController";
import TeamsEditController from "./sections/TeamsEditController";

const Teams = () => {
  const [newLang, setNewLang] = useState(false);
  const [updateTeam, setUpdateTeam] = useState(false);
  const [teamData, setTeamData] = useState({
    title: "",
    meet: "",
    difficulty: "",
    team18Up: "",
    chat: "",
    mission: "",
    planet: "",
    language: null
  });

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setTeamData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(teamData);
  };

  return (
    <VStack gap={20} alignItems="stretch" w="100%">
      <TeamsAddController handleChange={handleDataChange} />
      <TeamsTable setUpdateTeam={setUpdateTeam} setPrevTeam={setTeamData} />
      <TeamsEditController prevTeam={teamData} updateTeam={updateTeam} setUpdateTeam={setUpdateTeam} handleChange={handleDataChange} />
    </VStack>
  );
};

export default Teams;
