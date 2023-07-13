import React, { useContext, createContext, useState, useEffect } from "react";
import { ToastAndroid } from "react-native";
import { supabase } from "../utils/supabase";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  async function register(email, password, type) {
    const { error:dberr } = await supabase
    .from("Users")
    .insert({ email: email, type: type })
    const { error:autherr } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (autherr || dberr ) ToastAndroid.show("Something Went Wrong!!!", ToastAndroid.SHORT);
  }
  async function login(email, password) {
    const { error: autherr } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (autherr) ToastAndroid.show(error.message, ToastAndroid.SHORT);
  }
  const value = { register, login, session };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
