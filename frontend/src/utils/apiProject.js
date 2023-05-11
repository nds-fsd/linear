import { api } from "./api";
export const addProject = (data) => {
    return api.post("/projects", data);
  };

export const getAllProjects = () => {
    return api.get("/projects");
  };