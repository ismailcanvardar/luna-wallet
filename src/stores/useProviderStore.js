import create from "zustand";
import { ethers } from "ethers";

const useWalletStore = create((set) => ({
  provider: null,
  setProvider: async () => {
    const infuraProvider = new ethers.providers.InfuraProvider(
      "kovan",
      "b24258426a4b4425baaaca76826187c7"
    );

    set({ provider: infuraProvider });
  },
}));

export default useWalletStore;
