import { useState } from "react";
import factory from "../../lib/factory";
import web3 from "../../lib/web3";
import { useRouter } from "next/router";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Textarea,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";

function ProposalNew() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [minutes, setMinutes] = useState("60");
  const [address, setAddress] = useState("");
  const [addressList, setAddressList] = useState([]);
  const [addressIsInList, setAddressIsInList] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);
  const router = useRouter();

  const handleChangeAddress = (e) => {
    e.preventDefault();
    setAddressIsInList(false);
    const value = e.target.value;

    if (addressList.includes(value)) {
      setAddressIsInList(true);
    } else {
      setAddress(value);
    }
  };

  const handleAddAddress = () => {
    setAddressList((prevProps) => [...prevProps, address]);
    setAddress("");
  };

  const handleRemoveAddress = (address) => {
    setAddressList(addressList.filter((item) => item !== address));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsDeploying(true);
    console.log("Form Submit", title, description, minutes, addressList);
    try {
      const accounts = await web3.eth.getAccounts();

      await factory.methods
        .createProposal(title, description, addressList, minutes)
        .send({
          from: accounts[0],
        });

      router.push("/");
    } catch (error) {
      setErrorMessage(error.message);
    }

    setIsDeploying(false);
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Create a new proposal</Heading>
          <Text fontSize={"lg"} color={"gray.600"} textAlign={"center"}>
            and we will deploy this contract on the Ropsten Testnetwork for you
            ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="title" isRequired>
                <FormLabel>Title of your proposal</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl id="description" isRequired>
                <FormLabel>
                  Describe what the people are going to vote for. Phrase the
                  description so that the people can vote yes or no.
                </FormLabel>
                <Textarea
                  placeholder="Please describe the voting matter and the voting options YES or NO."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              <FormControl id="minutes" isRequired>
                <FormLabel>
                  How long should the proposal be online? (in minutes)
                </FormLabel>
                <NumberInput
                  step={1}
                  onChange={(valueString) => setMinutes(valueString)}
                  value={minutes}
                  min={5}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl id="adresses">
                <FormLabel>Voters addresses</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="address" />
                  <Input
                    type="text"
                    placeholder="0x..."
                    value={address}
                    onChange={handleChangeAddress}
                  />
                  <InputRightElement width="4.5rem">
                    <Button size="sm" onClick={handleAddAddress}>
                      Add
                    </Button>
                  </InputRightElement>
                </InputGroup>

                {addressIsInList ? (
                  <Text mt={2} fontSize="xs" color="tomato">
                    Address already in array
                  </Text>
                ) : (
                  ""
                )}

                {addressList.map((address) => {
                  return (
                    <Box
                      key={address}
                      w="100%"
                      p={1}
                      borderWidth="1px"
                      borderRadius="lg"
                      mt={2}
                      display="flex"
                      justifyContent="space-around"
                      alignItems="center"
                    >
                      <Text fontSize="xs">{address}</Text>
                      <IconButton
                        aria-label="remove"
                        icon={<DeleteIcon />}
                        onClick={() => handleRemoveAddress(address)}
                      />
                    </Box>
                  );
                })}
              </FormControl>
              <Stack spacing={4}>
                <Button
                  bg={"#6DA5EA"}
                  color={"white"}
                  _hover={{
                    bg: "blue.300",
                  }}
                  type="submit"
                  isLoading={isDeploying}
                  loadingText="Deploying contract"
                >
                  Create Proposal
                </Button>
                {errorMessage ? (
                  <Box bg="tomato" w="100%" p={2} color="white" fontSize="xs">
                    {errorMessage}
                  </Box>
                ) : (
                  ""
                )}
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

export default ProposalNew;
