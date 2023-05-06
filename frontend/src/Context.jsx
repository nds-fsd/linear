import { useState, createContext } from "react";
import { getUserSession, setUserSession } from "./utils/localStorage.utils";
import { useNavigate } from "react-router-dom";
import { LOGIN, HOME, MY_ISSUES } from "./route-path";
import { api } from "./utils/api";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [userSessionContext, setUserSessionContext] = useState(
    getUserSession()
  );
  const [invalidLogIn, setInvalidLogIn] = useState(false);
  const [isLoginIn, setIsLoginIn] = useState(false);

  const navigate = useNavigate();

  const logIn = (data) => {
    setIsLoginIn(true);
    api
      .post("/login", data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          return res.data;
        }
      })
      .then((data) => {
        if (data.token) {
          setUserSession(data);
          setUserSessionContext(data);
          navigate(`${HOME}/${MY_ISSUES}`);
          location.reload();
        } else {
          console.log("Something went wrong, call support");
          navigate(LOGIN);
        }
        setIsLoginIn(false);
      })
      .catch((err) => {
        setIsLoginIn(false);
        setInvalidLogIn(true);
        console.log(err);
      });
  };

  return (
    <Context.Provider
      value={{
        setUserSessionContext,
        logIn,
        setIsLoginIn,
        userSessionContext,
        invalidLogIn,
        isLoginIn,
      }}
    >
      {children}
    </Context.Provider>
  );
};
