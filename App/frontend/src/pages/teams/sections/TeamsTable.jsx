import {
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
  VStack,
} from "@chakra-ui/react";
import { teamsTable } from "../../../utils/mockup";
import { MdJoinFull, MdEdit } from "react-icons/md";
import { FaCalendar, FaClock } from "react-icons/fa6";

const TeamsTable = ({ setUpdateTeam, setPrevTeam, setIsChat }) => {
  
  // sets formData to team's that is being edited
  const triggerEdit = (teamToEdit) => {
    setPrevTeam({
      id: teamToEdit.teamID,
      title: teamToEdit.teamTitle,
      meet: teamToEdit.teamMeet,
      difficulty: teamToEdit.teamDifficulty,
      team18Up: teamToEdit.team18Up,
      chat: teamToEdit.teamChat,
      mission: teamToEdit.missionID,
      planet: teamToEdit.planetID,
      language: teamToEdit.langID
    });

    // open/close language input based on chat boolean
    setIsChat(teamToEdit.teamChat === 1 ? true : false);

    // Open update form
    setUpdateTeam(true);
  };

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
              <Th borderColor="transparent" color="white">
                18+
              </Th>
              <Th borderColor="transparent" color="white">
                <Text>Chat</Text>
                <Text>Friendly</Text>
              </Th>
              <Th color="white" borderColor="transparent">
                <Text>Member</Text>
                <Text>Count</Text>
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
              <Th borderColor="transparent" color="white">
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {teamsTable.map((team, index) => {
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
                    <Image
                      w={10}
                      h={10}
                      borderRadius="md"
                      src={
                        team.teamPhoto ??
                        "https://avatars.githubusercontent.com/u/424443?v=4"
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
                          {team.teamMeet.slice(10, team.teamMeet.length - 3)}{" "}
                          {team.teamMeet.slice(10, 13) > 11 ? "PM" : "AM"}
                        </Text>
                      </HStack>
                    </VStack>
                  </Td>
                  <Td borderColor="transparent">
                    {team.team18Up === 1 ? "True" : "False"}
                  </Td>
                  <Td borderColor="transparent">
                    {team.teamChat === 1 ? "True" : "False"}
                  </Td>
                  <Td borderColor="transparent">{team.teamCount}</Td>
                  <Td borderColor="transparent">{team.planetName}</Td>
                  <Td borderColor="transparent">{team.missionName}</Td>
                  <Td borderColor="transparent">{team.langName ?? "n/a"}</Td>
                  <Td borderColor="transparent">
                    <HStack>
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
                      <Tooltip label="Join team" placement="top">
                        <IconButton
                          icon={<MdJoinFull />}
                          colorScheme="red"
                          backgroundColor="red.500"
                          color="white"
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
  );
};

export default TeamsTable;
