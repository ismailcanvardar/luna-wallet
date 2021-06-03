import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Toggle, Text, Button, Icon, ListItem } from "@ui-kitten/components";
import useWalletStore from "../../stores/useWalletStore";
import useThemeStore from "../../stores/useThemeStore";
import Container from "../../components/Container";
import StacksTopNavigation from "../../components/StacksTopNavigation";
import { SCREEN_WIDTH } from "../../constants/sizes";
import QRCode from "react-native-qrcode-svg";

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

  return (
    <Container>
      <StacksTopNavigation title="Settings" />
      <ScrollView>
        <ListItem
          accessoryRight={toggleDarkMode}
          title="Toggle dark mode"
        ></ListItem>
        <View style={{ marginTop: SCREEN_WIDTH / 20 }}>
          <ListItem
            accessoryRight={RightArrowIcon}
            title="Reveal Seed Phrases"
            description="DO NOT share phrases with anyone!
            These words can be used to steal your assets.
            "
          ></ListItem>
        </View>
        <View style={{ marginTop: SCREEN_WIDTH / 20 }}>
          <ListItem
            accessoryRight={RightArrowIcon}
            title="Reveal Private Key"
            description="DO NOT share private key with anyone."
          ></ListItem>
        </View>
        <View style={{ marginTop: SCREEN_WIDTH / 20 }}>
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
          <Text category="p1" style={{ marginBottom: SCREEN_WIDTH / 50 }}>
            My public address:
          </Text>
          <QRCode size={SCREEN_WIDTH / 2} value={wallet.address} />
        </View>
      </ScrollView>
    </Container>
  );
};

export default Settings;

const styles = StyleSheet.create({});
