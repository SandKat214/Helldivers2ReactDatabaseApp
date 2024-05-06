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
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { MdAccessTimeFilled } from "react-icons/md";
import { IoPerson, IoPlanet } from "react-icons/io5";
import { IoSpeedometer } from "react-icons/io5";
import { SiApplearcade } from "react-icons/si";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaNoteSticky } from "react-icons/fa6";
import { IoIosHelpCircleOutline } from "react-icons/io";

const DetailField = ({ icon, label, value }) => {
  return (
    <VStack alignItems="center">
      <HStack>
        <Icon as={icon} color="red.500" />
        <Text fontWeight="semibold" fontSize="md">
          {label}
        </Text>
      </HStack>
      <Text fontSize="xs">{value}</Text>
    </VStack>
  );
};

const TeamCard = ({ data }) => {
  return (
    <Card backgroundColor="background.600">
      <CardHeader p={0}>
        <Image
          src={data.teamIcon}
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
            <Heading fontSize="lg">{data.teamName}</Heading>
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
                    <HStack justifyContent="space-between">
                      <DetailField
                        icon={IoPlanet}
                        label="Planet"
                        value={data.planetName}
                      />
                      <DetailField
                        icon={SiApplearcade}
                        label="Mission"
                        value={data.mission}
                      />
                      <DetailField
                        icon={MdAccessTimeFilled}
                        label="Meeting Time"
                        value={data.meetingTime}
                      />
                    </HStack>
                    <HStack justifyContent="center" gap={10}>
                      <DetailField
                        icon={IoSpeedometer}
                        label="Difficulty"
                        value={data.difficulty}
                      />
                      <DetailField
                        icon={IoChatbubbleEllipses}
                        label="Chat Enabled"
                        value={data.chatEnabled ? "True" : "False"}
                      />
                    </HStack>
                    {data.notes && (
                      <VStack alignItems="stretch">
                        <HStack>
                          <Icon as={FaNoteSticky} color="red.500" />
                          <Text>Notes:</Text>
                        </HStack>
                        <Text
                          borderWidth="1px"
                          borderColor="gray.700"
                          borderRadius="md"
                          p={2}
                          fontSize="xs"
                        >
                          {data.notes}
                        </Text>
                        <Text fontSize="2xs" color="gray.400">
                          Generic additional notes about the team
                        </Text>
                      </VStack>
                    )}
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
              Member Count: {data.memberCount} <Icon as={IoPerson} />
            </Badge>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default TeamCard;
