import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Switch,
} from "react-native";
import React, { useState } from "react";
import Button from "../../components/Button";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const navigator = useNavigation();
  const { register } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
    type: "buyer",
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
          WELCOME To PickFresh
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
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Text style={{ fontFamily: "Quicksand_500Medium" }}>Buyer</Text>
        <Switch
          trackColor={"black"}
          thumbColor={"black"}
          value={data.type === "buyer" ? false : true}
          onValueChange={() =>
            setData({
              ...data,
              type: data.type === "buyer" ? "seller" : "buyer",
            })
          }

          // thumbColor={}
        />
        <Text style={{ fontFamily: "Quicksand_500Medium" }}>Seller</Text>
      </View>
      <Button
        onPress={() => register(data.email, data.password, data.type)}
        label={"REGISTER"}
      />
      <Text
        style={{
          color: "black",
          fontFamily: "Quicksand_500Medium",
          fontSize: 15,
          marginTop: 10,
        }}
        onPress={() => navigator.navigate("Login")}
      >
        Already have an account? Login Now
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
