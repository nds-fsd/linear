import React from "react";
import styles from "./projectdetailsusers.module.css";
import userImage from "../../../../assets/imageUser.jpg";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

export const ProjectDetailsUsers = ({ users, setShowModal }) => {
  const userList = users?.map((user) => {
    const { firstname, lastname, email, teamrole, _id } = user;

    let role = "";
    if (teamrole === "projectmanager") {
      role = "Project Manager";
    } else if (teamrole === "cyclemanager") {
      role = "Time Manager";
    } else {
      role = "Staff";
    }

    return (
      <div className={styles.cardContainer} key={_id}>
        <img className={styles.img} src={userImage} />
        <div>
          <h3 className={styles.userName}>
            {firstname} {lastname}
          </h3>
          <p>{email}</p>
        </div>
      </div>
    );
  });

  return (
    <div className={styles.userListContainer}>
      <h2>Users</h2>
      {userList}
      <div 
      onClick={()=>setShowModal(true)}
      className={styles.addUserCardContainer}>
        <AddCircleRoundedIcon />
      </div>
    </div>
  );
};
