// AuthContext.js
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(false);
  const [cookies] = useCookies(["token"]);
  useEffect(() => {
    axios
      .post("https://artfolio-y03z.onrender.com/api/auth/userdata", { token: cookies.token })
      .then((res) => {
        if (res.data.username) {
          setIsLoggedIn(res.data);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {});
  }, [user,cookies.token]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, setUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
