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
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  ModalCloseButton,
  ModalFooter,
  Button,
  Select,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaAnglesUp } from "react-icons/fa6";
import { IoSave } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

const ControllerButton = ({ icon, label, onClick }) => {
  return (
    <VStack color="white" cursor="pointer" onClick={onClick}>
      <Icon as={icon} />
      <Text fontSize="xs">{label}</Text>
    </VStack>
  );
};

const TeamPlayersController = ({ 
  archived,
  fetchTeam,
  isOpen,
  onClose,
  onOpen,
  setTeamPlayer,
  status, 
  team,
  teamPlayer,
}) => {
  const navigate = useNavigate();
  const toast = useToast();

  const [availPlayers, setAvailPlayers] = useState([]);
  const [isEdited, setIsEdited] = useState(false);

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

  const handleEdit = () => {
    if (!isEdited) {
      setIsEdited(true);
    };
  };

  const handleSubmit = async (e) => {
    // Prevent page reload & close modal
    e.preventDefault();

    // Create team player object
    const newTeamPlayer = {
      teamID: team.teamID,
      playerID: teamPlayer.playerID,
    };
    if (!teamPlayer.id) {
      // create team player
      try {
        const URL = import.meta.env.VITE_API_URL + "teamPlayers";
        const response = await axios.post(URL, newTeamPlayer);
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
      } finally {
        onClose();
      };
    } else {
      // update team player
      try {
        const URL = import.meta.env.VITE_API_URL + "teamPlayers/" + teamPlayer.id;
        const response = await axios.put(URL, newTeamPlayer);
        if (response.status !== 200) {
          console.log(response.status);
          toast({ description: "Error saving submission", status: "error" });
        } else {
          toast({ description: "Submission saved", status: "success" });
          fetchTeam();
        };
      } catch (err) {
        toast({ description: "Error updating team player", status: "error" });
        console.error("Error updating team player:", err);
      } finally {
        onClose();
      };
    }
    // Reset states
    resetFormFields();
    setIsEdited(false);
  };

  // reset prevTeamPlayer to empty fields
  const resetFormFields = () => {
    setTeamPlayer({
      id: null,
      playerID: "",
    });
  };

  useEffect(() => {
    // if adult players only
    if (team.team18Up === 1) {
      fetchAdultPlayers();
    } else {
      fetchAvailPlayers();
    };
  }, [team]);

  return (
    <VStack gap={10}>
      <Heading as="h3" color="red.500" fontSize="3xl">
        {team.teamTitle + " "}
        <Text as="span" color="white" fontSize="2xl">on{" "}</Text>
        {(new Date(team.teamMeet)).toLocaleDateString() + " "}
        <Text as="span" color="white" fontSize="2xl">at{" "}</Text>
        {(new Date(team.teamMeet)).toLocaleTimeString() + " "}
      </Heading>
      <Text color="white" fontSize="x-large" textAlign="center">
        This team is{" "}
        {archived ? 
        <Text as="span" color="red.500">archived.</Text> : 
        <Text as="span"> 
          currently{" "}
          <Text as="span" color="red.500">
          {status ? "open" : "closed"}{" "}
          </Text>
          to additional recruits.
        </Text>
        }
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
        <Modal 
          isOpen={isOpen} 
          onClose={() => {
            if (isEdited) {
              if (
                window.confirm(
                  "You have unsaved changes, are you sure you want to leave?"
                )
              ) {
                resetFormFields();
                setIsEdited(false);
                onClose();
              }
            } else {
              resetFormFields();
              setIsEdited(false);
              onClose();
            }
          }}
        >
          <ModalOverlay />
          <ModalContent backgroundColor="background.300" w="1000px">
            <ModalHeader>
              <Heading as="h3" color="white" fontSize="2xl">
                {teamPlayer.id ? "Replace" : "Add"}{" "}
                <Text as="span" color="red.500">
                  Recruit
                </Text>
                <ModalCloseButton color="red.500" />
              </Heading>
            </ModalHeader>
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
                      onChange={(e) => {
                        handleEdit();
                        setTeamPlayer((prevData) => ({
                          ...prevData,
                          playerID: e.target.value,
                        }));
                      }}
                      _focus={{ backgroundColor: "white" }}
                      isRequired
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
                <Button 
                  type="submit"
                  colorScheme="red" 
                  rightIcon={teamPlayer.id ? <MdEdit /> : <IoSave />}>
                  {teamPlayer.id ? "Edit" : "Save"}
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
