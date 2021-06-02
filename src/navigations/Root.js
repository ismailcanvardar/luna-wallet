import React, { useEffect } from "react";
import MainNavigator from "./MainNavigator";
import LandingNavigator from "./LandingNavigator";
import useWalletStore from "../stores/useWalletStore";
import { Text } from "react-native";

const Root = () => {
  const { isWalletFetching, getWallet, isWalletAvailable } = useWalletStore();

  useEffect(getWallet, []);

  if (isWalletFetching) return <Text>Splash Screen Here!</Text>;

  if (isWalletAvailable) return <MainNavigator />;

  return <LandingNavigator />;
};

export default Root;
