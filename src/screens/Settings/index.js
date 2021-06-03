import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import useWalletStore from "../../stores/useWalletStore";

const Settings = () => {
  const { deleteWallet } = useWalletStore();

  return (
    <View>
      <Button title="Delete" onPress={deleteWallet}></Button>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
