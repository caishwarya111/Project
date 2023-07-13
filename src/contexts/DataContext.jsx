import React, { useContext, createContext, useState, useEffect } from "react";
import { ToastAndroid } from "react-native";
import { supabase } from "../utils/supabase";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { useAuth } from "./AuthContext";
import  Toast  from "react-native-toast-message";

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

const TASK_FETCH_LOCATION = "TASK_FETCH_LOCATION";

// 1 define the task passing its name and a callback that will be called whenever the location changes

// 2 start the task


// 3 when you're done, stop it

export function DataProvider({ children }) {
  
  const [shop, setShop] = useState(null);
  const [items, setItems] = useState(null);
  const [location, setLocation] = useState();
  const [type, setType] = useState(null);
  const { session } = useAuth();
  const syncLocation = async () => {
    const { data, error } = await supabase
      .from("Shops")
      .update({
        lat: location.latitude,
        lng: location.longitude,
      })
      .eq("owner", session.user.email);
  };
  const getItems = async () => {
    const { data, error } = await supabase
      .from("Items")
      .select("*")
      .eq("shopkeeper", session.user.email);
    setItems(data);
  };
  TaskManager.defineTask(
    TASK_FETCH_LOCATION,
    async ({ data: { locations }, error }) => {
      if (error) {
        console.error(error);
        return;
      }
      setLocation(locations[0].coords);
      syncLocation();
    }
  );
  const fetchLocation = async () => {
    Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
      accuracy: Location.Accuracy.Highest,
      distanceInterval: 1, // minimum change (in meters) betweens updates
      deferredUpdatesInterval: 1000, // minimum interval (in milliseconds) between updates
      // foregroundService is how you get the task to be updated as often as would be if the app was open
      foregroundService: {
        notificationTitle: "Using your location",
        notificationBody:
          "To turn off, go back to the app and switch something off.",
      },
    });
  };
  const createRequest = async(shopkeeper) => {
    const {data,error} = await supabase.from("requests").insert({
      shopkeeper: shopkeeper,
      lat: location.latitude,
      lng: location.longitude,
      customer: session.user.email,
    }).select("*")
    if(data){
      Toast.show({
        type:"success",
        text1:"Request sent",
        text2:"Your request has been sent to the shopkeeper",
        position: "bottom"

      })
    }
  }

  useEffect(() => {
    fetchLocation();
    getUserType();
  }, [session, type]);
  async function getUserType() {
    const { data, error } = await supabase
      .from("Users")
      .select("type")
      .eq("email", supabase.auth.user().email);

    if (data) setType(data[0].type);
    console.log(data[0].type)
  }

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from("Items")
        .select("*")
        .eq("shopkeeper", shop.owner);
      if (error) return ToastAndroid.show(error.message, ToastAndroid.SHORT);
      if (data) setItems(data);
    };
    fetchItems();
  }, [shop]);

  const value = { shop, setShop, items, setItems, location, getItems,createRequest };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
