import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Button, Text } from "@ui-kitten/components";
import { SCREEN_WIDTH } from "../../constants/sizes";
import Constants from "expo-constants";

// Component that covers each individual components as a global component
const Container = ({ children, style }) => {
  return <Layout style={[styles.container, style]}>{children}</Layout>;
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SCREEN_WIDTH / 12,
    paddingTop: Constants.statusBarHeight,
  },
});
