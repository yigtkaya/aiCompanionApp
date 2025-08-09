import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Svg, { G, Path, Rect } from 'react-native-svg';

interface SocialLoginProps {
  onLogin: (provider: string) => void;
  label: string;
  icon: 'apple' | 'google';
}

const GoogleIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 128 128">
    <G>
      <Rect fill="none" width="128" height="128"/>
      <Path fill="#FBBC05" d="M27.585,64c0-4.157,0.69-8.143,1.923-11.881L7.938,35.648C3.734,44.183,1.366,53.801,1.366,64c0,10.191,2.366,19.802,6.563,28.332l21.558-16.503C28.266,72.108,27.585,68.137,27.585,64"/>
      <Path fill="#EA4335" d="M65.457,26.182c9.031,0,17.188,3.2,23.597,8.436L107.698,16C96.337,6.109,81.771,0,65.457,0C40.129,0,18.361,14.484,7.938,35.648l21.569,16.471C34.477,37.033,48.644,26.182,65.457,26.182"/>
      <Path fill="#34A853" d="M65.457,101.818c-16.812,0-30.979-10.851-35.949-25.937L7.938,92.349C18.361,113.516,40.129,128,65.457,128c15.632,0,30.557-5.551,41.758-15.951L86.741,96.221C80.964,99.86,73.689,101.818,65.457,101.818"/>
      <Path fill="#4285F4" d="M126.634,64c0-3.782-0.583-7.855-1.457-11.636H65.457v24.727h34.376c-1.719,8.431-6.397,14.912-13.092,19.13l20.474,15.828C118.981,101.129,126.634,84.861,126.634,64"/>
    </G>
  </Svg>
);

const AppleIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="white">
    <Path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </Svg>
);

export default function SocialLogin({ onLogin, label, icon }: SocialLoginProps) {
  const isApple = icon === 'apple';
  
  return (
    <TouchableOpacity
      onPress={() => onLogin(icon)}
      className={`w-full py-3 px-16 rounded-lg flex-row items-center justify-center space-x-2 mb-6 ${
        isApple 
          ? 'bg-black' 
          : 'bg-white border border-gray-300'
      }`}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2
      }}
    >
      <View className="w-5 h-5 items-center justify-center">
        {isApple ? <AppleIcon /> : <GoogleIcon />}
      </View>
      <View className="w-4" />
      <Text className={`text-base font-medium text-center ${
        isApple 
          ? 'text-white' 
          : 'text-gray-700'
      }`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
