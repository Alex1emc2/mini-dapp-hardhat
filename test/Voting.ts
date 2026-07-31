import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("Voting", function () {
  it("should count a vote corectly", async function () {
    const voting = await ethers.deployContract("Voting");

    await voting.vote("Alice");

    expect(await voting.getVotes("Alice")).to.equal(1);
  });

  it("should start at zero vote", async function () {
    const voting = await ethers.deployContract("Voting");

    expect(await voting.getVotes("Bob")).to.equal(0);
  });

  it("should not allow double voting", async function () {
    const voting = await ethers.deployContract("Voting");

    await voting.vote("Alice");

    await expect(voting.vote("Bob")).to.be.revertedWith("You already voted");
  });
});
