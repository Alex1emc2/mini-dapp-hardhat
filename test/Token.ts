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

  it("should not allow transfer, when have 0 token", async function () {
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

  it("should approve, allowance, and transferFrom is running successfuly", async function () {
    const [bobAccount, aliceAccount, charlieAccount] =
      await ethers.getSigners();
    const exchange = await ethers.deployContract("Token", [1000]);

    await exchange.connect(bobAccount).transfer(aliceAccount, 50);
    await exchange.connect(aliceAccount).approve(bobAccount, 50);
    await exchange
      .connect(bobAccount)
      .transferFrom(aliceAccount, charlieAccount, 50);

    expect(await exchange.getTokens(charlieAccount)).to.equal(50);
    expect(await exchange.getTokens(aliceAccount)).to.equal(0);
    expect(await exchange.getTokens(bobAccount)).to.equal(950);
  });

  it("should not allow to allowance, when have 0 token", async function () {
    const [bobAccount, aliceAccount, charlieAccount] =
      await ethers.getSigners();
    const exchange = await ethers.deployContract("Token", [1000]);

    await expect(
      exchange.connect(aliceAccount).approve(bobAccount, 50),
    ).to.revertedWith("You didn't have enough tokens to allowance!!");

    expect(await exchange.getTokens(charlieAccount)).to.equal(0);
    expect(await exchange.getTokens(aliceAccount)).to.equal(0);
    expect(await exchange.getTokens(bobAccount)).to.equal(1000);
  });

  it("should not allow to transferFrom, when spender have 0 token", async function () {
    const [bobAccount, aliceAccount, charlieAccount] =
      await ethers.getSigners();
    const exchange = await ethers.deployContract("Token", [1000]);

    await exchange.connect(bobAccount).transfer(aliceAccount, 50);
    await exchange.connect(aliceAccount).approve(bobAccount, 50);
    await exchange
      .connect(bobAccount)
      .transferFrom(aliceAccount, charlieAccount, 30);
    await exchange
      .connect(bobAccount)
      .transferFrom(aliceAccount, charlieAccount, 20);

    await expect(
      exchange
        .connect(bobAccount)
        .transferFrom(aliceAccount, charlieAccount, 50),
    ).to.revertedWith("You didn't have enough tokens!!");

    expect(await exchange.getTokens(charlieAccount)).to.equal(50);
    expect(await exchange.getTokens(aliceAccount)).to.equal(0);
    expect(await exchange.getTokens(bobAccount)).to.equal(950);
  });

  it("should not allow to transferFrom, when owner have 0 token", async function () {
    const [bobAccount, aliceAccount, charlieAccount, joshAccount] =
      await ethers.getSigners();
    const exchange = await ethers.deployContract("Token", [1000]);

    await exchange.connect(bobAccount).transfer(aliceAccount, 50);
    await exchange.connect(aliceAccount).approve(bobAccount, 50);
    await exchange
      .connect(bobAccount)
      .transferFrom(aliceAccount, charlieAccount, 30);
    await exchange.connect(aliceAccount).transfer(joshAccount, 20);
    await expect(
      exchange
        .connect(bobAccount)
        .transferFrom(aliceAccount, charlieAccount, 20),
    ).to.revertedWith("Owner didn't have enough tokens!!");

    expect(await exchange.getTokens(joshAccount)).to.equal(20);
    expect(await exchange.getTokens(charlieAccount)).to.equal(30);
    expect(await exchange.getTokens(aliceAccount)).to.equal(0);
    expect(await exchange.getTokens(bobAccount)).to.equal(950);
  });
});
