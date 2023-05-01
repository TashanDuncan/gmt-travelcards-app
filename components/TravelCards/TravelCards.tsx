import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import styles from "../../styles";
import { UserContext, UserInterface } from "../../UserContext";
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
  useFocusEffect,
} from "@react-navigation/native";
import { getUserData } from "../../utils/StorageUtils";
import axios from "axios";

export default function TravelCards() {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const { user } = useContext(UserContext);
  const { email, password } = user;
  const [error, setError] = useState<string | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string | null>(null);

  const getTravelCards = (user: UserInterface) => {
    // return axios({
    //   method: "post",
    //   url: "https://functions-hello-world-l2q3k3zknq-ew.a.run.app",
    //   data: { email: user.email, password: user.password },
    // })
    //   .then((response) => {
    //     console.log(response.data);
    //     setResponse(response.data);
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     setError("Something went wrong 😞");
    //     console.error(error);
    //   });
  };

  useFocusEffect(
    React.useCallback(() => {
      const getData = () => {
        (async () => {
          setError(null);
          setIsLoading(true);
          const savedEmail = await getUserData("email");
          const savedPassword = await getUserData("password");

          if (!!savedEmail && !!savedPassword) {
            getTravelCards({ email: savedEmail, password: savedPassword });
          } else if (!!email && !!password) {
            getTravelCards({ email, password });
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
