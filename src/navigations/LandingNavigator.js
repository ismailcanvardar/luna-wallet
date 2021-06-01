import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Welcome from "../screens/Welcome";
import CreateWallet from "../screens/Welcome/CreateWallet";
import ImportWallet from "../screens/Welcome/ImportWallet";
import CheckPhrases from "../screens/Welcome/CheckPhrases";
import ShowPhrases from "../screens/Welcome/ShowPhrases";

const Stack = createStackNavigator();

export default function LandingNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Welcome"
          component={Welcome}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Create Wallet"
          component={CreateWallet}
        />
        <Stack.Screen options={{ headerShown: false }} name="Import Wallet" component={ImportWallet} />
        <Stack.Screen options={{ headerShown: false }} name="Show Phrases" component={ShowPhrases} />
        <Stack.Screen options={{ headerShown: false }} name="Check Phrases" component={CheckPhrases} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
