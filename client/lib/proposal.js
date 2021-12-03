import web3 from "./web3";
import Proposal from "../../build/contracts/Proposal.json";

export default (address) => {
  return new web3.eth.Contract(Proposal.abi, address);
};
