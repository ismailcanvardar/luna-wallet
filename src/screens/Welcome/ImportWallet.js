import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import {
  Text,
  Layout,
  Input,
  Divider,
  Icon,
  Button,
} from "@ui-kitten/components";
import TopNavigation from "../../components/TopNavigation";
import Container from "../../components/Container";
import BarcodeScanner from "../../components/BarcodeScanner";
import { SCREEN_WIDTH } from "../../constants/sizes";
import useImportWallet from "../../hooks/useImportWallet";
import useWalletStore from "../../stores/useWalletStore";
import Clipboard from "expo-clipboard";
import LoadingIndicator from "../../components/LoadingIndicator";
import MessageModal from "../../components/MessageModal";

const ImportWallet = () => {
  // Value of mnemonic that comes from input field
  const [givenMnemonic, setGivenMnemonic] = useState("");
  // Holds the status of 12-word mnemonic phrases
  const [isMnemonicGiven, setIsMnemonicGiven] = useState(false);
  // Hold wallet creation process
  const [isWalletSaved, setIsWalletSaved] = useState(false);

  const [wallet, loading, error, importWallet] = useImportWallet();
  const { getWallet, saveWallet, isWalletSaving } = useWalletStore();

  // Renders right accessory of input field
  const renderInputIcon = (props) => (
    <>
      {givenMnemonic.length !== 0 ? (
        <TouchableWithoutFeedback onPress={() => setGivenMnemonic("")}>
          <Icon {...props} name="close" />
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback onPress={fetchCopiedText}>
          <Icon {...props} name="clipboard" />
        </TouchableWithoutFeedback>
      )}
    </>
  );

  // Copies string from device's clipboard
  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setGivenMnemonic(text);
  };

  // Controls if mnemonic input length is bigger than 12
  useEffect(() => {
    if (givenMnemonic.split(" ").length >= 12) setIsMnemonicGiven(true);
    else setIsMnemonicGiven(false);
  }, [givenMnemonic]);

  useEffect(() => {
    if (wallet) {
      saveWallet(wallet);
      setIsWalletSaved(true);
    }
  }, [wallet]);

  return (
    <Container>
      <TopNavigation />
      <Layout style={styles.innerContainer}>
        <Text category="h1" style={styles.heading}>
          Import Wallet
        </Text>
        <Text>Type your 12-word mnemonic phrases or scan it via QR code.</Text>
        <Divider style={styles.divider} />
        <Input
          multiline
          accessoryRight={renderInputIcon}
          placeholder="Type your mnemonic phrases here, put space after each phrase..."
          value={givenMnemonic}
          onChangeText={(text) => setGivenMnemonic(text)}
          autoCapitalize="none"
        />
        <BarcodeScanner
          value={givenMnemonic}
          setValue={setGivenMnemonic}
          style={styles.button}
        />
        <Button
          disabled={!isMnemonicGiven || loading}
          style={styles.button}
          appearance="outline"
          status="info"
          onPress={() => importWallet(givenMnemonic)}
          accessoryLeft={(evaProps) =>
            loading === true && <LoadingIndicator status="info" {...evaProps} />
          }
        >
          {!loading && "Done"}
        </Button>
        {error && (
          <Text
            category="c2"
            style={{ textAlign: "center", paddingTop: SCREEN_WIDTH / 20 }}
            status="danger"
          >
            Invalid mnemonic phrases. Please try again with new phrases.
          </Text>
        )}
      </Layout>
      <MessageModal
        heading={"🎉 Congratulations!"}
        message={"Your wallet is successfully imported. Now, you can use it!"}
        visible={isWalletSaved}
        setVisible={setIsWalletSaved}
        onPress={getWallet}
      />
    </Container>
  );
};

export default ImportWallet;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    paddingBottom: SCREEN_WIDTH / 20,
  },
  divider: {
    marginVertical: SCREEN_WIDTH / 20,
  },
  button: { marginTop: SCREEN_WIDTH / 20 },
});
