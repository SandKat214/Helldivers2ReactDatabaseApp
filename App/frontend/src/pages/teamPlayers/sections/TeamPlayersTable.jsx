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
  VStack
} from "@chakra-ui/react";
import { teamPlayers, players } from "../../../utils/mockup";
import { FaTrash } from "react-icons/fa6";
import { useEffect, useState } from "react";

const TeamPlayersTable = ({ team, status, setStatus }) => {
  const [teamMembers, setTeamMembers] = useState([]);

  const fetchTeamPlayers = () => {
    // this will be an async function to gets data from the BE,
    // for now it sorts the info from the mockup.
    const teamObjs = teamPlayers.filter((teamPlayer) => teamPlayer.teamID === parseInt(team.teamID));
    const idArray = teamObjs.map((id) => id.playerID);
    setTeamMembers(players.filter((player) => idArray.includes(player.playerID)));
  }

  useEffect(() => {
    fetchTeamPlayers();
    console.log(team);
    if (team.teamCount >= 4) {
      setStatus(false);
    };
    console.log(status);
  }, []);

  return (
    <VStack w="1300px" gap={5}>
      <Text color="white" fontSize="large">Teams can register up to 4 players...</Text>
      <Box
        backgroundColor="background.200"
        maxH="500px"
        overflowY="auto"
        borderRadius="md"
        p={1}
        boxShadow="0px 2px 12px rgba(229, 62, 62, 0.3)"
        w="65%"
      >
        <Text color="red.500" pt={2} pl={3} textTransform="uppercase" fontWeight="bold" fontSize="md">Current recruits:</Text>
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
                <Th borderColor="transparent" color="white" textAlign="center">
                  Actions
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {teamMembers.map((teamPlayer, index) => {
                return (
                  <Tr
                    key={teamPlayer.playerID}
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
                      <Avatar src="https://www.nikkoindustries.com/cdn/shop/files/Image-Render.000_e98f6660-9faa-47ff-8d91-8df35964c70e_946x946.png?v=1708613784" />
                    </Td>
                    <Td borderColor="transparent">{teamPlayer.name}</Td>
                    <Td borderColor="transparent">{teamPlayer.username}</Td>
                    <Td borderColor="transparent">{teamPlayer.level}</Td>
                    <Td borderColor="transparent">{teamPlayer.age}</Td>
                    <Td>
                      <HStack justifyContent="center">
                        <Tooltip label="Remove from Team" placement="top">
                          <IconButton
                            colorScheme="red"
                            color="white"
                            aria-label="Delete button"
                            icon={<FaTrash />}
                            size="sm"
                          />
                        </Tooltip>
                      </HStack>
                    </Td>
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
