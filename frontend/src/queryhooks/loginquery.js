import { api } from "../utils/api";
import { setUserSession } from "../utils/localStorage.utils.js";
import { HOME, LOGIN, MY_ISSUES } from "../route-path";






export const login = (loginData) => {
  api.post("/login", loginData)
  .then(res => res.data)
  .then(data => {
    if(data.token){
      setUserSession(data)
      navigate(`${HOME}/${MY_ISSUES}`)
    } else {
      console.log("Something went wrong, time to panic")
      navigate(LOGIN)
    }
  })
  .catch(err => {
    console.log(err)})

};
