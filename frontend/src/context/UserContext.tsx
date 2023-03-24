import { ObjectId } from "mongodb";
import React, { useContext, createContext, useState } from "react";

export type User = {
  _id: ObjectId;
  email: string;
  name: string;
};

export type UserContextType = {
  user: any;
  setUser: any;
};

type UserContextProviderType = {
  children: React.ReactNode;
};

export const UserContext = createContext({} as UserContextType);

const UserContextProvider = ({ children }: UserContextProviderType) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
