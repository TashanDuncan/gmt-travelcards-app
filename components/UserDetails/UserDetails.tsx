import React, { useContext, useState } from "react";
import { Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import styles from "../../styles";
import { UserContext } from "../../UserContext";
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";
import { storeUserData } from "../../utils/StorageUtils";
import CheckBox from "expo-checkbox";

export default function UserDetails() {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState<string>("tay.duncan@autotrader.co.uk");
  const [password, setPassword] = useState<string>("fWGN@6TbnJ5$");
  const [isSaveSelected, setIsSaveSelected] = useState<boolean>(true);

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = async () => {
    console.log("Email:", email);
    console.log("Password:", password);
    if (isSaveSelected) {
      try {
        await storeUserData("email", email);
        await storeUserData("password", password);
      } catch (error) {
        console.log(error);
      }
    }
    setUser({ email, password });
    navigation.navigate("Travel Cards");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        Enter Your GetMeThere Account Details
      </Text>
      <Input
        label="Email"
        placeholder="Enter your email"
        onChangeText={handleEmailChange}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
        containerStyle={styles.input}
      />
      <Input
        label="Password"
        placeholder="Enter your password"
        onChangeText={handlePasswordChange}
        value={password}
        secureTextEntry
        containerStyle={styles.input}
      />
      <View style={styles.checkboxContainer}>
        <Text style={styles.label}>Save Details?</Text>
        <CheckBox
          value={isSaveSelected}
          onValueChange={setIsSaveSelected}
          style={styles.checkbox}
        />
      </View>

      <Button
        title="Submit"
        onPress={handleSubmit}
        containerStyle={styles.button}
      />
    </View>
  );
}
