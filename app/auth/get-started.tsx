import InfoModal from '@/components/info-modal';
import { AppleLogin } from '@/components/social-buttons/apple-login';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import {
  SafeAreaView
} from 'react-native-safe-area-context';


export default function GetStarted() {
  const { t } = useTranslation();
  const [showTermsModal, setShowTermsModal] = useState(false);

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
          className="mb-12  w-full"
        >
          <View className="flex-col justify-center items-center w-full">

            <AppleLogin />
          
            <Text className="text-sm text-center leading-relaxed">
              {renderTermsText()}
            </Text>
          </View>
        </Animated.View>
      </View>
      <InfoModal
        visible={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        title="Terms & Privacy"
        content={t('auth.getStarted.termsText')}
      />
    </SafeAreaView>
  );
}