import React, { useState } from "react";
import useProviderStore from "../stores/useProviderStore";
import useWalletStore from "../stores/useWalletStore";
import { ethers } from "ethers";
import defaultTokens from "../constants/defaultTokens.json";
import useBalanceStore from "../stores/useBalanceStore";
import { erc20_abi } from "../utils/erc20_abi";

function useGetTokenBalances() {
  const { provider } = useProviderStore();
  const { wallet } = useWalletStore();
  // const signer = wallet.walletInstance.connect(provider);
  const { setTokenBalances, setEthBalance } = useBalanceStore();

  const getTokenBalance = async (address) => {
    // const erc20 = new ethers.Contract(address, abi, provider);
    // const balance = await erc20.balanceOf(wallet.address);
    // console.log(ethers.utils.formatEther(balance));
    // return balance;
  };

  const getEthBalance = async () => {
    let balance = await provider.getBalance(wallet.address);
    setEthBalance(ethers.utils.formatEther(balance));
  };

  const getMultipleTokenBalances = async () => {
    const promises = defaultTokens.map(async (token) => {
      const erc20 = new ethers.Contract(token.contract_address, erc20_abi, provider);
      const balance = await erc20.balanceOf(wallet.address);
      return ethers.utils.formatUnits(balance, token.decimals);
    });

    const balances = await Promise.all(promises);
    console.log(balances);
    setTokenBalances(balances);
  };

  return [getTokenBalance, getMultipleTokenBalances, getEthBalance];
}

export default useGetTokenBalances;
