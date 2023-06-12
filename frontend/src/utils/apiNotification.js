import { api } from "./api";
import { useQuery } from "react-query";



export const addNotification = (data) => {
    return api.post("/notifications", data);
  };

export const getAllNotifications = (queryParams) => {
    return api.get("/notifications", {params:queryParams});
  };

export const getNotificationById = (notificationid) => {
    return api.get(`/notifications/${notificationid}`);
  };


export const useAllNotificationsQuery = (queryParams, onSuccess, onError) => {

    return useQuery({
        queryFn:() => getAllNotifications(queryParams),
        queryKey:["notifications", {queryParams}],
        onSuccess:onSuccess,
        onError:onError
    })
}