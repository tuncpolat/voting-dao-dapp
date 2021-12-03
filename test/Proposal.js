const ProposalFactory = artifacts.require("ProposalFactory");
const Proposal = artifacts.require("Proposal");

contract("Proposal", async accounts => {
  let factory;
  let campaignAddress;
  let campaign;

  before(async () => {
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

  it("can't transfer votes to outside addresses", async () => {
    try {
      await campaign.transfer(accounts[2], "1") // transfer votes
      assert(false)
    } catch (error) {
      assert(error)
    }
  })
});

contract("Proposal", async accounts => {
  let factory;
  let campaignAddress;
  let campaign;

  before(async () => {
    factory = await ProposalFactory.deployed();
    await factory.createProposal("Hello Word Proposal", "Some Description", [accounts[0], accounts[1]], "10");
    [campaignAddress] = await factory.getDeployedProposals();
    campaign = await Proposal.at(campaignAddress)
  });

  it("votes for yes and token is burned", async () => {
    let amountAccountOne = await campaign.balanceOf(accounts[0])
    await campaign.vote("0", "1") // vote yes
    let approvalsCount = await campaign.approvalsCount()
    assert.strictEqual(approvalsCount.words[0], 1)
    amountAccountOne = await campaign.balanceOf(accounts[0])
    assert.strictEqual(amountAccountOne.words[0], 0)
  })

  it("votes for no and token is burned", async () => {
    let amountAccountTwo = await campaign.balanceOf(accounts[1])
    await campaign.vote("1", "1", { from: accounts[1] }) // vote no
    let objectionsCount = await campaign.approvalsCount()
    assert.strictEqual(objectionsCount.words[0], 1)
    amountAccountTwo = await campaign.balanceOf(accounts[1])
    assert.strictEqual(amountAccountTwo.words[0], 0)
  })

  it("should complete contract and not accept proposal", async () => {
    await campaign.pickWinner();
    let completed = await campaign.completed()
    let accepted = await campaign.accepted()
    assert(completed)
    assert(!accepted)
  })
});