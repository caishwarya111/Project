import "react-native-url-polyfill/auto";

import React, { useEffect, useState } from "react";
import {
  Quicksand_500Medium,
  Quicksand_700Bold,
  useFonts,
} from "@expo-google-fonts/quicksand";
import { BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import BuyerStack from "./src/navigation/BuyerStack";
import { supabase } from "./src/utils/supabase";
import AuthStack from "./src/navigation/AuthStack";
import { AuthProvider } from "./src/contexts/AuthContext";
import SellerStack from "./src/navigation/SellerStack";
import { DataProvider } from "./src/contexts/DataContext";
import Toast from "react-native-toast-message"

export default function App() {
  const [session, setSession] = useState(null);
  const [type, setType] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  useEffect(() => {
    async function getUserType() {
      if (session) {
        const { data, error } = await supabase.from("Users").select("*").eq("email", session.user.email);
        if (error) {
          console.log(error);
        } else {
          setType(data[0].type);
        }
      }
    }
    getUserType();
  }, [session]);

  const [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
    Quicksand_500Medium,
    Quicksand_700Bold,
  });
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#EEEEEE",
    },
  };
  if (!fontsLoaded) return null;
  return (
    <AuthProvider>
      <DataProvider>
        <NavigationContainer theme={MyTheme}>
          {!session ? <AuthStack /> : !type ? null : type === "buyer" ? <BuyerStack/> : <SellerStack/>}
        </NavigationContainer>
      </DataProvider>
      <Toast/>
    </AuthProvider>
  );
}
