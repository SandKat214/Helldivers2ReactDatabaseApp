import { VStack, useDisclosure, useToast } from "@chakra-ui/react";
import PlayerTable from "./sections/PlayerTable";
import PlayerController from "./sections/PlayerController";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Player = () => {
  const [selectedRow, setSelectedRow] = useState(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["people"],
    queryFn: async () => {
      const resp = await axios.get(import.meta.env.VITE_API_URL + "player");
      return resp.data;
    },
    onError: () => {
      toast({ description: "Error fetching players", status: "error" });
    },
  });

  return (
    <VStack gap={20} alignItems="stretch" w="100%">
      <PlayerController
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        refetch={refetch}
      />
      <PlayerTable
        setSelectedRow={setSelectedRow}
        onOpen={onOpen}
        data={data}
        isLoading={isLoading}
        refetch={refetch}
      />
    </VStack>
  );
};

export default Player;
