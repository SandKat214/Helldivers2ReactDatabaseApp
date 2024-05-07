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
  import { missionTypes } from "../../../utils/mockup";
  import { MdJoinFull } from "react-icons/md";
  
  const MissionTypesTable = () => {
    return (
      <Box
        backgroundColor="background.200"
        maxH="500px"
        overflowY="auto"
        borderRadius="md"
        p={1}
        boxShadow="0px 2px 12px rgba(229, 62, 62, 0.3)"
        w="80%"
      >
        <TableContainer>
          <Table variant="unstyled">
            <Thead>
              <Tr>
                <Th textAlign="center" color="white">
                  Mission Name
                </Th>
                <Th textAlign="center" color="white">
                  Mission Description
                </Th>
                <Th textAlign="center" color="white">
                  Duration (Mins)
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {missionTypes.map((missionType, index) => {
                return (
                  <Tr
                    key={missionType.missionName}
                    color="white"
                    backgroundColor={
                      index % 2 === 0 ? "background.600" : "transparent"
                    }
                    transition="all 0.3s"
                    _hover={{
                      backgroundColor: "#0B111D",
                    }}
                  >
                    <Td textAlign="center">{missionType.missionName}</Td>
                    <Td textAlign="center">{missionType.missionDesc}</Td>
                    <Td textAlign="center">{missionType.missionDuration}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    );
  };
  
  export default MissionTypesTable;
  