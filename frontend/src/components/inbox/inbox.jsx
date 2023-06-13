import { useContext, useState } from "react";
import styles from "./inbox.module.css";
import { Context } from "../../Context";
import { formatDate } from "../../utils/formatUtils";
import { useAllNotificationsQuery, useEditNotificationMutation } from "../../utils/apiNotification";
import MarkChatUnreadOutlinedIcon from "@mui/icons-material/MarkChatUnreadOutlined";
import MarkChatReadOutlinedIcon from "@mui/icons-material/MarkChatReadOutlined";
import Notification from "./notification/notification";

const Inbox = () => {
  const [selectedNotification, setSelectedNotification] = useState();
  const {userSessionContext} = useContext(Context)
  const {id:userId} = userSessionContext
  const onMutationSuccess = ()=>{

  }

  const {data, isLoading, isError, error} = useAllNotificationsQuery({receiver:userId})
  const {mutate, isLoading:isMutating, isError:mutateError, error:mutationError} = useEditNotificationMutation()
  const notificationArr = data?.data

  const notificationElementList = notificationArr?.map((notification) => {
    return (
      <div 
      onClick={()=>{setSelectedNotification(notification)}}
      className={styles.cardContainer} key={notification._id}>
        <div>
          <h3>{notification.title}</h3>
          <p>{notification.sender.firstname}</p>
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
        <div className={styles.colTwo}>{selectedNotification && <Notification notification={selectedNotification} />  }</div>
      </div>
    </section>
  );
};

export default Inbox;
