import React, { Dispatch, SetStateAction } from "react";
import UserDetails from "./components/UserDetails/UserDetails";

export interface UserInterface {
  email: string | null;
  password: string | null;
}
export interface UserContextProps {
  user: UserInterface;
  setUser: (user: UserInterface) => void;
}

export const UserContext = React.createContext<UserContextProps>({
  user: {} as UserInterface,
  setUser(user: UserInterface) {},
});
