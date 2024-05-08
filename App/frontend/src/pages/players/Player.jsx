import { VStack } from "@chakra-ui/react";
import PlayerTable from "./sections/PlayerTable";
import PlayerController from "./sections/PlayerController";

const Player = () => {
  return (
    <VStack gap={20} alignItems="stretch" w="100%">
      <PlayerTable />
      <PlayerController />
    </VStack>
  );
};

export default Player;
