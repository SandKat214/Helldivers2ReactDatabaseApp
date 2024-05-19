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

const LanguagesTable = ({ languages }) => {

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
                Language ID
              </Th>
              <Th textAlign="center" color="white">
                Language Name
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {languages.map((lang, index) => {
              return (
                <Tr
                  key={lang.langID}
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
                  <Td textAlign="center">{lang.langID}</Td>
                  <Td textAlign="center">{lang.langName}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LanguagesTable;
