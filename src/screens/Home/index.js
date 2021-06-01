import React from "react";
import { StyleSheet } from "react-native";
import useWalletStore from "../../stores/useWalletStore";
import Container from "../../components/Container";
import { Card, Divider, Layout, Text, Button } from "@ui-kitten/components";
import TabsTopNavigation from "../../components/TabsTopNavigation";
import WalletCard from "../../components/WalletCard";
import { SCREEN_WIDTH } from "../../constants/sizes";

const Home = () => {
  return (
    <Container>
      <TabsTopNavigation title="Home" />
      <WalletCard />
      <Layout style={styles.assets}>
        <Text category="h6">My Assets</Text>
      </Layout>
      <Divider style={styles.divider} />
      <Button status="info" appearance="ghost">
        Add new asset
      </Button>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  assets: {
    paddingTop: SCREEN_WIDTH / 20,
  },
  divider: {
    marginVertical: SCREEN_WIDTH / 50,
  },
});
