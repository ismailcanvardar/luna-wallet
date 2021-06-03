// Import the crypto getRandomValues shim (**BEFORE** the shims)
import "react-native-get-random-values";
// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims";
import { StatusBar } from "expo-status-bar";
import React, {useEffect} from "react";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import useThemeStore from "./src/stores/useThemeStore";

import Root from "./src/navigations/Root";

export default function App() {
  const { themeMode } = useThemeStore();
  
  return (
    <>
      <StatusBar style="auto" />
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={themeMode === "dark" ? eva.dark : eva.light}>
        <Root />
      </ApplicationProvider>
    </>
  );
}
