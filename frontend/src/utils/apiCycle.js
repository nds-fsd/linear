import { api } from "./api";
export const addCycle = (data) => {
    return api.post("/cycles", data);
  };

export const getAllCycles = () => {
    return api.get("/cycles");
  };