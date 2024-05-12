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

const LanguagesController = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [langData, setLangData] = useState({
    langID: "",
    langName: ""
  });

  // keep track of new form data
  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setLangData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // add language to database
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();

    // Will add async language creation
    console.log(langData);
    resetFormFields();
  };

  // default to empty fields
  const resetFormFields = () => {
    setLangData({
      langID: null,
      langName: ""
    });
    console.log("reset");
  };

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
        {/* <ControllerButton icon={FaTrash} label="Delete" onClick={() => {}} /> */}
      </HStack>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent backgroundColor="background.300" w="1000px">
          <ModalHeader>
            <Heading as="h3" color="white" fontSize="2xl">
              Add{" "}
              <Text as="span" color="red.500">
                Language
              </Text>
            </Heading>
          </ModalHeader>
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <VStack gap={4}>
                <FormControl color="white">
                  <FormLabel>Language ID</FormLabel>
                  <Input
                    type="text"
                    name="langID"
                    variant="filled"
                    placeholder="ID..."
                    maxLength={4}
                    onChange={handleDataChange}
                    isRequired
                    _focus={{ backgroundColor: "white" }}
                  />
                  <FormHelperText color="gray.400">
                    Must be unique 4 letter ID.
                  </FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Language Name</FormLabel>
                  <Input
                    type="text"
                    name="langName"
                    variant="filled"
                    placeholder="Language Name..."
                    onChange={handleDataChange}
                    isRequired
                    _focus={{ backgroundColor: "white" }}
                  />
                  <FormHelperText color="gray.400">
                    Must be unique.
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
  );
};

export default LanguagesController;
