// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract AssetTransfer is ReentrancyGuard{
   
    event ERC20TransferInitiated(address indexed from, address indexed to, uint256 amount);
    event ERC721TransferInitiated(address indexed from, address indexed to, uint256 tokenId);
    
    event ERC20TransferCompleted(address indexed from, address indexed to, uint256 amount);
    event ERC721TransferCompleted(address indexed from, address indexed to, uint256 tokenId);

    // ERC-20 token transfer function
    function transferERC20(IERC20 token, address to, uint256 amount) public nonReentrant {
        emit ERC20TransferInitiated(msg.sender, to, amount);
        require(to != address(0), "Cannot transfer to the zero address");
        require(token.transferFrom(msg.sender, to, amount), "ERC20 transfer failed");
        emit ERC20TransferCompleted(msg.sender, to, amount);
    }

    // ERC-721 token transfer function
    function transferERC721(IERC721 token, address to, uint256 tokenId) public nonReentrant {
        emit ERC721TransferInitiated(msg.sender, to, tokenId);
        require(to != address(0), "Cannot transfer to the zero address");
        token.safeTransferFrom(msg.sender, to, tokenId);
        emit ERC721TransferCompleted(msg.sender, to, tokenId);
    }
}