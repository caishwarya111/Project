import { View, Text, TextInput, StyleSheet, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../components/Button";
import { StatusBar } from "react-native";
import { supabase } from "../../utils/supabase";
import { useNavigation } from "@react-navigation/native";
export default function AddShop() {
  const { session } = useAuth();
  const navigation = useNavigation();
  const [shop, setShop] = useState({
    owner: session.user.email,
    shop: "",
    mobile: "",
    category: "",
  });
  const saveShop = async () => {
    const { data, error } = await supabase.from("Shops").insert(shop);
    if (error) {
      ToastAndroid.show("Error Occured", ToastAndroid.SHORT);
    } else {
      navigation.navigate("TabStack");
    }
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      <Text
        style={{
          color: "black",
          fontFamily: "Quicksand_500Medium",
          fontSize: 18,
        }}
      >
        Shop Name
      </Text>
      <TextInput
        onChange={(e) => setShop({ ...shop, shop: e.nativeEvent.text })}
        style={styles.textInput}
        placeholder="Example : Freshy Fruits"
        placeholderTextColor={"#4d4d4d"}
      />
      <TextInput
        onChange={(e) => setShop({ ...shop, mobile: e.nativeEvent.text })}
        style={styles.textInput}
        keyboardType="phone-pad"
        placeholder="Example : +91 9876543210"
        placeholderTextColor={"#4d4d4d"}
      />
      <Text
        style={{
          color: "black",
          fontFamily: "Quicksand_500Medium",
          fontSize: 18,
        }}
      >
        Shop category
      </Text>
      <TextInput
        onChange={(e) => setShop({ ...shop, category: e.nativeEvent.text })}
        style={styles.textInput}
        placeholder="Example : Fruits, Vegetables"
        placeholderTextColor={"#4d4d4d"}
      />

      <Button label={"SAVE"} onPress={saveShop} />
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    display: "flex",
    gap: 10,
  },
  textInput: {
    padding: 10,
    borderRadius: 5,
    borderColor: "#4d4d4d",
    height: 50,
    borderWidth: 1,
    color: "black",
    fontFamily: "Quicksand_500Medium",
    fontSize: 15,
  },
});
