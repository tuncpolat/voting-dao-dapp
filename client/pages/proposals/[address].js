import { useEffect, useState } from "react";
import Proposal from "../../lib/proposal";
import web3 from "../../lib/web3";
import Display from "../../components/Display";
import Date from "../../components/Date";
import Voters from "../../components/Voters";
import {
  Flex,
  Spinner,
  Heading,
  Text,
  Box,
  Stack,
  Button,
  Input,
  useToast 
} from "@chakra-ui/react";

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

function ProposalShow({ address }) {
  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [handlingTrx, setHandlingTrx] = useState(false);
  const [voteCounter, setVoteCounter] = useState(1)
  const [proxyCounter, setProxyCounter] = useState(1)
  const [proxyAddress, setProxyAddress] = useState("")
  const [balance, setBalance] = useState(null)
  const toast = useToast()


  const pickWinner = async () => {
    setHandlingTrx(true)
    try {
      const accounts = await web3.eth.getAccounts()
      const proposal = Proposal(address);
      await proposal.methods.pickWinner().send({from: accounts[0]})
        .on("receipt", (receipt) => {
          const appovs = receipt.events.Winner.returnValues._approvals;
          const objections = receipt.events.Winner.returnValues._objections;
          const won = receipt.events.Winner.returnValues._won;
          toast({
            title: 'Proposal has successfully ended.',
            description: `The proposal is ${won ? "accepted" : "rejected"} by ${appovs} for votes against ${objections} against votes.`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        })
    } catch (error) {
      setErrorMessage("Ooops, something went wrong!");
    }

    setHandlingTrx(false)
    
  }

  const vote = async (_vote, _amount) => {
    setHandlingTrx(true)
    try {
      const accounts = await web3.eth.getAccounts()
      const proposal = Proposal(address);
      await proposal.methods.vote(_vote, _amount).send({
        from: accounts[0],
      }).on("receipt", (receipt) => {
        const participantsVote = receipt.events.VoteDelivery.returnValues._participantsVote;
        const _amount = receipt.events.VoteDelivery.returnValues._amount;
        toast({
          title: 'Your vote has been admitted.',
          description: `You voted for ${participantsVote == 0 ? "YES" : "NO"} with ${_amount} voting rights.`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      })
    } catch (error) {
      setErrorMessage("Ooops, something went wrong!");
    }
    setHandlingTrx(false)
  }

  const getBalance = async () => {
    const accounts = await web3.eth.getAccounts()
    const proposal = Proposal(address);
    const data = await proposal.methods.balanceOf(accounts[0]).call();
    setBalance(data)
  }

  const transferVotingRights = async () => {
    setErrorMessage("");
    setHandlingTrx(true)
    try {
      const accounts = await web3.eth.getAccounts()
      const proposal = Proposal(address);
      await proposal.methods.transfer(proxyAddress, proxyCounter).send({
        from: accounts[0],
      }).on("receipt", (receipt) => {
        const to = receipt.events.Transfer.returnValues.to;
        const value = receipt.events.Transfer.returnValues.value;
        toast({
          title: 'Transfering votes successfully.',
          description: `You transfered ${value} votes to ${to} successfully.`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      })
    } catch (error) {
      setErrorMessage("Ooops, something went wrong!");
    }
    setHandlingTrx(false)
    setProxyCounter(1)
    setProxyAddress("")
  }

  useEffect(() => {
    const fetchProposal = async () => {
      if (address) {
        setLoading(true);
        const proposal = Proposal(address);
        const data = await proposal.methods.getSummary().call();
        setProposal({
          manager: data[0],
          title: data[1],
          description: data[2],
          votingEnd: data[3],
          completed: data[4],
          accpepted: data[5],
          approvalsCount: data[6],
          objectionCount: data[7],
          votersCount: data[8],
          votersList: data[9],
        });
      }

      setLoading(false);
    };

    fetchProposal();
  }, [address]);

  if (loading) {
    return (
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Spinner />
      </Flex>
    );
  }

  return (
    <>
      <Stack
        as={Box}
        textAlign={"center"}
        spacing={{ base: 8, md: 4 }}
        py={{ base: 20, md: 36 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "4xl", md: "4xl" }}
        >
          {proposal?.title}
        </Heading>
        <Text color={"gray.500"}>{proposal?.description}</Text>
        <Voters title={"Approved voters list"} voters={proposal?.votersList} />
        <Flex justify="center">
          {handlingTrx ? <Spinner /> : 
              <Stack spacing={6}>
                <Heading size="small">Voting</Heading>
                <Stack direction={['column', 'row']} spacing={6}>
                  <NumberInput 
                    value={voteCounter} 
                    onChange={value => setVoteCounter(value)} 
                    min={1} 
                    step={1}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <Button onClick={() => vote("0", voteCounter)} colorScheme='green'>
                    YES
                  </Button>
                  <Button onClick={() => vote("1", voteCounter)} colorScheme='red'>
                    NO
                  </Button>
                </Stack>

                <Heading size="small">Proxy Voting</Heading>

                <Flex direction="row" justify="space-between">
                  <Button color="white" bg={"#6DA5EA"} _hover={{bg: "blue.300"}} onClick={getBalance}>
                    Check your balance
                  </Button>
                  <Flex flex="50%" display="flex" align="center" justify="center"  ml={6} borderRadius={6} border="1px solid black">
                    {balance}
                  </Flex>
                </Flex>

                <Flex  justify="space-between" align="center">
                  <Text>Transfer</Text>
                  <NumberInput 
                    value={proxyCounter} 
                    onChange={value => setProxyCounter(value)} 
                    min={1} 
                    step={1}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>

                <Flex justify="space-between" align="center">
                  <Text>To</Text>
                  <Input value={proxyAddress} onChange={(e) => setProxyAddress(e.target.value)} ml={6} placeholder='Address' />
                </Flex>

                <Button onClick={transferVotingRights} color="white" bg={"#6DA5EA"} _hover={{bg: "blue.300"}}>
                  Transfer {proxyCounter} Voting Right{proxyCounter > 1 ? "s" : "" }
                </Button>


                <Heading size="small">Pick the Winner</Heading>

                <Button onClick={pickWinner} color="white" bg={"#6DA5EA"} _hover={{bg: "blue.300"}}>
                  Pick Winner
                </Button>

              </Stack>
          } 
        </Flex>
          
        {errorMessage ? (
            <Box bg="tomato" w="100%" p={2} color="white" fontSize="xs">
              {errorMessage}
            </Box>
          ) : (
            ""
        )}
        <Flex align={"flex-start"} justify={"flex-start"} w="full" wrap="wrap">
          <Display title={"Manager"} content={proposal?.manager} />
          <Date
            title={"Voting ends on"}
            date={proposal?.votingEnd}
          />
          <Display
            title={"Proposal is"}
            content={proposal?.completed ? "already closed" : "still open"}
          />
          {proposal?.completed ? (
            <Display
              title={"Proposal is"}
              content={proposal?.accpepted ? "accepted" : "rejected"}
            />
          ) : (
            ""
          )}
          <Display
            title={"Approvers Count"}
            content={proposal?.approvalsCount}
          />
          <Display
            title={"Objection Count"}
            content={proposal?.objectionCount}
          />
        </Flex>
      </Stack>
    </>
  );
}

export async function getServerSideProps({ query }) {
  return {
    props: { address: query.address }, // will be passed to the page component as props
  };
}

export default ProposalShow;
