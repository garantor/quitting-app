import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, BorderRadius, FontSizes } from "../constants/theme";
import { useUser } from "../context/UserContext";

const SettingsScreen = ({ navigation }) => {
  const { isDarkMode, setIsDarkMode, streak, journalEntries } = useUser();
  const [pinLockEnabled, setPinLockEnabled] = useState(false);
  const [encryptData, setEncryptData] = useState(true);
  const [dailyCheckInTime, setDailyCheckInTime] = useState("10:00 PM");

  const currentColors = isDarkMode ? Colors.dark : Colors.light;

  const handleDailyCheckInTime = () => {
    Alert.alert(
      "Set Daily Check-in Time",
      "Choose your preferred time for daily check-ins",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Set Time",
          onPress: () => console.log("Time picker would open"),
        },
      ]
    );
  };

  const handleAccountabilityPartner = () => {
    Alert.alert(
      "Accountability Partner",
      "Connect with someone to support your journey",
      [{ text: "OK" }]
    );
  };

  const handleSupportCircle = () => {
    Alert.alert(
      "Support Circle",
      "Join an anonymous group for mutual support",
      [{ text: "OK" }]
    );
  };

  const handleExportJournal = () => {
    Alert.alert("Export Journal", "Export your journal entries to a file", [
      { text: "OK" },
    ]);
  };

  const handleSupport = () => {
    Alert.alert(
      "Support & FAQ",
      "Get help and find answers to common questions",
      [{ text: "OK" }]
    );
  };

  const SettingsSection = ({ title, children }) => (
    <View style={styles.section}>
      <Text
        style={[styles.sectionTitle, { color: currentColors.textSecondary }]}
      >
        {title.toUpperCase()}
      </Text>
      <View
        style={[
          styles.sectionContent,
          { backgroundColor: currentColors.surface },
        ]}
      >
        {children}
      </View>
    </View>
  );

  const SettingsItem = ({
    title,
    onPress,
    rightComponent,
    showArrow = false,
    isLast = false,
  }) => (
    <TouchableOpacity
      style={[
        styles.settingsItem,
        {
          borderBottomColor: currentColors.border,
          borderBottomWidth: isLast ? 0 : 1,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.settingsItemText, { color: currentColors.text }]}>
        {title}
      </Text>
      <View style={styles.rightContainer}>
        {rightComponent}
        {showArrow && (
          <Ionicons
            name="chevron-forward"
            size={20}
            color={currentColors.textSecondary}
            style={styles.arrow}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  const ToggleItem = ({ title, value, onValueChange, isLast = false }) => (
    <SettingsItem
      title={title}
      isLast={isLast}
      rightComponent={
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: currentColors.border, true: Colors.primary }}
          thumbColor={value ? "#ffffff" : "#f4f3f4"}
          ios_backgroundColor={currentColors.border}
        />
      }
    />
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: currentColors.background }]}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: currentColors.background,
            borderBottomColor: currentColors.border,
          },
        ]}
      >
        <View style={styles.spacer} />
        <Text style={[styles.headerTitle, { color: currentColors.text }]}>
          Settings
        </Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Profile Stats Section */}
          <SettingsSection title="Your Progress">
            <View
              style={[
                styles.statsContainer,
                { backgroundColor: currentColors.surface },
              ]}
            >
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: Colors.primary }]}>
                  {streak}
                </Text>
                <Text
                  style={[
                    styles.statLabel,
                    { color: currentColors.textSecondary },
                  ]}
                >
                  Days Clean
                </Text>
              </View>
              <View
                style={[
                  styles.statDivider,
                  { backgroundColor: currentColors.border },
                ]}
              />
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: Colors.secondary }]}>
                  {journalEntries?.length || 0}
                </Text>
                <Text
                  style={[
                    styles.statLabel,
                    { color: currentColors.textSecondary },
                  ]}
                >
                  Journal Entries
                </Text>
              </View>
            </View>
          </SettingsSection>

          {/* Appearance Section */}
          <SettingsSection title="Appearance">
            <ToggleItem
              title="Dark Mode"
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              isLast={true}
            />
          </SettingsSection>

          {/* Privacy Section */}
          <SettingsSection title="Privacy">
            <ToggleItem
              title="Enable PIN Lock"
              value={pinLockEnabled}
              onValueChange={setPinLockEnabled}
            />
            <ToggleItem
              title="Encrypt My Data"
              value={encryptData}
              onValueChange={setEncryptData}
              isLast={true}
            />
          </SettingsSection>

          {/* Reminders Section */}
          <SettingsSection title="Reminders">
            <SettingsItem
              title="Set Daily Check-in Time"
              onPress={handleDailyCheckInTime}
              rightComponent={
                <Text
                  style={[
                    styles.timeText,
                    { color: currentColors.textSecondary },
                  ]}
                >
                  {dailyCheckInTime}
                </Text>
              }
              showArrow={true}
              isLast={true}
            />
          </SettingsSection>

          {/* Optional Features Section */}
          <SettingsSection title="Optional Features">
            <SettingsItem
              title="Link Accountability Partner"
              onPress={handleAccountabilityPartner}
              showArrow={true}
            />
            <SettingsItem
              title="Join Anonymous Support Circle"
              onPress={handleSupportCircle}
              showArrow={true}
            />
            <SettingsItem
              title="Export Journal"
              onPress={handleExportJournal}
              showArrow={true}
              isLast={true}
            />
          </SettingsSection>

          {/* Support Section */}
          <SettingsSection title="Support">
            <SettingsItem
              title="Support & FAQ"
              onPress={handleSupport}
              showArrow={true}
              isLast={true}
            />
          </SettingsSection>

          {/* Data Management Section */}
          <SettingsSection title="Data Management">
            <SettingsItem
              title="Export All Data"
              onPress={handleExportJournal}
              showArrow={true}
            />
            <SettingsItem
              title="Reset All Data"
              onPress={() => {
                Alert.alert(
                  "Reset All Data",
                  "This will permanently delete all your progress, journal entries, and settings. This action cannot be undone.",
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Reset",
                      style: "destructive",
                      onPress: () => {
                        Alert.alert("Data Reset", "All data has been reset.");
                      },
                    },
                  ]
                );
              }}
              showArrow={false}
              isLast={true}
            />
          </SettingsSection>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
  },
  spacer: {
    width: 24,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.xs,
    fontWeight: "600",
    marginBottom: Spacing.xs,
    paddingHorizontal: Spacing.md,
    letterSpacing: 1,
  },
  sectionContent: {
    borderRadius: BorderRadius.lg,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  settingsItemText: {
    fontSize: FontSizes.md,
    flex: 1,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    fontSize: FontSizes.md,
    marginRight: Spacing.xs,
  },
  arrow: {
    marginLeft: Spacing.xs,
  },
  statsContainer: {
    flexDirection: "row",
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    marginHorizontal: Spacing.md,
  },
  statNumber: {
    fontSize: FontSizes.xxxl,
    fontWeight: "bold",
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSizes.sm,
    textAlign: "center",
  },
});

export default SettingsScreen;
