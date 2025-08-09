import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthCallback() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // User successfully authenticated, redirect to main app
        router.replace('/(tabs)');
      } else {
        // Authentication failed, redirect back to get-started
        router.replace('/auth/get-started');
      }
    }
  }, [user, loading]);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-secondary-900 justify-center items-center">
      <View className="items-center space-y-4">
        <ActivityIndicator size="large" color="#0ea5e9" />
        <Text className="text-secondary-600 dark:text-secondary-300 text-lg">
          Completing sign in...
        </Text>
      </View>
    </SafeAreaView>
  );
}