import { HStack, Spinner, VStack } from "@chakra-ui/react";
import HeroSection from "./sections/HeroSection";
import SearchBox from "./sections/SearchBox";
import { useState } from "react";
import Teams from "./sections/Teams";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const [queryType, setQueryType] = useState("planets");

  const { data: teamsData, isLoading } = useQuery({
    queryKey: [queryType],
    queryFn: async () => {
      const resp = await axios.get(import.meta.env.VITE_API_URL + "teams");
      return resp.data;
    },
    onError: () => {
      toast({ description: "Error fetching players", status: "error" });
    },
  });

  if (isLoading) {
    return (
      <HStack>
        <Spinner />
      </HStack>
    );
  }

  return (
    <VStack gap={20}>
      <HeroSection />
      <SearchBox queryType={queryType} setQueryType={setQueryType} />
      <Teams queryType={queryType} />
    </VStack>
  );
};

export default HomePage;
