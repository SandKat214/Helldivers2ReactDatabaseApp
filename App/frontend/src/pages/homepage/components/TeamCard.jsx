import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Icon,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdAccessTimeFilled } from "react-icons/md";
import { IoPerson, IoPlanet } from "react-icons/io5";
import { IoSpeedometer } from "react-icons/io5";
import { SiApplearcade } from "react-icons/si";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { format } from "date-fns";

const DetailField = ({ icon, label, value }) => {
  return (
    <VStack alignItems="center" h="100%">
      <HStack>
        <Icon as={icon} color="red.500" />
        <Text fontWeight="semibold" fontSize="md">
          {label}
        </Text>
      </HStack>
      <Text fontSize="xs" textAlign="center">
        {value}
      </Text>
    </VStack>
  );
};

const TeamCard = ({ team }) => {
  if (team.teamMeet == undefined) {
    // handle edge case where react batching is being weird
    return <></>;
  }
  return (
    <Card backgroundColor="background.600">
      <CardHeader p={0}>
        <Image
          src={
            team.teamImage ??
            "https://assetsio.gnwcdn.com/helldivers-2-trailer-screenshot-header.png?width=1600&height=900&fit=crop&quality=100&format=png&enable=upscale&auto=webp"
          }
          h="150px"
          w="100%"
          objectFit="cover"
          objectPosition="0% 0%"
          borderTopRadius="md"
        />
      </CardHeader>
      <CardBody>
        <VStack alignItems="stretch" gap={10}>
          <HStack justifyContent="space-between" color="white">
            <Heading fontSize="lg">{team.teamTitle}</Heading>
            <Popover trigger="hover" placement="right" size="large">
              <PopoverTrigger>
                <span>
                  <IoIosHelpCircleOutline />
                </span>
              </PopoverTrigger>
              <PopoverContent
                backgroundColor="background.300"
                borderColor="gray.700"
                w="400px"
              >
                <PopoverBody>
                  <VStack alignItems="stretch">
                    <HStack
                      justifyContent="stretch"
                      h="100%"
                      alignItems="stretch"
                    >
                      <DetailField
                        icon={IoPlanet}
                        label="Planet"
                        value={team.planetName}
                      />
                      <DetailField
                        icon={SiApplearcade}
                        label="Mission"
                        value={team.missionName}
                      />
                      <DetailField
                        icon={MdAccessTimeFilled}
                        label="Meeting Time"
                        value={format(team.teamMeet, "MM/dd/yyyy HH:mm")}
                      />
                    </HStack>
                    <HStack justifyContent="center" gap={10}>
                      <DetailField
                        icon={IoSpeedometer}
                        label="Difficulty"
                        value={team.teamDifficulty}
                      />
                      <DetailField
                        icon={IoChatbubbleEllipses}
                        label="Chat Enabled"
                        value={team.teamChat ? "True" : "False"}
                      />
                    </HStack>
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>
          <HStack justifyContent="flex-end">
            <Badge
              colorScheme="red"
              backgroundColor="red.500"
              color="white"
              display="flex"
              alignItems="center"
              gap={1}
            >
              Member Count: {team.teamCount} <Icon as={IoPerson} />
            </Badge>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default TeamCard;
