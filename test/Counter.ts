import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("Counter", function () {
  it("should a counter start from zero", async function () {
    const counter = await ethers.deployContract("Counter");

    expect(await counter.getCount()).to.equal(0);
  });

  it("should counter is running successfuly", async function () {
    const [owner, account2, account3] = await ethers.getSigners();
    const counter = await ethers.deployContract("Counter");

    await counter.connect(owner).addCount(5);
    await counter.connect(account2).addCount(2);
    await counter.connect(account3).addCount(1);

    expect(await counter.getCount()).to.equal(8);
  });

  it("should counter decreament can't be under 0", async function () {
    const [owner, account2, account3] = await ethers.getSigners();
    const counter = await ethers.deployContract("Counter");

    await counter.addCount(2);
    await counter.connect(account2).decreament(1);
    await counter.addCount(5);
    await counter.connect(account3).decreament(4);
    await expect(counter.connect(account3).decreament(5)).to.revertedWith(
      "The counter can't under 0",
    );
    expect(await counter.getCount()).to.equal(2); // buktiin count TIDAK berubah
  });

  it("should counter decreament is running successfuly", async function () {
    const [owner, account2, account3] = await ethers.getSigners();
    const counter = await ethers.deployContract("Counter");

    await counter.addCount(5);
    await counter.connect(account2).decreament(2);
    await counter.connect(account3).decreament(1);

    expect(await counter.getCount()).to.equal(2);
  });

  it("should reset function running successfuly", async function () {
    const counter = await ethers.deployContract("Counter");

    await counter.reset();

    expect(await counter.getCount()).to.equal(0);
  });
});
