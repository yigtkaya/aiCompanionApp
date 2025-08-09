import SocialLogin from '@/components/social-login';
import { useAuth } from '@/contexts/AuthContext';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import {
  SafeAreaView
} from 'react-native-safe-area-context';


export default function GetStarted() {
  const { t } = useTranslation();
  const { signInWithOAuth, loading } = useAuth();
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleSocialAuth = async (provider: string) => {
    const success = await signInWithOAuth(provider as 'apple' | 'google');
    if (success) {
      // User will be redirected automatically via auth state change
    }
  };

  const renderTermsText = () => {
    const termsText = t('auth.getStarted.termsText');
    const parts = termsText.split(/(Privacy Policy|Terms of Service)/);
    
    return parts.map((part, index) => {
      if (part === 'Privacy Policy' || part === 'Terms of Service') {
        return (
          <Text
            key={index}
            className="text-primary-500 underline"
            onPress={() => setShowTermsModal(true)}
          >
            {part}
          </Text>
        );
      }
      return (
        <Text key={index} className="text-secondary-500 dark:text-secondary-400">
          {part}
        </Text>
      );
    });
  };

  return (
    <SafeAreaView className="flex-1 px-4 justify-center bg-white dark:bg-secondary-900">
      
      <View className="flex-1 justify-between">
        <Animated.View 
          entering={FadeInUp.delay(200).duration(800)} 
          className="items-center mt-12"
        >
          
          <Text className="text-3xl font-bold text-secondary-900 dark:text-white text-center mb-3">
            {t('auth.getStarted.title')}
          </Text>
          
          <Text className="text-lg text-secondary-600 dark:text-secondary-300 text-center leading-relaxed">
            {t('auth.getStarted.subtitle')}
          </Text>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(800).duration(800)} 
          className="mb-12 space-y-4"
        >
          <View className="flex-row flex-wrap justify-center items-center">
          <Animated.View entering={FadeInDown.delay(600).duration(800)}>
            <SocialLogin 
              onLogin={handleSocialAuth} 
              label={t('auth.getStarted.continueWithApple')} 
              icon="apple"
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(700).duration(800)}>
            <SocialLogin 
              onLogin={handleSocialAuth} 
              label={t('auth.getStarted.continueWithGoogle')} 
              icon="google"
            />
          </Animated.View>
            <Text className="text-sm text-center leading-relaxed">
              {renderTermsText()}
            </Text>
          </View>
        </Animated.View>
      </View>
      <Modal
        visible={showTermsModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView className="flex-1 bg-white dark:bg-secondary-900">
          <View className="flex-row items-center justify-between p-4 border-b border-secondary-200 dark:border-secondary-700">
            <Text className="text-lg font-semibold text-secondary-900 dark:text-white">
              Terms & Privacy
            </Text>
            <TouchableOpacity
              onPress={() => setShowTermsModal(false)}
              className="p-2"
            >
              <Text className="text-primary-500 text-lg">Done</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView className="flex-1 p-4">
            <Text className="text-secondary-900 dark:text-white text-base leading-relaxed">
              This is where you would display the full Privacy Policy and Terms of Service content. 
              You can replace this with your actual legal text.
              
              {"\n\n"}Privacy Policy:{"\n"}
              Your privacy policy content goes here...
              
              {"\n\n"}Terms of Service:{"\n"}
              Your terms of service content goes here...
            </Text>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}