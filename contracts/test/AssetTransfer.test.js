const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AssetTransfer", function () {
  let assetTransfer, erc20Token, erc721Token, owner, addr1;

  beforeEach(async function () {
    // Deploy the AssetTransfer contract
    const AssetTransfer = await ethers.getContractFactory("AssetTransfer");
    assetTransfer = await AssetTransfer.deploy();
    await assetTransfer.deployed();

    // Setup for ERC20 and ERC721 tokens
    const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
    erc20Token = await ERC20Mock.deploy("TestToken", "TT", owner.address, 1000);
    await erc20Token.deployed();

    const ERC721Mock = await ethers.getContractFactory("ERC721Mock");
    erc721Token = await ERC721Mock.deploy("TestNFT", "TNFT");
    await erc721Token.deployed();

    // Mint an NFT
    await erc721Token.mint(owner.address, 1);

    [owner, addr1] = await ethers.getSigners();
  });

  describe("ERC20 transfers", function () {
    it("Should emit ERC20TransferInitiated and ERC20TransferCompleted events", async function () {
      // Owner approves AssetTransfer contract to spend tokens
      await erc20Token.approve(assetTransfer.address, 100);

      // Expect the transfer to emit events
      await expect(assetTransfer.transferERC20(erc20Token.address, addr1.address, 100))
        .to.emit(assetTransfer, "ERC20TransferInitiated")
        .withArgs(owner.address, addr1.address, 100)
        .to.emit(assetTransfer, "ERC20TransferCompleted")
        .withArgs(owner.address, addr1.address, 100);
    });
  });

  describe("ERC721 transfers", function () {
    it("Should emit ERC721TransferInitiated and ERC721TransferCompleted events", async function () {
      // Owner approves AssetTransfer contract to transfer NFT
      await erc721Token.approve(assetTransfer.address, 1);

      // Expect the transfer to emit events
      await expect(assetTransfer.transferERC721(erc721Token.address, addr1.address, 1))
        .to.emit(assetTransfer, "ERC721TransferInitiated")
        .withArgs(owner.address, addr1.address, 1)
        .to.emit(assetTransfer, "ERC721TransferCompleted")
        .withArgs(owner.address, addr1.address, 1);
    });
  });
});