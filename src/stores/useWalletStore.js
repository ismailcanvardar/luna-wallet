import create from "zustand";
import * as SecureStore from "expo-secure-store";

const useWalletStore = create((set) => ({
  // Status for saving condition
  isWalletSaving: false,
  // Status for fetching condition
  isWalletFetching: true,
  // Status for deleting condition
  isWalletDeleting: false,
  // Status for wallet availability
  isWalletAvailable: null,
  // Contains wallet data
  wallet: {},
  // Gets wallet from secure storage
  getWallet: () => {
    SecureStore.getItemAsync("wallet")
      .then((data) => {
        if (data) {
          set({
            wallet: JSON.parse(data),
            isWalletFetching: false,
            isWalletAvailable: true,
          });
        } else {
          set({ isWalletAvailable: false, isWalletFetching: false });
        }
      })
      .catch((err) => console.log(err));
  },
  // Delete wallet data from secure storage & changes wallet status
  deleteWallet: () => {
    set({ isWalletDeleting: true });
    SecureStore.deleteItemAsync("wallet")
      .then(() => {
        set({
          isWalletAvailable: false,
          wallet: {},
          isWalletDeleting: false,
        });
      })
      .catch((err) => console.log(err));
  },
  // Saves wallet to secure storage
  saveWallet: (walletObject) => {
    set({ isWalletSaving: true });
    SecureStore.setItemAsync("wallet", JSON.stringify(walletObject))
      .then(() => {
        set({ isWalletSaving: false });
      })
      .catch((err) => console.log(err));
  },
}));

export default useWalletStore;
