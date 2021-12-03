import {useEffect, useState} from "react"
import factory from "../lib/factory";
import Hero from "../components/Hero" 
import Card from "../components/Card"
import { Grid, GridItem, Container } from "@chakra-ui/react"

function Home() {

  const [proposalsList, setProposalsList] = useState([]);

  useEffect(() => {
    const getProposals = async () => {
      const proposals = await factory.methods.getDeployedProposals().call();
      setProposalsList(proposals);
    };

    getProposals();
  }, []);

  return (
    <>
        <Hero />
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {proposalsList.map((proposal) => {
            return (
              <Card proposal_address={proposal} />
            )
          })}
        </Grid>          
    </>
  )
}


export default Home