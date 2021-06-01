import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

// This hook imports wallet with the given mnemonic phrases
const useImportWallet = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [wallet, setWallet] = useState();

  // Imports wallet with the given mnemonic
  const importWallet = (givenMnemonic) => {
    try {
      setLoading(true);
      setError(false);
      const { address, mnemonic, privateKey } = ethers.Wallet.fromMnemonic(
        givenMnemonic.toString()
      );

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
    } catch (err) {
      setError(true);
      setLoading(false);
      setWallet(null);
    }
  };

  return [wallet, loading, error, importWallet];
};

export default useImportWallet;
