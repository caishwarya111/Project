import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import Button from "../../components/Button";
import { supabase } from "../../utils/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { useData } from "../../contexts/DataContext";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";

export default function AddItem() {
  const { session } = useAuth();
  const { getItems } = useData();
  const [image, setImage] = useState(null);
  const [item, setitem] = useState({
    shopkeeper: session.user.email,
    name: "",
    price: "",
    quantity: "",
    url: "",
  });

  const addItem = async () => {
    if (
      item.name.length < 0 &&
      item.price.length < 0 &&
      item.quantity.length < 0
    ) {
      Toast.show({
        type: "info",
        text1: "All Fields Are Required 🙄",
        visibilityTime: 2000,
        position: "bottom",
      });
      return;
    }
    const { data, error } = await supabase
      .from("Items")
      .insert({
        shopkeeper: item.shopkeeper,
        name: item.name,
        price: parseInt(item.price),
        quantity: item.quantity,
      })
      .select("*");
    if (error)
      return ToastAndroid.show(
        "Ooops! Something Went Wrong",
        ToastAndroid.SHORT
      );
    if (data) {
      getItems();
      Toast.show({
        type: "success",
        text1: item.name,
        text2: "Added Successfully ✅🎉",
        visibilityTime: 2000,
        position: "bottom",
      });
    }
    // alert("Item Added Successfully");
  };
  return (
    <View style={styles.wrapper}>
      <StatusBar backgroundColor={"#C7E9B0"} barStyle={"dark-content"} />
      <Text
        style={{
          color: "black",
          fontFamily: "Quicksand_500Medium",
          fontSize: 18,
        }}
      >
        Item Name
      </Text>
      <TextInput
        onChange={(e) => setitem({ ...item, name: e.nativeEvent.text })}
        style={styles.textInput}
        placeholder="Example : Apple"
        placeholderTextColor={"#4d4d4d"}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <TextInput
          onChange={(e) => setitem({ ...item, price: e.nativeEvent.text })}
          style={{ ...styles.textInput, flex: 1 }}
          placeholder="Example : ₹10"
          placeholderTextColor={"#4d4d4d"}
        />
        <TextInput
          onChange={(e) => setitem({ ...item, quantity: e.nativeEvent.text })}
          style={{ ...styles.textInput, flex: 1 }}
          placeholder="Example : 1 Piece"
          placeholderTextColor={"#4d4d4d"}
        />
      </View>
      <Button
        label={"Add Product"}
        onPress={() => {
          addItem();
        }}
      />
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
    borderColor: "#cccccc",
    height: 50,
    borderWidth: 1,
    color: "black",
    fontFamily: "Quicksand_500Medium",
    fontSize: 15,
  },
});
