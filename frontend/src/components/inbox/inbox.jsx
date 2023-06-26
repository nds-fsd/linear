import { useContext, useEffect, useState } from "react";
import styles from "./inbox.module.css";
import { Context } from "../../Context";
import { formatDate } from "../../utils/formatUtils";
import {
  useEditNotificationMutation,
} from "../../utils/apiNotification";
import MarkChatUnreadOutlinedIcon from "@mui/icons-material/MarkChatUnreadOutlined";
import MarkChatReadOutlinedIcon from "@mui/icons-material/MarkChatReadOutlined";
import Notification from "./notification/notification";
import { useQueryClient } from "react-query";

const Inbox = () => {
  const [selectedNotification, setSelectedNotification] = useState();
  const { notificationData, teams } = useContext(Context);

  const queryClient = useQueryClient();
  const onMutationSuccess = () => {
    queryClient.invalidateQueries(["notifications"]);
  };


  const {
    mutate,
    isLoading: isMutating,
    isError: mutateError,
    error: mutationError,
  } = useEditNotificationMutation(
    selectedNotification?._id,
    { seen: true },
    onMutationSuccess,
  );

  const notificationArr = notificationData?.data;


  const notificationElementList = notificationArr?.map((notification) => {
    return (
      <div
        onClick={() => {
          setSelectedNotification(notification);
        }}
        className={
          notification.seen ? styles.cardContainer : styles.cardContainerUnseen
        }
        key={notification._id}
      >
        <div>
          <h3>{notification.title}</h3>
          <p>{notification.sender.firstname} {notification.sender.lastname} - {notification.data.teamtitle}</p>
        </div>
        <div>
          {notification.seen ? (
            <MarkChatReadOutlinedIcon />
          ) : (
            <MarkChatUnreadOutlinedIcon />
          )}
        </div>
      </div>
    );
  });

  return (
    <section className={styles.inbox}>
      <div className={styles.container}>
        <div className={styles.colOne}>{notificationElementList}</div>
        <div className={styles.colTwo}>
          {selectedNotification && (
            <Notification
            setSelectedNotification={setSelectedNotification}
            markAsSeen={mutate} 
            teams={teams}
            notification={selectedNotification} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Inbox;
