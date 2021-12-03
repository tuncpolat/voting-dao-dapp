import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
} from "@chakra-ui/react";

import NextLink from "next/link";

export default function CallToActionWithAnnotation() {
  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Voting
            <Text as={"span"} color={"#6DA5EA"}>
              DAO
            </Text>
          </Heading>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <NextLink href="/proposals/new">
              <Button
                color="white"
                bg={"#6DA5EA"}
                rounded={"full"}
                px={6}
                href={"/proposals/new"}
                _hover={{
                  bg: "blue.300",
                }}
              >
                Create Proposal
              </Button>
            </NextLink>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
