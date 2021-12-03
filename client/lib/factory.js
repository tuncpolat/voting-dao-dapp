import web3 from "./web3";
import ProposalFactory from "../../build/contracts/ProposalFactory.json";

const instance = new web3.eth.Contract(
  ProposalFactory.abi,
  "0xBadEABE2a1Efe1b5eAA7BeC3AADB040F9E202F96" // old: "0xD746e23618E7724b3BFa2F7135dEA722B4a37F54"
);

export default instance;
