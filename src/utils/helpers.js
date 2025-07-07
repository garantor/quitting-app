// Utility functions for the Clarity app

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const calculateStreak = (calendarData) => {
  const today = new Date();
  let streak = 0;

  for (let i = 0; i < 365; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - i);
    const dateString = checkDate.toISOString().split("T")[0];

    const dayData = calendarData[dateString];
    if (dayData && dayData.relapse) {
      break;
    }
    if (dayData && !dayData.relapse) {
      streak++;
    }
    if (!dayData && i > 0) {
      break;
    }
  }

  return streak;
};

export const getRandomAffirmation = (affirmations) => {
  return affirmations[Math.floor(Math.random() * affirmations.length)];
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const truncateText = (text, length = 100) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
};
