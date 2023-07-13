import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { useAuth } from "../../contexts/AuthContext";
import Item from "../../components/Item";
import { useData } from "../../contexts/DataContext";
import { StatusBar } from "expo-status-bar";
export default function MyItems() {
  const { items, getItems } = useData();
  useEffect(() => {
    getItems();
  }, []);
  if (!items) return null;
  return (
    <View style={styles.wrapper}>
      <StatusBar backgroundColor="#C7E9B0" />
      <FlatList
        data={items}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    display: "flex",
  },
});
