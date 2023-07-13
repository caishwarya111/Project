import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AddItem from "../screens/Seller/AddItem";
import MyItems from "../screens/Seller/MyItems";
import AddShop from "../screens/Seller/AddShop";
import { supabase } from "../utils/supabase";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import Profile from "../screens/Profile";
import * as Location from "expo-location";
import Requests from "../screens/Seller/Requests";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabStack() {
  const { session } = useAuth();
  // setInterval(async () => {
  //   let location = await Location.getCurrentPositionAsync({
  //     accuracy: Location.Accuracy.Highest,
  //   });
  //   const { data, error } = await supabase
  //     .from("Shops")
  //     .update({
  //       lat: location.coords.latitude,
  //       lng: location.coords.longitude,
  //     })
  //     .eq("owner", session.user.email);
  // }, 10000);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#C7E9B0",
          borderTopColor: "white",
        },
      }}
    >
      <Tab.Screen
        name="My Items"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#C7E9B0",
          },
          headerTitleStyle: {
            color: "black",
            fontFamily: "Quicksand_500Medium",
          },
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="fruit-watermelon"
              size={25}
              color={focused ? "black" : "#cccccc"}
            />
          ),
        }}
        component={MyItems}
      />
      <Tab.Screen
        name="Add Item"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#C7E9B0",
          },
          headerTitleStyle: {
            color: "black",
            fontFamily: "Quicksand_500Medium",
          },
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={25}
              color={focused ? "black" : "#cccccc"}
            />
          ),
        }}
        component={AddItem}
      />
      <Tab.Screen
        name="Requests"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#C7E9B0",
          },
          headerTitleStyle: {
            color: "black",
            fontFamily: "Quicksand_500Medium",
          },
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="cart-arrow-right"
              size={25}
              color={focused ? "black" : "#cccccc"}
            />
          ),
        }}
        component={Requests}
      />
      <Tab.Screen
        name="Profile"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "white",
          },
          headerTitleStyle: {
            color: "black",
            fontFamily: "Quicksand_500Medium",
          },
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="face-man-profile"
              size={25}
              color={focused ? "black" : "#cccccc"}
            />
          ),
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
}
export default function SellerStack() {
  const { session } = useAuth();
  const [exists, setExists] = useState(null);
  useEffect(() => {
    const checkExistingShop = async () => {
      const { data, error } = await supabase
        .from("Shops")
        .select("*")
        .eq("owner", session.user.email);

      if (data.length > 0) {
        setExists(true);
      } else {
        setExists(false);
      }
    };
    checkExistingShop();
  }, [session]);
  if (exists === null) return null;
  return (
    <Stack.Navigator initialRouteName={exists ? "TabStack" : "Add Shop"}>
      <Stack.Screen
        name="TabStack"
        options={{ headerShown: false }}
        component={TabStack}
      />
      <Stack.Screen
        name="Add Shop"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "white",
          },
          headerTitleStyle: {
            color: "black",
            fontFamily: "Quicksand_500Medium",
          },
        }}
        component={AddShop}
      />
    </Stack.Navigator>
  );
}
