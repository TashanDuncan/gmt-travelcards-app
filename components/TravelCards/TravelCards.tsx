import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import styles from "../../styles";
import { UserContext } from "../../UserContext";
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
  useFocusEffect,
} from "@react-navigation/native";
import { getTravelCards } from "../../utils/ApiRequests";
import { getUserData } from "../../utils/StorageUtils";

export default function TravelCards() {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const { user } = useContext(UserContext);
  const { email, password } = user;
  const [error, setError] = useState<string | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const getData = () => {
        (async () => {
          setError(null);
          setIsLoading(true);
          const savedEmail = await getUserData("email");
          const savedPassword = await getUserData("password");
          console.log(savedEmail);
          if (!!savedEmail && !!savedPassword) {
            console.log("Saved Setting Call");
            getTravelCards({ email: savedEmail, password: savedPassword })
              .then((response) => {
                console.log(response.data);
                setResponse(response.data);
                setIsLoading(false);
              })
              .catch((error) => {
                setError("Something went wrong 😞");
                console.error(error);
              });
          } else if (!!email && !!password) {
            getTravelCards({ email, password })
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
        })();
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
