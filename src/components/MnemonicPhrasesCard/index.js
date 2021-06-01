import React from "react";
import { StyleSheet } from "react-native";
import { Card, Layout, Button } from "@ui-kitten/components";

const MnemonicPhrasesCard = ({ phrases, onPress }) => {
  return (
    <Card>
      <Layout style={styles.phrasesContainer}>
        {phrases && phrases.map((el, i) => (
          <Layout style={styles.phraseHolder} key={i}>
            <Button onPress={() => onPress !== undefined && onPress(el)} appearance="ghost" status="info">
              {el}
            </Button>
          </Layout>
        ))}
      </Layout>
    </Card>
  );
};

export default MnemonicPhrasesCard;

const styles = StyleSheet.create({
  phrasesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  phraseHolder: {
    justifyContent: "center",
    alignItems: "center",
  },
});
