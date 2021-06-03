import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import {
  Tab,
  TabBar,
  List,
  ListItem,
  Layout,
  Text,
} from "@ui-kitten/components";
import useWalletStore from "../../stores/useWalletStore";
import Container from "../../components/Container";
import TabsTopNavigation from "../../components/TabsTopNavigation";
import axios from "axios";
import { timeDifference } from "../../helpers/timeManipulations";
import { shortenAddress } from "../../utils/addressShortener";
import { ethers } from "ethers";

// https://api-kovan.etherscan.io/api?module=account&action=txlist&address=0xBF8Cb91Ca51775bcf6F6C28afEd8Cf0Dd806ED07&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=V645J9EGC1UT8R1GB8MBAY3CZAAI7MADUP
// https://api-kovan.etherscan.io/api?module=account&action=tokentx&address=0xBF8Cb91Ca51775bcf6F6C28afEd8Cf0Dd806ED07&startblock=0&endblock=999999999&page=1&offset=100&sort=asc&apikey=YourApiKeyToken

const Notifications = () => {
  const [normalTxns, setNormalTxns] = useState(null);
  const [erc20Txn, setERC20Txns] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const getNormalTxns = async () => {
    try {
      setRefreshing(true);
      const { data } = await axios.get(
        "https://api-kovan.etherscan.io/api?module=account&action=txlist&address=0xBF8Cb91Ca51775bcf6F6C28afEd8Cf0Dd806ED07&startblock=0&endblock=99999999&page=1&offset=100&sort=desc&apikey=V645J9EGC1UT8R1GB8MBAY3CZAAI7MADUP"
      );
      // console.log(data.result);
      setNormalTxns(data.result);
      setRefreshing(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getERC20Txns = async () => {
    try {
      setRefreshing(true);
      const { data } = await axios.get(
        "https://api-kovan.etherscan.io/api?module=account&action=tokentx&address=0xBF8Cb91Ca51775bcf6F6C28afEd8Cf0Dd806ED07&startblock=0&endblock=999999999&page=1&offset=100&sort=desc&apikey=V645J9EGC1UT8R1GB8MBAY3CZAAI7MADUP"
      );
      console.log(data.result);
      setERC20Txns(data.result);
      setRefreshing(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNormalTxns();
  }, []);

  useEffect(() => {
    if (selectedIndex === 1) {
      getERC20Txns();
    }
  }, [selectedIndex]);

  const Title = ({ item, index }) => {
    return (
      <Layout style={{flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center"}}>
        <Layout>
        <Text category="c2">From: {shortenAddress(item.from)}</Text>
        <Text category="c2">To: {shortenAddress(item.to)}</Text>
        </Layout>
        <Layout>
          <Text>{parseFloat(ethers.utils.formatUnits(item.value, item.tokenDecimal ? item.tokenDecimal : "18")).toFixed(3)} {item.tokenSymbol ? item.tokenSymbol : "ETH"}</Text>
        </Layout>
      </Layout>
    );
  };

  const renderItem = ({ item, index }) => (
    <ListItem
      title={<Title item={item} index={index} />}
      description={`${timeDifference(item.timeStamp)}`}
    />
  );

  return (
    <Container>
      <TabsTopNavigation title="Notifications" />
      <TabBar
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <Tab title="Transactions" />
        <Tab title="ERC20 Transactions" />
      </TabBar>
      {selectedIndex === 0 ? (
        <List
          style={styles.container}
          data={normalTxns}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          onRefresh={getNormalTxns}
          refreshing={refreshing}
        />
      ) : (
        <List
          style={styles.container}
          data={erc20Txn}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          onRefresh={getERC20Txns}
          refreshing={refreshing}
        />
      )}
    </Container>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    maxHeight: "100%",
    backgroundColor: null
  },
});
