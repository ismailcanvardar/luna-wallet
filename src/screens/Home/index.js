import React, { useEffect } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import useWalletStore from "../../stores/useWalletStore";
import useTokenStore from "../../stores/useTokenStore";
import Container from "../../components/Container";
import {
  Card,
  Divider,
  Layout,
  Text,
  Button,
  List,
  ListItem,
  Icon,
  Avatar,
} from "@ui-kitten/components";
import TabsTopNavigation from "../../components/TabsTopNavigation";
import WalletCard from "../../components/WalletCard";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants/sizes";
import AddTokenSheet from "../../components/AddTokenSheet";
import defaultTokens from "../../constants/defaultTokens.json";

const data = new Array(8).fill({
  title: "Title for Item",
  description: "Description for Item",
});

const Home = () => {
  const { getTokenList, isFetching, fetchingError } = useTokenStore();

  useEffect(() => {
    getTokenList();
  }, []);

  const renderItemAccessory = (props) => (
    <>
      <TouchableWithoutFeedback onPress={() => console.log("HİHİHİ")}>
        <Icon {...props} name="layers" />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => console.log("HİHİHİ")}>
        <Icon {...props} name="diagonal-arrow-right-up" />
      </TouchableWithoutFeedback>
    </>
  );

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.token_symbol} ${index + 1}`}
      description={`${item.description} ${index + 1}`}
      accessoryLeft={() => <Avatar source={{ uri: item.logoURI }} />}
      accessoryRight={renderItemAccessory}
      disabled
    />
  );

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
        <List
          style={styles.container}
          data={defaultTokens}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
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
