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
} from "@chakra-ui/react";
import { useRef } from "react";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { IoCloudUpload, IoSave } from "react-icons/io5";

const ControllerButton = ({ icon, label, onClick }) => {
  return (
    <VStack color="white" cursor="pointer">
      <Icon as={icon} onClick={onClick} />
      <Text fontSize="xs">{label}</Text>
    </VStack>
  );
};

const PeopleController = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const imageUploaderRef = useRef(null);

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
                Players
              </Text>
            </Heading>
          </ModalHeader>
          <form>
            <ModalBody>
              <VStack gap={4}>
                <FormControl color="white">
                  <FormLabel>Profile Photo</FormLabel>
                  <Center
                    borderWidth="1px"
                    borderStyle="dashed"
                    borderColor="gray.400"
                    borderRadius="md"
                    py={3}
                    cursor="pointer"
                    onClick={() => {
                      imageUploaderRef.current?.click();
                    }}
                  >
                    <HStack>
                      <IoCloudUpload />
                      <Text>Upload</Text>
                    </HStack>
                  </Center>
                  <Input
                    type="file"
                    variant="filled"
                    display="none"
                    ref={imageUploaderRef}
                  />
                  <FormHelperText color="gray.400">
                    Upload your profile photo
                  </FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Name</FormLabel>
                  <Input type="text" variant="filled" placeholder="Name..." />
                  <FormHelperText color="gray.400">
                    Both first and last name.
                  </FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Username</FormLabel>
                  <Input type="text" variant="filled" placeholder="Name..." />
                  <FormHelperText color="gray.400">
                    Username must be unique.
                  </FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Level</FormLabel>
                  <Input type="number" variant="filled" placeholder="Level..." min={1} max={150} />
                  <FormHelperText color="gray.400">
                    Level defaults to 1.
                  </FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Age</FormLabel>
                  <Input type="number" variant="filled" placeholder="Name..." min={12} />
                  <FormHelperText color="gray.400">Must be 12+.</FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Date Joined</FormLabel>
                  <input
                    aria-label="Date"
                    type="date"
                    style={{
                      width: "100%",
                      borderRadius: "5px",
                      height: "38px",
                      color: "black",
                      paddingLeft: "10px",
                    }}
                  />
                  <FormHelperText color="gray.400">
                    Default is today.
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

export default PeopleController;
