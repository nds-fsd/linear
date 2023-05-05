import { api } from "../utils/api";
import { useQuery } from "react-query";
import { setUserSession } from "../utils/localStorage.utils.js";

export const login = (loginData) => {
  api
    .post("/login", loginData)
    .then((res) => console.log(res))
    .catch((err) => console.log(err.response.data.error));
};
