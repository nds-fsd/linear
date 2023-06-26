import { api } from "./api";
import { useQuery } from "react-query";
import { useMutation } from "react-query";



export const addNotification = (data) => {
    return api.post("/notifications", data);
  };

export const getAllNotifications = (queryParams) => {
    return api.get("/notifications", {params:queryParams});
  };

export const getNotificationById = (notificationid) => {
    return api.get(`/notifications/${notificationid}`);
  };

  export const patchNotification = (notificationid, data) => {
    return api.patch(`/notifications/${notificationid}`, data);
  };
  
  
  export const useEditNotificationMutation = (notificationid, data, onSuccess) => {
  
    return useMutation({
      mutationFn: () => patchNotification(notificationid, data),
      onSuccess: (payload) => {
        onSuccess(payload)
      },
      onError: (err) => {
        console.log(err.response.data);
      },
    });
  }   


export const useAllNotificationsQuery = (queryParams, onSuccess, onError) => {

    return useQuery({
        queryFn:() => getAllNotifications(queryParams),
        queryKey:["notifications", {queryParams}],
        onSuccess:onSuccess,
        onError:onError
    })
}