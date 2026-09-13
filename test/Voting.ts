import { expect } from "chai";
import { network } from "hardhat";
import Voting from "../ignition/modules/Voting.js";

const { ethers } = await network.connect();

describe("Voting", function () {
  it("should count a vote corectly", async function () {
    const voting = await ethers.deployContract("Voting", [["Alice", "Bob"]]);

    await voting.vote("Alice");

    expect(await voting.getVotes("Alice")).to.equal(1);
  });

  it("should start at zero vote", async function () {
    const voting = await ethers.deployContract("Voting", [["Alice", "Bob"]]);

    expect(await voting.getVotes("Bob")).to.equal(0);
  });

  it("should not allow double voting", async function () {
    const voting = await ethers.deployContract("Voting", [["Alice", "Bob"]]);

    await voting.vote("Alice");

    await expect(voting.vote("Bob")).to.be.revertedWith("You already voted");
  });

  it("should read all candidates", async function () {
    const voting = await ethers.deployContract("Voting", [["Alice", "Bob"]]);

    expect(await voting.getAllCandidates()).to.deep.equal(["Alice", "Bob"]);
  });

  it("should read all votes", async function () {
    const [account1, account2, account3, account4, account5] =
      await ethers.getSigners();
    const voting = await ethers.deployContract("Voting", [["Alice", "Bob"]]);

    await voting.vote("Bob");
    await voting.connect(account2).vote("Bob");
    await voting.connect(account3).vote("Alice");
    await voting.connect(account4).vote("Bob");
    await voting.connect(account5).vote("Alice");

    expect(await voting.getAllVotes()).to.equal(5);
  });
});
