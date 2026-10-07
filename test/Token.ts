import { network } from "hardhat";
import { expect } from "chai";

const { ethers } = await network.connect();

describe("Exchange", function () {
  it("should owner start from 1000 from supply. but, other address is start from zero", async function () {
    const [owner, account2, account3] = await ethers.getSigners();
    const exchange = await ethers.deployContract("Token", [1000]);

    expect(await exchange.getTokens(owner)).to.deep.equal(1000);
    expect(await exchange.getTokens(account2)).to.deep.equal(0);
    expect(await exchange.getTokens(account3)).to.deep.equal(0);
  });

  it("should transfer is running successfuly", async function () {
    const [owner, account2, account3] = await ethers.getSigners();
    const exchange = await ethers.deployContract("Token", [1000]);

    await exchange.connect(owner).transfer(account2, 1);

    expect(await exchange.getTokens(owner)).to.deep.equal(999);
    expect(await exchange.getTokens(account2)).to.deep.equal(1);
    expect(await exchange.getTokens(account3)).to.deep.equal(0);
  });

  it("should not allow transfer when token = 0", async function () {
    const [owner, account2, account3] = await ethers.getSigners();
    const exchange = await ethers.deployContract("Token", [1000]);

    await exchange.connect(owner).transfer(account2, 5);

    expect(await exchange.getTokens(owner)).to.deep.equal(995);
    expect(await exchange.getTokens(account2)).to.deep.equal(5);
    expect(await exchange.getTokens(account3)).to.deep.equal(0);
    await expect(
      exchange.connect(account3).transfer(account2, 10),
    ).to.revertedWith("You didn't have enough tokens!!");
  });
});
