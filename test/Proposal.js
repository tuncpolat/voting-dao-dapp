const ProposalFactory = artifacts.require("ProposalFactory");
const Proposal = artifacts.require("Proposal");

contract("Proposal", async accounts => {
  let factory;
  let campaignAddress;
  let campaign;

  beforeEach(async () => {
    factory = await ProposalFactory.deployed();
    await factory.createProposal("Hello Word Proposal", "Some Description", [accounts[0], accounts[1]], "10");
    [campaignAddress] = await factory.getDeployedProposals();
    campaign = await Proposal.at(campaignAddress)
  });

  it("deploys a factory and a proposal", async () => {
    assert.ok(factory.address)
    assert.ok(campaign.address)
  })

  it("marks caller as the proposal manager", async () => {
    const manager = await campaign.manager();
    assert.strictEqual(accounts[0], manager);
  });
});