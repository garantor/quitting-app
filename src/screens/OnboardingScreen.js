import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import { useUser } from "../context/UserContext";
import Button from "../components/Button";
import { colors, spacing, fontSizes, borderRadius } from "../constants/theme";
import { createPasskey, authenticateWithPasskey, checkExistingPasskey } from "../utils/passkey";

const { width } = Dimensions.get("window");

const onboardingData = [
  {
    id: 1,
    title: "Welcome to Clarity",
    subtitle: "Your journey to recovery starts here",
    description:
      "Track your progress, build healthy habits, and get the support you need.",
    // You can add image sources here
  },
  {
    id: 2,
    title: "Track Your Progress",
    subtitle: "See how far you've come",
    description:
      "Monitor your streaks, log your feelings, and celebrate your victories.",
  },
  {
    id: 3,
    title: "Get Support",
    subtitle: "You're not alone",
    description:
      "Chat with our AI coach, read daily affirmations, and journal your thoughts.",
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { completeOnboarding } = useUser();
    const scrollViewRef = useRef(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const currentIndex = event.nativeEvent.contentOffset.x / slideSize;
    setCurrentSlide(Math.round(currentIndex));
  };

 const handleGetStarted = async () => {
    try {
      setIsAuthenticating(true);
      
      // Check if user already has a passkey
      const hasExistingPasskey = await checkExistingPasskey();
      
      if (hasExistingPasskey) {
        // Authenticate with existing passkey
        const authResult = await authenticateWithPasskey();
        if (authResult.success) {
          completeOnboarding();
          navigation.replace("MainTabs");
        } else {
          Alert.alert("Authentication Failed", "Please try again or contact support.");
        }
      } else {
        // Create new passkey
        Alert.alert(
          "Set Up Secure Access",
          "Clarity uses passkeys for secure, password-free access to your recovery data. This helps protect your privacy and makes sign-in easier.",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Set Up Passkey",
              onPress: async () => {
                const createResult = await createPasskey();
                if (createResult.success) {
                  completeOnboarding();
                  navigation.replace("MainTabs");
                } else {
                  Alert.alert("Setup Failed", "Unable to set up passkey. Please try again.");
                }
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error("Authentication error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  //   const checkExistingPasskey = async () => {
  //   // This would check AsyncStorage or your auth system for existing passkey
  //   // For now, return false to always prompt for new passkey setup
  //   return false;
  // };

  const handleSkip = () => {
    completeOnboarding();
    Alert.alert(
      "Onboarding Skipped",
      "You can always set up secure access later in the settings.",
  
    );
    // navigation.replace("MainTabs");
  };

    const handleNext = () => {
    if (currentSlide < onboardingData.length - 1) {
      const nextSlide = currentSlide + 1;
      scrollViewRef.current?.scrollTo({
        x: nextSlide * width,
        animated: true,
      });
      setCurrentSlide(nextSlide);
    }
  };

  const renderSlide = (item) => {
    return (
      <View key={item.id} style={styles.slide}>
        <View style={styles.imageContainer}>
          {/* Placeholder for illustration */}
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>🌱</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  const renderPagination = () => {
    return (
      <View style={styles.pagination}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === currentSlide && styles.activeDot]}
          />
        ))}
      </View>
    );
  };



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.scrollView}
      >
        {onboardingData.map(renderSlide)}
      </ScrollView>

      {renderPagination()}

       <View style={styles.footer}>
        {currentSlide === onboardingData.length - 1 ? (
          <View style={{ marginBottom: 10 }}>
            <Button
              title={isAuthenticating ? "Setting up..." : "Get Started"}
              onPress={handleGetStarted}
              style={styles.button}
              disabled={isAuthenticating}
            />
          </View>
        ) : (
          <View style={{ marginBottom: 10 }}>
            <View style={styles.buttonContainer}>
              <Button
                title="Skip"
                onPress={handleSkip}
                variant="ghost"
                style={styles.skipButton}
              />
              <Button
                title="Next"
                onPress={handleNext}
                style={styles.nextButton}
              />
            </View>
          </View>
        )}
      </View>
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
  },
  slide: {
    width,
    flex: 1,
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.xxl,
  },
  placeholderImage: {
    width: 200,
    height: 200,
    backgroundColor: colors.primary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 60,
  },
  content: {
    flex: 1,
    paddingTop: spacing.xxl,
    alignItems: "center",
  },
  title: {
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
    color: colors.light.text,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSizes.lg,
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.md,
    fontWeight: "600",
  },
  description: {
    fontSize: fontSizes.md,
    color: colors.light.textSecondary,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: spacing.md,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.light.border,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 24,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    paddingTop: spacing.md,
    backgroundColor: colors.light.background,
    minHeight: 100, // Ensure minimum height for footer
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.md,
  },
  button: {
    minHeight: 48, // Ensure minimum height for button
  },
  skipButton: {
    flex: 1,
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  nextButton: {
    flex: 2,
    minHeight: 48,
  },
});

export default OnboardingScreen;
