import * as React from "react";
import { StyleSheet } from "react-native";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Divider,
  Layout,
} from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Host } from "react-native-portalize";
import { SCREEN_WIDTH } from "../constants/sizes";

import History from "../screens/History";
import Home from "../screens/Home";
import Notifications from "../screens/Notifications";
import SendTransaction from "../screens/SendTransaction";
import Settings from "../screens/Settings";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const GridIcon = (props) => <Icon {...props} name="grid" />;

const PaperPlaneIcon = (props) => <Icon {...props} name="paper-plane" />;

const BellIcon = (props) => <Icon {...props} name="bell" />;

function TabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Send Transaction" component={SendTransaction} />
      <Tab.Screen name="Notifications" component={Notifications} />
    </Tab.Navigator>
  );
}

const BottomTabBar = ({ navigation, state }) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <>
      <Layout style={styles.dividerHolder}>
        <Divider />
      </Layout>
      <BottomNavigation
        selectedIndex={state.index}
        onSelect={(index) => navigation.navigate(state.routeNames[index])}
        appearance="noIndicator"
        style={[{ paddingBottom: bottom }, styles.bottomNavigation]}
      >
        <BottomNavigationTab icon={GridIcon} />
        <BottomNavigationTab icon={PaperPlaneIcon} />
        <BottomNavigationTab icon={BellIcon} />
      </BottomNavigation>
    </>
  );
};

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Host>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Tabs"
            component={TabNavigator}
          />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen options={{ headerShown: false }} name="Settings" component={Settings} />
        </Stack.Navigator>
      </Host>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  dividerHolder: { paddingHorizontal: SCREEN_WIDTH / 12 },
  bottomNavigation: { paddingTop: SCREEN_WIDTH / 30 },
});
