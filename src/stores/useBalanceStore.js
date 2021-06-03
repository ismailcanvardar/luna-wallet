import create from "zustand";

const useBalanceStore = create((set) => ({
  ethBalance: null,
  tokenBalances: null,
  setEthBalance: async (balance) => {
    set({ ethBalance: balance });
  },
  setTokenBalances: (balances) => {
    set({ tokenBalances: balances });
  },
}));

export default useBalanceStore;
