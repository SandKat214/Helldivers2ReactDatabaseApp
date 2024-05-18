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
    let { name, value } = e.target;
    // format date type to correct SQL datetime format
    if (name === "meet") {
      const tzoffset = (new Date()).getTimezoneOffset() * 60000;     //offset in milliseconds
      const valDate = new Date(value);
      value = new Date(valDate - tzoffset).toISOString().slice(0, 19).replace("T", " ");
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

  // add team to database
  const handleAdd = (e) => {
    e.preventDefault();
    console.log(teamData);
    setAddTeam(false);
    // will add async team creation
    resetFormFields();
  };

  // edit team from database
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(teamData);
    setUpdateTeam(false);
    // will add async update based on id
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
        isChat={isChat}
        handleChatChange={handleChatChange}
        handleChange={handleDataChange}
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
        isChat={isChat}
        handleChatChange={handleChatChange}
        handleChange={handleDataChange}
        handleSubmit={handleUpdate}
      />
    </VStack>
  );
};

export default Teams;
