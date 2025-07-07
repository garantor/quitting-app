import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Switch,
} from "react-native";
import { useUser } from "../context/UserContext";
import Button from "../components/Button";
import Card from "../components/Card";
import { Colors, Spacing, FontSizes } from "../constants/theme";

const ProfileScreen = () => {
  const { darkMode, toggleTheme, streak, journalEntries } = useUser();

  const handleExportData = () => {
    Alert.alert(
      "Export Data",
      "This feature would export your journal entries and progress data.",
      [{ text: "OK" }]
    );
  };

  const handleResetData = () => {
    Alert.alert(
      "Reset All Data",
      "This will permanently delete all your progress, journal entries, and settings. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            // In a real app, you would clear AsyncStorage here
            Alert.alert("Data Reset", "All data has been reset.");
          },
        },
      ]
    );
  };

  const handleSupport = () => {
    Alert.alert(
      "Support",
      "For support, please contact us at support@clarityapp.com or visit our FAQ section.",
      [{ text: "OK" }]
    );
  };

  const renderStatCard = (title, value, subtitle) => {
    return (
      <View style={styles.statCard}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
        {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
      </View>
    );
  };

  const renderSettingRow = (title, subtitle, rightComponent) => {
    return (
      <View style={styles.settingRow}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
        {rightComponent}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        darkMode && { backgroundColor: Colors.dark.background },
      ]}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>🌟</Text>
          </View>
          <Text
            style={[
              styles.headerTitle,
              darkMode && { color: Colors.dark.text },
            ]}
          >
            Recovery Warrior
          </Text>
          <Text
            style={[
              styles.headerSubtitle,
              darkMode && { color: Colors.dark.textSecondary },
            ]}
          >
            Keep going strong!
          </Text>
        </View>

        {/* Stats Overview */}
        <Card
          style={[
            styles.statsCard,
            darkMode && { backgroundColor: Colors.dark.surface },
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              darkMode && { color: Colors.dark.text },
            ]}
          >
            Your Progress
          </Text>
          <View style={styles.statsContainer}>
            {renderStatCard("Current Streak", `${streak}`, "days")}
            {renderStatCard("Journal Entries", journalEntries.length, "total")}
            {renderStatCard("Days Active", "30", "this month")}
          </View>
        </Card>

        {/* Settings */}
        <Card style={[darkMode && { backgroundColor: Colors.dark.surface }]}>
          <Text
            style={[
              styles.sectionTitle,
              darkMode && { color: Colors.dark.text },
            ]}
          >
            Settings
          </Text>

          {renderSettingRow(
            "Dark Mode",
            "Switch between light and dark theme",
            <Switch
              value={darkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: Colors.light.border, true: Colors.primary }}
              thumbColor={darkMode ? "#FFFFFF" : "#f4f3f4"}
            />
          )}

          {renderSettingRow(
            "Daily Reminders",
            "Get reminded to check in daily",
            <Switch
              value={false}
              onValueChange={() => {}}
              trackColor={{ false: Colors.light.border, true: Colors.primary }}
              thumbColor={"#f4f3f4"}
            />
          )}

          {renderSettingRow(
            "PIN Protection",
            "Secure your app with a PIN",
            <Switch
              value={false}
              onValueChange={() => {}}
              trackColor={{ false: Colors.light.border, true: Colors.primary }}
              thumbColor={"#f4f3f4"}
            />
          )}
        </Card>

        {/* Data Management */}
        <Card style={[darkMode && { backgroundColor: Colors.dark.surface }]}>
          <Text
            style={[
              styles.sectionTitle,
              darkMode && { color: Colors.dark.text },
            ]}
          >
            Data Management
          </Text>

          <TouchableOpacity style={styles.actionRow} onPress={handleExportData}>
            <View>
              <Text
                style={[
                  styles.actionTitle,
                  darkMode && { color: Colors.dark.text },
                ]}
              >
                Export Data
              </Text>
              <Text
                style={[
                  styles.actionSubtitle,
                  darkMode && { color: Colors.dark.textSecondary },
                ]}
              >
                Download your journal and progress data
              </Text>
            </View>
            <Text style={styles.actionArrow}>→</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.actionRow} onPress={handleResetData}>
            <View>
              <Text style={[styles.actionTitle, { color: Colors.error }]}>
                Reset All Data
              </Text>
              <Text
                style={[
                  styles.actionSubtitle,
                  darkMode && { color: Colors.dark.textSecondary },
                ]}
              >
                Permanently delete all app data
              </Text>
            </View>
            <Text style={[styles.actionArrow, { color: Colors.error }]}>
              ⚠️
            </Text>
          </TouchableOpacity>
        </Card>

        {/* Support */}
        <Card style={[darkMode && { backgroundColor: Colors.dark.surface }]}>
          <Text
            style={[
              styles.sectionTitle,
              darkMode && { color: Colors.dark.text },
            ]}
          >
            Support
          </Text>

          <TouchableOpacity style={styles.actionRow} onPress={handleSupport}>
            <View>
              <Text
                style={[
                  styles.actionTitle,
                  darkMode && { color: Colors.dark.text },
                ]}
              >
                Help & Support
              </Text>
              <Text
                style={[
                  styles.actionSubtitle,
                  darkMode && { color: Colors.dark.textSecondary },
                ]}
              >
                Get help or contact support
              </Text>
            </View>
            <Text style={styles.actionArrow}>→</Text>
          </TouchableOpacity>
        </Card>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text
            style={[
              styles.appInfoText,
              darkMode && { color: Colors.dark.textSecondary },
            ]}
          >
            Clarity Recovery App v1.0.0
          </Text>
          <Text
            style={[
              styles.appInfoText,
              darkMode && { color: Colors.dark.textSecondary },
            ]}
          >
            Made with ❤️ for your recovery journey
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  header: {
    alignItems: "center",
    paddingVertical: Spacing.xl,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  avatarText: {
    fontSize: 32,
  },
  headerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
  },
  statsCard: {
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: Spacing.md,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statCard: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: FontSizes.xxl,
    fontWeight: "bold",
    color: Colors.primary,
  },
  statTitle: {
    fontSize: FontSizes.sm,
    color: Colors.light.text,
    marginTop: Spacing.xs,
  },
  statSubtitle: {
    fontSize: FontSizes.xs,
    color: Colors.light.textSecondary,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.sm,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: FontSizes.md,
    color: Colors.light.text,
    marginBottom: Spacing.xs,
  },
  settingSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.md,
  },
  actionTitle: {
    fontSize: FontSizes.md,
    color: Colors.light.text,
    marginBottom: Spacing.xs,
  },
  actionSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
  },
  actionArrow: {
    fontSize: FontSizes.lg,
    color: Colors.light.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.border,
    marginVertical: Spacing.sm,
  },
  appInfo: {
    alignItems: "center",
    paddingVertical: Spacing.xl,
  },
  appInfoText: {
    fontSize: FontSizes.xs,
    color: Colors.light.textSecondary,
    textAlign: "center",
    marginBottom: Spacing.xs,
  },
});

export default ProfileScreen;
