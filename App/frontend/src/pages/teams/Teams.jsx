import { useState } from "react";
import { VStack } from "@chakra-ui/react";
import TeamsTable from "./sections/TeamsTable";
import TeamsAddController from "./sections/TeamsAddController";
import TeamsEditController from "./sections/TeamsEditController";

const Teams = () => {
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
    mission: "",
    planet: "",
    language: null
  });

  // keep track of new form data
  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setTeamData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(teamData);
  };

  // add team to database
  const handleAdd = (e) => {
    // prevent page reload
    e.preventDefault();

    // close form
    setAddTeam(false);
    
    // will add async team creation
    console.log(teamData);
    console.log("add");
    resetFormFields();
  };

  // edit team from database
  const handleUpdate = (e) => {
    // prevent page reload
    e.preventDefault();

    // close form
    setUpdateTeam(false);

    // will add async update based on id
    console.log(teamData);
    console.log("edit");
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
    console.log("reset");
  };

  return (
    <VStack gap={20} alignItems="stretch" w="100%">
      <TeamsAddController 
        addTeam={addTeam} 
        setAddTeam={setAddTeam} 
        handleChange={handleDataChange}
        isChat={isChat}
        setIsChat={setIsChat}
        handleSubmit={handleAdd} 
      />
      <TeamsTable 
        setUpdateTeam={setUpdateTeam} 
        setPrevTeam={setTeamData}
        setIsChat={setIsChat} 
      />
      <TeamsEditController 
        prevTeam={teamData} 
        updateTeam={updateTeam} 
        setUpdateTeam={setUpdateTeam} 
        handleChange={handleDataChange}
        isChat={isChat}
        setIsChat={setIsChat}
        handleSubmit={handleUpdate}
      />
    </VStack>
  );
};

export default Teams;
