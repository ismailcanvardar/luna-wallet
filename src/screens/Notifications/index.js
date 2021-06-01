import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import useWalletStore from "../../stores/useWalletStore";
import Container from "../../components/Container";
import TabsTopNavigation from "../../components/TabsTopNavigation";

const Notifications = () => {
  return (
    <Container>
      <TabsTopNavigation title="Notifications" />
    </Container>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
