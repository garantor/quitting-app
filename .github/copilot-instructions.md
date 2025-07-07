# Copilot Instructions for Clarity App

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Context

This is a React Native Expo app called "Clarity" - a porn addiction recovery app designed to help users track their progress, maintain streaks, and get support through their recovery journey.

## Key Features & Requirements

- **Screens**: Onboarding, Home/Dashboard, Calendar, AI Coach Chat, Journal, Affirmations, Profile/Settings
- **Navigation**: Bottom tab navigation using React Navigation
- **Theme**: Support for light/dark mode with specified color palette
- **Storage**: Use AsyncStorage for local data persistence
- **State Management**: React Context API for global state
- **Components**: Functional components with hooks

## Color Palette

- Primary: #10B981 (Emerald)
- Secondary: #3B82F6 (Blue)
- Background Light: #F9FAFB
- Background Dark: #111827
- Text Light: #111827
- Text Dark: #F9FAFB
- Success: #10B981
- Warning: #F59E0B
- Error: #EF4444

## Code Style Guidelines

- Use functional components with hooks
- Use TypeScript where beneficial
- Follow React Native best practices
- Implement proper accessibility features
- Use modular, reusable components
- Maintain clean, readable code structure

## App Architecture

- `/src/screens/` - All app screens
- `/src/components/` - Reusable UI components
- `/src/context/` - React Context providers
- `/src/utils/` - Utility functions
- `/src/types/` - TypeScript type definitions
- `/src/constants/` - App constants (colors, themes, etc.)

## Specific Implementation Notes

- Use Expo Vector Icons for consistent iconography
- Implement smooth animations and transitions
- Ensure responsive design for different screen sizes
- Store sensitive data securely using AsyncStorage
- Implement proper error handling and loading states
