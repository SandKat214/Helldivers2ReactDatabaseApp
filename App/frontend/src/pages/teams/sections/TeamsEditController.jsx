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
    Show,
    Hide,
  } from "@chakra-ui/react";
  import { useState, useEffect } from "react";
  import { IoSave } from "react-icons/io5";
  import { missionTypes, planets, languages } from "../../../utils/mockup";
  
  const TeamsEditController = ({ prevTeam, updateTeam, setUpdateTeam, handleChange }) => {  
    const [isChat, setIsChat] = useState(true);
  
    const handleChatChange = (e) => {
      if (e.target.value === "0") {
        setIsChat(false);
      } else {
        setIsChat(true);
      };
      handleChange(e);
    };
  
    return (
      <HStack justifyContent="center">
        <Modal isOpen={updateTeam} onClose={() => setUpdateTeam(false)}> 
          <ModalOverlay />
          <ModalContent backgroundColor="background.300" w="1000px">
            <ModalHeader>
              <Heading as="h3" color="white" fontSize="2xl">
                Edit{" "}
                <Text as="span" color="red.500">
                  Team
                </Text>
              </Heading>
            </ModalHeader>
            <form>
              <ModalBody>
                <VStack gap={4}>
                  <FormControl color="white">
                    <FormLabel >Team Title</FormLabel>
                    <Input 
                      name="title" 
                      type="text" 
                      variant="filled" 
                      placeholder="Title..."
                      defaultValue={prevTeam.title}
                      onChange={handleChange} 
                      isRequired
                    />
                    <FormHelperText color="gray.400">
                      Permanent team title.
                    </FormHelperText>
                  </FormControl>
                  <FormControl color="white">
                    <FormLabel>Time</FormLabel>
                    <Input 
                      name="meet"  
                      type="datetime-local" 
                      variant="filled" 
                      placeholder="Meet Time..."
                      defaultValue={prevTeam.meet}
                      onChange={handleChange} 
                      isRequired
                    />
                    <FormHelperText color="gray.400">
                      Time must be in military format.
                    </FormHelperText>
                  </FormControl>
                  <FormControl color="white">
                    <FormLabel>Difficulty</FormLabel>
                    <Input
                      name="difficulty"
                      type="number"
                      variant="filled"
                      placeholder="Difficulty..."
                      defaultValue={prevTeam.difficulty}
                      min="1"
                      max="9"
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
                      defaultValue={prevTeam.team18Up === 1 ? "1" : "0"}
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
                      placeholder="Choose..."
                      defaultValue={prevTeam.chat === 1 ? "1" : "0"}
                      onChange={handleChatChange}
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
                    <FormLabel>Planet</FormLabel>
                    <Select 
                      name="planet"
                      variant="filled" 
                      color="background.700"
                      placeholder="Choose..."
                      defaultValue={prevTeam.planet}
                      onChange={handleChange}
                      isRequired
                    >
                      {planets.map((planet) => {
                        return (
                          <option 
                            key={planet.planetID} 
                            value={planet.planetID}
                          >
                            {planet.planetName}
                          </option>
                        );
                      })};
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
                      defaultValue={prevTeam.mission}
                      onChange={handleChange}
                      isRequired
                    >
                      {missionTypes.map((mission) => {
                      return (
                        <option 
                          key={mission.missionID} 
                          value={mission.missionID}
                        >
                          {mission.missionName}
                        </option>
                        );
                      })};
                    </Select>
                    <FormHelperText color="gray.400">
                      Choose from available.
                    </FormHelperText>
                  </FormControl>
                  {isChat && 
                    <FormControl color="white">
                      <FormLabel>Language</FormLabel>
                      <Select 
                        name="language" 
                        variant="filled" 
                        color="background.700"
                        placeholder="Choose..."
                        defaultValue={prevTeam.language}
                        isRequired
                      >
                        {languages.map((language) => {
                          return (
                            <option 
                              key={language.langID} 
                              value={language.langID}
                            >
                              {language.langName}
                            </option>
                          );
                        })};
                      </Select>
                      <FormHelperText color="gray.400">
                        Select from available or add new.
                      </FormHelperText>
                    </FormControl>
                  }
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
  
  export default TeamsEditController;