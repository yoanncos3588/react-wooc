import { createContext, useState } from "react";
import { UserStored } from "../services/api/api";
import { AxiosResponse } from "axios";

export const AuthContext = createContext<AuthProviderValue>({});

interface Props {
  children: React.ReactNode;
}

interface AuthProviderValue {
  user?: UserStored;
  login?: (res: AxiosResponse<JWTAuthRes, unknown>) => void;
  logout?: () => void;
}

interface JWTAuthRes {
  token: string;
  user_display_name: string;
  user_email: string;
  user_nicename: string;
}

const AuthProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState(localStorage.getItem("user"));
  const user: UserStored = userData ? JSON.parse(userData) : null;

  const login = (res: AxiosResponse<JWTAuthRes, unknown>) => {
    const user: UserStored = { username: res.data.user_display_name, token: res.data.token };
    const userStringify = JSON.stringify(user);
    setUserData(userStringify);
    localStorage.setItem("user", userStringify);
  };

  const logout = () => {
    setUserData(null);
    localStorage.removeItem("user");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
