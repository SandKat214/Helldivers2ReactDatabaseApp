// Citation for handleSubmit() function:
// Date: 5/17/2024
// Copied & Adapted from React-Starter-App
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app
// Authors: Devin Daniels and Zachary Maes

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
  useToast
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { IoSave } from "react-icons/io5";
import axios from "axios";

const ControllerButton = ({ icon, label, onClick }) => {
  return (
    <VStack color="white" cursor="pointer">
      <Icon as={icon} onClick={onClick} />
      <Text fontSize="xs">{label}</Text>
    </VStack>
  );
};

const LanguagesController = ({ fetchLanguages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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
  const handleSubmit = async (e) => {
    // prevent reload & close modal
    e.preventDefault();
    onClose();

    // create new language object
    const newLang = {
      langID: langData.langID,
      langName: langData.langName,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "languages";
      const response = await axios.post(URL, newLang);
      if (response.status === 201) {
        toast({ description: "Submission saved", status: "success" });
        fetchLanguages();
      } else {
        toast({ description: "Error saving submission", status: "error" });
      }
    } catch (error) {
      alert("Error creating language");
      console.error("Error creating language:", error);
    }
    // Reset the form fields
    resetFormFields();
  };

  // default to empty fields
  const resetFormFields = () => {
    setLangData({
      langID: "",
      langName: ""
    });
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
      <Modal isOpen={isOpen} onClose={() => onClose()}>
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
