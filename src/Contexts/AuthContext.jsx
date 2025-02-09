import axios from "axios";

import { createContext, useEffect, useState } from "react";

export const authContext = createContext();
export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      VerifyUserToken();
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  function VerifyUserToken() {
    setIsLoading(true);
    axios
      .get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
        headers: { token: localStorage.getItem("token") },
      })
      .then(({ data: { decoded: { id } } }) => {
        setUserId(id);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <authContext.Provider value={{ isLoggedIn, setIsLoggedIn, isLoading, userId }}>
      {children}
    </authContext.Provider>
  );
}
