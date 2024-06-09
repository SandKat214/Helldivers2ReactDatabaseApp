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
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import { FaPlus } from "react-icons/fa6";
import { IoSave } from "react-icons/io5";
import * as Yup from "yup";

const ControllerButton = ({ icon, label, onClick }) => {
  return (
    <VStack color="white" cursor="pointer" onClick={onClick}>
      <Icon as={icon} />
      <Text fontSize="xs">{label}</Text>
    </VStack>
  );
};

const MissionTypesController = ({ refetch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      missionName: "",
      missionDesc: "",
      missionDuration: 0,
    },
    validationSchema: Yup.object({
      missionName: Yup.string("Planet Name must be a string").required(
        "Planet name is required"
      ),
      missionDesc: Yup.string("Terrain must be a string").required(
        "Terrain must be specified"
      ),
      missionDuration: Yup.number("Duration must be a number").required(
        "Duration must be specified"
      ),
    }),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => {
      const body = formik.values;

      await axios.post(`${import.meta.env.VITE_API_URL}mission-types/`, body);
    },
    onSuccess: async () => {
      toast({ description: "Submission saved", status: "success" });
      onClose();
      formik.resetForm();
      refetch();
    },
    onError: () => {
      toast({ description: "Error saving submission", status: "error" });
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
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
          onClose();
          formik.resetForm();
        }}
      >
        <ModalOverlay />
        <ModalContent backgroundColor="background.300" w="1000px">
          <ModalHeader>
            <Heading as="h3" color="white" fontSize="2xl">
              Add{" "}
              <Text as="span" color="red.500">
                MissionType
              </Text>
            </Heading>
            <ModalCloseButton color="red.500" />
          </ModalHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              mutateAsync();
            }}
          >
            <ModalBody>
              <VStack gap={4}>
                <FormControl color="white">
                  <FormLabel>Mission Name</FormLabel>
                  <Input
                    type="text"
                    variant="filled"
                    value={formik.values.missionName}
                    placeholder="Mission Name..."
                    _focus={{ backgroundColor: "white" }}
                    onChange={handleChange}
                    name="missionName"
                    isRequired
                  />
                  <FormHelperText color="gray.400">
                    Must be unique.
                  </FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Duration (Mins)</FormLabel>
                  <Input
                    type="number"
                    variant="filled"
                    value={formik.values.missionDuration}
                    placeholder="0"
                    min="0"
                    onChange={handleChange}
                    name="missionDuration"
                    _focus={{ backgroundColor: "white" }}
                    isRequired
                  />
                  <FormHelperText color="gray.400">
                    Enter the duration in minutes.
                  </FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Mission Description</FormLabel>
                  <Textarea
                    type="text"
                    variant="filled"
                    color="black"
                    placeholder="Mission Description..."
                    value={formik.values.missionDesc}
                    onChange={handleChange}
                    name="missionDesc"
                    _focus={{ backgroundColor: "white" }}
                    isRequired
                  />
                  <FormHelperText color="gray.400">
                    Mission description must be unique.
                  </FormHelperText>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                colorScheme="red"
                rightIcon={<IoSave />}
                isLoading={isPending}
                loadingText="Saving"
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

export default MissionTypesController;
