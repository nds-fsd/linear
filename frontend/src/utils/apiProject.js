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


export const useEditProjectMutation = (projectid, data, onSuccess, onError)=>{

  return useMutation({
    mutationFn:()=>{patchProjectById(projectid, data)},
    onSucess:(data)=>{onSuccess(data)},
    onError:(err)=>{onError(err)}

  })
}


