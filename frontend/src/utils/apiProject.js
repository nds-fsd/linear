import { api } from "./api";
import { useMutation } from "react-query";

export const addProject = (data) => {
  return api.post("/projects", data);
};

export const getAllProjects = () => {
  return api.get("/projects");
};

export const getProjectById = (projectid) => {
  return api.get(`/projects/${projectid}`);
};

export const patchProjectById = (projectid, data) => {
  return api.patch(`/projects/${projectid}`, data);
};

export const deleteProjectById = (projectid) => {
  return api.delete(`/projects/${projectid}`);
};

export const useDeleteProjectMutation = (projectid, onSucess) =>{
  return useMutation({
    mutationFn:()=>deleteProjectById(projectid),
    onSuccess:()=>onSucess()
  })
}



export const useEditProjectMutation = (projectid, data, onSuccess, onError) => {
  return useMutation({
    mutationFn: () => {
      patchProjectById(projectid, data);
    },
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (err) => {
      onError(err);
    },
  });
};
