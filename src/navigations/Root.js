import React, { useEffect } from "react";
import MainNavigator from "./MainNavigator";
import LandingNavigator from "./LandingNavigator";
import useWalletStore from "../stores/useWalletStore";
import useProviderStore from "../stores/useProviderStore";
import useGetBalances from "../hooks/useGetBalances";
import { Text } from "react-native";
import useThemeStore from "../stores/useThemeStore";

const Root = () => {
  const { wallet, isWalletFetching, getWallet, isWalletAvailable } =
    useWalletStore();
  const { provider, setProvider } = useProviderStore();
  const [getTokenBalance, getMultipleTokenBalances, getEthBalance] = useGetBalances();
  const { setDefaultThemeMode, switchTheme  } = useThemeStore();
  
  useEffect(() => {
    setDefaultThemeMode();
  }, []);

  useEffect(() => {
    getWallet();
  }, []);

  useEffect(() => {
    if (wallet) {
      setProvider();
    }
  }, [wallet]);

  useEffect(() => {
    if (wallet && provider) {
      getEthBalance().then().catch();
      getMultipleTokenBalances()
        .then(() => console.log("Done"))
        .catch((err) => console.log(err));
    }
  }, [wallet, provider]);

  if (isWalletFetching) return <Text>Splash Screen Here!</Text>;

  if (isWalletAvailable) return <MainNavigator />;

  return <LandingNavigator />;
};

export default Root;
