import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useUser } from "../context/UserContext";
import Button from "../components/Button";
import Card from "../components/Card";
import ProgressRing from "../components/ProgressRing";
import { Colors, Spacing, FontSizes } from "../constants/theme";

const HomeScreen = ({ navigation }) => {
  const { streak, currentAffirmation, logUrge } = useUser();

  const handleCoachPress = () => {
    navigation.navigate("Coach");
  };

  const handleUrgeYes = () => {
    logUrge(true);
  };

  const handleUrgeNo = () => {
    logUrge(false);
  };

  const getMotivationalMessage = () => {
    if (streak === 0) {
      return "Today is a new beginning. You've got this! 111";
    } else if (streak < 7) {
      return `Great start! ${streak} ${streak === 1 ? "day" : "days"} strong!`;
    } else if (streak < 30) {
      return `Amazing progress! ${streak} days of clarity!`;
    } else {
      return `Incredible! ${streak} days of freedom!`;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.dateText}>{new Date().toDateString()}</Text>
          <Text style={styles.welcomeText}>Welcome back!</Text>
        </View>

        {/* Streak Display */}
        <Card style={styles.streakCard}>
          <View style={styles.streakContainer}>
            <View style={styles.progressContainer}>
              <ProgressRing progress={Math.min(streak / 90, 1)} size={120} />
              <View style={styles.progressText}>
                <Text style={styles.streakNumber}>{streak}</Text>
                <Text style={styles.streakLabel}>days</Text>
              </View>
            </View>
            <View style={styles.streakInfo}>
              <Text style={styles.streakTitle}>Current Streak</Text>
              <Text style={styles.motivationalMessage}>
                {getMotivationalMessage()}
              </Text>
            </View>
          </View>
        </Card>

        {/* Daily Affirmation */}
        <Card style={styles.affirmationCard}>
          <Text style={styles.affirmationTitle}>Daily Affirmation</Text>
          <Text style={styles.affirmationText}>{currentAffirmation}</Text>
        </Card>

        {/* Quick Actions */}
        <Card>
          <Text style={styles.sectionTitle}>Quick Check-in</Text>
          <Text style={styles.questionText}>How are you feeling today?</Text>

          <View style={styles.buttonRow}>
            <Button
              title="Great!"
              onPress={handleUrgeNo}
              variant="primary"
              size="small"
              style={styles.checkInButton}
            />
            <Button
              title="Struggling"
              onPress={handleUrgeYes}
              variant="outline"
              size="small"
              style={styles.checkInButton}
            />
          </View>
        </Card>

        {/* Coach Access */}
        <Card>
          <Text style={styles.sectionTitle}>Need Support?</Text>
          <Text style={styles.coachDescription}>
            Talk to Clarity Coach for guidance and motivation
          </Text>
          <Button
            title="Talk to Clarity Coach"
            onPress={handleCoachPress}
            variant="secondary"
            style={styles.coachButton}
          />
        </Card>

        {/* Quick Stats */}
        <Card>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{streak}</Text>
              <Text style={styles.statLabel}>Current</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>30</Text>
              <Text style={styles.statLabel}>Goal</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {Math.round((streak / 30) * 100)}%
              </Text>
              <Text style={styles.statLabel}>Progress</Text>
            </View>
          </View>
        </Card>
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
    paddingBottom: Spacing.lg,
  },
  header: {
    paddingVertical: Spacing.lg,
    alignItems: "center",
  },
  dateText: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
    textAlign: "center",
  },
  welcomeText: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    color: Colors.light.text,
    textAlign: "center",
    marginTop: Spacing.xs,
  },
  streakCard: {
    backgroundColor: Colors.primary,
    marginBottom: Spacing.md,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: Spacing.md,
  },
  progressContainer: {
    position: "relative",
    marginRight: Spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  streakNumber: {
    fontSize: FontSizes.xxl,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  streakLabel: {
    fontSize: FontSizes.sm,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  streakInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  streakTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: Spacing.xs,
  },
  motivationalMessage: {
    fontSize: FontSizes.sm,
    color: "#FFFFFF",
    opacity: 0.9,
    lineHeight: 20,
  },
  affirmationCard: {
    backgroundColor: Colors.secondary,
    marginBottom: Spacing.md,
    alignItems: "center",
  },
  affirmationTitle: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
  affirmationText: {
    fontSize: FontSizes.lg,
    color: "#FFFFFF",
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: Spacing.sm,
  },
  questionText: {
    fontSize: FontSizes.md,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.md,
  },
  buttonRow: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  checkInButton: {
    flex: 1,
  },
  coachDescription: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.md,
    lineHeight: 20,
  },
  coachButton: {
    marginTop: Spacing.sm,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: Spacing.sm,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    color: Colors.primary,
  },
  statLabel: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
    marginTop: Spacing.xs,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.light.border,
  },
});

export default HomeScreen;
