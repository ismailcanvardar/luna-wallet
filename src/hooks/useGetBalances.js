import React, { useState } from "react";
import useProviderStore from "../stores/useProviderStore";
import useWalletStore from "../stores/useWalletStore";
import { ethers } from "ethers";
import defaultTokens from "../constants/defaultTokens.json";
import useBalanceStore from "../stores/useBalanceStore";

// A Human-Readable ABI; any supported ABI format could be used
const abi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (boolean)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

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
    const addresses = defaultTokens.map(function (a) {
      return a.contract_address;
    });
    const promises = addresses.map(async (token) => {
      const erc20 = new ethers.Contract(token, abi, provider);
      const balance = await erc20.balanceOf(wallet.address);
      return ethers.utils.formatEther(balance);
    });

    const balances = await Promise.all(promises);
    console.log(balances);
    setTokenBalances(balances);
  };

  return [getTokenBalance, getMultipleTokenBalances, getEthBalance];
}

export default useGetTokenBalances;
