import { VStack } from "@chakra-ui/react";
import PeopleTable from "./sections/PeopleTable";
import PeopleController from "./sections/PeopleController";

const People = () => {
  return (
    <VStack gap={20} alignItems="stretch" w="100%">
      <PeopleTable />
      <PeopleController />
    </VStack>
  );
};

export default People;
