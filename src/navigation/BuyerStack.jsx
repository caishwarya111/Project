import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NearbySellers from "../screens/NearbySellers";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Home from "../screens/Buyer/Home";
import { useData } from "../contexts/DataContext";
import Profile from "../screens/Profile";
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function TabStack() {
  const { shop } = useData();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "white",
          borderTopColor: "white",
        },
      }}
    >
      <Tab.Screen
        name={shop ? shop.shop : "Home"}
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
        component={Home}
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
export default function BuyerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Nearby Sellers"
        options={{
          headerShown: true,
          headerStyle:{
            backgroundColor: "#C7E9B0",
          },
          headerTitleStyle: {
            fontFamily: "Quicksand_500Medium",
          },
        }}
        component={NearbySellers}
      />
      <Stack.Screen
        name="TabStack"
        options={{ headerShown: false }}
        component={TabStack}
      />
    </Stack.Navigator>
  );
}
