import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Layout, Text, Button, Spinner, Divider } from "@ui-kitten/components";
import TopNavigation from "../../components/TopNavigation";
import Container from "../../components/Container";
import useWalletStore from "../../stores/useWalletStore";
import MnemonicPhrasesCard from "../../components/MnemonicPhrasesCard";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SCREEN_WIDTH } from "../../constants/sizes";
import { equals, shuffle } from "../../utils/arrayOperations";
import MessageModal from "../../components/MessageModal";

const CheckPhrases = () => {
  const { params } = useRoute();
  // Holds selected phrases that are elements of phrases that comes from params
  const [selectedPhrases, setSelectedPhrases] = useState([]);
  // Holds real mnemonic phrases that belong to created wallet
  const [phrases, setPhrases] = useState([]);
  // Matching status for selectedPhrases state
  const [isMatched, setIsMatched] = useState(null);
  // Hold wallet creation process
  const [isWalletSaved, setIsWalletSaved] = useState(false);

  const { getWallet, saveWallet, isWalletSaving } = useWalletStore();

  // It shuffles fetched mnemonic phrases
  useEffect(() => setPhrases(shuffle(params.mnemonic.split(" "))), []);
  // useEffect(() => setPhrases(params.mnemonic.split(" ")), []);

  const addToList = (item) => {
    let temp = phrases;
    const index = temp.indexOf(item);
    if (index > -1) {
      temp.splice(index, 1);
      setPhrases(temp);
    }

    setSelectedPhrases((prev) => [...prev, item]);
  };

  const removeFromList = (item) => {
    let temp = selectedPhrases;
    const index = temp.indexOf(item);
    if (index > -1) {
      temp.splice(index, 1);
      setSelectedPhrases(temp);
    }

    setPhrases((prev) => [...prev, item]);
  };

  useEffect(() => {
    if (selectedPhrases.length === 12) {
      if (equals(params.mnemonic.split(" "), selectedPhrases)) {
        setIsMatched(true);
        saveWallet(params.mnemonic.split(" "));
        setIsWalletSaved(true);
      } else {
        setIsMatched(false);
      }
    } else {
      setIsMatched(null);
    }
  }, [selectedPhrases]);

  return (
    <Container>
      <TopNavigation />
      <Layout style={styles.innerContainer}>
        <Text style={styles.heading} category="h1">
          Complete
        </Text>
        <Text category="p1">
          Please complete your mnemonic phrases that are belong to created
          wallet.
        </Text>
        <Divider style={styles.divider} />
        <MnemonicPhrasesCard
          onPress={removeFromList}
          phrases={selectedPhrases}
        />
        <Layout style={styles.phrasesContainer}>
          {phrases.map((el, i) => (
            <Layout style={styles.phraseHolder} key={i}>
              <Button
                onPress={() => addToList(el)}
                size="small"
                appearance="outline"
                status="info"
              >
                {el}
              </Button>
            </Layout>
          ))}
        </Layout>
        {isMatched === false && (
          <Layout style={{ alignItems: "center" }}>
            <Text category="p1" status="danger">
              Mnemonic phrases were not matched.
            </Text>
          </Layout>
        )}
        {isWalletSaving && (
          <Layout style={{ alignItems: "center" }}>
            <Spinner status="info" />
          </Layout>
        )}
      </Layout>
      <MessageModal
        heading={"🎉 Congratulations!"}
        message={"Your wallet is successfully created. Now, you can use it!"}
        visible={isWalletSaved}
        setVisible={setIsWalletSaved}
        onPress={getWallet}
      />
    </Container>
  );
};

export default CheckPhrases;

const styles = StyleSheet.create({
  innerContainer: { flex: 1, justifyContent: "center" },
  phrasesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: SCREEN_WIDTH / 10,
  },
  phraseHolder: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: SCREEN_WIDTH / 30,
  },
  heading: {
    paddingBottom: SCREEN_WIDTH / 20,
  },
  divider: {
    marginVertical: SCREEN_WIDTH / 20,
  },
});
