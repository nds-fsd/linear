import { api } from "./api";

export const addTask = (data) => {
  return api.post("/tasks", data);
};

export const getAllTasks = () => {
  return api.get("/tasks");
};

export const getTasksByUser = (userid) => {
  return api.get(`/tasks/by-user/${userid}`);
};