import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserDetails from "./components/UserDetails/UserDetails";
import UserContext from "./UserContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="User Details" component={UserDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
