

import styles from "@/styles/Home.module.css";
import TransferForm from "@/components/TransferForm";
import assetTransferABI from '@/ABI/assetTransferABI.json';

const inter = Inter({ subsets: ["latin"] });

const contractAddress = '0x...'; // CONTRACT ADDRESS

export default function Home() {
  return (
    <div>
      <h1>Start of Asset Transfer</h1>
      <TransferForm contractAddress={contractAddress} contractABI={assetTransferABI} />
    </div>
  );
}