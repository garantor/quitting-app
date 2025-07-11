import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export { UserContext };

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [streak, setStreak] = useState(0);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [journalEntries, setJournalEntries] = useState([]);
  const [calendarData, setCalendarData] = useState({});
  const [affirmations, setAffirmations] = useState([
    "I am stronger than my urges.",
    "Every day I choose recovery, I grow stronger.",
    "I am worthy of a life free from addiction.",
    "Progress, not perfection.",
    "I choose clarity over temporary pleasure.",
  ]);
  const [currentAffirmation, setCurrentAffirmation] = useState("");

  // Load data from AsyncStorage on app start
  useEffect(() => {
    loadUserData();
  }, []);

  // Save data to AsyncStorage whenever state changes
  useEffect(() => {
    saveUserData();
  }, [streak, journalEntries, calendarData, darkMode]);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("clarityUserData");
      if (userData) {
        const parsed = JSON.parse(userData);
        setStreak(parsed.streak || 0);
        setJournalEntries(parsed.journalEntries || []);
        setCalendarData(parsed.calendarData || {});
        setDarkMode(parsed.darkMode || false);
        setIsFirstTime(false);
      }

      // Set random daily affirmation
      const randomAffirmation =
        affirmations[Math.floor(Math.random() * affirmations.length)];
      setCurrentAffirmation(randomAffirmation);
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const saveUserData = async () => {
    try {
      const userData = {
        streak,
        journalEntries,
        calendarData,
        darkMode,
      };
      await AsyncStorage.setItem("clarityUserData", JSON.stringify(userData));
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const completeOnboarding = () => {
    setIsFirstTime(false);
  };

  const logUrge = (hadUrge) => {
    const today = new Date().toISOString().split("T")[0];
    setCalendarData((prev) => ({
      ...prev,
      [today]: {
        ...prev[today],
        urge: hadUrge,
        marked: true,
        dotColor: hadUrge ? "#F59E0B" : "#10B981",
      },
    }));
  };

  const logRelapse = () => {
    setStreak(0);
    const today = new Date().toISOString().split("T")[0];
    setCalendarData((prev) => ({
      ...prev,
      [today]: {
        marked: true,
        dotColor: "#EF4444",
        relapse: true,
      },
    }));
  };

  const addJournalEntry = (entry) => {
    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...entry,
    };
    setJournalEntries((prev) => [newEntry, ...prev]);
  };

  const incrementStreak = () => {
    setStreak((prev) => prev + 1);
  };

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };
   const clearUserData = async () => {
   
    try {
      await AsyncStorage.removeItem("clarityUserData");
      setStreak(0);
      setJournalEntries([]);
      setCalendarData({});
      setDarkMode(false);
      setIsFirstTime(true);
    } catch (error) {
      console.error("Error clearing user data:", error);
    }
  };


  const value = {
    streak,
    isFirstTime,
    darkMode,
    isDarkMode: darkMode,
    setIsDarkMode: setDarkMode,
    journalEntries,
    calendarData,
    affirmations,
    currentAffirmation: currentAffirmation,
    completeOnboarding,
    logUrge,
    logRelapse,
    addJournalEntry,
    incrementStreak,
    toggleTheme,
    clearUserData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
