import { Box, VStack } from "@chakra-ui/react";
import Navbar from "../components/navbar/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";

const Layout = () => {
  return (
    <VStack w="100vw" minH="100vh" alignItems="center" pt={8}>
      <VStack maxW="1200px" w="1300px" gap={20} alignItems="stretch" mb={20}>
        <Navbar />
        <Outlet />
      </VStack>
      <Footer />
    </VStack>
  );
};

export default Layout;
