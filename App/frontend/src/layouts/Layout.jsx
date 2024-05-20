import { VStack } from "@chakra-ui/react";
import Navbar from "../components/navbar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";

const Layout = ({ children }) => {
  return (
    <VStack
      w="100vw"
      minH="100vh"
      alignItems="center"
      pt={8}
      justifyContent={children ? "space-between" : "unset"}
    >
      <VStack
        maxW="1200px"
        w="1300px"
        gap={20}
        alignItems="stretch"
        mb={20}
        flex={children ? 1 : "unset"}
      >
        <Navbar />
        {children ?? <Outlet />}
      </VStack>
      <Footer />
    </VStack>
  );
};

export default Layout;
