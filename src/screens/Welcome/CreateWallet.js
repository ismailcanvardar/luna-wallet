import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Layout, Text, Divider, Button } from "@ui-kitten/components";
import Container from "../../components/Container";
import TopNavigation from "../../components/TopNavigation";
import LoadingIndicator from "../../components/LoadingIndicator";
import { SCREEN_WIDTH } from "../../constants/sizes";
import useCreateWallet from "../../hooks/useCreateWallet";
import { useNavigation } from "@react-navigation/native";

const CreateWallet = () => {
  const [wallet, loading, error, createWallet] = useCreateWallet();
  const { navigate } = useNavigation();

  useEffect(() => {
    if (wallet) {
      navigate("Show Phrases", wallet);
    }
  }, [wallet]);

  return (
    <Container>
      <TopNavigation />
      <Layout style={styles.innerContainer}>
        <Text style={styles.heading} category="h1">
          Create Wallet
        </Text>
        <Text>
          By creating wallet, you will get wallet's mnemonics. Please save it in
          secure place!
        </Text>
        <Divider style={styles.divider} />
        <Button
          status="info"
          onPress={createWallet}
          disabled={loading === true}
          accessoryLeft={(evaProps) =>
            loading === true && <LoadingIndicator status="info" {...evaProps} />
          }
        >
          {loading !== true && "Create"}
        </Button>
      </Layout>
    </Container>
  );
};

export default CreateWallet;

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
});
