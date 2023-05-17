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


export const getTaskById = (taskid) => {
  return api.get(`/tasks/${taskid}`);
};

export const patchTaskById = (taskid, data) => {
  return api.patch(`/tasks/${taskid}`, data);
};