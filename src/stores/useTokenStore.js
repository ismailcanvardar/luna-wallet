import create from "zustand";
import { getTokens } from "../helpers/tokenDb";

const useWalletStore = create((set) => ({
  tokens: {},
  isFetching: false,
  fetchingError: false,
  getTokenList: () => {
    set({ isFetching: true });
    getTokens(
      (fetchedTokens) => {
        console.log(fetchedTokens);
        set({ isFetching: false, fetchingError: false, tokens: fetchedTokens });
      },
      (err) => {
        set({ fetchingError: true, isFetching: false });
      }
    );
  },
}));

export default useWalletStore;
