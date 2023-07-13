import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { supabase } from "../utils/supabase";
import { AntDesign } from "@expo/vector-icons";

export default function Profile() {
  const logout = () => {
    supabase.auth.signOut();
  };
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.item} onPress={logout}>
        <AntDesign name="logout" size={20} color="black" />
        <Text style={{ fontFamily: "Quicksand_500Medium" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  item: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
