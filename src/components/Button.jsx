import { TouchableOpacity, StyleSheet, Text } from "react-native";

export default function Button({ label, onPress, secondary }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.button,
        borderWidth: secondary ? 0.5 : 0,
        borderColor: "#cccccc",
        backgroundColor: secondary ? "white" : "#C7E9B0",
      }}
    >
      <Text
        style={{
          ...styles.buttonText,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Quicksand_500Medium",
    fontSize: 18,
    textTransform: "uppercase",
  },
});
