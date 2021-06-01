import React from "react";
import { StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Container from "../../components/Container";
import { Layout, Button, Text, Divider } from "@ui-kitten/components";
import TopNavigation from "../../components/TopNavigation";
import MnemonicPhrasesCard from "../../components/MnemonicPhrasesCard";
import { SCREEN_WIDTH } from "../../constants/sizes";

const ShowPhrases = () => {
  const { params } = useRoute();
  const { navigate } = useNavigation();

  return (
    <Container>
      <TopNavigation />
      <Layout style={styles.innerContainer}>
        <Text style={styles.heading} category="h1">
          ✅ Ready!
        </Text>
        <Text>
          Please keep the mnemonic phrases below into safe place. After, you
          will reach your wallet by using these phrases.
        </Text>
        <Divider style={styles.divider} />
        <MnemonicPhrasesCard phrases={params.mnemonic.split(" ")} />
        <Divider style={styles.divider} />
        <Button
          onPress={() => navigate("Check Phrases", params)}
          status="info"
        >
          Next
        </Button>
      </Layout>
    </Container>
  );
};

export default ShowPhrases;

const styles = StyleSheet.create({
  innerContainer: { flex: 1, justifyContent: "center" },
  heading: {
    paddingBottom: SCREEN_WIDTH / 20,
  },
  divider: {
    marginVertical: SCREEN_WIDTH / 20,
  },
});
