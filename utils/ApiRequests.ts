import axios from "axios";
import { UserInterface } from "../UserContext";

export const getTravelCards = (user: UserInterface) => {
  return axios({
    method: "post",
    url: "https://functions-hello-world-l2q3k3zknq-ew.a.run.app",
    data: { email: user.email, password: user.password },
  });
};
