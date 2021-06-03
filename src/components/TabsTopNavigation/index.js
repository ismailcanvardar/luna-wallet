import React from "react";
import { StyleSheet } from "react-native";
import {
  TopNavigation,
  Icon,
  TopNavigationAction,
  Text,
  Layout,
  Divider,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_WIDTH } from "../../constants/sizes";

const SettingsIcon = (props) => <Icon {...props} name="settings" />;

const renderMenuAction = () => {
  const { navigate } = useNavigation();

  return (
    <TopNavigationAction
      icon={SettingsIcon}
      onPress={() => navigate("Settings")}
    />
  );
};

const TabsTopNavigation = ({ title }) => {
  const renderMenuTitle = () => <Text category="h3">{title}</Text>;

  return (
    <>
      <TopNavigation
        title={renderMenuTitle}
        accessoryRight={renderMenuAction}
      />
      <Layout style={styles.dividerHolder}>
        <Divider />
      </Layout>
    </>
  );
};

export default TabsTopNavigation;

const styles = StyleSheet.create({
  dividerHolder: {marginBottom: SCREEN_WIDTH / 30 },
});
