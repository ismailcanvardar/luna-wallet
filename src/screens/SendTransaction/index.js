import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import useWalletStore from "../../stores/useWalletStore";
import Container from "../../components/Container";
import TabsTopNavigation from "../../components/TabsTopNavigation";

const SendTransaction = () => {
  return (
    <Container>
      <TabsTopNavigation title="Send" />
    </Container>
  );
};

export default SendTransaction;

const styles = StyleSheet.create({});
