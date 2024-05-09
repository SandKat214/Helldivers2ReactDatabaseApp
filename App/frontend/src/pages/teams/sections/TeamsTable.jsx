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

const TeamsTable = () => {
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
                    <Image w={10} h={10} borderRadius="md" />
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
                    {team["18Up"] ? "true" : "false"}
                  </Td>
                  <Td borderColor="transparent">
                    {team.chat ? "true" : "false"}
                  </Td>
                  <Td borderColor="transparent">{team.count}</Td>
                  <Td borderColor="transparent">{team.planetID}</Td>
                  <Td borderColor="transparent">{team.missionID}</Td>
                  <Td borderColor="transparent">{team.langID ?? "n/a"}</Td>
                  <Td borderColor="transparent">
                    <HStack>
                      <Tooltip label="Edit team" placement="top">
                        <IconButton
                          colorScheme="red"
                          color="white"
                          aria-label="Delete button"
                          icon={<MdEdit />}
                          size="sm"
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
