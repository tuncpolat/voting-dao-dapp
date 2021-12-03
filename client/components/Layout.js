import Header from "./Header";
import { Container } from "@chakra-ui/react";
import Head from "next/head";

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Voting DAO</title>
        <meta
          name="description"
          content="Voting DAO University of Basel Project"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="container.xl">
        <Header />
        <main>{children}</main>
      </Container>
    </>
  );
}

export default Layout;
