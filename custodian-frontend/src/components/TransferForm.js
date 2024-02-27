// components/TransferForm.js
import { useState } from 'react';
import { useAccount, useContract, useSigner } from 'wagmi';
import { ethers } from 'ethers';

const TransferForm = ({ contractAddress, contractABI }) => {
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const contract = useContract({
    addressOrName: contractAddress,
    contractInterface: contractABI,
    signerOrProvider: signer
  });

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [assetType, setAssetType] = useState('ERC20'); // 'ERC20' o 'ERC721'

  const handleTransfer = async () => {
    if (assetType === 'ERC20') {
      const tx = await contract.transferERC20(address, recipient, ethers.utils.parseEther(amount));
      await tx.wait();
    } else if (assetType === 'ERC721') {
      const tx = await contract.transferERC721(address, recipient, tokenId);
      await tx.wait();
    }
  };

  return (
    <div>
      <select value={assetType} onChange={(e) => setAssetType(e.target.value)}>
        <option value="ERC20">ERC20</option>
        <option value="ERC721">ERC721</option>
      </select>
      <input type="text" placeholder="Recipient Address" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
      {assetType === 'ERC20' ? (
        <input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      ) : (
        <input type="text" placeholder="Token ID" value={tokenId} onChange={(e) => setTokenId(e.target.value)} />
      )}
      <button onClick={handleTransfer}>Transfer</button>
    </div>
  );
};

export default TransferForm;