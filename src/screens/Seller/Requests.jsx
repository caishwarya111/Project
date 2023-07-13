import { View, Text, Button, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { useAuth } from "../../contexts/AuthContext";
import * as Linking from "expo-linking";
import moment from "moment";
export default function Requests() {
  const [requests, setRequests] = useState([]);
  const { session } = useAuth();
  async function fetchRequests() {
    const { data, error } = await supabase
      .from("requests")
      .select("*")
      .eq("shopkeeper", session.user.email);
    console.log(data);
    setRequests(data);
  }
  useEffect(() => {
    fetchRequests();
  }, []);
  return (
    <View style={styles.wrapper}>
      {requests.map((request) => (
        <View key={request.id} style={{display:"flex",gap:10}}>
            <Text>{request.customer}</Text>
            <Text>{moment(request.created_at).fromNow()}</Text>
            <Button
                title="Accept"
                onPress={() => {
                    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${request.lat},${request.lng}&dir_action=navigate`)
                }}
            />

        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        display: "flex",
    },
})
