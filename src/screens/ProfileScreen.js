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
import { colors, spacing, fontSizes } from "../constants/theme";

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
        darkMode && { backgroundColor: colors.dark.background },
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
              darkMode && { color: colors.dark.text },
            ]}
          >
            Recovery Warrior
          </Text>
          <Text
            style={[
              styles.headerSubtitle,
              darkMode && { color: colors.dark.textSecondary },
            ]}
          >
            Keep going strong!
          </Text>
        </View>

        {/* Stats Overview */}
        <Card
          style={[
            styles.statsCard,
            darkMode && { backgroundColor: colors.dark.surface },
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              darkMode && { color: colors.dark.text },
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
        <Card style={[darkMode && { backgroundColor: colors.dark.surface }]}>
          <Text
            style={[
              styles.sectionTitle,
              darkMode && { color: colors.dark.text },
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
              trackColor={{ false: colors.light.border, true: colors.primary }}
              thumbColor={darkMode ? "#FFFFFF" : "#f4f3f4"}
            />
          )}

          {renderSettingRow(
            "Daily Reminders",
            "Get reminded to check in daily",
            <Switch
              value={false}
              onValueChange={() => {}}
              trackColor={{ false: colors.light.border, true: colors.primary }}
              thumbColor={"#f4f3f4"}
            />
          )}

          {renderSettingRow(
            "PIN Protection",
            "Secure your app with a PIN",
            <Switch
              value={false}
              onValueChange={() => {}}
              trackColor={{ false: colors.light.border, true: colors.primary }}
              thumbColor={"#f4f3f4"}
            />
          )}
        </Card>

        {/* Data Management */}
        <Card style={[darkMode && { backgroundColor: colors.dark.surface }]}>
          <Text
            style={[
              styles.sectionTitle,
              darkMode && { color: colors.dark.text },
            ]}
          >
            Data Management
          </Text>

          <TouchableOpacity style={styles.actionRow} onPress={handleExportData}>
            <View>
              <Text
                style={[
                  styles.actionTitle,
                  darkMode && { color: colors.dark.text },
                ]}
              >
                Export Data
              </Text>
              <Text
                style={[
                  styles.actionSubtitle,
                  darkMode && { color: colors.dark.textSecondary },
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
              <Text style={[styles.actionTitle, { color: colors.error }]}>
                Reset All Data
              </Text>
              <Text
                style={[
                  styles.actionSubtitle,
                  darkMode && { color: colors.dark.textSecondary },
                ]}
              >
                Permanently delete all app data
              </Text>
            </View>
            <Text style={[styles.actionArrow, { color: colors.error }]}>
              ⚠️
            </Text>
          </TouchableOpacity>
        </Card>

        {/* Support */}
        <Card style={[darkMode && { backgroundColor: colors.dark.surface }]}>
          <Text
            style={[
              styles.sectionTitle,
              darkMode && { color: colors.dark.text },
            ]}
          >
            Support
          </Text>

          <TouchableOpacity style={styles.actionRow} onPress={handleSupport}>
            <View>
              <Text
                style={[
                  styles.actionTitle,
                  darkMode && { color: colors.dark.text },
                ]}
              >
                Help & Support
              </Text>
              <Text
                style={[
                  styles.actionSubtitle,
                  darkMode && { color: colors.dark.textSecondary },
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
              darkMode && { color: colors.dark.textSecondary },
            ]}
          >
            Clarity Recovery App v1.0.0
          </Text>
          <Text
            style={[
              styles.appInfoText,
              darkMode && { color: colors.dark.textSecondary },
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
    backgroundColor: colors.light.background,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  header: {
    alignItems: "center",
    paddingVertical: spacing.md,
  minHeight: 60, // Reduced height
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: 32,
  },
  headerTitle: {
    fontSize: fontSizes.xl,
    fontWeight: "bold",
    color: colors.light.text,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: fontSizes.sm,
    color: colors.light.textSecondary,
  },
  statsCard: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: "600",
    color: colors.light.text,
    marginBottom: spacing.md,
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
    fontSize: fontSizes.xxl,
    fontWeight: "bold",
    color: colors.primary,
  },
  statTitle: {
    fontSize: fontSizes.sm,
    color: colors.light.text,
    marginTop: spacing.xs,
  },
  statSubtitle: {
    fontSize: fontSizes.xs,
    color: colors.light.textSecondary,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: fontSizes.md,
    color: colors.light.text,
    marginBottom: spacing.xs,
  },
  settingSubtitle: {
    fontSize: fontSizes.sm,
    color: colors.light.textSecondary,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.md,
  },
  actionTitle: {
    fontSize: fontSizes.md,
    color: colors.light.text,
    marginBottom: spacing.xs,
  },
  actionSubtitle: {
    fontSize: fontSizes.sm,
    color: colors.light.textSecondary,
  },
  actionArrow: {
    fontSize: fontSizes.lg,
    color: colors.light.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.light.border,
    marginVertical: spacing.sm,
  },
  appInfo: {
    alignItems: "center",
    paddingVertical: spacing.xl,
  },
  appInfoText: {
    fontSize: fontSizes.xs,
    color: colors.light.textSecondary,
    textAlign: "center",
    marginBottom: spacing.xs,
  },
});

export default ProfileScreen;
