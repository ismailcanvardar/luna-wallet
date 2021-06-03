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
    const createdWallet = ethers.Wallet.createRandom();

    let walletObject = {
      address: createdWallet.address,
      mnemonic: createdWallet.mnemonic.phrase,
      privateKey: createdWallet.privateKey,
      walletInstance: createdWallet,
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
