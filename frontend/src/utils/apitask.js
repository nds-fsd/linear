import { api } from "./api";
export const addTask = (data) => {
    return api.post("/tasks", data);
  };

export const getAllTasks = (data) => {
    return api.get("/tasks", data);
  };