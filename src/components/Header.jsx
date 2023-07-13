import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: "Quicksand_700Bold",
          fontSize: 25,
          color: "black",
        }}
      >
        Pickfresh
      </Text>
      <Ionicons name="person-circle-outline" size={30} color="black" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
