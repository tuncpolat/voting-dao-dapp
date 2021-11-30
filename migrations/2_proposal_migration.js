const ProposalFactory = artifacts.require("ProposalFactory");

module.exports = function (deployer) {
  deployer.deploy(ProposalFactory);
};
