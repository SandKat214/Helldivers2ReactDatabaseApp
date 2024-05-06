import { VStack } from "@chakra-ui/react";
import PlanetsTable from "./sections/PlanetsTable";
import PlanetsConrtoller from "./sections/PlanetsController";

const Planets = () => {
  return (
    <VStack gap={20} alignItems="center" w="100%">
      <PlanetsTable />
      <PlanetsConrtoller />
    </VStack>
  );
};

export default Planets;
