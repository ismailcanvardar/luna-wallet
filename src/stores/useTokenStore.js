import create from "zustand";

const useWalletStore = create((set) => ({
  // Status for saving condition
  isTokenSaving: false,
}));

export default useWalletStore;