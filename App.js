import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";

import { UserProvider, useUser } from "./src/context/UserContext";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import TabNavigator from "./src/navigation/TabNavigator";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isFirstTime } = useUser();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isFirstTime ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : (
          <Stack.Screen name="MainTabs" component={TabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <UserProvider>
      <StatusBar style="auto" />
      <AppNavigator />
    </UserProvider>
  );
}
