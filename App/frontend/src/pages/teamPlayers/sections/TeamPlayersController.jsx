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
  import { useRef } from "react";
  import { FaPlus, FaTrash } from "react-icons/fa6";
  import { IoSave } from "react-icons/io5";
  
  const ControllerButton = ({ icon, label, onClick }) => {
    return (
      <VStack color="white" cursor="pointer">
        <Icon as={icon} onClick={onClick} />
        <Text fontSize="xs">{label}</Text>
      </VStack>
    );
  };
  
  const TeamPlayersController = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <HStack justifyContent="center">
        <HStack
          backgroundColor="red.500"
          px={8}
          py={2}
          borderRadius="full"
          gap={5}
          border="1px solid white"
        >
          <ControllerButton icon={FaPlus} label="Add" onClick={() => onOpen()} />
          <ControllerButton icon={FaTrash} label="Delete" onClick={() => {}} />
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
            <form>
              <ModalBody>
                <VStack gap={4}>
                  <FormControl color="white">
                    <FormLabel>Team Name</FormLabel>
                    <Select
                      type="text"
                      variant="filled"
                      color="background.700"
                      _focus={{ backgroundColor: "white" }}
                    >
                      <option value="">Shield of Democracy</option>
                      <option value="">Indominus Legion</option>
                    </Select>
                    <FormHelperText color="gray.400">
                        Choose available team.
                    </FormHelperText>
                  </FormControl>
                  <FormControl color="white">
                    <FormLabel>Username</FormLabel>
                    <Select
                      type="text"
                      variant="filled"
                      color="background.700"
                      _focus={{ backgroundColor: "white" }}
                    >
                      <option value="">Goblin</option>
                      <option value="">leafonthewind</option>
                    </Select>
                    <FormHelperText color="gray.400">
                        Choose recruit.
                    </FormHelperText>
                  </FormControl>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="red" rightIcon={<IoSave />}>
                  Save
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </HStack>
    );
  };
  
  export default TeamPlayersController;