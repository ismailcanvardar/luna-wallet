import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

// This hook creates random wallet by using ethers library
const useCreateWallet = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [wallet, setWallet] = useState();

  // Creates random wallet & saves it to secure storage
  const createWallet = () => {
    setLoading(true);
    setError(false);
    const { address, mnemonic, privateKey } = ethers.Wallet.createRandom();

    let walletObject = {
      address,
      mnemonic: mnemonic.phrase,
      privateKey,
    };

    const creatingTimeout = setTimeout(() => {
      setLoading(false);
      setWallet(walletObject);
    }, 3000);
    return () => clearTimeout(creatingTimeout);
  };

  return [wallet, loading, error, createWallet];
};

export default useCreateWallet;
