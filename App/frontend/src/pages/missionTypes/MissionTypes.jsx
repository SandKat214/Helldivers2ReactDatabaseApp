import { VStack, useToast } from "@chakra-ui/react";
import MissionTypesTable from "./sections/MissionTypesTable";
import MissionTypesController from "./sections/MissionTypesController";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const MissionTypes = () => {
  const toast = useToast();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["missions"],
    queryFn: async () => {
      const resp = await axios.get(
        import.meta.env.VITE_API_URL + "mission-types"
      );
      return resp.data;
    },
    onError: () => {
      toast({ description: "Error fetching planets", status: "error" });
    },
  });

  return (
    <VStack gap={20} alignItems="center" w="100%">
      <MissionTypesController refetch={refetch} />
      <MissionTypesTable data={data} isLoading={isLoading} />
    </VStack>
  );
};

export default MissionTypes;
