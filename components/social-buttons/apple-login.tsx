"use client";

import { supabase } from '@/lib/supabase';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Platform, View } from 'react-native';

export function SocialButtons() {

  return (
    <View className='w-full mb-4 justify-center items-center'>
      {Platform.OS === 'ios' && (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={{ width: '100%', height: 56, }}
          onPress={async () => {
            try {
              const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
              })
              // Sign in via Supabase Auth.
              if (credential.identityToken) {
                const {
                  error,
                  data: { user },
                } = await supabase.auth.signInWithIdToken({
                  provider: 'apple',
                  token: credential.identityToken,
                })
                console.log(JSON.stringify({ error, user }, null, 2))
                if (!error) {
                  // User is signed in.
                }
              } else {
                throw new Error('No identityToken.')
              }
            } catch (e: any) {
              if (e.code === 'ERR_REQUEST_CANCELED') {
                // handle that the user canceled the sign-in flow
              } else {
                // handle other errors
              }
            }
          }}
        />
      )}

      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={async () => {
          try {
            await GoogleSignin.hasPlayServices()
            console.log('hasPlayServices')
            const userInfo = await GoogleSignin.signIn()
            console.log('userInfo', userInfo)
            if (userInfo?.data?.idToken) {
              const { data, error } = await supabase.auth.signInWithIdToken({
                provider: 'google',
                token: userInfo.data?.idToken,
              })
              console.log(error, data)
            } else {
              throw new Error('no ID token present!')
            }
          } catch (error: any) {

          }
        }}
      />
    </View>
  )
}

