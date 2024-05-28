import { Button, HStack, Input, Select, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MdSearch } from "react-icons/md";

const SearchBox = ({ queryType, setQueryType }) => {
  const searchRef = useRef(null);
  const MotionVStack = motion(VStack);

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

  const handleChange = (e) => {
    const { value } = e.target;
    setQueryType(value);
  };

  return (
    <MotionVStack
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 1.6, duration: 0.2 } }}
    >
      <HStack w="100%">
        <Select
          onChange={handleChange}
          value={queryType}
          color="background.700"
          variant="filled"
          w="125px"
          _focus={{ backgroundColor: "white" }}
        >
          <option value="planets">Planets</option>
          <option value="teams">Teams</option>
        </Select>
        <Input
          placeholder="Find teams by planets or missions..."
          variant="filled"
          w="400px"
          ref={searchRef}
          _focus={{ backgroundColor: "white" }}
        />
        <Button rightIcon={<MdSearch />} colorScheme="red" w="125px">
          Search
        </Button>
      </HStack>
      <Text color="gray.400">Or ⌘ + K</Text>
    </MotionVStack>
  );
};

export default SearchBox;
