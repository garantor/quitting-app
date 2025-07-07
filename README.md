# Clarity - Porn Addiction Recovery App

A React Native mobile application designed to help users on their journey to overcome porn addiction through tracking, support, and mindfulness features.

## Features

### 🌟 Core Functionality

- **Progress Tracking**: Monitor daily streaks and recovery milestones
- **Calendar View**: Visual representation of progress with colored markers
- **AI Coach Chat**: Supportive chatbot for guidance and motivation
- **Journal & Reflection**: Mood tracking and personal note-taking
- **Daily Affirmations**: Categorized motivational content
- **Profile & Settings**: Dark mode, data management, and customization

### 📱 Screens

1. **Onboarding** - Welcome carousel with app introduction
2. **Home/Dashboard** - Streak counter, daily affirmation, quick check-ins
3. **Calendar** - Monthly view with progress tracking
4. **Coach** - AI chatbot with pre-built responses and support
5. **Journal** - Mood selection, notes, and tag system
6. **Affirmations** - Categorized inspirational content
7. **Profile** - Settings, statistics, and data management

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Bottom Tabs + Stack)
- **Storage**: AsyncStorage for local data persistence
- **State Management**: React Context API
- **UI Components**: Custom reusable components
- **Calendar**: react-native-calendars
- **Icons**: Expo Vector Icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd porn-quitting-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Run on your device:

- Install Expo Go app on your phone
- Scan the QR code from the terminal
- Or use an emulator: `npm run ios` / `npm run android`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.js
│   ├── Card.js
│   └── ProgressRing.js
├── constants/           # App constants and theme
│   └── theme.js
├── context/            # React Context providers
│   └── UserContext.js
├── navigation/         # Navigation setup
│   └── TabNavigator.js
├── screens/           # App screens
│   ├── OnboardingScreen.js
│   ├── HomeScreen.js
│   ├── CalendarScreen.js
│   ├── CoachScreen.js
│   ├── JournalScreen.js
│   ├── AffirmationsScreen.js
│   └── ProfileScreen.js
└── utils/             # Utility functions
```

## Design System

### Color Palette

- **Primary**: #10B981 (Emerald)
- **Secondary**: #3B82F6 (Blue)
- **Success**: #10B981
- **Warning**: #F59E0B
- **Error**: #EF4444

### Theme Support

- Light mode (default)
- Dark mode (user toggleable)
- Consistent spacing and typography

## Features in Detail

### Progress Tracking

- Daily streak counter with visual progress ring
- Calendar integration with color-coded days
- Statistics dashboard with monthly summaries

### AI Coach

- Pre-scripted responses based on user input
- Quick reply buttons for common scenarios
- Supportive messaging focused on recovery

### Journal System

- Emoji-based mood selection
- Free-form text notes
- Tag system for categorization
- Historical entries with timestamps

### Affirmations

- 20+ motivational affirmations
- Category filtering (Growth, Mindfulness, Spiritual, Confidence)
- Favorites system
- Daily rotation

## Data Storage

All user data is stored locally using AsyncStorage:

- Streak count and progress
- Journal entries
- Calendar markings
- User preferences and settings
- Favorites and customizations

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support or questions about the app, please contact the development team or create an issue in the repository.

---

**Note**: This app is designed as a supportive tool and should not replace professional medical advice or therapy for addiction recovery.
