import React, { useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../constants/theme';
import Svg, { Circle } from 'react-native-svg';
import Button from '../components/Button';
import { colors, spacing, fontSizes, borderRadius } from "../constants/theme";
import { UserContext } from '../context/UserContext';

const HomeScreen = () => {
  const { isDarkMode } = useContext(UserContext);
  const currentColors = isDarkMode ? colors.dark : colors.light;
  
  // Calculate progress circle values
  const dayCount = 17;
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progressPercentage = 30;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  const getCurrentDate = () => {
    const today = new Date();
    const options = { 
      weekday: 'long' , 
      month: 'long' , 
      day: 'numeric'  
    };
    return today.toLocaleDateString('en-US', options).toUpperCase();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentColors.background }]}>
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
        backgroundColor={currentColors.background}
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerSpacer} />
          <View style={styles.dateContainer}>
            <Text style={[styles.dateText, { color: currentColors.textSecondary }]}>
              {getCurrentDate()}
            </Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons 
              name="settings-outline" 
              size={theme.fontSizes.xl} 
              color={currentColors.textSecondary} 
            />
          </TouchableOpacity>
        </View>

        {/* Day Counter */}
        <View style={styles.dayCounterContainer}>
          <Text style={[styles.dayCounterTitle, { color: currentColors.text }]}>
            Day {dayCount}
          </Text>
          <Text style={[styles.dayCounterSubtitle, { color: currentColors.textSecondary }]}>
            of your journey
          </Text>
        </View>

        {/* Progress Circle */}
        <View style={styles.progressContainer}>
          <View style={styles.progressCircle}>
            <Svg width={200} height={200} viewBox="0 0 200 200">
              {/* Background Circle */}
              <Circle
                cx="100"
                cy="100"
                r={radius}
                stroke={currentColors.border || (isDarkMode ? '#374151' : '#E5E7EB')}
                strokeWidth="12"
                fill="transparent"
              />
              {/* Progress Circle */}
              <Circle
                cx="100"
                cy="100"
                r={radius}
                stroke={colors.primary}
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
              />
            </Svg>
            <View style={styles.progressText}>
              <Text style={styles.progressNumber}>
                {dayCount}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          {/* Talk to Coach Button */}
          <TouchableOpacity
            style={[styles.favoriteActionButton, { 
              backgroundColor: colors.primary,
              shadowColor: isDarkMode ? '#000' : colors.secondary,
              shadowOpacity: isDarkMode ? 0.5 : 0.3,
            }]}
            onPress={() => console.log('Talk to Clarity Coach pressed')}
          >
            <Ionicons 
              name="chatbubble-ellipses" 
              size={theme.fontSizes.xl} 
              color="#FFFFFF" 
            />
            <Text style={styles.coachButtonText}>Talk to Clarity Coach</Text>
          </TouchableOpacity>

          {/* AI Coach Card */}
          <View style={[styles.card, { 
            backgroundColor: currentColors.surface,
            shadowOpacity: isDarkMode ? 0.3 : 0.1,
          }]}>
            <View style={styles.cardContent}>
              <View style={styles.cardLeft}>
                <Text style={[styles.cardTitle, { color: currentColors.text }]}>
                  AI Coach
                </Text>
                <Text style={[styles.cardSubtitle, { color: currentColors.textSecondary }]}>
                  Remember why you started this journey. You've got this!
                </Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="chevron-forward" size={theme.fontSizes.xxl + 4} color={colors.secondary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Journal Card */}
          <View style={[styles.card, { 
            backgroundColor: currentColors.surface,
            shadowOpacity: isDarkMode ? 0.3 : 0.1,
          }]}>
            <View style={styles.cardContent}>
              <View style={styles.cardLeft}>
                <Text style={[styles.cardTitle, { color: currentColors.text }]}>
                  My Journal
                </Text>
                <Text style={[styles.journalText, { color: currentColors.textSecondary }]}>
                  Today was tough. I had a strong craving around 5 PM, but I managed to get through it by going for a walk. I'm proud of myself for not giving in. It feels good to be in control.
                </Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="chevron-forward" size={theme.fontSizes.xxl + 4} color={colors.secondary} />
              </TouchableOpacity>
            </View>
            
            {/* Add Entry Button */}
            <TouchableOpacity style={[styles.addEntryButton, {
              backgroundColor: colors.primary,
            }]}>
              <Ionicons name="create-outline" size={theme.fontSizes.xl} color={styles.coachButtonText.color} />
              <Text style={styles.coachButtonText}>
                Add to today's entry
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xl,
  },
  favoriteActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    elevation: 8,
  },
  headerSpacer: {
    width: theme.spacing.xl,
  },
  dateContainer: {
    alignItems: 'center',
  },
  dateText: {
    fontSize: theme.fontSizes.sm,
    fontWeight: '500',
  },
  settingsButton: {
    padding: theme.spacing.xs,
  },
  dayCounterContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  dayCounterTitle: {
    fontSize: theme.fontSizes.xxxl + 4,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  dayCounterSubtitle: {
    fontSize: theme.fontSizes.md,
    marginTop: theme.spacing.xs,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl - theme.spacing.sm,
  },
  progressCircle: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressNumber: {
    fontSize: theme.fontSizes.xxxl + 4,
    fontWeight: '800',
    color: colors.primary,
  },
  actionsContainer: {
    gap: theme.spacing.md,
  },
  coachButtonText: {
    color: '#FFFFFF',
    fontSize: theme.fontSizes.md,
    fontWeight: '700',
  },
  card: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg - theme.spacing.xs,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    elevation: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  cardLeft: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  cardTitle: {
    fontSize: theme.fontSizes.md,
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
  },
  cardSubtitle: {
    fontSize: theme.fontSizes.sm,
    lineHeight: 20,
  },
  journalText: {
    fontSize: theme.fontSizes.sm,
    lineHeight: 20,
    marginTop: theme.spacing.sm,
  },
  addEntryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md - theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  addEntryText: {
    fontSize: theme.fontSizes.sm,
    fontWeight: '700',
    color: colors.secondary,
  },
});

export default HomeScreen;