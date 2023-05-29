import { api } from "./api";
import { useQueryClient, useMutation } from "react-query";

export const addTask = (data) => {
  return api.post("/tasks", data);
};

export const getAllTasks = (queryParams) => {
  return api.get("/tasks", {params: queryParams});
};

export const getTasksByUser = (userid) => {
  return api.get(`/tasks/by-user/${userid}`);
};

export const getTasksByProject = (projectid) => {
  return api.get(`/tasks/by-project/${projectid}`);
};

export const getTaskById = (taskid) => {
  return api.get(`/tasks/${taskid}`);
};

export const patchTaskById = (taskid, data) => {
  return api.patch(`/tasks/${taskid}`, data);
};

export const deleteTaskById = (taskid) => {
  return api.delete(`/tasks/${taskid}`);
};

export const patchStatusTaskById = (taskid, data) => {
  return api.patch(`/tasks/status/${taskid}`, data);
};

export const useEditStatusTaskMutation = (taskid, obj) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => patchStatusTaskById(taskid, obj),
    onSucess: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks", querykey] }),
  });
};

export const useDeleteTaskMutation = (taskid) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteTaskById(taskid),
    onSuccess: (payload) => {
      queryClient.refetchQueries("tasks");
    },
    onError: (err) => setErrorMessage(err.response.data.error),
  })
};
