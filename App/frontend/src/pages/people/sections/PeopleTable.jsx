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
  Tr,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa6";
import { players } from "../../../utils/mockup";
import { MdEdit } from "react-icons/md";

const PeopleTable = () => {
  return (
    <Box
      backgroundColor="background.200"
      w="100%"
      maxH="500px"
      overflowY="auto"
      borderRadius="md"
      px={1}
      py={5}
    >
      <TableContainer w="100%">
        <Table>
          <Thead>
            <Tr borderColor="transparent">
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
              <Th borderColor="transparent" color="white" isNumeric>
                Date Joined
              </Th>
              <Th borderColor="transparent" color="white" isNumeric>
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {players.map((player, index) => {
              return (
                <Tr
                  key={player.username}
                  color="white"
                  backgroundColor={
                    index % 2 === 0 ? "background.600" : "transparent"
                  }
                  transition="all 0.3s"
                  _hover={{
                    backgroundColor: "#0B111D",
                  }}
                >
                  <Td borderColor="transparent">
                    <Avatar src="https://www.nikkoindustries.com/cdn/shop/files/Image-Render.000_e98f6660-9faa-47ff-8d91-8df35964c70e_946x946.png?v=1708613784" />
                  </Td>
                  <Td borderColor="transparent">{player.name}</Td>
                  <Td borderColor="transparent">{player.username}</Td>
                  <Td borderColor="transparent">{player.level}</Td>
                  <Td borderColor="transparent">{player.age}</Td>
                  <Td borderColor="transparent" textAlign="right">
                    {player.dateJoined}
                  </Td>
                  <Td borderColor="transparent">
                    <HStack justifyContent="flex-end">
                      <IconButton
                        colorScheme="red"
                        color="white"
                        aria-label="Edit button"
                        icon={<FaTrash />}
                        size="sm"
                      />
                      <IconButton
                        colorScheme="red"
                        color="white"
                        aria-label="Delete button"
                        icon={<MdEdit />}
                        size="sm"
                      />
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

export default PeopleTable;
