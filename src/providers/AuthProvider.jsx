import { useState } from "react";
import AuthContext from "../contexts/AuthContext";

const AuthPorvider = ({ children }) => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("authUser")),
  );

  const updateToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", JSON.stringify(newToken));
  };

  const updateAuthUser = (user) => {
    setAuthUser(user);
    localStorage.setItem("authUser", JSON.stringify(user));
  };

  return (
    <AuthContext value={{ token, updateToken, authUser, updateAuthUser }}>
      {children}
    </AuthContext>
  );
};

export default AuthPorvider;
