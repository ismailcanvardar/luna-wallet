import create from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useThemeStore = create((set) => ({
  themeMode: "light", // dark & light,
  setDefaultThemeMode: async () => {
    const foundTheme = await AsyncStorage.getItem("themeMode");

    if (!foundTheme) {
      await AsyncStorage.setItem("themeMode", "light");
      set({ themeMode: "light" });
    }
  },
  switchThemeMode: async (mode) => {
    await AsyncStorage.setItem("themeMode", mode);
    set({ themeMode: mode });
  },
}));

export default useThemeStore;
