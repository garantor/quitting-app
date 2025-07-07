import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import CalendarScreen from "../screens/CalendarScreen";
import CoachScreen from "../screens/CoachScreen";
import JournalScreen from "../screens/JournalScreen";
import AffirmationsScreen from "../screens/AffirmationsScreen";
import SettingsScreen from "../screens/SettingsScreen";

import { Colors } from "../constants/theme";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Calendar") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Coach") {
            iconName = focused ? "chatbubble" : "chatbubble-outline";
          } else if (route.name === "Journal") {
            iconName = focused ? "journal" : "journal-outline";
          } else if (route.name === "Affirmations") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Coach" component={CoachScreen} />
      <Tab.Screen name="Journal" component={JournalScreen} />
      <Tab.Screen name="Affirmations" component={AffirmationsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
