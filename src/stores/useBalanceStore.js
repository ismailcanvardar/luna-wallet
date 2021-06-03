import create from "zustand";
import useGetTokenBalances from "../hooks/useGetTokenBalances";
import defaultTokens from "../constants/defaultTokens.json";

const useBalanceStore = create((set) => ({
  ethBalance: null,
  tokenBalances: null,
  setEthBalance: async () => {

  },
  setTokenBalances: (balances) => {
    set({ tokenBalances: balances });
  },
}));

export default useBalanceStore;
