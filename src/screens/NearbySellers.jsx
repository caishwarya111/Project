import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, StyleSheet, Modal, ToastAndroid, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { supabase } from "../utils/supabase";
import { useNavigation } from "@react-navigation/native";
import { useData } from "../contexts/DataContext";

export default function NearbySellers() {
  const [shops, setsShops] = useState([]);
  const { setShop, location } = useData();
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigation = useNavigation();

  const fetchShops = async () => {
    const { data, error } = await supabase.from("Shops").select("*");
    console.log(data);
    if (error) return ToastAndroid.show(error.message, ToastAndroid.SHORT);
    if (data) setsShops(data);
  };

  useEffect(() => {
    fetchShops();
  }, []);

  if (!location) return null;

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  const filteredShops = selectedCategory
  ? shops.filter((shop) => shop.category.includes(selectedCategory))
  : shops;

  return (
    <View style={styles.wrapper}>
      <StatusBar backgroundColor="#C7E9B0" barStyle="dark-content" />

      <Text style={styles.title}>Select Category</Text>
      <Button title="All" onPress={() => handleCategorySelection("")} />
      <Button title="Vegetable" onPress={() => handleCategorySelection("vegetable")} />
      <Button title="Fruit" onPress={() => handleCategorySelection("fruit")} />

      <Text style={styles.subtitle}>Showing {filteredShops.length} Shops</Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.007,
          longitudeDelta: 0.007,
        }}
      >
        {filteredShops.map((shop) => (
          <Marker
            title={shop.shop}
            icon={require("../assets/images/marker.png")}
            onPress={() => {
              setShop(shop);
              navigation.navigate("TabStack");
            }}
            key={shop.id}
            coordinate={{
              latitude: shop.lat,
              longitude: shop.lng,
            }}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  title: {
    fontFamily: "Quicksand_500Medium",
    fontSize: 18,
    color: "black",
  },
  subtitle: {
    fontFamily: "Quicksand_500Medium",
    fontSize: 18,
    color: "black",
  },
  map: {
    flex: 1,
  },
});
