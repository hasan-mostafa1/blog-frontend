import { useState } from "react";
import AuthContext from "../contexts/AuthContext";

const AuthPorvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const updateToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", token);
  };

  return <AuthContext value={{ token, updateToken }}>{children}</AuthContext>;
};

export default AuthPorvider;
