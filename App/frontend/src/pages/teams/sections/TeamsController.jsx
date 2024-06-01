import {
  HStack,
  Center,
  Icon,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalBody,
  useToast,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  ModalFooter,
  Button,
  Select,
  Tooltip,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import { IoCloudUpload, IoImage, IoSave } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import { useRef, useState } from "react";
import axios from "axios";


const ControllerButton = ({ icon, label, onClick }) => {
  return (
    <VStack color="white" cursor="pointer" onClick={onClick} >
      <Icon as={icon} />
      <Text fontSize="xs">{label}</Text>
    </VStack>
  );
};

const TeamsController = ({
  fetchTeams,
  isChat,
  isOpen,
  languages,
  missions,
  onClose,
  onOpen,
  planets,
  prevImage,
  setIsChat,
  setTeamData,
  teamData,
}) => {
  const toast = useToast();
  const imageUploaderRef = useRef(null);
  const [isEdited, setIsEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // image upload and url return
  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", teamData.image);
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

  // change status to edited
  const handleEdit = () => {
    if (!isEdited) {
      setIsEdited(true);
    };
  };

  // keep track of new form data
  const handleChange = (e) => {
    handleEdit();
    let { name, value } = e.target;
    // date type to correct format
    if (name === "meet") {
      const tzoffset = (new Date()).getTimezoneOffset() * 60000;     //offset in milliseconds
      const valDate = new Date(value);
      value = new Date(valDate - tzoffset).toISOString().slice(0, 19);
    };
    setTeamData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // close/open language input based on chat boolean
  const handleChatChange = (e) => {
    setIsChat(e.target.value === "0" ? false : true);
    handleChange(e);
  };

  // Add team to database
  const handleSubmit = async (e) => {
    // Prevent page reload & signal loading
    e.preventDefault();
    setIsLoading(true);

    // get image api url
    let imageUrl = null;
    if (teamData.image) {
      if (prevImage) {
        if (prevImage !== teamData.image) {
          imageUrl = await uploadFile();
        };
      } else {
        imageUrl = await uploadFile();
      };
    };

    // Create a new team object from the teamData
    const newTeam = {
      teamTitle: teamData.title,
      teamMeet: teamData.meet,
      teamDifficulty: teamData.difficulty,
      team18Up: teamData.team18Up,
      teamChat: teamData.chat,
      teamImage: imageUrl,
      missionID: teamData.mission,
      planetID: teamData.planet,
      langID: teamData.language,
    };
    if (!teamData.id) {
      // create team
      try {
        const URL = import.meta.env.VITE_API_URL + "teams";
        const response = await axios.post(URL, newTeam);
        if (response.status === 201) {
          toast({ description: "Submission saved", status: "success" });
          fetchTeams();
        } else {
          toast({ description: "Error saving submission", status: "error" });
        };
      } catch (error) {
        toast({ description: "Error creating team", status: "error" });
        console.error("Error creating team:", error);
      } finally {
        onClose();
        setIsLoading(false);
      };
    } else {
      // update team
      try {
        const URL = import.meta.env.VITE_API_URL + "teams/" + teamData.id;
        const response = await axios.put(URL, newTeam);
        if (response.status !== 200) {
          toast({ description: "Error saving submission", status: "error" });
        } else {
          toast({ description: "Submission saved", status: "success" });
          fetchTeams();
        };
      } catch (err) {
        toast({ description: err.response.data.error.message || "Error updating team", status: "error" });
        console.error("Error updating team:", err);
      } finally {
        onClose();
        setIsLoading(false);
      };
    };
    // Reset the form fields
    setIsEdited(false);
    resetFormFields();
  };

  // reset teamData to empty fields
  const resetFormFields = () => {
    setTeamData({
      id: null,
      title: "",
      meet: "",
      difficulty: "",
      team18Up: "",
      chat: "",
      mission: "",
      planet: "",
      language: null
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
              {teamData.id ? "Edit" : "Add"}{" "}
              <Text as="span" color="red.500">
                Team
              </Text>
            </Heading>
            <ModalCloseButton color="red.500" />
          </ModalHeader>
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <VStack gap={4}>
                <FormControl color="white">
                  <FormLabel>Team Photo</FormLabel>
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
                      setTeamData((prevData) => ({
                        ...prevData,
                        image: e.target.files[0],
                      }));
                      handleEdit();
                    }}
                    ref={imageUploaderRef}
                  />
                  <FormHelperText color="gray.400">
                    {teamData.id ? "Change" : "Upload"} your profile photo
                  </FormHelperText>
                  {teamData.image && (
                    <HStack
                      my={2}
                      color="gray.200"
                      justifyContent="space-between"
                    >
                      <Icon as={IoImage} color="red.500" />
                      <Text fontSize="xs">
                        {teamData.image.name ? (teamData.image.name.length > 44
                          ? `${teamData.image.name.slice(
                              0,
                              40
                            )}...${teamData.image.name.slice(
                              teamData.image.name.length - 3
                            )}`
                          : teamData.image.name) : `${teamData.title} photo`}
                      </Text>
                      <Tooltip label="Remove Image" placement="right" size="sm">
                        <span>
                          <Icon
                            as={MdDelete}
                            onClick={() => {
                              setTeamData((prevData) => ({
                                ...prevData,
                                image: null,
                              }));
                              handleEdit();
                            }}
                            color="red.500"
                            cursor="pointer"
                          />
                        </span>
                      </Tooltip>
                    </HStack>
                  )}
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Team Title</FormLabel>
                  <Input
                    name="title"
                    type="text"
                    variant="filled"
                    placeholder="Title..."
                    minLength="3"
                    maxLength="70"
                    defaultValue={teamData.title}
                    onChange={handleChange}
                    isRequired
                  />
                  <FormHelperText color="gray.400">
                    Enter team title (3 to 70 characters).
                  </FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Time</FormLabel>
                  <Input 
                    name="meet"  
                    type="datetime-local" 
                    variant="filled"
                    min={new Date(new Date() - ((new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0,16)}
                    placeholder="Meet Time..."
                    defaultValue={teamData.meet}
                    onChange={handleChange}
                    isRequired
                  />
                  <FormHelperText color="gray.400">
                    Date & time to meet.
                  </FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Difficulty</FormLabel>
                  <Input
                    name="difficulty"
                    type="number"
                    variant="filled"
                    placeholder="Difficulty..."
                    min="1"
                    max="9"
                    defaultValue={teamData.difficulty}
                    onChange={handleChange}
                    isRequired
                  />
                  <FormHelperText color="gray.400">
                    Range between 1 - 9.
                  </FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Is 18+</FormLabel>
                  <Select
                    name="team18Up"
                    variant="filled"
                    color="background.700"
                    placeholder="Choose..."
                    defaultValue={teamData.team18Up}
                    onChange={handleChange}
                    isRequired
                  >
                    <option value="1">True</option>
                    <option value="0">False</option>
                  </Select>
                  <FormHelperText color="gray.400">
                    Select between true and false.
                  </FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Is chat friendly</FormLabel>
                  <Select
                    name="chat"
                    variant="filled"
                    color="background.700"
                    defaultValue={teamData.chat}
                    onChange={handleChatChange}
                    isRequired
                    placeholder="Choose..."
                  >
                    <option value="1">True</option>
                    <option value="0">False</option>
                  </Select>
                  <FormHelperText color="gray.400">
                    Select between true and false.
                  </FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Planet</FormLabel>
                  <Select
                    name="planet"
                    variant="filled"
                    color="background.700"
                    placeholder="Choose..."
                    defaultValue={teamData.planet}
                    onChange={handleChange}
                    isRequired
                  >
                    {planets.map((planet) => {
                      return (
                        <option key={planet.planetID} value={planet.planetID}>
                          {planet.planetName}
                        </option>
                      );
                    })}
                    ;
                  </Select>
                  <FormHelperText color="gray.400">
                    Choose from available.
                  </FormHelperText>
                </FormControl>
                <FormControl color="white">
                  <FormLabel>Mission Type</FormLabel>
                  <Select
                    name="mission"
                    variant="filled"
                    color="background.700"
                    placeholder="Choose..."
                    defaultValue={teamData.mission}
                    onChange={handleChange}
                    isRequired
                  >
                    {missions.map((mission) => {
                      return (
                        <option
                          key={mission.missionID}
                          value={mission.missionID}
                        >
                          {mission.missionName}
                        </option>
                      );
                    })}
                    ;
                  </Select>
                  <FormHelperText color="gray.400">
                    Choose from available.
                  </FormHelperText>
                </FormControl>
                {isChat && (
                  <FormControl color="white">
                    <FormLabel>Language</FormLabel>
                    <Select
                      name="language"
                      variant="filled"
                      color="background.700"
                      placeholder="Choose..."
                      defaultValue={teamData.language}
                      onChange={handleChange}
                      isRequired
                    >
                      {languages.map((language) => {
                        return (
                          <option key={language.langID} value={language.langID}>
                            {language.langName}
                          </option>
                        );
                      })}
                      ;
                    </Select>
                    <FormHelperText color="gray.400">
                      Select from available.
                    </FormHelperText>
                  </FormControl>
                )}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button 
                type="submit" 
                colorScheme="red"
                isLoading={isLoading} 
                rightIcon={teamData.id ? <MdEdit /> : <IoSave />}
              >
                {teamData.id ? "Edit" : "Add"}{" "}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </HStack>
  );
};

export default TeamsController;
