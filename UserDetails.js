import React, { useState } from "react";
import { Text } from "react-native";
import { Input, Button } from "react-native-elements";
import styles from "./styles";

export default function UserDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(null);

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    console.log("Email:", email);
    console.log("Password:", password);

    // TODO: Fetch info from puppeteer using email and password as params
    fetch("https://functions-hello-world-l2q3k3zknq-ew.a.run.app", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.text())
      .then((responseText) => {
        console.log(responseText);
        setResponse(responseText);
      })
      .catch((error) => {
        console.error(error);
      });
    // TODO: Save email and password to app storage (maybe have this as a tickbox)

    // TODO: Render component detailing TravelCards
  };

  return (
    <>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text>Enter Your GetMeThere Account Details</Text>
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
          <Button
            title="Submit"
            onPress={handleSubmit}
            containerStyle={styles.button}
          />
        </>
      )}

      {!!response && (
        <Text style={styles.response}>
          Response: {JSON.stringify(response)}
        </Text>
      )}
    </>
  );
}
