import React from "react";
import styles from "./projectdetailsusers.module.css";
import userImage from "../../../../assets/imageUser.jpg";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';

export const ProjectDetailsUsers = ({ users, setShowModal }) => {



  const userList = users?.map((user, i) => {
    const { firstname, lastname, email, teamrole, _id, pending, profilepic } = user;

    let role = "";
    if (teamrole === "projectmanager") {
      role = "Project Manager";
    } else if (teamrole === "cyclemanager") {
      role = "Time Manager";
    } else {
      role = "Staff";
    }

    return (
      <div className={styles.cardContainer} key={_id+i}>
        <div className={pending? styles.disabledUsr :styles.usrDetails}>
          <img className={styles.img} src={profilepic} />
          <div>
            <h3 className={styles.userName}>
              {firstname} {lastname}
            </h3>
            <p>{email}</p>
          </div>
        </div>

        {pending && (
          <div className={styles.pendingContainer}>
            <p>Pending...</p>
          </div>
        )}
      </div>
    );
  });

  return (
    <div className={styles.userListContainer}>
      <h2>Users</h2>
      {userList}
      <div
        onClick={() => setShowModal(true)}
        className={styles.addUserCardContainer}
      >
        <AddCircleRoundedIcon />
      </div>
    </div>
  );
};
