import { api } from "./api";
import { useQueryClient, useMutation } from "react-query";

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

export const patchStatusTaskById = (taskid, data) => {
  return api.patch(`/tasks/status/${taskid}`, data);
};

export const useEditTaskMutation = (taskid, obj) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => patchStatusTaskById(taskid, obj),
    onSucess: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks", querykey] }),
  });
};
