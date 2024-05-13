import { VStack, useDisclosure } from "@chakra-ui/react";
import PlayerTable from "./sections/PlayerTable";
import PlayerController from "./sections/PlayerController";
import { useState } from "react";

const Player = () => {
  const [selectedRow, setSelectedRow] = useState(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack gap={20} alignItems="stretch" w="100%">
      <PlayerController
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
      />
      <PlayerTable setSelectedRow={setSelectedRow} onOpen={onOpen} />
    </VStack>
  );
};

export default Player;
