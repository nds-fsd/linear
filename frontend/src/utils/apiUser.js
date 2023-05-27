import { api } from "./api";


export const getAllUsers = () => {
    return api.get("/users");
  };