import React, { useState, useEffect } from "react";
import { addTokenToDb } from "../helpers/tokenDb";

// This hook adds new token & stores it in sqlite
const useAddToken = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [addedToken, setAddedToken] = useState(null);

  // Adds new token to sqlite by given contractAddress, tokenSymbol & decimals parameters
  const addNewToken = (contractAddress, tokenSymbol, decimals) => {
    setLoading(true);
    setError(false);
    addTokenToDb(contractAddress, tokenSymbol, decimals)
      .then(() => {
        setAddedToken({ contractAddress, tokenSymbol, decimals });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  return [addedToken, loading, error, addNewToken];
};

export default useAddToken;
