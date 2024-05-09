import { VStack } from "@chakra-ui/react";
import PlanetsTable from "./sections/PlanetsTable";
import PlanetsController from "./sections/PlanetsController";

const Planets = () => {
  return (
    <VStack gap={20} alignItems="center" w="100%">
      <PlanetsController />
      <PlanetsTable />
    </VStack>
  );
};

export default Planets;
