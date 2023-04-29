import React, { useState } from "react";
import { Text } from "react-native";
import { Input, Button } from "react-native-elements";
import axios from 'axios';
import styles from "../../styles";

export default function UserDetails() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("tay.duncan@autotrader.co.uk");
  const [password, setPassword] = useState<string>("fWGN@6TbnJ5$");
  const [response, setResponse] = useState<string | null>(null);

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    console.log("Email:", email);
    console.log("Password:", password);

    // TODO: Fetch info from puppeteer using email and password as params
    axios({
      method: "post",
      url: 'https://functions-hello-world-l2q3k3zknq-ew.a.run.app',
      data:{ email, password },
    })
      .then((response) => {
        console.log(response.data);
        setResponse(response.data);
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
          Response: {response}
        </Text>
      )}
    </>
  );
}
