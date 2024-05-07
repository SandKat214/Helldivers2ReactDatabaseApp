import { VStack } from "@chakra-ui/react";
import LanguagesTable from "./sections/LanguagesTable";
import LanguagesController from "./sections/LanguagesController";

const Languages = () => {
    return (
        <VStack gap={20} alignItems="center" w="100%">
            <LanguagesTable />
            <LanguagesController />
        </VStack>
    );
};

export default Languages;