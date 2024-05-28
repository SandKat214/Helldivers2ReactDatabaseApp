import { VStack, useToast } from "@chakra-ui/react";
import PlanetsTable from "./sections/PlanetsTable";
import PlanetsController from "./sections/PlanetsController";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Planets = () => {
  const toast = useToast();
  const [selectedRow, setSelectedRow] = useState(undefined);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["planets"],
    queryFn: async () => {
      const resp = await axios.get(import.meta.env.VITE_API_URL + "planets");
      return resp.data;
    },
    onError: () => {
      toast({ description: "Error fetching planets", status: "error" });
    },
  });

  return (
    <VStack gap={20} alignItems="center" w="100%">
      <PlanetsController />
      <PlanetsTable data={data} isLoading={isLoading} />
    </VStack>
  );
};

export default Planets;
