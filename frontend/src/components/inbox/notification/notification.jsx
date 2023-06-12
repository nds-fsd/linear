import React from "react";
import styles from "./notification.module.css";
import { useMutation } from "react-query";

const Notification = ({ notificationid, notification }) => {
  const {
    data,
    message,
    sender,
    title,
  } = notification;

  const senderFullName = `${sender.firstname} ${sender.lastname}`

  const acceptInvitation = () => {
    //Hacer un patch al proyecto correspondiente donde se saque el 
    //ID del usuario enviando la peticion del array de pending 
    //y se meta en el array de users
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{notification.title}</h2>
        <p>{notification.senderFullName}</p>
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.body}>
          <p>{`${message} ${data.teamtitle} by ${senderFullName}`}</p>
          {notification.type === "invitation" && (
            <button className={styles.acceptBtn} onClick={() => {}}>
              Accept Invitation
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
