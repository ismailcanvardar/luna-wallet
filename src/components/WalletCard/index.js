import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import useWalletStore from "../../stores/useWalletStore";
import { Card, Text, Button, Icon } from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";
import { shortenAddress } from "../../utils/addressShortener";
import Clipboard from "expo-clipboard";

const CopyIcon = (props) => {
  return <Icon {...props} name="clipboard" />;
};

const WalletCard = () => {
  const { wallet } = useWalletStore();

  // Copies wallet address to clip.oard
  const copyAddress = () => {
    Clipboard.setString(wallet.address);
  };

  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={["#00DBDE", "#FC00FF"]}
        style={styles.background}
        start={[1, 0]}
        end={[0, 2.31]}
      />
      <View style={styles.innerContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text category="h6" style={styles.address}>{shortenAddress(wallet.address)}</Text>
          <Button
            status="control"
            appearance="ghost"
            accessoryRight={CopyIcon}
            onPress={copyAddress}
          />
        </View>
        <View>
          <Text category="h6" style={styles.heading}>
            Balance:
          </Text>
          <Text category="h4" style={styles.balance}>
            22.12 ETH
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WalletCard;

const styles = StyleSheet.create({
  cardContainer: {
    height: 175,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  innerContainer: { height: "100%", justifyContent: "space-around" },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    borderRadius: 8,
  },
  address: { color: "white", fontWeight: "bold" },
  heading: {
    color: "white",
    opacity: 0.6,
    fontWeight: "bold",
  },
  balance: {
    color: "white",
    opacity: 0.6,
    fontWeight: "bold",
  },
});
