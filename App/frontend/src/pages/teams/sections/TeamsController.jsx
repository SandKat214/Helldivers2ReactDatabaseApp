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
import { FaPlus } from "react-icons/fa6";
import { IoSave } from "react-icons/io5";

const ControllerButton = ({ icon, label, onClick }) => {
  return (
    <VStack color="white" cursor="pointer">
      <Icon as={icon} onClick={onClick} />
      <Text fontSize="xs">{label}</Text>
    </VStack>
  );
};

const TeamsController = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack justifyContent="center">
      <HStack
        backgroundColor="red.500"
        px={8}
        py={2}
        borderRadius="full"
        gap={5}
        boxShadow="0px 2px 12px rgba(229, 62, 62, 1)"
      >
        <ControllerButton icon={FaPlus} label="Add" onClick={() => onOpen()} />
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="background.300" w="1000px">
          <ModalHeader>
            <Heading as="h3" color="white" fontSize="2xl">
              Add{" "}
              <Text as="span" color="red.500">
                Teams
              </Text>
            </Heading>
          </ModalHeader>
          <form>
            <ModalBody>
              <VStack gap={4}>
                <FormControl color="white">
                  <FormLabel>Team Name</FormLabel>
                  <Input type="text" variant="filled" placeholder="Name..." />
                  <FormHelperText color="gray.400">
                    Permanent team name.
                  </FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Time</FormLabel>
                  <Input type="text" variant="filled" placeholder="Name..." />
                  <FormHelperText color="gray.400">
                    Time must be in military format.
                  </FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Difficulty</FormLabel>
                  <Input
                    type="number"
                    variant="filled"
                    placeholder="Difficulty..."
                    min={1}
                    max={9}
                  />
                  <FormHelperText color="gray.400">
                    Range between 1 - 9.
                  </FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Notes</FormLabel>
                  <Input type="text" variant="filled" placeholder="Notes..." />
                  <FormHelperText color="gray.400">
                    General notes about the team.
                  </FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Is 18+</FormLabel>
                  <Select variant="filled" color="background.700">
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </Select>
                  <FormHelperText color="gray.400">
                    Select between true and false.
                  </FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Is chat friendly</FormLabel>
                  <Select variant="filled" color="background.700">
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </Select>
                  <FormHelperText color="gray.400">
                    Select between true and false.
                  </FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Member count</FormLabel>
                  <Input
                    type="number"
                    variant="filled"
                    color="background.700"
                    placeholder="0"
                  />
                  <FormHelperText color="gray.400">
                    Default is 0.
                  </FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Planet</FormLabel>
                  <Select variant="filled" color="background.700">
                    <option value="1">Planet 1</option>
                    <option value="2">Planet 2</option>
                  </Select>
                  <FormHelperText color="gray.400">
                    Default is 0.
                  </FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Mission Type</FormLabel>
                  <Select variant="filled" color="background.700">
                    <option value="1">Type 1</option>
                    <option value="2">Type 2</option>
                  </Select>
                  <FormHelperText color="gray.400">
                    Mandetory field.
                  </FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Language</FormLabel>
                  <Select variant="filled" color="background.700">
                    <option value="1">English</option>
                    <option value="2">Espanol</option>
                  </Select>
                  <FormHelperText color="gray.400">
                    Can be empty.
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

export default TeamsController;
