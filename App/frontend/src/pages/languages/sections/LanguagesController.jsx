// Citation for handle functions:
// Date: 5/17/2024
// Copied & Adapted from React-Starter-App
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app
// Authors: Devin Daniels and Zachary Maes

import {
  HStack,
  Icon,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  ModalFooter,
  Button,
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoSave } from "react-icons/io5";
import axios from "axios";

const ControllerButton = ({ icon, label, onClick }) => {
  return (
    <VStack color="white" cursor="pointer" onClick={onClick}>
      <Icon as={icon} />
      <Text fontSize="xs">{label}</Text>
    </VStack>
  );
};

const LanguagesController = ({ fetchLanguages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [isEdited, setIsEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [langData, setLangData] = useState({
    langID: "",
    langName: "",
  });

  // change status to edited
  const handleEdit = () => {
    if (!isEdited) {
      setIsEdited(true);
    }
  };

  // keep track of new form data
  const handleChange = (e) => {
    handleEdit();
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
    setIsLoading(true);

    // create new language object
    const newLang = {
      langID: langData.langID.toUpperCase(),
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
      toast({ description: "Error creating language", status: "error" });
      console.error("Error creating language:", error);
    } finally {
      onClose();
    }
    // Reset states
    setIsLoading(false);
    setIsEdited(false);
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
        boxShadow="red"
      >
        <ControllerButton icon={FaPlus} label="Add" onClick={() => onOpen()} />
      </HStack>
      <Modal 
        isOpen={isOpen} 
        onClose={() => {
          if (isEdited) {
            if (
              window.confirm(
                "You have unsaved changes, are you sure you want to leave?"
              )
            ) {
              resetFormFields();
              setIsEdited(false);
              onClose();
            }
          } else {
            resetFormFields();
            setIsEdited(false);
            onClose();
          }
        }}
      >
        <ModalOverlay />
        <ModalContent backgroundColor="background.300" w="1000px">
          <ModalHeader>
            <Heading as="h3" color="white" fontSize="2xl">
              Add{" "}
              <Text as="span" color="red.500">
                Language
              </Text>
            </Heading>
            <ModalCloseButton color="red.500" />
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
                    minLength={4}
                    maxLength={4}
                    pattern="[^0-9]{4}"
                    onChange={handleChange}
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
                    minLength={3}
                    maxLength={45}
                    pattern="[^0-9]{1,45}"
                    placeholder="Language Name..."
                    onChange={handleChange}
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
              <Button 
                type="submit" 
                colorScheme="red"
                isLoading={isLoading}
                loadingText="Saving" 
                rightIcon={<IoSave />}
              >
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
