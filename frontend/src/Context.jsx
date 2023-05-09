import { useState, createContext } from "react";
import { getUserSession, setUserSession } from "./utils/localStorage.utils";
import { useNavigate } from "react-router-dom";
import { LOGIN, HOME, MY_ISSUES } from "./route-path";
import { api } from "./utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [userSessionContext, setUserSessionContext] = useState(
    getUserSession()
  );
  const [invalidLogIn, setInvalidLogIn] = useState(false);
  const [isLoginIn, setIsLoginIn] = useState(false);
  const [error, setError] = useState("")

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

  const registerUser = (data) =>{
    setIsLoginIn(true);
    api.post("/register", data)
    .then((res) => {
      setInvalidLogIn(false);
      if (res.status === 201) {
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
      setError(err.response.data.error.email)
    });
  }

  return (
    <Context.Provider
      value={{
        setUserSessionContext,
        logIn,
        setIsLoginIn,
        registerUser,
        error,
        userSessionContext,
        invalidLogIn,
        isLoginIn,
      }}
    >
      {children}
    </Context.Provider>
  );
};
