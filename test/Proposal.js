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

  it("assigns equal amounts of tokens", async () => {
    let amountAccountOne = await campaign.balanceOf(accounts[0])
    let amountAccountTwo = await campaign.balanceOf(accounts[0])
    assert.strictEqual(amountAccountOne.words[0], 1)
    assert.strictEqual(amountAccountTwo.words[0], 1)
  }) 

  it("transfers proxy vote", async () => {
    await campaign.transfer(accounts[1], "1") // transfer votes
    let amountAccountOne = await campaign.balanceOf(accounts[0])
    let amountAccountTwo = await campaign.balanceOf(accounts[1])
    assert.strictEqual(amountAccountOne.words[0], 0)
    assert.strictEqual(amountAccountTwo.words[0], 2)
  })

  
});