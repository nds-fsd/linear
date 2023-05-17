import { api } from "./api";
export const addCycle = (data) => {
    return api.post("/cycles", data);
  };

export const getCyclesByProject = (projectid) => {
    return api.get(`/cycles/by-project/${projectid}`);
  };

  export const getAllCycles = () => {
    return api.get(`/cycles`);
  };