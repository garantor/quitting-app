import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView 
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../context/UserContext';
import { colors, spacing, fontSizes, borderRadius } from '../constants/theme';
import Card from '../components/Card';

export default function CalendarScreen() {
  const { isDarkMode, streakData } = useContext(UserContext);
  const currentColors = isDarkMode ? colors.dark : colors.light;
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mock calendar data - replace with real data from context
  const calendarData = {
    '2024-07-01': { dotColor: colors.success, note: 'Great day!' },
    '2024-07-02': { dotColor: colors.success, note: 'Stayed strong' },
    '2024-07-03': { dotColor: colors.warning, note: 'Had an urge' },
    '2024-07-05': { dotColor: colors.error, note: 'Relapse' },
    '2024-07-06': { dotColor: colors.success, note: 'Back on track' },
    '2024-07-07': { dotColor: colors.success, note: 'Feeling good' },
    '2024-07-08': { dotColor: colors.success, note: 'Progress!' },
    '2024-07-09': { dotColor: colors.success, note: 'Strong day' },
    '2024-07-10': { dotColor: colors.success, note: 'Confident' },
    '2024-07-11': { dotColor: colors.success, note: 'Today!' },
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

  // Convert calendar data to marked dates format for react-native-calendars
  const getMarkedDates = () => {
    const marked = {};
    
    Object.entries(calendarData).forEach(([date, data]) => {
      marked[date] = {
        marked: true,
        dotColor: data.dotColor,
        customStyles: {
          container: {
            backgroundColor: data.dotColor === colors.error ? colors.error + '20' : 'transparent',
            borderRadius: 15,
          },
          text: {
            color: data.dotColor === colors.error ? colors.error : currentColors.text,
            fontWeight: data.dotColor === colors.success ? 'bold' : 'normal',
          },
        },
      };
    });

    // Mark today
    const today = new Date().toISOString().split('T')[0];
    if (!marked[today]) {
      marked[today] = { marked: false };
    }
    marked[today] = {
      ...marked[today],
      selected: true,
      selectedColor: colors.primary,
    };

    return marked;
  };

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
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
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
    const textStyle = [styles.dayText, { color: currentColors.text }];

    if (isToday) {
      baseStyle.push([styles.todayButton, { backgroundColor: colors.primary }]);
      textStyle.push(styles.todayText);
    }

    if (data?.dotColor === colors.error) {
      baseStyle.push([styles.relapseDay, { backgroundColor: colors.error + '20' }]);
    }

    return { baseStyle, textStyle };
  };

  const getDayIndicator = (dayInfo) => {
    if (!dayInfo?.data) return null;

    const { data } = dayInfo;

    if (data.dotColor === colors.error) {
      return <Text style={[styles.relapseIndicator, { color: colors.error }]}>×</Text>;
    } else if (data.dotColor === colors.success) {
      return <View style={[styles.dotIndicator, { backgroundColor: colors.success }]} />;
    } else if (data.dotColor === colors.warning) {
      return <View style={[styles.dotIndicator, { backgroundColor: colors.warning }]} />;
    }

    return null;
  };

  const renderHeader = () => (
    <View style={[styles.header, { borderBottomColor: currentColors.border }]}>
      <Text style={[styles.headerTitle, { color: currentColors.text }]}>
        Recovery Calendar
      </Text>
      <Text style={[styles.headerSubtitle, { color: currentColors.textSecondary }]}>
        Track your progress day by day
      </Text>
    </View>
  );

  const renderLegend = () => (
    <Card style={{ backgroundColor: currentColors.surface }}>
      <Text style={[styles.legendTitle, { color: currentColors.text }]}>Legend</Text>
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
          <Text style={[styles.legendText, { color: currentColors.text }]}>Success Day</Text>
        </View>
        <View style={styles.legendItem}>
          <Text style={[styles.legendX, { color: colors.error }]}>×</Text>
          <Text style={[styles.legendText, { color: currentColors.text }]}>Relapse</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.warning }]} />
          <Text style={[styles.legendText, { color: currentColors.text }]}>Urge/Struggle</Text>
        </View>
      </View>
    </Card>
  );

  const renderStats = () => {
    const today = new Date();
    const thisMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;

    // Calculate this month's data
    const thisMonthEntries = Object.entries(calendarData).filter(([date]) =>
      date.startsWith(thisMonth)
    );

    const successDays = thisMonthEntries.filter(
      ([, data]) => data.dotColor === colors.success
    ).length;

    const currentStreak = streakData?.currentStreak || 0;
    const longestStreak = streakData?.longestStreak || 0;

    return (
      <Card style={{ backgroundColor: currentColors.surface }}>
        <Text style={[styles.statsTitle, { color: currentColors.text }]}>Your Progress</Text>
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: currentColors.background }]}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>
              {currentStreak}
            </Text>
            <Text style={[styles.statLabel, { color: currentColors.textSecondary }]}>
              Current Streak
            </Text>
            <Text style={[styles.statUnit, { color: currentColors.textSecondary }]}>
              Days
            </Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: currentColors.background }]}>
            <Text style={[styles.statNumber, { color: colors.secondary }]}>
              {longestStreak}
            </Text>
            <Text style={[styles.statLabel, { color: currentColors.textSecondary }]}>
              Longest Streak
            </Text>
            <Text style={[styles.statUnit, { color: currentColors.textSecondary }]}>
              Days
            </Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: currentColors.background }]}>
            <Text style={[styles.statNumber, { color: colors.success }]}>
              {successDays}
            </Text>
            <Text style={[styles.statLabel, { color: currentColors.textSecondary }]}>
              This Month
            </Text>
            <Text style={[styles.statUnit, { color: currentColors.textSecondary }]}>
              Days
            </Text>
          </View>
        </View>
      </Card>
    );
  };

  const renderActionButtons = () => (
    <Card style={{ backgroundColor: currentColors.surface }}>
      <Text style={[styles.actionsTitle, { color: currentColors.text }]}>Quick Actions</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.relapseButton, { backgroundColor: colors.error }]}
          onPress={() => {
            // Handle relapse logging
            console.log('Log relapse');
          }}
        >
          <Ionicons name="close-circle" size={20} color="#FFFFFF" />
          <Text style={styles.relapseButtonText}>Log Relapse</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.noteButton, { backgroundColor: colors.primary }]}
          onPress={() => {
            // Handle note adding
            console.log('Add note');
          }}
        >
          <Ionicons name="create" size={20} color="#FFFFFF" />
          <Text style={styles.noteButtonText}>Add Note</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  const renderCustomCalendar = () => {
    const days = getDaysInMonth(currentDate);

    return (
      <Card style={{ backgroundColor: currentColors.surface }}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity
            style={[styles.navButton, { backgroundColor: currentColors.background }]}
            onPress={() => navigateMonth(-1)}
          >
            <Ionicons name="chevron-back" size={18} color={currentColors.text} />
          </TouchableOpacity>

          <Text style={[styles.monthTitle, { color: currentColors.text }]}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Text>

          <TouchableOpacity
            style={[styles.navButton, { backgroundColor: currentColors.background }]}
            onPress={() => navigateMonth(1)}
          >
            <Ionicons name="chevron-forward" size={18} color={currentColors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.dayHeaders}>
          {dayNames.map((day, index) => (
            <Text key={index} style={[styles.dayHeader, { color: currentColors.textSecondary }]}>
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
      </Card>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentColors.background }]}>
      {renderHeader()}
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderStats()}
        {renderCustomCalendar()}
        {renderLegend()}
        {renderActionButtons()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    borderBottomWidth: 1,
      paddingVertical: spacing.md,
  minHeight: 60,
  },
  headerTitle: {
    fontSize: fontSizes.xl,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: fontSizes.sm,
    marginTop: spacing.xs,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  legendTitle: {
    fontSize: fontSizes.lg,
    fontWeight: "600",
    marginBottom: spacing.md,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendX: {
    fontSize: 16,
    fontWeight: "bold",
    width: 12,
    textAlign: "center",
  },
  legendText: {
    fontSize: fontSizes.sm,
  },
  statsTitle: {
    fontSize: fontSizes.lg,
    fontWeight: "600",
    marginBottom: spacing.md,
    textAlign: "center",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: "center",
  },
  statNumber: {
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: fontSizes.xs,
    textAlign: "center",
    marginBottom: spacing.xs / 2,
  },
  statUnit: {
    fontSize: fontSizes.xs,
    textAlign: "center",
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  navButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  monthTitle: {
    fontSize: fontSizes.lg,
    fontWeight: "600",
  },
  dayHeaders: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: spacing.sm,
  },
  dayHeader: {
    fontSize: fontSizes.sm,
    fontWeight: "600",
    textAlign: "center",
    width: 40,
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  emptyDay: {
    width: 40,
    height: 40,
    margin: 2,
  },
  dayButton: {
    width: 40,
    height: 40,
    margin: 2,
    borderRadius: borderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  dayText: {
    fontSize: fontSizes.sm,
    fontWeight: "500",
  },
  todayButton: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  todayText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  relapseDay: {
    borderWidth: 1,
    borderColor: colors.error,
  },
  dotIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    position: "absolute",
    bottom: 4,
  },
  relapseIndicator: {
    fontSize: 12,
    fontWeight: "bold",
    position: "absolute",
    top: 2,
    right: 2,
  },
  actionsTitle: {
    fontSize: fontSizes.lg,
    fontWeight: "600",
    marginBottom: spacing.md,
    textAlign: "center",
  },
  actionButtons: {
    flexDirection: "row",
    gap: spacing.md,
  },
  relapseButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  relapseButtonText: {
    color: "#FFFFFF",
    fontSize: fontSizes.sm,
    fontWeight: "600",
  },
  noteButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  noteButtonText: {
    color: "#FFFFFF",
    fontSize: fontSizes.sm,
    fontWeight: "600",
  },
});