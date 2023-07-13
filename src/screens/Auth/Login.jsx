import { View, Text, StyleSheet, StatusBar, TextInput } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigator = useNavigation();
  const { login } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  return (
    <View style={styles.wrapper}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 10,
        }}
      >
        <Text
          style={{
            color: "black",
            fontFamily: "Quicksand_700Bold",
            fontSize: 50,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Login To PickFresh
        </Text>
      </View>
      <StatusBar backgroundColor={"#EEEEEE"} barStyle={"dark-content"} />
      <Text
        style={{
          color: "black",
          fontFamily: "Quicksand_500Medium",
          fontSize: 18,
        }}
      >
        Email
      </Text>
      <TextInput
        onChange={(e) => setData({ ...data, email: e.nativeEvent.text })}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.textInput}
        placeholder="Enter your email"
        placeholderTextColor={"#4d4d4d"}
      />
      <Text
        style={{
          color: "black",
          fontFamily: "Quicksand_500Medium",
          fontSize: 18,
        }}
      >
        Password
      </Text>
      <TextInput
        onChange={(e) => setData({ ...data, password: e.nativeEvent.text })}
        secureTextEntry={true}
        style={styles.textInput}
        placeholder="Enter your password"
        placeholderTextColor={"#4d4d4d"}
      />
      <Button
        onPress={() => login(data.email, data.password)}
        label={"LOGIN"}
      />
      <Text
        style={{
          color: "black",
          fontFamily: "Quicksand_500Medium",
          fontSize: 15,
          marginTop: 10,
        }}
        onPress={() => navigator.navigate("Register")}
      >
        Don't have an account? Create Now
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    display: "flex",
    gap: 10,
    justifyContent: "center",
    flex: 1,
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
