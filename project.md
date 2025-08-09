# 🧠 AI Companion App – Project Overview = Tovi Ai Companion

## 📱 App Name (Working Title)

**EchoMate: Your Personal Voice Companion**

## 🧾 Description

EchoMate is a mobile AI companion app designed to help users who feel lonely or need emotional support by offering personalized voice interactions. It uses ElevenLabs for voice synthesis and OpenAI/GPT for dynamic conversation. Users can create their own companions through a beautifully guided onboarding experience and chat in real-time by voice or text.

## 🚀 Key Features

* 🎤 Real-time voice and text chat with AI
* 🧠 Onboarding quiz to customize the companion's tone, gender, and personality
* 🔊 Voice selection (ElevenLabs SDK integration)
* 🌍 Localized onboarding with greeting in user's language
* 👥 Custom AI characters with explore page
* ⏱ Daily usage limits (free/premium tiers)
* 💎 RevenueCat integration for premium subscriptions
* 📦 Local caching using MMKV

## 🛠️ Tech Stack

### Frontend (Expo React Native)

* `react-navigation`
* `expo-localization`
* `i18next` for translations
* `@elevenlabs/react-native`
* `@async-storage`
* `@supabase/supabase-js`
* `@revenuecat/react-native-purchases`

### Backend

* Supabase (Postgres + Auth + Storage + Edge Functions)
* FastAPI (optional - for advanced moderation, proxy, or voice prompt building)
* Cloudflare R2 (optional - for cheap audio storage)

## 🧩 Modules

### 1. **Onboarding Flow**

* Welcome Screen
* Personality Quiz
* Voice Selection
* Finalize Character

### 2. **Main App**

* Chat screen (voice and text)
* Companion switcher
* Explore public characters
* Settings

## 🔐 Auth & Premium

* Apple / Google Sign-in via Supabase Auth
* RevenueCat handles purchases and entitlement syncing
* `is_premium` flag in `profiles` table
* Premium unlocks:

  * More voices
  * Daily usage boosts
  * Multiple custom companions

## 🧱 Database Schema (Supabase)

Includes:

* `profiles`
* `characters`
* `conversations`
* `messages`
* `message_feedback`
* `tags` and `character_tags`
* Quota tracking tables: `daily_usage`

## ⏱ Daily Limits

Implemented via:

* Supabase Edge Scheduled Function (resets daily)
* FastAPI/Edge quota-check middleware for each message

## 🌍 Localization

* All text localized using i18next + async loading with MMKV
* Greeting audio localized by country (optional via ElevenLabs multilingual voices)

## ✅ Milestones

* [x] Database design complete
* [x] RLS & quotas implemented
* [x] Onboarding flow designed
* [ ] Mobile onboarding screens built
* [ ] ElevenLabs SDK integrated
* [ ] Chat UI + voice streaming
* [ ] Explore page + public characters
* [ ] App Store prep (iOS only)

## 💡 Next Steps

* Build onboarding screens and logic
* Integrate ElevenLabs and start generating companion previews
* Start beta testing on TestFlight

## 🏁 Launch Plan

* Soft launch on iOS (TestFlight)
* Collect feedback and refine onboarding
* Public launch + Product Hunt + community marketing
* Android version (Phase 2)

---

Let’s win the Apple Design Awards 🏆
