import create from "zustand";

const useTokenStore = create((set) => ({
  dataHouse: {},
  fetch: async (url) => {
    const res = await fetch(url);
    set({ dataHouse: await res.json() });
  },
}));
