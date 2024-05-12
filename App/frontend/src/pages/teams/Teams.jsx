import { useState } from "react";
import { VStack } from "@chakra-ui/react";
import TeamsTable from "./sections/TeamsTable";
import TeamsAddController from "./sections/TeamsAddController";
import TeamsEditController from "./sections/TeamsEditController";
import LanguagesController from "../languages/sections/LanguagesController";

const Teams = () => {
  const [newLang, setNewLang] = useState(false);
  const [formType, setFormType] = useState("add");
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

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setTeamData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // add team to database
  const handleAdd = () => {
    console.log(teamData);
    console.log("add");
    resetFormFields();
  };

  // edit team from database
  const handleUpdate = () => {
    console.log(teamData);
    console.log("edit");
    resetFormFields();
  };

  const checkNewLang = (e) => {
    // prevent page reload
    e.preventDefault();

    // close form
    setAddTeam(false);
    setUpdateTeam(false);

    // open language form if new language requested
    if (teamData.language === "add") {
      setNewLang(true);
    } else if (formType === "add") {
      handleAdd();
    } else {
      handleUpdate();
    };
  };

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
        checkNewLang={checkNewLang} 
        setForm={setFormType} 
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
        checkNewLang={checkNewLang}
        setForm={setFormType}
        isChat={isChat}
        setIsChat={setIsChat}
      />
      <LanguagesController 
        newLang={newLang} 
        setNewLang={setNewLang}
        setTeamData={setTeamData} 
        formType={formType}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate} 

      />
    </VStack>
  );
};

export default Teams;
