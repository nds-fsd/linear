import { api } from "./api";
import {useQuery} from "react-query"

export const addCycle = (data) => {
  return api.post("/cycles", data);
};

export const getCyclesByProject = (projectid) => {
  if (!projectid) {
    return;
  } else {
    return api.get(`/cycles/by-project/${projectid}`);
  }
};

export const useCyclesByProjectData = (projectid, onSuccess, onError)=>{

  return useQuery({
    queryKey: ["cycles", { project: projectid }],
    queryFn:() => getCyclesByProject(projectid),
    onSuccess:onSuccess,
    onError:onError
    })
}




export const getAllCycles = (queryParams) => {
  return api.get(`/cycles`, { params: queryParams });
};
