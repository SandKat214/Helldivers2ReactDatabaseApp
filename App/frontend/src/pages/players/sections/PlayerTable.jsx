import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";


const PlayerTable = ({ setSelectedRow, onOpen, data, isLoading,refetch}) => {

  const toast = useToast()

  const {mutateAsync}=useMutation({
    mutationFn: async (playerID)=>{
      await axios.delete(`${import.meta.env.VITE_API_URL}player/${playerID}`)
      return playerID
    },
    onSuccess:(playerID)=>{
      toast({description:`Player with ID: ${playerID} deleted`,status:"success"})
      refetch()
    },
    onError:(playerID)=>{
      toast({description:`Failed to delete player with ID: ${playerID}`,status:"error"})
    }
  })

  if(isLoading){
    return <HStack justifyContent="center">
      <Spinner color="red" size="xl"/>
    </HStack>
  }

  const dataElements=data.map((player, index) => {
    return (
      <Tr
        key={player.playerID}
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
          <Avatar src={player.playerImage?player.playerImage:"https://www.nikkoindustries.com/cdn/shop/files/Image-Render.000_e98f6660-9faa-47ff-8d91-8df35964c70e_946x946.png?v=1708613784"} />
        </Td>
        <Td borderColor="transparent">{player.playerName}</Td>
        <Td borderColor="transparent">{player.playerAlias}</Td>
        <Td borderColor="transparent">{player.playerLevel}</Td>
        <Td borderColor="transparent">{player.playerAge}</Td>
        <Td borderColor="transparent" textAlign="right">
          {format(new Date(player.playerJoin), 'yyyy-MM-dd')}
        </Td>
        <Td borderColor="transparent">
          <HStack justifyContent="flex-end">
            <IconButton
              colorScheme="red"
              color="white"
              aria-label="Delete button"
              icon={<MdEdit />}
              size="sm"
              onClick={() => {
                setSelectedRow({ ...player });
                onOpen();
              }}
            />
            <IconButton
              colorScheme="red"
              color="white"
              aria-label="Edit button"
              icon={<FaTrash />}
              size="sm"
              onClick={()=>{
                mutateAsync(player.playerID)
              }}
            />
          </HStack>
        </Td>
      </Tr>
    );
  })

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
            {dataElements}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PlayerTable;
