import { VStack } from "@chakra-ui/react"
import HeroSection from "./sections/HeroSection"
import SearchBox from "./sections/SearchBox"
import { useState } from "react"
import Teams from "./sections/Teams"

const HomePage = () => {
    const [queryType,setQueryType] = useState("planets")

    return(
        <VStack gap={20}>
            <HeroSection/>
            <SearchBox queryType={queryType} setQueryType={setQueryType}/>
            <Teams queryType={queryType}/>
        </VStack>
    )
}

export default HomePage