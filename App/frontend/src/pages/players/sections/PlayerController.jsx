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
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  ModalFooter,
  Button,
  useToast,
  Tooltip,
  ModalCloseButton,
} from "@chakra-ui/react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoCloudUpload, IoImage, IoSave } from "react-icons/io5";
import axios from "axios";
import { useFormik } from "formik";
import { format } from "date-fns";
import * as Yup from "yup";

const ControllerButton = ({ icon, label, onClick }) => {
  return (
    <VStack color="white" cursor="pointer" onClick={onClick}>
      <Icon as={icon} />
      <Text fontSize="xs">{label}</Text>
    </VStack>
  );
};

const PlayerController = ({
  isOpen,
  onOpen,
  onClose,
  selectedRow,
  setSelectedRow,
  refetch,
}) => {
  const [isEdited, setIsEdited] = useState(false);
  const imageUploaderRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      image: "",
      name: "",
      username: "",
      level: "",
      age: "",
      dateJoined: new Date().toISOString().split("T")[0],
    },
    validationSchema: Yup.object({
      image: Yup.string(),
      name: Yup.string("Name must be a string")
        .required("Name must be specified")
        .test(
          "len",
          "Must be between 5 and 50 characters",
          (val) => val.length >= 5 && val.length <= 50
        ),
      username: Yup.string("Username must be a string")
        .required("Username must be specified")
        .test(
          "len",
          "Must be between 5 and 45 characters",
          (val) => val.length >= 5 && val.length <= 45
        ),
      level: Yup.number("Level must be a number")
        .required("Level must be specified")
        .max(150, "Level must be between 1-150"),
      age: Yup.number("Age must be a number")
        .required("Age must be specified")
        .min(12, "Age must be over 12"),
    }),
  });

  useEffect(() => {
    if (selectedRow) {
      formik.resetForm({
        values: {
          image: selectedRow.playerImage || "",
          name: selectedRow.playerName || "",
          username: selectedRow.playerAlias || "",
          level: selectedRow.playerLevel || "",
          age: selectedRow.playerAge || "",
          dateJoined: format(new Date(selectedRow.playerJoin), "yyyy-MM-dd"),
        },
      });
    }
  }, [selectedRow]);

  const toast = useToast();

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", formik.values.image);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    const req = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return req.data.secure_url;
  };

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => {
      let imageUrl = "";
      if (formik.values.image) {
        if (selectedRow) {
          if (selectedRow !== formik.values.image) {
            imageUrl = await uploadFile();
          }
        } else {
          imageUrl = await uploadFile();
        }
      }

      const body = {
        playerName: formik.values.name,
        playerAlias: formik.values.username,
        playerLevel: formik.values.level,
        playerAge: formik.values.age,
        playerJoin:
          formik.values.dateJoined || new Date().toISOString().split("T")[0], // Ensure valid date
        playerImage: imageUrl,
      };

      if (selectedRow) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}player/${selectedRow.playerID}`,
          body
        );
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}player/`, body);
      }
    },
    onSuccess: async () => {
      toast({ description: "Submission saved", status: "success" });
      setSelectedRow(undefined);
      onClose();
      formik.resetForm({
        values: {
          image: "",
          name: "",
          username: "",
          level: "",
          age: "",
          dateJoined: new Date().toISOString().split("T")[0],
        },
      });
      refetch();
    },
    onError: () => {
      toast({ description: "Error saving submission", status: "error" });
    },
  });

  const handleEdit = () => {
    if (!isEdited) {
      setIsEdited(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleEdit();
    formik.setFieldValue(name, value);
  };

  const handleResetAndClose = () => {
    onClose();
    setIsEdited(false);
    formik.resetForm({
      values: {
        image: "",
        name: "",
        username: "",
        level: "",
        age: "",
        dateJoined: new Date().toISOString().split("T")[0],
      },
    });
    if (selectedRow) {
      setSelectedRow(undefined);
    }
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
          if (isEdited) {
            if (
              window.confirm(
                "You have unsaved changes, are you sure you want to leave?"
              )
            ) {
              handleResetAndClose();
            }
          } else {
            handleResetAndClose();
          }
        }}
      >
        <ModalOverlay />
        <ModalContent backgroundColor="background.300" w="1000px">
          <ModalHeader>
            <Heading as="h3" color="white" fontSize="2xl">
              {selectedRow ? "Edit" : "Add"}{" "}
              <Text as="span" color="red.500">
                Players
              </Text>
            </Heading>
            <ModalCloseButton color="red.500" />
          </ModalHeader>
          <form
            onSubmit={() => {
              if (selectedRow) {
                setIsEdited(false);
              }
              mutateAsync();
            }}
          >
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
                    onClick={(e) => {
                      e.stopPropagation();
                      imageUploaderRef.current?.click();
                    }}
                    _hover={{ borderColor: "red.500", color: "red.500" }}
                    transition="all 0.3s"
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
                    onChange={(e) => {
                      formik.setFieldValue("image", e.target.files[0]);
                      handleEdit();
                    }}
                    ref={imageUploaderRef}
                  />
                  <FormHelperText color="gray.400">
                    {selectedRow ? "Change" : "Upload"} your profile photo
                  </FormHelperText>
                  {formik.values.image && (
                    <HStack
                      my={2}
                      color="gray.200"
                      justifyContent="space-between"
                    >
                      <Icon as={IoImage} color="red.500" />
                      <Text fontSize="xs">
                        {formik.values.image.name.length > 44
                          ? `${formik.values.image.name.slice(
                              0,
                              40
                            )}...${formik.values.image.name.slice(
                              formik.values.image.name.length - 3
                            )}`
                          : formik.values.image.name}
                      </Text>
                      <Tooltip label="Remove Image" placement="right" size="sm">
                        <span>
                          <Icon
                            as={MdDelete}
                            onClick={() => formik.setFieldValue("image", null)}
                            color="red.500"
                            cursor="pointer"
                          />
                        </span>
                      </Tooltip>
                    </HStack>
                  )}
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    variant="filled"
                    value={formik.values.name}
                    name="name"
                    isRequired
                    onChange={handleChange}
                    placeholder="Name..."
                  />
                  <FormHelperText
                    color={formik.errors.name ? "red.500" : "gray.400"}
                  >
                    {formik.errors.name ?? "Both first and last name."}
                  </FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    variant="filled"
                    placeholder="Username..."
                    value={formik.values.username}
                    name="username"
                    isRequired
                    onChange={handleChange}
                  />
                  <FormHelperText
                    color={formik.errors.username ? "red.500" : "gray.400"}
                  >
                    {formik.errors.username ?? "Username must be unique."}
                  </FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Level</FormLabel>
                  <Input
                    type="number"
                    variant="filled"
                    placeholder="Level..."
                    value={formik.values.level}
                    name="level"
                    isRequired
                    onChange={handleChange}
                    min={1}
                    max={150}
                  />
                  <FormHelperText
                    color={formik.errors.level ? "red.500" : "gray.400"}
                  >
                    {formik.errors.level ?? "Level must be between 1-150."}
                  </FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Age</FormLabel>
                  <Input
                    type="number"
                    variant="filled"
                    placeholder="Age..."
                    value={formik.values.age}
                    name="age"
                    isRequired
                    onChange={handleChange}
                    min={12}
                  />
                  <FormHelperText
                    color={formik.errors.age ? "red.500" : "gray.400"}
                  >
                    {formik.errors.age ?? "Must be 12+."}
                  </FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Date Joined</FormLabel>
                  <Input
                    aria-label="Date"
                    type="date"
                    variant="filled"
                    value={formik.values.dateJoined}
                    name="dateJoined"
                    onChange={handleChange}
                    disabled
                  />
                  <FormHelperText color="gray.400">
                    Default is today.
                  </FormHelperText>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                colorScheme="red"
                rightIcon={selectedRow ? <MdEdit /> : <IoSave />}
                isLoading={isPending}
                loadingText="Saving"
              >
                {selectedRow ? "Edit" : "Save"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </HStack>
  );
};

export default PlayerController;
