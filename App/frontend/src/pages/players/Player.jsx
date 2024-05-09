import { VStack } from "@chakra-ui/react";
import PlayerTable from "./sections/PlayerTable";
import PlayerController from "./sections/PlayerController";

const Player = () => {
  return (
    <VStack gap={20} alignItems="stretch" w="100%">
      <PlayerController />
      <PlayerTable />
    </VStack>
  );
};

export default Player;
