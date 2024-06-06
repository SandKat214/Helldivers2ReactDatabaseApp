import {
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";

const MotionVStack = motion(VStack);
const SearchBox = ({ setTeamTitle, teamTitle }) => {
  const searchRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === "k" || e.key === "K") && e.metaKey) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchRef]);

  return (
    <MotionVStack
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 1.6, duration: 0.2 } }}
    >
      <HStack w="100%">
        <InputGroup>
          <Input
            borderWidth={0}
            placeholder="Find teams by planets or missions..."
            variant="filled"
            w="400px"
            ref={searchRef}
            _focus={{ backgroundColor: "white" }}
            value={teamTitle}
            onChange={(e) => setTeamTitle(e.target.value)}
          />
          <InputRightAddon bg="red.500" borderWidth={0}>
            <Icon as={CiSearch} color="white" />
          </InputRightAddon>
        </InputGroup>
      </HStack>
      <Text color="gray.400">Or ⌘ + K</Text>
    </MotionVStack>
  );
};

export default SearchBox;
