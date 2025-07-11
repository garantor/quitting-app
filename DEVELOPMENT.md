# Clarity App - Development Guide

## Quick Start

To run the Clarity app in development mode:

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on specific platforms
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # Web browser
```

## Development Commands

- `npm start` - Start Expo development server
- `npm run web` - Run in web browser at http://localhost:8081
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator

## Architecture Overview

### State Management

The app uses React Context API (`UserContext`) for global state management:

- User progress tracking
- Journal entries
- Calendar data
- Settings and preferences

### Navigation Structure

```
App
├── Onboarding (first-time users)
└── MainTabs (bottom tab navigation)
    ├── Home (dashboard)
    ├── Calendar (progress tracking)
    ├── Coach (AI chatbot)
    ├── Journal (mood & notes)
    ├── Affirmations (motivational content)
    └── Profile (settings)
```

### Key Components

- `Button` - Reusable button with variants
- `Card` - Container component with elevation
- `ProgressRing` - Animated progress visualization

### Data Persistence

- Uses AsyncStorage for local data storage
- Automatic save/load on app startup
- No server dependency - fully offline

## Customization

### Theme colors

Edit `src/constants/theme.js` to modify the color palette:

- Primary: #10B981 (Emerald)
- Secondary: #3B82F6 (Blue)
- Light/Dark mode support

### Adding New Affirmations

Modify the affirmations array in `AffirmationsScreen.js`

### Coach Responses

Update bot responses in `CoachScreen.js` for different conversation scenarios

## Development Tips

1. **Hot Reload**: Save any file to see changes instantly
2. **Debug Menu**: Shake device or press Cmd+D (iOS) / Cmd+M (Android)
3. **Web Testing**: Use browser dev tools for debugging
4. **Expo Go**: Install on your phone to test on real device

## Troubleshooting

### Common Issues

- **Metro bundler errors**: Run `npx expo start --clear`
- **Package conflicts**: Delete `node_modules` and run `npm install`
- **Web not working**: Ensure web dependencies are installed

### Missing Dependencies

If you get dependency errors, run:

```bash
npx expo install react-dom react-native-web @expo/metro-runtime
```

## Deployment

### Building for Production

```bash
# Build for iOS
npx expo build:ios

# Build for Android
npx expo build:android

# Build for web
npx expo build:web
```

### App Store Deployment

1. Configure app.json with appropriate metadata
2. Generate required certificates
3. Use Expo Application Services (EAS) for building
4. Submit to respective app stores

## Next Steps

1. Test on physical devices
2. Add more sophisticated AI responses
3. Implement push notifications for reminders
4. Add data export functionality
5. Implement accountability partner features
6. Add meditation/breathing exercises
7. Integrate with health apps

---

**Happy coding!** 🚀
