import { useState, createContext, useEffect } from "react";
import { getUserSession, setUserSession } from "./utils/localStorage.utils";
import { useNavigate } from "react-router-dom";
import { LOGIN, HOME, MY_ISSUES } from "./route-path";
import { api } from "./utils/api";
import { getTeamsByUserId } from "./utils/apiTeam";
import { useQuery, useQueryClient } from "react-query";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [userSessionContext, setUserSessionContext] = useState(
    getUserSession()
  );
  const [teams, setTeams] = useState([{}]);
  const [invalidLogIn, setInvalidLogIn] = useState(false);
  const [isLoginIn, setIsLoginIn] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  const registerUser = (data) => {
    setIsLoginIn(true);
    api
      .post("/register", data)
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
        setError(err.response.data.error.email);
      });
  };

  useEffect(() => {
    getTeamsByUserId(userSessionContext.id)
    .then((res) =>{
    setTeams(res.data)
    }
    );
  }, [userSessionContext]);



  return (
    <Context.Provider
      value={{
        setUserSessionContext,
        logIn,
        setIsLoginIn,
        registerUser,
        teams,
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
