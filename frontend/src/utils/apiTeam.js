import { api } from "./api";
import { useMutation } from "react-query";

export const addTeam = (data) => {
  return api.post("/teams", data);
};

export const getAllTasks = () => {
  return api.get("/teams");
};

export const getTeamsByUserId = (userid) => {
  return api.get(`/teams/by-user?userid=${userid}`);
};

export const getTeamById = (teamid) => {
  return api.get(`/teams/${teamid}`);
};

export const patchTeam = (teamid, data) => {
  return api.patch(`/teams/${teamid}`, data);
};


export const useEditTeamMutation = (teamId, data, onSuccess) => {

  return useMutation({
    mutationFn: () => patchTeam(teamId, data),
    onSuccess: (payload) => {
      onSuccess()
    },
    onError: (err) => {
      console.log(err.response.data);
    },
  });
} 
