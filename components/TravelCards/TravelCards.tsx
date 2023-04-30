import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import axios from "axios";
import styles from "../../styles";
import { UserContext } from "../../UserContext";
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
  useFocusEffect,
} from "@react-navigation/native";

export default function TravelCards() {
  let navigation: NavigationProp<ParamListBase> = useNavigation();
  const { user } = useContext(UserContext);
  const userEmail = user.email;
  const userPassword = user.password;
  const [error, setError] = useState<string | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const getData = () => {
        setError(null);
        setIsLoading(true);
        if (!!userEmail && !!userPassword) {
          axios({
            method: "post",
            url: "https://functions-hello-world-l2q3k3zknq-ew.a.run.app",
            data: { email: user.email, password: user.password },
          })
            .then((response) => {
              console.log(response.data);
              setResponse(response.data);
              setIsLoading(false);
            })
            .catch((error) => {
              setError("Something went wrong 😞");
              console.error(error);
            });
        } else {
          setError("Please Provide Email & Password");
          setIsLoading(false);
        }
      };
      return getData();
    }, [user])
  );
  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
        <Button
          title="Go to User Details"
          onPress={() => navigation.navigate("User Details")}
        ></Button>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.response}>TravelCards Remaining: {response}</Text>
        <Button
          title="Go to User Details"
          onPress={() => navigation.navigate("User Details")}
        ></Button>
      </View>
    );
  }
}
