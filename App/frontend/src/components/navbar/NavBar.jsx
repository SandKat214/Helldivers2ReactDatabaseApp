import { Link as RRDLink} from "react-router-dom";
import { MdLocalConvenienceStore } from "react-icons/md";
import { Avatar, Box, HStack, Heading, Link } from "@chakra-ui/react";

const CustomLink = ({path,label})=>{
  return (
    <Link as={RRDLink} to={path} borderBottomWidth="1px" borderColor="gray.100" color="gray.100" _hover={{borderColor:"red.500", color:"red.500"}}>{label}</Link>
  )
}

const Navbar = () => {
  return (
    <Box as="header" w="100%" >
      <HStack alignItems="center" justifyContent="space-between">
        <HStack>
          <Avatar />
          <Heading color="white">Logo</Heading>
        </HStack>
        <HStack gap={10}>
        <CustomLink path="./players" label="Players"/>
        <CustomLink path="./teams" label="Teams"/>
        <CustomLink path="./planets" label="Planets"/>
        <CustomLink path="./missions" label="Missions"/>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Navbar;
