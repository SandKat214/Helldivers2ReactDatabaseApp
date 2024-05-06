import {
  Box,
  HStack,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { teamsTable } from "../../../utils/mockup";
import { MdJoinFull } from "react-icons/md";

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
        <Table variant="unstyled" w="100%">
          <Thead>
            <Tr>
              <Th color="white">Team Title</Th>
              <Th color="white">Meeting Time</Th>
              <Th color="white">18+</Th>
              <Th color="white">Chat Friendly</Th>
              <Th color="white">Member Count</Th>
              <Th color="white">Planet</Th>
              <Th color="white">Mission Type</Th>
              <Th color="white">Language</Th>
              <Th color="white">Actions</Th>
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
                >
                  <Td>{team.teamTitle}</Td>
                  <Td>{team.teamMeet.slice(0, team.teamMeet.length - 3)}</Td>
                  <Td>{team["18Up"] ? "true" : "false"}</Td>
                  <Td>{team.chat ? "true" : "false"}</Td>
                  <Td>{team.count}</Td>
                  <Td>{team.planetID}</Td>
                  <Td>{team.missionID}</Td>
                  <Td>{team.langID ?? "n/a"}</Td>
                  <Td>
                    <HStack>
                      <Tooltip label="Join team" placement="top">
                        <IconButton
                          icon={<MdJoinFull />}
                          backgroundColor="red.500"
                          color="white"
                          _hover={{ backgroundColor: "red.700" }}
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
