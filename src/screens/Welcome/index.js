import React from "react";
import { StyleSheet } from "react-native";
import { Text, Button, Layout, Divider } from "@ui-kitten/components";
import Container from "../../components/Container";
import { SCREEN_WIDTH } from "../../constants/sizes";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const { navigate } = useNavigation();

  return (
    <Container style={styles.container}>
      <Text style={styles.heading} category="h1">
        Welcome
      </Text>
      <Text category="p1">
        You can simply create a new wallet or import your existing one.
      </Text>
      <Divider style={styles.divider} />
      <Layout>
        <Button
          status="info"
          onPress={() => navigate("Create Wallet")}
          style={styles.button}
        >
          Create
        </Button>
        <Button
          status="info"
          onPress={() => navigate("Import Wallet")}
          style={styles.button}
          appearance="outline"
        >
          Import
        </Button>
      </Layout>
    </Container>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  heading: {
    paddingBottom: SCREEN_WIDTH / 20,
  },
  divider: {
    marginVertical: SCREEN_WIDTH / 20,
  },
  button: {
    marginBottom: SCREEN_WIDTH / 30,
  },
});
