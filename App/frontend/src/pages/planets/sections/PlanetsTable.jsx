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
import { planets } from "../../../utils/mockup";
import { MdJoinFull } from "react-icons/md";

const PlanetsTable = () => {
  return (
    <Box
      backgroundColor="background.200"
      maxH="500px"
      overflowY="auto"
      borderRadius="md"
      p={1}
      boxShadow="0px 2px 12px rgba(229, 62, 62, 0.3)"
      w="50%"
    >
      <TableContainer>
        <Table variant="unstyled">
          <Thead>
            <Tr>
              <Th textAlign="center" color="white">
                Planet Name
              </Th>
              <Th textAlign="center" color="white">
                Terrain
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {planets.map((planet, index) => {
              return (
                <Tr
                  key={planet.planetName}
                  color="white"
                  backgroundColor={
                    index % 2 === 0 ? "background.600" : "transparent"
                  }
                  transition="all 0.3s"
                  _hover={{
                    backgroundColor: "#0B111D",
                  }}
                >
                  <Td textAlign="center">{planet.planetName}</Td>
                  <Td textAlign="center">{planet.terrain}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PlanetsTable;
