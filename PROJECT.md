# AI Companion App

## Project Overview

An AI companion mobile app built with React Native and Expo that helps users who are feeling alone by providing customizable AI-powered conversations through both text and voice chat.

## Key Features

### Core Functionality
- **Voice & Text Chat**: Real-time conversations with AI companion using ElevenLabs SDK
- **Customizable Personality**: AI companion personality based on user onboarding preferences
- **Localized Experience**: Country-based greeting and localization support
- **Authentication**: Google Sign-In and Apple Sign-In integration
- **Monetization**: Subscription-based premium features via RevenueCat

### User Experience
- **Onboarding Flow**: Welcome screen with personalized greeting and personality setup
- **Voice Chat**: Push-to-talk and hands-free conversation modes
- **Conversation History**: Persistent chat history and context memory
- **Premium Features**: Advanced customization and extended features for subscribers

## Tech Stack

### Frontend
- **Framework**: React Native with Expo SDK 53
- **Navigation**: Expo Router
- **UI Components**: Custom themed components with React Native base

### Audio & AI
- **Voice AI**: ElevenLabs React Native SDK (`@elevenlabs/react-native`)
- **Real-time Communication**: LiveKit integration
- **WebRTC**: React Native WebRTC for audio streaming

### Authentication & Backend
- **Authentication**: Firebase Auth or Supabase (Google/Apple Sign-In)
- **Storage**: AsyncStorage (local), Firebase/Supabase (cloud)
- **Monetization**: RevenueCat for subscription management

### Development Tools
- **Language**: TypeScript
- **Linting**: ESLint with Expo config
- **Build**: Expo Development Build with custom native code

## Project Structure

```
aiCompanionApp/
├── app/                    # App router pages
│   ├── (tabs)/            # Tab-based navigation
│   ├── auth/              # Authentication screens
│   ├── onboarding/        # User onboarding flow
│   └── chat/              # Chat interface
├── components/            # Reusable UI components
│   └── ui/               # Core UI components
├── services/             # API and service integrations
│   ├── elevenlabs/       # ElevenLabs AI service
│   ├── auth/             # Authentication service
│   └── revenuecat/       # Subscription service
├── hooks/                # Custom React hooks
├── constants/            # App constants and configuration
└── assets/               # Static assets (images, fonts)
```

## Development Phases

1. **Authentication & Onboarding** - User signup/login and personality setup
2. **RevenueCat Integration** - Subscription management and paywalls
3. **ElevenLabs Voice AI** - Core voice chat functionality
4. **Chat Interface** - Text and voice messaging UI
5. **Customization** - Personality and companion customization
6. **Polish & Launch** - Performance optimization and app store preparation

## Target Audience

Users seeking emotional support and companionship, particularly those who:
- Feel lonely or isolated
- Want to practice conversations
- Need emotional support outside of traditional therapy
- Prefer AI-powered interactions for privacy

## Monetization Strategy

**Freemium Model** with RevenueCat subscriptions:
- **Free Tier**: Basic text chat with limited daily messages
- **Premium Tier**: Unlimited voice chat, advanced personality options, conversation history
- **Pro Tier**: Multiple AI companions, priority response times, export features