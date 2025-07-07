// TypeScript type definitions for the Clarity app

export interface User {
  streak: number;
  isFirstTime: boolean;
  darkMode: boolean;
  journalEntries: JournalEntry[];
  calendarData: CalendarData;
  affirmations: string[];
  currentAffirmation: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  mood?: string;
  note?: string;
  tags?: string[];
}

export interface CalendarData {
  [date: string]: {
    marked: boolean;
    dotColor: string;
    urge?: boolean;
    relapse?: boolean;
  };
}

export interface Affirmation {
  id: string;
  text: string;
  category: "Growth" | "Mindfulness" | "Spiritual" | "Confidence";
  author?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export interface Mood {
  emoji: string;
  label: string;
  value: string;
}
