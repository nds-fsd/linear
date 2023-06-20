import { api } from "./api";
import {useMutation, useQuery} from 'react-query'

export const getAllUsers = () => {
  return api.get("/users");
};

export const patchUserById = (userid, data) => {
  return api.patch(`/users/${userid}`, data);
};


export const usePatchUserMutation = (userid, data, onSuccess) =>{
  return useMutation({
    mutationFn:() => patchUserById(userid, data),
    onSuccess:(res)=>{onSuccess(res)},
    onError:(err)=>console.log(err)
  })
}

