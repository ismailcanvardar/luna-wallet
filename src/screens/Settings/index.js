import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import { Toggle, Text, Button, Icon, ListItem } from "@ui-kitten/components";
import useWalletStore from "../../stores/useWalletStore";
import useThemeStore from "../../stores/useThemeStore";
import Container from "../../components/Container";
import StacksTopNavigation from "../../components/StacksTopNavigation";
import { SCREEN_WIDTH } from "../../constants/sizes";
import QRCode from "react-native-qrcode-svg";
import MessageModal from "../../components/MessageModal";
import Clipboard from "expo-clipboard";

const RightArrowIcon = (props) => <Icon name="arrow-right" {...props}></Icon>;

const Settings = () => {
  const { deleteWallet, wallet } = useWalletStore();
  const { themeMode, switchThemeMode } = useThemeStore();

  const toggleDarkMode = () => (
    <Toggle
      onChange={() => switchThemeMode(themeMode === "dark" ? "light" : "dark")}
      status="info"
      checked={themeMode === "dark" ? true : false}
    />
  );

  const [showSeedPhrases, setShowSeedPhrases] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  const copySeedPhrases = async () => {
    Clipboard.setString(wallet.mnemonic);
  };

  const copyPrivateKey = async () => {
    Clipboard.setString(wallet.privateKey);
  };

  return (
    <Container>
      <StacksTopNavigation title="Settings" />
      <ScrollView>
        <ListItem
          accessoryRight={toggleDarkMode}
          title="Toggle dark mode"
        ></ListItem>
        <View style={styles.listItem}>
          <ListItem
            onPress={() => setShowSeedPhrases(true)}
            accessoryRight={RightArrowIcon}
            title="Reveal Seed Phrases"
            description="DO NOT share phrases with anyone!
            These words can be used to steal your assets.
            "
          ></ListItem>
        </View>
        <View style={styles.listItem}>
          <ListItem
            onPress={() => setShowPrivateKey(true)}
            accessoryRight={RightArrowIcon}
            title="Reveal Private Key"
            description="DO NOT share private key with anyone."
          ></ListItem>
        </View>
        <View style={styles.listItem}>
          <Button status="info" appearance="outline" onPress={deleteWallet}>
            Delete wallet
          </Button>
        </View>
        <View
          style={{
            marginTop: SCREEN_WIDTH / 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text category="p1" style={styles.publicKey}>
            My public address:
          </Text>
          <QRCode size={SCREEN_WIDTH / 2} value={wallet.address} />
        </View>
      </ScrollView>
      <MessageModal
        isBackdropPressable={true}
        visible={showSeedPhrases}
        setVisible={setShowSeedPhrases}
        body={<QRCode size={SCREEN_WIDTH / 2} value={wallet.mnemonic} />}
        message={wallet.mnemonic}
        buttonTitle="Copy"
        onPress={copySeedPhrases}
      />
      <MessageModal
        isBackdropPressable={true}
        visible={showPrivateKey}
        setVisible={setShowPrivateKey}
        body={<QRCode size={SCREEN_WIDTH / 2} value={wallet.privateKey} />}
        message={wallet.privateKey}
        buttonTitle="Copy"
        onPress={copyPrivateKey}
      />
    </Container>
  );
};

export default Settings;

const styles = StyleSheet.create({
  listItem: { marginTop: SCREEN_WIDTH / 20 },
  publicKey: { marginBottom: SCREEN_WIDTH / 50 },
});
