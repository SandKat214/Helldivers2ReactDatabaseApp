import {
  Box,
  HStack,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const MissionTypesTable = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <HStack justifyContent="center">
        <Spinner color="red.500" size="xl" />
      </HStack>
    );
  }

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
            {data.map((missionType, index) => {
              return (
                <Tr
                  key={index}
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
