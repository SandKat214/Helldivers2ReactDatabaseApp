// Citation for fetch & delete functions:
// Date: 5/19/2024
// Copied & Adapted from React-Starter-App
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app
// Authors: Devin Daniels and Zachary Maes


import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Text,
  Tooltip,
  Tr,
  useToast,
  VStack
} from "@chakra-ui/react";
import axios from "axios";
import { FaTrash } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";

const TeamPlayersTable = ({ 
  archived,
  fetchTeam,
  onOpen,
  setPrevTeamPlayer,
  setStatus,
  team,
}) => {
  const toast = useToast();
  const [teamPlayers, setTeamPlayers] = useState([]);

  // retrieve team players from database
  const fetchTeamPlayers = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "teamPlayers/" + team.teamID;
      const response = await axios.get(URL);
      setTeamPlayers(response.data);
    } catch (error) {
      toast({ description: "Error fetching team players from server.", status: "error" });
      console.error("Error fetching team players:", error);
    }
  };

  // delete team player from database
  const deleteTeamPlayer = async (id) => {
    try {
      const URL = import.meta.env.VITE_API_URL + "teamPlayers/" + id;
      const response = await axios.delete(URL);
      // Ensure that the team player was deleted successfully
      if (response.status === 204) {
        toast({ description: `Player with ID: ${id}, removed from team.`, status: "success" });
        fetchTeam();
      }
    } catch (err) {
      toast({ description: `Failed to remove player with ID: ${id}`, status: "error" });
      console.log(err);
    }
  };

  // sets teamPlayer to team's that is being edited
  const triggerEdit = (teamPlayerToEdit) => {
    setPrevTeamPlayer({
      id: teamPlayerToEdit.teamPlayerID,
      playerID: teamPlayerToEdit.playerID,
    });
    // Open update form
    onOpen();
  };

  useEffect(() => {
    fetchTeamPlayers();
    // registration closed if team full or meet date has passed
    if (team.teamCount >= 4 || archived) {
      setStatus(false);
    } else {
      setStatus(true);
    }
  }, [team]);

  return (
    <VStack w="1300px" gap={5}>
      {archived ?
        <Text color="white" fontSize="large">This campaign has ended...</Text> :
        <Text color="white" fontSize="large">Teams can register up to 4 players...</Text>
      }
      <Box
        backgroundColor="background.200"
        maxH="500px"
        overflowY="auto"
        borderRadius="md"
        p={1}
        boxShadow="0px 2px 12px rgba(229, 62, 62, 0.3)"
        w="65%"
      >
        <Text color="red.500" pt={2} pl={3} textTransform="uppercase" fontWeight="bold" fontSize="md">Recruits:</Text>
        <TableContainer>
          <Table variant="unstyled">
            <Thead>
              <Tr>
                <Th borderColor="transparent" color="white">
                  Profile Photo
                </Th>
                <Th borderColor="transparent" color="white">
                  Name
                </Th>
                <Th borderColor="transparent" color="white">
                  Username
                </Th>
                <Th borderColor="transparent" color="white">
                  Level
                </Th>
                <Th borderColor="transparent" color="white">
                  Age
                </Th>
                {!archived && <Th borderColor="transparent" color="white" textAlign="center">
                  Actions
                </Th>}
              </Tr>
            </Thead>
            <Tbody>
              {teamPlayers.map((teamPlayer, index) => {
                return (
                  <Tr
                    key={teamPlayer.teamPlayerID}
                    color="white"
                    backgroundColor={
                      index % 2 === 0 ? "background.600" : "transparent"
                    }
                    transition="all 0.3s"
                    _hover={{
                      backgroundColor: "#0B111D",
                    }}
                    h={24}
                  >
                    <Td borderColor="transparent">
                      <Avatar
                        src={
                          teamPlayer.playerImage
                            ? teamPlayer.playerImage
                            : "https://www.nikkoindustries.com/cdn/shop/files/Image-Render.000_e98f6660-9faa-47ff-8d91-8df35964c70e_946x946.png?v=1708613784"
                        }
                      />
                    </Td>
                    <Td borderColor="transparent">{teamPlayer.playerName}</Td>
                    <Td borderColor="transparent">{teamPlayer.playerAlias}</Td>
                    <Td borderColor="transparent">{teamPlayer.playerLevel}</Td>
                    <Td borderColor="transparent">{teamPlayer.playerAge}</Td>
                    {!archived && <Td>
                      <HStack justifyContent="center">
                        <Tooltip label="Replace player" placement="top">
                          <IconButton
                            colorScheme="red"
                            color="white"
                            aria-label="Edit button"
                            icon={<MdEdit />}
                            size="sm"
                            onClick={() => triggerEdit(teamPlayer)}
                          />
                        </Tooltip>
                        <Tooltip label="Remove from Team" placement="top">
                          <IconButton
                            colorScheme="red"
                            color="white"
                            aria-label="Delete button"
                            icon={<FaTrash />}
                            size="sm"
                            onClick={() => deleteTeamPlayer(teamPlayer.teamPlayerID)}
                          />
                        </Tooltip>
                      </HStack>
                    </Td>}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </VStack>
  );
};

export default TeamPlayersTable;
