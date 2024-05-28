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
  useToast,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import { FaPlus } from "react-icons/fa6";
import { IoSave } from "react-icons/io5";
import * as Yup from "yup";

const ControllerButton = ({ icon, label, onClick }) => {
  return (
    <VStack color="white" cursor="pointer">
      <Icon as={icon} onClick={onClick} />
      <Text fontSize="xs">{label}</Text>
    </VStack>
  );
};

const PlanetsController = ({ refetch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      planetName: "",
      planetTerrain: "Icy",
    },
    validationSchema: Yup.object({
      planetName: Yup.string("Planet Name must be a string").required(
        "Planet name is required"
      ),
      planetTerrain: Yup.string("Terrain must be a string").required(
        "Terrain must be specified"
      ),
    }),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => {
      const body = formik.values;

      await axios.post(`${import.meta.env.VITE_API_URL}planets/`, body);
    },
    onSuccess: async () => {
      toast({ description: "Submission saved", status: "success" });
      onClose();
      formik.resetForm({
        values: {
          planetName: "",
          planetTerrain: "",
        },
      });
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
        {/* <ControllerButton icon={FaTrash} label="Delete" onClick={() => {}} /> */}
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
            <ModalCloseButton color="red.500" />
            <Heading as="h3" color="white" fontSize="2xl">
              Add{" "}
              <Text as="span" color="red.500">
                Planet
              </Text>
            </Heading>
          </ModalHeader>
          <form>
            <ModalBody>
              <VStack gap={4}>
                <FormControl color="white">
                  <FormLabel>Planet Name</FormLabel>
                  <Input
                    type="text"
                    variant="filled"
                    placeholder="Planet Name..."
                    _focus={{ backgroundColor: "white" }}
                    onChange={handleChange}
                    value={formik.values.planetName}
                    name="planetName"
                  />
                  <FormHelperText
                    color={formik.errors.planetName ? "red.500" : "gray.400"}
                  >
                    {formik.errors.planetName ?? "Must be unique."}
                  </FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Terrain Type</FormLabel>
                  <Select
                    type="text"
                    variant="filled"
                    color="background.700"
                    _focus={{ backgroundColor: "white" }}
                    onChange={handleChange}
                    name="planetTerrain"
                    value={formik.values.planetTerrain}
                  >
                    <option value="Icy">Icy</option>
                    <option value="Desert">Desert</option>
                    <option value="Mountains">Mountains</option>
                    <option value="Ocean">Ocean</option>
                    <option value="Swamp">Swamp</option>
                    <option value="Forest">Forest</option>
                  </Select>
                  <FormHelperText color="gray.400"></FormHelperText>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="red"
                rightIcon={<IoSave />}
                isLoading={isPending}
                loadingText="Saving"
                onClick={mutateAsync}
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

export default PlanetsController;
