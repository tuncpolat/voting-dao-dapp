import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";

import NextLink from "next/link";

export default function Card({ proposal_address }) {
  return (
    <Center py={6}>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {proposal_address}
        </Text>

        <Stack mt={8} direction={"row"} spacing={4}>
          <NextLink href={`/proposals/${proposal_address}`}>
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              _focus={{
                bg: "gray.200",
              }}
            >
              View Proposal
            </Button>
          </NextLink>
        </Stack>
      </Box>
    </Center>
  );
}
