import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function SignUp() {
  const { t } = useTranslation();
  const { signUp, signInWithOAuth, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert(t('auth.errors.signUpError'), t('auth.errors.fillAllFields'));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(t('auth.errors.signUpError'), t('auth.errors.passwordsDoNotMatch'));
      return;
    }

    if (password.length < 6) {
      Alert.alert(t('auth.errors.signUpError'), t('auth.errors.passwordTooShort'));
      return;
    }

    const success = await signUp(email, password);
    if (success) {
      // User will be redirected automatically via auth state change
    }
  };

  const handleSocialSignUp = async (provider: 'apple' | 'google') => {
    const success = await signInWithOAuth(provider);
    if (success) {
      // User will be redirected automatically via auth state change
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-secondary-900">
      <StatusBar style="auto" />
      
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp.delay(200).duration(800)} className="pt-8 pb-6">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-secondary-100 dark:bg-secondary-800 items-center justify-center mb-6"
          >
            <Text className="text-secondary-600 dark:text-secondary-300 text-lg">←</Text>
          </TouchableOpacity>
          
          <Text className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
            {t('auth.signup.title')}
          </Text>
          <Text className="text-lg text-secondary-600 dark:text-secondary-300">
            {t('auth.signup.subtitle')}
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(800)} className="space-y-4 mb-6">
          <AnimatedTouchableOpacity
            entering={FadeInDown.delay(500).duration(800)}
            onPress={() => handleSocialSignUp('apple')}
            disabled={loading}
            className="bg-black py-4 px-6 rounded-2xl flex-row items-center justify-center space-x-3 shadow-sm"
          >
            <Text className="text-2xl">🍎</Text>
            <Text className="text-white text-lg font-semibold">
              {t('auth.signup.continueWithApple')}
            </Text>
          </AnimatedTouchableOpacity>

          <AnimatedTouchableOpacity
            entering={FadeInDown.delay(600).duration(800)}
            onPress={() => handleSocialSignUp('google')}
            disabled={loading}
            className="bg-white border border-secondary-200 py-4 px-6 rounded-2xl flex-row items-center justify-center space-x-3 shadow-sm"
          >
            <Text className="text-2xl">🇬</Text>
            <Text className="text-secondary-900 text-lg font-semibold">
              {t('auth.signup.continueWithGoogle')}
            </Text>
          </AnimatedTouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(700).duration(800)} className="flex-row items-center mb-6">
          <View className="flex-1 h-px bg-secondary-200 dark:bg-secondary-700" />
          <Text className="px-4 text-secondary-500 dark:text-secondary-400">{t('auth.signup.or')}</Text>
          <View className="flex-1 h-px bg-secondary-200 dark:bg-secondary-700" />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(800).duration(800)} className="space-y-4">
          <View>
            <Text className="text-secondary-700 dark:text-secondary-300 text-sm font-medium mb-2">
              {t('auth.signup.emailAddress')}
            </Text>
            <AnimatedTextInput
              entering={FadeInDown.delay(900).duration(800)}
              value={email}
              onChangeText={setEmail}
              placeholder={t('auth.signup.emailPlaceholder')}
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              className="bg-secondary-50 dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-2xl px-4 py-4 text-secondary-900 dark:text-white text-lg"
            />
          </View>

          <View>
            <Text className="text-secondary-700 dark:text-secondary-300 text-sm font-medium mb-2">
              {t('auth.signup.password')}
            </Text>
            <AnimatedTextInput
              entering={FadeInDown.delay(1000).duration(800)}
              value={password}
              onChangeText={setPassword}
              placeholder={t('auth.signup.passwordPlaceholder')}
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              className="bg-secondary-50 dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-2xl px-4 py-4 text-secondary-900 dark:text-white text-lg"
            />
          </View>

          <View>
            <Text className="text-secondary-700 dark:text-secondary-300 text-sm font-medium mb-2">
              {t('auth.signup.confirmPassword')}
            </Text>
            <AnimatedTextInput
              entering={FadeInDown.delay(1100).duration(800)}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder={t('auth.signup.confirmPasswordPlaceholder')}
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              className="bg-secondary-50 dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-2xl px-4 py-4 text-secondary-900 dark:text-white text-lg"
            />
          </View>

          <AnimatedTouchableOpacity
            entering={FadeInDown.delay(1200).duration(800)}
            onPress={handleEmailSignUp}
            disabled={loading}
            className={`py-4 px-6 rounded-2xl shadow-lg ${loading ? 'bg-secondary-300' : 'bg-primary-500'}`}
          >
            <Text className="text-white text-lg font-semibold text-center">
              {loading ? t('auth.signup.creatingAccount') : t('auth.signup.createAccountButton')}
            </Text>
          </AnimatedTouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(1300).duration(800)} className="mt-8 pb-8">
          <TouchableOpacity 
            onPress={() => router.push('/auth/login')}
            className="py-2"
          >
            <Text className="text-center text-secondary-600 dark:text-secondary-300">
              {t('auth.signup.alreadyHaveAccount')}{' '}
              <Text className="text-primary-500 font-semibold">{t('auth.signup.signInLink')}</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}