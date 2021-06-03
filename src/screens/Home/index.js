import React, { useEffect } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Container from "../../components/Container";
import {
  Divider,
  Layout,
  Text,
} from "@ui-kitten/components";
import TabsTopNavigation from "../../components/TabsTopNavigation";
import WalletCard from "../../components/WalletCard";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants/sizes";
import AddTokenSheet from "../../components/AddTokenSheet";
import TokensList from "../../components/TokensList";

const Home = () => {
  return (
    <>
      <Container>
        <TabsTopNavigation title="Home" />
        <WalletCard />
        <Layout style={styles.assets}>
          <Text category="h6">My Assets</Text>
          <AddTokenSheet />
        </Layout>
        <Divider style={styles.divider} />
        <TokensList/>
      </Container>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: null,
  },
  assets: {
    paddingTop: SCREEN_WIDTH / 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  divider: {
    marginVertical: SCREEN_WIDTH / 50,
  },
});
