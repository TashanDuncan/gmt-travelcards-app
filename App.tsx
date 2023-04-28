import React from "react";
import { View } from "react-native";
import UserDetails from "./components/UserDetails/UserDetails";
import styles from "./styles";

export default function App() {
  return (
    <View style={styles.container}>
      <UserDetails />
    </View>
  );
}


