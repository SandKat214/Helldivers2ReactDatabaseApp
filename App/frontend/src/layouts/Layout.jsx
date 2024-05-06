import { Box, VStack } from "@chakra-ui/react"
import Navbar from "../components/navbar/NavBar"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <VStack w="100vw" backgroundColor="background.700" alignItems="center" py={8}>
        <VStack  maxW="1200px" w="1300px" gap={28}>
            <Navbar />
            <Outlet/>
      </VStack>
        </VStack>
    )
}

export default Layout