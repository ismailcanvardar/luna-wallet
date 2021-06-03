import React, { useEffect } from "react";
import { ethers } from "ethers";
import useProviderStore from "../stores/useProviderStore";
import useWalletStore from "../stores/useWalletStore";
import { erc20_abi as send_abi } from "../utils/erc20_abi";

const useSendToken = () => {
  const { provider } = useProviderStore();

  function sendToken(wallet, contract_address, send_token_amount, to_address) {
    const send_account = wallet.address;
    let createdWallet = new ethers.Wallet(wallet.privateKey);
    let walletSigner = createdWallet.connect(provider);

    provider.getGasPrice().then((currentGasPrice) => {
      let gas_price = ethers.utils.hexlify(parseInt(currentGasPrice));
      console.log(`gas_price: ${gas_price}`);

      if (contract_address) {
        // general token send
        let contract = new ethers.Contract(
          contract_address,
          send_abi,
          walletSigner
        );

        // How many tokens?
        let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18);
        console.log(`numberOfTokens: ${numberOfTokens}`);

        // Send tokens
        contract.transfer(to_address, numberOfTokens).then((transferResult) => {
          console.dir(transferResult);
          alert("sent token");
        });
      } // ether send
      else {
        const tx = {
          from: send_account,
          to: to_address,
          value: ethers.utils.parseEther(send_token_amount),
          nonce: provider.getTransactionCount(send_account, "latest"),
          gasLimit: ethers.utils.hexlify(100000), // 100000
          gasPrice: gas_price,
        };
        console.dir(tx);
        try {
          walletSigner.sendTransaction(tx).then((transaction) => {
            console.dir(transaction);
            alert("Send finished!");
          });
        } catch (error) {
          alert("failed to send!!");
        }
      }
    });
  }

  return [sendToken];
};

export default useSendToken;
