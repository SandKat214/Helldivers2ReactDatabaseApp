import {
  Center,
  HStack,
  Icon,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  ModalFooter,
  Button,
  Select,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaAnglesUp } from "react-icons/fa6";
import { IoSave } from "react-icons/io5";

const ControllerButton = ({ icon, label, onClick }) => {
  return (
    <VStack color="white" cursor="pointer">
      <Icon as={icon} onClick={onClick} />
      <Text fontSize="xs">{label}</Text>
    </VStack>
  );
};

const TeamPlayersController = ({ status, team }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const [teamPlayerID, setTeamPlayerID] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // will add async team creation
    onClose();
  };

  return (

    <VStack gap={20}>
      <Heading as="h3" color="white" fontSize="3xl">
        <Text as="span" color="red.500">
          {team.teamTitle + " "}
        </Text>
        on{" "}
        <Text as="span" color="red.500">
          {team.teamMeet.slice(0, 10)}
        </Text>
        {" "}at{" "}
        <Text as="span" color="red.500">
          {team.teamMeet.slice(10, team.teamMeet.length - 3)}{" "}
          {team.teamMeet.slice(10, 13) > 11 ? "PM" : "AM"}
        </Text>
      </Heading>
      <Text color="white" fontSize="x-large">
        This team is currently{" "}
        <Text as="span" color="red.500">
        {status ? "open" : "closed"}{" "}
        </Text>
        for registration.
      </Text>
      <HStack justifyContent="center">
        <HStack
          backgroundColor="red.500"
          px={8}
          py={2}
          borderRadius="full"
          gap={5}
          boxShadow="0px 2px 12px rgba(229, 62, 62, 1)"
        >
          {status && <ControllerButton icon={FaPlus} label="Add" onClick={() => onOpen()} />}
          <ControllerButton icon={FaAnglesUp} label="Back" onClick={() => navigate("../teams")} />
        </HStack>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent backgroundColor="background.300" w="1000px">
            <ModalHeader>
              <Heading as="h3" color="white" fontSize="2xl">
                Add{" "}
                <Text as="span" color="red.500">
                  Recruit
                </Text>
              </Heading>
            </ModalHeader>
            <form onSubmit={handleSubmit}>  
              <ModalBody>
                <VStack gap={4}>
                  <FormControl color="white">
                    <FormLabel>Username</FormLabel>
                    <Select
                      type="text"
                      variant="filled"
                      color="background.700"
                      placeholder="Choose..."
                      _focus={{ backgroundColor: "white" }}
                      onChange={e => setTeamPlayerID(e.target.value)}
                    >
                      <option value="3">Goblin</option>
                      <option value="5">leafonthewind</option>
                    </Select>
                    <FormHelperText color="gray.400">
                      Choose available recruit.
                    </FormHelperText>
                  </FormControl>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" colorScheme="red" rightIcon={<IoSave />}>
                  Save
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </HStack>
    </VStack>
  );
};

export default TeamPlayersController;
