import { Box, Center, Text, useColorModeValue } from "@chakra-ui/react";

export default function Display({ title, content }) {
  return (
    <Center py={6} m={2} flexBasis="30%">
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
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
            {content}
        </Text>
      </Box>
    </Center>
  );
}
