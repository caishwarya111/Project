import { View, Text, StyleSheet, Image } from "react-native";
import moment from "moment";
import { useAuth } from "../contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useData } from "../contexts/DataContext";
import { supabase } from "../utils/supabase";
export default function Item({ item }) {
  const { session } = useAuth();
  const { getItems } = useData();
  const deleteItem = async () => {
    const {data,error} = await supabase.from("Items").delete().eq("id",item.id).select("*")
    if(error) console.log(error)
    if(data) getItems()
    console.log(data)
    console.log(error)
  };

  return (
    <View style={styles.item}>
      <Image
        style={styles.itemImage}
        source={{ uri: "https://source.unsplash.com/200x200?" + item.name }}
      />
      <View>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>
          ₹{item.price} / {item.quantity}
        </Text>
        <Text style={styles.itemDescription}>
          Added {moment(item.created_at).fromNow()}
        </Text>
      </View>
      {session.user.email === item.shopkeeper && (
        <Ionicons
          onPress={deleteItem}
          name="trash-outline"
          size={20}
          color="black"
          style={{ alignSelf: "center", marginLeft: "auto" }}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  itemName: {
    color: "black",
    fontFamily: "Quicksand_500Medium",
    fontSize: 18,
  },
  itemDescription: {
    color: "black",
    fontFamily: "Quicksand_500Medium",
    fontSize: 14,
  },
  itemImage: {
    width: 80,
    height: 80,
  },
});
