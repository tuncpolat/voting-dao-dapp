# Voting DAO

Project from the class "Smart Contracts and Decentralized Blockchain Applications" at the University of Basel.

## Installation

On root directory install node modules

```bash
npm install
```
Also do the same with the client. Switch to client directory and use the same command as above.

To use it, you also have to have environment variables in your .env file, which is stored in the root directory.

```python
ACCOUNT_MNEMONIC = yourmnemonic
INFURA_TOKEN = infuratoken
```

## Usage

To get the DApp running you have to deploy your own contract on a ropsten testnetwork or you can use the current deployed contract, which is stored in /client/lib/factory.

To run the DApp, just head up to the client directory and run

```python
npm run dev
```

Now you should see the see on localhost:3000 the application.

## Deploy Own Contract

Run

```
truffle compile
```
to compile the contract. Next, run

```
truffle migrate --network ropsten
```

Now you should get the contract address of the factory contract. Copy this address to /client/lib/factory.js file.

## Infura

Open an account and create a project. Go to the settings of the project and set the network to ropsten. Copy the token (https://ropsten.infura.io/ws/v3/hereIsYourToken) and insert it into the .env file you created before, so you can access the contract on the ropsten testnetwork through the Infura API. 

## Disclosure

To learn Solidity and the concepts behind it we attended the class from Fabian Schär "Smart Contracts and Decentralized Blockchain Applications" and a course on Udemy "Ethereum and Solidity: The Complete Developer's Guide" by Stephen Grider.
Concepts like "ProposalFactory", "getSummary" and how to implement a front-end with Nextjs were demonstrated in the Udemy course. Concepts like block.timestamp was demonstrated in Fabian Schär's course.
Idea and the code are original from the group work. We are not aware of any copies.

## License
[MIT](https://choosealicense.com/licenses/mit/)