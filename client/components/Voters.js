import { Box, Center, Text, useColorModeValue } from "@chakra-ui/react";

export default function Voters({ title, voters }) {
  return (
    <Center py={6} m={2} flexBasis="25%">
      <Box
        maxW={"500px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {title}
        </Text>

        {voters?.map((voter) => {
          return (
            <Text
              fontSize="sm"
              textAlign={"center"}
              color={useColorModeValue("gray.700", "gray.400")}
              px={3}
              mb={3}
            >
              {voter}
            </Text>
          );
        })}
      </Box>
    </Center>
  );
}
