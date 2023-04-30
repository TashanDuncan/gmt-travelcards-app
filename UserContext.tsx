import React, { Dispatch, SetStateAction } from "react";
import UserDetails from "./components/UserDetails/UserDetails";

export interface UserDetails {
  email: string;
  password: string;
}
export default React.createContext({
  user: {},
  setUser(user: UserDetails) {},
});
