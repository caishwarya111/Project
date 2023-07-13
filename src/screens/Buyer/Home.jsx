import { View, Text, FlatList, StyleSheet, StatusBar, Button } from "react-native";
import React from "react";
import { useData } from "../../contexts/DataContext";
import Item from "../../components/Item";

export default function Home() {
  const { items,shop,createRequest } = useData();
  console.log(shop)
  if (!items) return <Text>Loading...</Text>;
  return (
    <View style={styles.wrapper}>
      <StatusBar backgroundColor={"#C7E9B0"} />
      <View style={{backgroundColor:"white",padding:10,marginBottom:10,display:"flex",gap:10}}>
        <Text style={{fontFamily:"Quicksand_500Medium",fontSize:20}}>{shop.shop}</Text>
        <Text style={{fontFamily:"Quicksand_500Medium"}}>{shop.category} vendor</Text>
        <Text style={{fontFamily:"Quicksand_500Medium"}}>{shop.mobile}</Text>
        <Button title="Request for delivery" onPress={()=>{createRequest(shop.owner)}} />

      </View>
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
