import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../context/UserContext";
import Card from "../components/Card";
import { Colors, Spacing, FontSizes } from "../constants/theme";

const CalendarScreen = () => {
  const { calendarData, streak } = useUser();
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const dayData = calendarData[dateStr];
      const isToday = isDateToday(year, month, day);

      days.push({
        day,
        dateStr,
        data: dayData,
        isToday,
      });
    }

    return days;
  };

  const isDateToday = (year, month, day) => {
    const today = new Date();
    return (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    );
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getDayStyle = (dayInfo) => {
    if (!dayInfo) return {};

    const { data, isToday } = dayInfo;
    const baseStyle = [styles.dayButton];
    const textStyle = [styles.dayText];

    if (isToday) {
      baseStyle.push(styles.todayButton);
      textStyle.push(styles.todayText);
    }

    return { baseStyle, textStyle };
  };

  const getDayIndicator = (dayInfo) => {
    if (!dayInfo?.data) return null;

    const { data } = dayInfo;

    if (data.dotColor === Colors.error) {
      return <Text style={styles.relapseIndicator}>X</Text>;
    } else if (data.dotColor === Colors.success) {
      return (
        <View
          style={[styles.dotIndicator, { backgroundColor: Colors.success }]}
        />
      );
    } else if (data.dotColor === Colors.warning) {
      return (
        <View
          style={[styles.dotIndicator, { backgroundColor: Colors.warning }]}
        />
      );
    }

    return null;
  };

  const renderLegend = () => {
    return (
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendDot, { backgroundColor: Colors.success }]}
          />
          <Text style={styles.legendText}>Success</Text>
        </View>
        <View style={styles.legendItem}>
          <Text style={styles.legendX}>X</Text>
          <Text style={styles.legendText}>Relapse</Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendDot, { backgroundColor: Colors.warning }]}
          />
          <Text style={styles.legendText}>Urge</Text>
        </View>
      </View>
    );
  };

  const renderStats = () => {
    const today = new Date();
    const thisMonth = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}`;

    // Calculate this month's data
    const thisMonthEntries = Object.entries(calendarData).filter(([date]) =>
      date.startsWith(thisMonth)
    );

    const successDays = thisMonthEntries.filter(
      ([, data]) => data.dotColor === Colors.success
    ).length;

    // Mock data for longest streak
    const longestStreak = 35;

    return (
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Current Streak</Text>
          <Text style={styles.statNumber}>
            {streak} <Text style={styles.statUnit}>Days</Text>
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Longest Streak</Text>
          <Text style={styles.statNumber}>
            {longestStreak} <Text style={styles.statUnit}>Days</Text>
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>This Month</Text>
          <Text style={styles.statNumber}>
            {successDays} <Text style={styles.statUnit}>Days</Text>
          </Text>
        </View>
      </View>
    );
  };

  const renderActionButtons = () => {
    return (
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.relapseButton}>
          <Text style={styles.relapseButtonText}>Log Relapse</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.noteButton}>
          <Text style={styles.noteButtonText}>Add Note</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCustomCalendar = () => {
    const days = getDaysInMonth(currentDate);

    return (
      <View style={styles.calendarCard}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigateMonth(-1)}
          >
            <Ionicons
              name="chevron-back"
              size={18}
              color={Colors.light.textSecondary}
            />
          </TouchableOpacity>

          <Text style={styles.monthTitle}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Text>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigateMonth(1)}
          >
            <Ionicons
              name="chevron-forward"
              size={18}
              color={Colors.light.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.dayHeaders}>
          {dayNames.map((day, index) => (
            <Text key={index} style={styles.dayHeader}>
              {day}
            </Text>
          ))}
        </View>

        <View style={styles.daysGrid}>
          {days.map((dayInfo, index) => {
            if (!dayInfo) {
              return <View key={index} style={styles.emptyDay} />;
            }

            const { baseStyle, textStyle } = getDayStyle(dayInfo);

            return (
              <TouchableOpacity
                key={index}
                style={baseStyle}
                onPress={() => console.log("Selected day", dayInfo.dateStr)}
              >
                <Text style={textStyle}>{dayInfo.day}</Text>
                {getDayIndicator(dayInfo)}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={Colors.light.textSecondary}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Porn-Free Tracker</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderLegend()}
        {renderCustomCalendar()}
        {renderStats()}
        {renderActionButtons()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
    backgroundColor: Colors.light.background,
  },
  backButton: {
    padding: Spacing.xs,
  },
  headerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    color: Colors.light.text,
    textAlign: "center",
  },
  headerSpacer: {
    width: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  legendDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  legendX: {
    width: 16,
    height: 16,
    color: Colors.error,
    fontSize: FontSizes.sm,
    fontWeight: "bold",
    textAlign: "center",
  },
  legendText: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
  },
  calendarCard: {
    marginVertical: Spacing.sm,
    backgroundColor: Colors.light.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  navButton: {
    padding: Spacing.sm,
    borderRadius: 20,
    backgroundColor: Colors.light.background,
  },
  monthTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    color: Colors.light.text,
  },
  dayHeaders: {
    flexDirection: "row",
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  dayHeader: {
    flex: 1,
    textAlign: "center",
    fontSize: FontSizes.xs,
    fontWeight: "bold",
    color: Colors.light.textSecondary,
    paddingVertical: Spacing.sm,
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  emptyDay: {
    width: "14.28%",
    height: 40,
  },
  dayButton: {
    width: "14.28%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderRadius: 20,
    marginVertical: 2,
  },
  todayButton: {
    backgroundColor: Colors.primary,
  },
  dayText: {
    fontSize: FontSizes.sm,
    fontWeight: "500",
    color: Colors.light.text,
  },
  todayText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  dotIndicator: {
    position: "absolute",
    bottom: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  relapseIndicator: {
    position: "absolute",
    bottom: -2,
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.error,
  },
  statsGrid: {
    flexDirection: "row",
    gap: Spacing.md,
    marginVertical: Spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.md,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  statLabel: {
    fontSize: FontSizes.sm,
    fontWeight: "500",
    color: Colors.light.textSecondary,
    marginBottom: Spacing.xs,
  },
  statNumber: {
    fontSize: FontSizes.xl * 1.2,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  statUnit: {
    fontSize: FontSizes.md,
    fontWeight: "500",
  },
  actionButtons: {
    flexDirection: "row",
    gap: Spacing.md,
    marginVertical: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  relapseButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.md,
    backgroundColor: Colors.error,
    borderRadius: 8,
  },
  relapseButtonText: {
    color: "#FFFFFF",
    fontSize: FontSizes.md,
    fontWeight: "bold",
  },
  noteButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.md,
    backgroundColor: "#E2E8F0",
    borderRadius: 8,
  },
  noteButtonText: {
    color: Colors.light.text,
    fontSize: FontSizes.md,
    fontWeight: "bold",
  },
});

export default CalendarScreen;
