import * as SecureStore from "expo-secure-store";
import { createClient } from '@supabase/supabase-js'


const ExpoSecureStoreAdapter = {
  getItem: (key) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key, value) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = "https://fpbkrpdfhgmzfgfqmpeg.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwYmtycGRmaGdtemZnZnFtcGVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMyMDQxOTUsImV4cCI6MTk5ODc4MDE5NX0.KJVBtVB_Bf8FXZqmJaHDyvMrdXubnMNWa-2Fc5bJZd0"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})