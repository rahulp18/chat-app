"use client";
import { fetchLoggedInUserInfo } from "@/lib/actions/user.action";
import { User } from "@/types/index.type";
import { deleteCookie } from "cookies-next";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextType {
  user: User | null;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const getUserInfo = async () => {
    try {
      const res = await fetchLoggedInUserInfo();
      if (res.success) {
        setUser(res.data);
      } else {
        console.log("User not logged In");
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  const logout = () => {
    deleteCookie("token");
    setUser(null);
  };
  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
