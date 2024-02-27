const { ethers } = require('ethers');
require('dotenv').config();

// Setup provider and wallet
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Address AssetTransfer Contract
const assetTransferAddress = 'ASSET_TRANSFER_CONTRACT_ADDRESS';

// AssetTransfer Contract ABI
const assetTransferABI = [
  "function transferERC20(address token, address to, uint256 amount) public",
  "function transferERC721(address token, address to, uint256 tokenId) public",
 
  "event ERC20TransferInitiated(address indexed from, address indexed to, uint256 amount)",
  "event ERC721TransferInitiated(address indexed from, address indexed to, uint256 tokenId)"
];


const assetTransferContract = new ethers.Contract(assetTransferAddress, assetTransferABI, wallet);


async function signAndSendERC20(tokenAddress, to, amount) {
    const tokenContract = new ethers.Contract(tokenAddress, ['function approve(address spender, uint256 amount)', 'function transferFrom(address sender, address recipient, uint256 amount)'], wallet);

  
    let approveTx = await tokenContract.connect(wallet).approve(assetTransferAddress, amount);
    await approveTx.wait();

  
    let transferTx = await assetTransferContract.transferERC20(tokenAddress, to, amount);
    await transferTx.wait();

    return transferTx;
}


async function signAndSendERC721(tokenAddress, to, tokenId) {
    const tokenContract = new ethers.Contract(tokenAddress, ['function approve(address to, uint256 tokenId)', 'function safeTransferFrom(address from, address to, uint256 tokenId)'], wallet);

 
    let approveTx = await tokenContract.connect(wallet).approve(assetTransferAddress, tokenId);
    await approveTx.wait();


    let transferTx = await assetTransferContract.transferERC721(tokenAddress, to, tokenId);
    await transferTx.wait();

    return transferTx;
}

module.exports = { signAndSendERC20, signAndSendERC721 };