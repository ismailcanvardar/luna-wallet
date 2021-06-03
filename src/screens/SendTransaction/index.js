import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Modal,
  Text,
  List,
  ListItem,
  Avatar,
  Divider,
  Icon,
  Layout,
} from "@ui-kitten/components";
import useWalletStore from "../../stores/useWalletStore";
import useBalanceStore from "../../stores/useBalanceStore";
import Container from "../../components/Container";
import TabsTopNavigation from "../../components/TabsTopNavigation";
import TokensModal from "../../components/TokensModal";
import { SCREEN_WIDTH } from "../../constants/sizes";
import defaultTokens from "../../constants/defaultTokens.json";
import { useEffect } from "react/cjs/react.development";

const SendTransaction = () => {
  const [selectedToken, setSelectedToken] = useState(null);
  const { ethBalance, tokenBalances } = useBalanceStore();

  useEffect(() => {
    if (selectedToken) {
      console.log(defaultTokens[selectedToken]);
    }
  }, [selectedToken]);

  return (
    <Container>
      <TabsTopNavigation title="Send" />
      {selectedToken === null ? (
        <Text appearance="hint" style={{ paddingVertical: SCREEN_WIDTH / 20 }}>
          No token selected.
        </Text>
      ) : (
        <Layout
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingVertical: SCREEN_WIDTH / 20,
          }}
        >
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <Avatar
              size="tiny"
              source={{
                uri:
                  selectedToken === -1
                    ? "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png"
                    : defaultTokens[selectedToken].logoURI,
              }}
            />
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text category="h6">
              {selectedToken === -1
                ? "ETH"
                : defaultTokens[selectedToken].token_symbol}
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Text category="h6" appearance="hint">
              {selectedToken === -1
                ? parseFloat(ethBalance).toFixed(3)
                : parseFloat(tokenBalances[selectedToken]).toFixed(3)}
            </Text>
          </View>
        </Layout>
      )}
      <TokensModal
        selectedToken={selectedToken}
        setSelectedToken={setSelectedToken}
      />
    </Container>
  );
};

export default SendTransaction;

const styles = StyleSheet.create({});
