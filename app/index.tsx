import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/contexts/AuthContext';
import { useNotification } from '@/contexts/NotificationContext';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function Index() {
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const { expoPushToken, error } = useNotification();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // User is authenticated, redirect to main app
        router.replace('/(tabs)');
      } else {
        // User is not authenticated, redirect to get started
        router.replace('/auth/get-started');
      }
    }
  }, [user, loading]);

  if (error) {
    return <ThemedText>Error: {error.message}</ThemedText>
  }

  // Show a loading screen while checking authentication
  return (
    <View className="flex-1 bg-white dark:bg-secondary-900 items-center justify-center">
      <Animated.View entering={FadeIn} className="items-center">
        <View className="w-16 h-16 bg-primary-500 rounded-full items-center justify-center mb-4">
          <Animated.Text
            entering={FadeIn.delay(200)}
            className="text-2xl"
            style={{ transform: [{ rotate: '360deg' }] }}
          >
            🤖
          </Animated.Text>
        </View>
        <Animated.Text 
          entering={FadeIn.delay(400)}
          className="text-lg font-medium text-secondary-600 dark:text-secondary-300"
        >
          {t('common.loading')}
        </Animated.Text>
        <Animated.Text
          entering={FadeIn.delay(600)}
          className="text-lg font-medium text-secondary-600 dark:text-secondary-300"
        >
          Your push token is: {expoPushToken}
        </Animated.Text>
      </Animated.View>
    </View>
  );
}