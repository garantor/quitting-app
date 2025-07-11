import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import CalendarScreen from "../screens/CalendarScreen";
import CoachScreen from "../screens/CoachScreen";
import JournalScreen from "../screens/JournalScreen";
import AffirmationsScreen from "../screens/AffirmationsScreen";
import SettingsScreen from "../screens/SettingsScreen";

import { UserContext } from "../context/UserContext";
import { colors, spacing } from "../constants/theme";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Create a stack navigator for Home that includes Coach
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Coach" component={CoachScreen} />
      <Stack.Screen name="Journal" component={JournalScreen} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const { isDarkMode } = useContext(UserContext);
  const currentColors = isDarkMode ? colors.dark : colors.light;
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Calendar") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Journal") {
            iconName = focused ? "journal" : "journal-outline";
          } else if (route.name === "Affirmations") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: currentColors.textSecondary,
        tabBarStyle: {
          backgroundColor: currentColors.surface,
          borderTopColor: currentColors.border,
          borderTopWidth: 1,
          paddingBottom: Math.max(insets.bottom, spacing.sm),
          paddingTop: spacing.sm,
          height: 60 + Math.max(insets.bottom, spacing.sm),
          shadowColor: isDarkMode ? "#000" : "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: isDarkMode ? 0.3 : 0.1,
          shadowRadius: 3,
          elevation: 8,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginTop: 2,
          marginBottom: Platform.OS === 'ios' ? 0 : spacing.xs,
        },
        tabBarItemStyle: {
          paddingBottom: Platform.OS === 'ios' ? 0 : spacing.xs,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen 
        name="Calendar" 
        component={CalendarScreen}
        options={{
          tabBarLabel: "Calendar",
        }}
      />
      <Tab.Screen 
        name="Affirmations" 
        component={AffirmationsScreen}
        options={{
          tabBarLabel: "Affirmations",
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;