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

const TeamPlayersController = ({ status, team, setTeam }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const [availPlayers, setAvailPlayers] = useState([]);

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
      alert("Error fetching team from the server.");
      console.error("Error fetching team:", error);
    }
  };

  // fetch available players from db backend
  const fetchAvailPlayers = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "teamPlayers/availPlayers/" + team.teamID;
      const response = await axios.get(URL);
      setAvailPlayers(response.data);
    } catch (error) {
      alert("Error fetching available players from the server.");
      console.error("Error fetching available players:", error);
    }
  };

  useEffect(() => {
    fetchAvailPlayers();
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    // will add async teamPlayer creation
    fetchTeam();      // update team
    onClose();
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
        </Text>
        {" "}at{" "}
        <Text as="span" color="red.500">
          {team.teamMeet.slice(11, 16)}{" "}
          {team.teamMeet.slice(10, 13) > 11 ? "PM" : "AM"}
        </Text>
      </Heading>
      <Text color="white" fontSize="x-large">
        This team is currently{" "}
        <Text as="span" color="red.500">
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
          boxShadow="0px 2px 12px rgba(229, 62, 62, 1)"
        >
          {status && <ControllerButton icon={FaPlus} label="Add" onClick={() => onOpen()} />}
          <ControllerButton icon={FaAnglesUp} label="Back" onClick={() => navigate("../teams")} />
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
              <ModalBody>
                <VStack gap={4}>
                  <FormControl color="white">
                    <FormLabel>Username</FormLabel>
                    <Select
                      type="text"
                      variant="filled"
                      color="background.700"
                      placeholder="Choose..."
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
