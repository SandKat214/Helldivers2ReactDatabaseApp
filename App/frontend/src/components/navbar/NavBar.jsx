import { Link as RRDLink } from "react-router-dom";
import { Box, HStack, Heading, Icon, Link } from "@chakra-ui/react";
import { FaSpaceAwesome } from "react-icons/fa6";

const CustomLink = ({ path, label }) => {
  return (
    <Link
      as={RRDLink}
      to={path}
      borderBottomWidth="1px"
      borderColor="gray.100"
      color="gray.100"
      _hover={{ borderColor: "red.500", color: "red.500" }}
    >
      {label}
    </Link>
  );
};

const Navbar = () => {
  return (
    <Box as="header" w="100%">
      <HStack alignItems="center" justifyContent="space-between">
        <RRDLink to="/">
          <HStack gap={5}>
            <Icon as={FaSpaceAwesome} color="red.500" boxSize={10} />
            <Heading color="white">
              Planetary{" "}
              <Heading as="span" color="red.500">
                Liberators
              </Heading>
            </Heading>
          </HStack>
        </RRDLink>
        <HStack gap={10}>
          <CustomLink path="./players" label="Players" />
          <CustomLink path="./teams" label="Teams" />
          <CustomLink path="./planets" label="Planets" />
          <CustomLink path="./missions" label="Missions" />
        </HStack>
      </HStack>
    </Box>
  );
};

export default Navbar;
