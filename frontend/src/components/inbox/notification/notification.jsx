import { useContext, useEffect, useState } from "react";
import styles from "./notification.module.css";
import { Context } from "../../../Context";
import { useEditTeamMutation } from "../../../utils/apiTeam";
import { useEditNotificationMutation } from "../../../utils/apiNotification";
import { useQueryClient } from "react-query";

const Notification = ({markAsSeen, notification, teams, setSelectedNotification }) => {
  const { data, message, sender, title } = notification;
  const [objToSend, setObjToSend] = useState({});
  // const [dataFromNotification, setDataFromNotification] = useState(data)
  const [selectedTeam, setSelectedTeam] = useState();
  const queryClient = useQueryClient();

  const { userSessionContext, setTeamsEffect, teamsEffect, notificationsRefetch } = useContext(Context);

  const onNotificationMutationSuccess = (data) => {
    setSelectedNotification(data.data)
    notificationsRefetch()
  };

  useEffect(() => {
    if (notification.type === "invitation") {
      const teamToUpdate = teams.find((team) => team._id === data?.teamid);
      if(!teamToUpdate){return}
      const { pendingusers, users, _id: teamId } = teamToUpdate;
      const userIds = users.map((user) => user._id);
      const { id: userId } = userSessionContext;
      const pendingUsersWithoutTheAddedUser = pendingusers?.filter(
        (user) => user._id !== userId
      );
      const teamModification = {
        users: [...userIds, userId],
        pendingusers: pendingUsersWithoutTheAddedUser,
      };
      setObjToSend(teamModification);
      setSelectedTeam(teamId);
    }
  }, [notification]);

  const senderFullName = `${sender.firstname} ${sender.lastname}`;

  const {
    mutate: notificationMutation,
    isLoading: isMutating,
    isError: mutateError,
    error: mutationError,
  } = useEditNotificationMutation(
    notification?._id,
    { data: { ...data, accepted: true } },
    onNotificationMutationSuccess,
    true
  );

  const onSuccess = (data) => {
    setTeamsEffect(!teamsEffect)
  };

  const { mutate, isLoading, isSuccess, isError, error } = useEditTeamMutation(
    selectedTeam,
    objToSend,
    onSuccess
  );



  useEffect(() => {
      markAsSeen()
  }, [notification]);


  const acceptInvitation = () => {
    notificationMutation();
    mutate();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <p>{senderFullName}</p>
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.body}>
          {data.accepted ? (
            <p>you already accepted the invitation for {data.teamtitle}</p>
          ) : (
            <p>{`${message} ${data.teamtitle} by ${senderFullName}`}</p>
          )}
          {notification.type === "invitation" && (
            <button
              disabled={data.accepted}
              className={
                data.accepted ? styles.acceptBtnDisabled : styles.acceptBtn
              }
              onClick={() => {
                acceptInvitation();
              }}
            >
              Accept Invitation
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
