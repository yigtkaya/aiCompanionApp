import { createClient, processLock } from "@supabase/supabase-js";
import { AppState, Platform } from "react-native";
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({ id: 'supabase-storage' })

const mmkvStorageConfig = {
    setItem: (key: string, data: string) => storage.set(key, data),
    getItem: (key: string) => storage.getString(key),
    removeItem: (key: string) => storage.delete(key),
}

export const supabase = createClient(process.env.EXPO_PUBLIC_SUPABASE_URL!, process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: {
        ...(Platform.OS !== "web" ? { storage: mmkvStorageConfig as any } : {}),
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
        lock: processLock,
    },
});

if (Platform.OS !== "web") {
    AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        supabase.auth.startAutoRefresh()
      } else {
        supabase.auth.stopAutoRefresh()
      }
    })
  }