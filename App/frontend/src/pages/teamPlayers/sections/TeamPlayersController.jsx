// Citation for fetch, & create functions:
// Date: 5/21/2024
// Copied & Adapted from React-Starter-App
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app
// Authors: Devin Daniels and Zachary Maes


import {
  Center,
  HStack,
  Icon,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  ModalFooter,
  Button,
  Select,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaAnglesUp } from "react-icons/fa6";
import { IoSave } from "react-icons/io5";

const ControllerButton = ({ icon, label, onClick }) => {
  return (
    <VStack color="white" cursor="pointer">
      <Icon as={icon} onClick={onClick} />
      <Text fontSize="xs">{label}</Text>
    </VStack>
  );
};

const TeamPlayersController = ({ status, team, fetchTeam }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();

  const [availPlayers, setAvailPlayers] = useState([]);
  const [player, setPlayer] = useState("");

  // fetch available players from db backend
  const fetchAvailPlayers = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "teamPlayers/availPlayers/" + team.teamID;
      const response = await axios.get(URL);
      setAvailPlayers(response.data);
    } catch (error) {
      toast({ description: "Error fetching available players", status: "error" });
      console.error("Error fetching available players:", error);
    }
  };

  // fetch available adult players from db backend
  const fetchAdultPlayers = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "teamPlayers/adultPlayers/" + team.teamID;
      const response = await axios.get(URL);
      setAvailPlayers(response.data);
    } catch (error) {
      toast({ description: "Error fetching available players", status: "error" });
      console.error("Error fetching available adult players:", error);
    }
  };

  useEffect(() => {
    // if adult players only
    if (team.team18Up === 1) {
      fetchAdultPlayers();
    } else {
      fetchAvailPlayers();
    };
  }, [team]);


  const handleSubmit = async (e) => {
    // Prevent page reload & close modal
    e.preventDefault();
    onClose();
    // Create team player object
    const teamPlayer = {
      teamID: team.teamID,
      playerID: player,
    };
    try {
      const URL = import.meta.env.VITE_API_URL + "teamPlayers";
      const response = await axios.post(URL, teamPlayer);
      if (response.status !== 201) {
        console.log(response.status);
        toast({ description: "Error saving submission", status: "error" });
      } else {
        toast({ description: "Submission saved", status: "success" });
        fetchTeam();
      };
    } catch (err) {
      toast({ description: "Error creating team player", status: "error" });
      console.log("Error creating team player:", err);
    };
    // Reset the form fields
    setPlayer("");
  };

  return (
    <VStack gap={20}>
      <Heading as="h3" color="white" fontSize="3xl">
        <Text as="span" color="red.500">
          {team.teamTitle + " "}
        </Text>
        on{" "}
        <Text as="span" color="red.500">
          {team.teamMeet.slice(0, 10)}
        </Text>{" "}
        at{" "}
        <Text as="span" color="red.500">
          {team.teamMeet.slice(11, 16)}{" "}
          {team.teamMeet.slice(11, 13) > 11 ? "PM" : "AM"}
        </Text>
      </Heading>
      <Text color="white" fontSize="x-large">
        This team is currently{" "}
        <Text as="span" color="red.500">
          {status ? "open" : "closed"}{" "}
          {status ? "open" : "closed"}{" "}
        </Text>
        for registration.
      </Text>
      <HStack justifyContent="center">
        <HStack
          backgroundColor="red.500"
          px={8}
          py={2}
          borderRadius="full"
          gap={5}
          boxShadow="red"
        >
          {status && (
            <ControllerButton
              icon={FaPlus}
              label="Add"
              onClick={() => onOpen()}
            />
          )}
          <ControllerButton
            icon={FaAnglesUp}
            label="Back"
            onClick={() => navigate("../teams")}
          />
        </HStack>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent backgroundColor="background.300" w="1000px">
            <ModalHeader>
              <Heading as="h3" color="white" fontSize="2xl">
                Add{" "}
                <Text as="span" color="red.500">
                  Recruit
                </Text>
              </Heading>
            </ModalHeader>
            <form onSubmit={handleSubmit}>
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <VStack gap={4}>
                  <FormControl color="white">
                    <FormLabel>Username</FormLabel>
                    <Select
                      type="text"
                      variant="filled"
                      color="background.700"
                      placeholder="Choose..."
                      onChange={(e) => setPlayer(e.target.value)}
                      _focus={{ backgroundColor: "white" }}
                    >
                      {availPlayers.map((player) => {
                        return (
                          <option
                            key={player.playerID}
                            value={player.playerID}
                          >
                            {player.playerAlias}
                          </option>
                        );
                      })}
                    </Select>
                    <FormHelperText color="gray.400">
                      Choose available recruit.
                    </FormHelperText>
                  </FormControl>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" colorScheme="red" rightIcon={<IoSave />}>
                  Save
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </HStack>
    </VStack>
  );
};

export default TeamPlayersController;
