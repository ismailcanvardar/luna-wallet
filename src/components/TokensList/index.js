import React, { useEffect } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import useTokenStore from "../../stores/useTokenStore";
import { List, ListItem, Icon, Avatar } from "@ui-kitten/components";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants/sizes";
import defaultTokens from "../../constants/defaultTokens.json";
import useBalanceStore from "../../stores/useBalanceStore";

const Home = () => {
  const { getTokenList, isFetching, fetchingError } = useTokenStore();
  const { tokenBalances } = useBalanceStore();

  useEffect(() => {
    // getTokenList();
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

  const renderItem = ({ item, index }) => {
    return (
      <ListItem
        title={`${item.token_symbol}`}
        description={`${
          tokenBalances && parseFloat(tokenBalances[index]).toFixed(3)
        }`}
        accessoryLeft={() => <Avatar source={{ uri: item.logoURI }} />}
        accessoryRight={renderItemAccessory}
        disabled
      />
    );
  };

  return (
    <List
      style={styles.container}
      data={defaultTokens}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
    />
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
