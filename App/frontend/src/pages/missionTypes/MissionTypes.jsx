import { VStack } from "@chakra-ui/react";
import MissionTypesTable from "./sections/MissionTypesTable";
import MissionTypesController from "./sections/MissionTypesController";

const MissionTypes = () => {
  return (
    <VStack gap={20} alignItems="center" w="100%">
      <MissionTypesController />
      <MissionTypesTable />
    </VStack>
  );
};

export default MissionTypes;
