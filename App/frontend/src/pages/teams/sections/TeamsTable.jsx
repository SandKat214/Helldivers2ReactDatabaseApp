import {
  Avatar,
  Box,
  HStack,
  Icon,
  IconButton,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { MdJoinFull, MdEdit, MdAlarmOn } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { FaCalendar, FaClock } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const TeamsTable = ({ onOpen, setIsChat, setPrevImage, setPrevTeam, teams }) => {
  const navigate = useNavigate();
  const toast = useToast();
  
  // sets formData to team's that is being edited
  const triggerEdit = (teamToEdit) => {
    setPrevTeam({
      id: teamToEdit.teamID,
      title: teamToEdit.teamTitle,
      meet: teamToEdit.teamMeet,
      difficulty: teamToEdit.teamDifficulty,
      team18Up: teamToEdit.team18Up,
      chat: teamToEdit.teamChat,
      image: teamToEdit.teamImage,
      mission: teamToEdit.missionID,
      planet: teamToEdit.planetID,
      language: teamToEdit.langID
    });
    setPrevImage(teamToEdit.teamImage);
    // open/close language input based on chat boolean
    setIsChat(teamToEdit.teamChat === 1 ? true : false);
    // Open update form
    onOpen();
  };

  const handleJoin = (teamToManage) => {
    navigate("../register/" + teamToManage.teamID, { state: {teamToManage} });
  }

  return (
    <Box
      backgroundColor="background.200"
      w="100%"
      maxH="500px"
      overflowY="auto"
      borderRadius="md"
      p={1}
      boxShadow="0px 2px 12px rgba(229, 62, 62, 0.3)"
    >
      <TableContainer w="100%">
        <Table>
          <Thead>
            <Tr>
              <Th borderColor="transparent" color="white">
                <Text>Team</Text>
                <Text>Photo</Text>
              </Th>
              <Th borderColor="transparent" color="white">
                Team Title
              </Th>
              <Th borderColor="transparent" color="white">
                Meeting Time
              </Th>
              <Th color="white" borderColor="transparent">
                <Text>Difficulty</Text>
                <Text>Setting</Text>
              </Th>
              <Th borderColor="transparent" color="white">
                18+
              </Th>
              <Th borderColor="transparent" color="white">
                <Text>Chat</Text>
                <Text>Friendly</Text>
              </Th>
              <Th borderColor="transparent" color="white">
                Planet
              </Th>
              <Th borderColor="transparent" color="white">
                <Text>Mission</Text>
                <Text>Type</Text>
              </Th>
              <Th borderColor="transparent" color="white">
                Language
              </Th>
              <Th borderColor="transparent" color="white" textAlign="center">
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {teams.map((team, index) => {
              return (
                <Tr
                  key={team.teamID}
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
                        team.teamImage
                          ? team.teamImage
                          : "https://avatars.githubusercontent.com/u/424443?v=4"
                      }
                    />
                  </Td>
                  <Td borderColor="transparent">
                    <Text w="10ch" whiteSpace="normal">
                      {team.teamTitle}
                    </Text>
                  </Td>
                  <Td borderColor="transparent">
                    <VStack alignItems="stretch">
                      <HStack>
                        <Icon as={FaCalendar} color="red.500" />
                        <Text>{team.teamMeet.slice(0, 10)}</Text>
                      </HStack>
                      <HStack>
                        <Icon as={FaClock} color="red.500" />
                        <Text>
                          {team.teamMeet.slice(11, 16)}{" "}
                          {team.teamMeet.slice(11, 13) > 11 ? "PM" : "AM"}
                        </Text>
                      </HStack>
                    </VStack>
                  </Td>
                  <Td borderColor="transparent" textAlign="center">{team.teamDifficulty}</Td>
                  <Td borderColor="transparent">
                    {team.team18Up === 1 ? "True" : "False"}
                  </Td>
                  <Td borderColor="transparent">
                    {team.teamChat === 1 ? "True" : "False"}
                  </Td>
                  <Td borderColor="transparent">
                    <Text w="8ch" whiteSpace="normal">
                      {team.planetName}
                    </Text>
                  </Td>
                  <Td borderColor="transparent">
                    <Text w="10ch" whiteSpace="normal">
                      {team.missionName}
                    </Text>
                  </Td>
                  <Td borderColor="transparent">{team.langName ?? "n/a"}</Td>
                  <Td borderColor="transparent" alignContent="center">
                    <HStack>
                      {new Date(team.teamMeet) < new Date() ?
                        <Tooltip label="Archived team" placement="top">
                          <span>
                            <Icon as={MdAlarmOn} 
                              colorScheme="red" 
                              color="red.500"
                              boxSize="1.95em"
                              onClick={() => toast({ 
                                description: "Campaign has ended. Click view to see who participated.", 
                                status: "error" 
                              })}
                            />
                          </span>
                        </Tooltip> :
                        <Tooltip label="Edit team" placement="top">
                          <IconButton
                            colorScheme="red"
                            color="white"
                            aria-label="Edit button"
                            icon={<MdEdit />}
                            size="sm"
                            onClick={() => triggerEdit(team)}
                          />
                        </Tooltip>
                      }
                      {new Date(team.teamMeet) < new Date() ?
                        <Tooltip label="View team" placement="top">
                          <IconButton
                            icon={<GrView />}
                            colorScheme="red"
                            backgroundColor="red.500"
                            color="white"
                            size="sm"
                            onClick={() => handleJoin(team)}
                          />
                        </Tooltip> :
                        <Tooltip label="Manage team" placement="top">
                          <IconButton
                            icon={<MdJoinFull />}
                            colorScheme="red"
                            backgroundColor="red.500"
                            color="white"
                            size="sm"
                            onClick={() => handleJoin(team)}
                          />
                        </Tooltip>
                      }
                    </HStack>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TeamsTable;
