// Citation for fetchLanguages() function:
// Date: 5/17/2024
// Copied & Adapted from React-Starter-App
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app
// Authors: Devin Daniels and Zachary Maes

import { VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import LanguagesTable from "./sections/LanguagesTable";
import LanguagesController from "./sections/LanguagesController";

const Languages = () => {

  const [languages, setLanguages] = useState([]);

  // retrieve languages from database
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

  // automatic load on first render
  useEffect(() => {
    fetchLanguages();
  }, []);

  return (
    <VStack gap={20} alignItems="center" w="100%">
      <LanguagesController fetchLanguages={fetchLanguages} />
      <LanguagesTable languages={languages} />
    </VStack>
  );
};

export default Languages;
