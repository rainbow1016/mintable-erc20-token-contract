import { ethers } from "hardhat";
import { Contract, ContractFactory, Signer } from "ethers";
import { expect } from "chai";

describe("TUSDCphi", function () {
  let token: Contract;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const Token = (await ethers.getContractFactory(
      "TUSDCphi"
    )) as ContractFactory;
    token = (await Token.deploy(await owner.getAddress())) as Contract;
    // await token.deployed();
  });

  it("should have correct name, symbol, and decimals", async function () {
    expect(await token.name()).to.equal("Test USDCphi");
    expect(await token.symbol()).to.equal("TUSDCphi");
    expect(await token.decimals()).to.equal(18);
  });

  it("should mint tokens", async function () {
    const initialBalance = ethers.parseEther("100");
    await token.connect(owner).mint(await addr1.getAddress(), initialBalance);

    expect(await token.balanceOf(await addr1.getAddress())).to.equal(
      initialBalance
    );
  });

  it("should only allow owner to mint tokens", async function () {
    const initialBalance = ethers.parseEther("100");

    await expect(
      token.connect(addr1).mint(await addr2.getAddress(), initialBalance)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
