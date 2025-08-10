import React from 'react';
import { Modal, SafeAreaView, View, Text, TouchableOpacity, ScrollView } from 'react-native';

interface InfoModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export default function InfoModal({ visible, onClose, title, content }: InfoModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView className="flex-1 bg-white dark:bg-secondary-900">
        <View className="flex-row items-center justify-between p-4 border-b border-secondary-200 dark:border-secondary-700">
          <Text className="text-lg font-semibold text-secondary-900 dark:text-white">
            {title}
          </Text>
          <TouchableOpacity
            onPress={onClose}
            className="p-2"
          >
            <Text className="text-primary-500 text-lg">Done</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView className="flex-1 p-4">
          <Text className="text-secondary-900 dark:text-white text-base leading-relaxed">
            {content}
          </Text>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}