import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function GetStarted() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-secondary-900">
      <StatusBar style="auto" />
      
      <View className="flex-1 px-6 justify-center">
        <Animated.View 
          entering={FadeInUp.delay(200).duration(800)} 
          className="items-center mb-12"
        >
          <View className="w-32 h-32 bg-primary-500 rounded-full items-center justify-center mb-6">
            <Text className="text-4xl">🤖</Text>
          </View>
          
          <Text className="text-3xl font-bold text-secondary-900 dark:text-white text-center mb-3">
            {t('auth.getStarted.title')}
          </Text>
          
          <Text className="text-lg text-secondary-600 dark:text-secondary-300 text-center leading-relaxed">
            {t('auth.getStarted.subtitle')}
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(800)} className="space-y-4">
          <AnimatedTouchableOpacity
            entering={FadeInDown.delay(600).duration(800)}
            onPress={() => router.push('/auth/signup')}
            className="bg-primary-500 py-4 px-6 rounded-2xl shadow-lg"
            style={{ shadowColor: '#0ea5e9', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 }}
          >
            <Text className="text-white text-lg font-semibold text-center">
              {t('auth.getStarted.createAccount')}
            </Text>
          </AnimatedTouchableOpacity>

          <AnimatedTouchableOpacity
            entering={FadeInDown.delay(700).duration(800)}
            onPress={() => router.push('/auth/login')}
            className="border-2 border-secondary-200 dark:border-secondary-700 py-4 px-6 rounded-2xl"
          >
            <Text className="text-secondary-900 dark:text-white text-lg font-semibold text-center">
              {t('auth.getStarted.signIn')}
            </Text>
          </AnimatedTouchableOpacity>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(800).duration(800)} 
          className="mt-8"
        >
          <Text className="text-sm text-secondary-500 dark:text-secondary-400 text-center leading-relaxed">
            {t('auth.getStarted.termsText')}
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}