import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import {
  Text,
  Avatar,
  Layout,
  Input,
  Icon,
  Button,
} from "@ui-kitten/components";
import useWalletStore from "../../stores/useWalletStore";
import useBalanceStore from "../../stores/useBalanceStore";
import Container from "../../components/Container";
import TabsTopNavigation from "../../components/TabsTopNavigation";
import TokensModal from "../../components/TokensModal";
import { SCREEN_WIDTH } from "../../constants/sizes";
import defaultTokens from "../../constants/defaultTokens.json";
import useSendToken from "../../hooks/useSendToken";
import Clipboard from "expo-clipboard";
import BarcodeScanner from "../../components/BarcodeScanner";
import ContactsModal from "../../components/ContactsModal";

const SendTransaction = () => {
  const { ethBalance, tokenBalances } = useBalanceStore();
  const [sendToken] = useSendToken();
  const { wallet } = useWalletStore();

  const [amount, setAmount] = useState(0);
  const [selectedToken, setSelectedToken] = useState(null);
  const [recipientAddress, setRecipientAddress] = useState("");

  const pasteAddress = async () => {
    const flag = await Clipboard.getStringAsync();
    console.log(flag);
    setRecipientAddress(flag);
  };

  const renderRightAccessories = (props) => {
    return (
      <>
        <TouchableWithoutFeedback onPress={pasteAddress}>
          <Icon name="clipboard" {...props} />
        </TouchableWithoutFeedback>
        <BarcodeScanner
          value={recipientAddress}
          setValue={setRecipientAddress}
          customButton={<Icon name="camera" {...props} />}
        />
        <TouchableWithoutFeedback>
          <ContactsModal customButton={<Icon name="person-add" {...props} />} />
        </TouchableWithoutFeedback>
      </>
    );
  };

  const renderETHText = () => {
    return selectedToken ? (
      selectedToken === -1 ? (
        <Text>ETH</Text>
      ) : (
        <Text>{defaultTokens[selectedToken].token_symbol.toString()}</Text>
      )
    ) : null;
  };

  return (
    <Container>
      <TabsTopNavigation title="Send" />
      {selectedToken === null ? (
        <Text appearance="hint" style={styles.nonSelected}>
          No asset selected.
        </Text>
      ) : (
        <Layout style={styles.selectedContainer}>
          <View style={styles.selectedLogoContainer}>
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
          <View style={styles.selectedSymbolContainer}>
            <Text category="h6">
              {selectedToken === -1
                ? "ETH"
                : defaultTokens[selectedToken].token_symbol}
            </Text>
          </View>
          <View style={styles.selectedBalanceContainer}>
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
      <Input
        style={styles.lowerElements}
        placeholder="Type recipient address..."
        value={recipientAddress}
        accessoryRight={renderRightAccessories}
        onChangeText={(text) => setRecipientAddress(text)}
        status="info"
      />
      <Input
        style={styles.lowerElements}
        value={amount}
        placeholder="Enter amount..."
        accessoryRight={renderETHText}
        onChangeText={(text) => setAmount(parseFloat(text))}
        keyboardType="numeric"
      />
      <Button
        style={styles.lowerElements}
        status="success"
        disabled={
          amount === 0 ||
          selectedToken === null ||
          recipientAddress.length === 0
        }
        onPress={() =>
          sendToken(
            wallet,
            "0xad5ce863ae3e4e9394ab43d4ba0d80f419f61789",
            "0.1",
            "0x888Db2Df996cB9CeBc8556dDBD87CF835614a78d"
          )
        }
      >
        Send
      </Button>
    </Container>
  );
};

export default SendTransaction;

const styles = StyleSheet.create({
  nonSelected: { paddingBottom: SCREEN_WIDTH / 20, paddingTop: 5 },
  selectedContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: SCREEN_WIDTH / 20,
    paddingTop: 5,
  },
  selectedLogoContainer: { flex: 1, alignItems: "flex-start" },
  selectedNameContainer: { flex: 1, alignItems: "center" },
  selectedBalanceContainer: { flex: 1, alignItems: "flex-end" },
  lowerElements: { marginTop: SCREEN_WIDTH / 20 },
});
