import React from "react";
import styles from "./userdetails.module.css";

const UserDetails = ({ userData }) => {
  const { email, firstname, lastname, pronouns, teamrole } = userData;

  const fixedTeamRole = () => {
    if (teamrole === "cyclemanager") {
      return "Time Manager";
    } else if (teamrole === "projectmanager") {
      return "Project Manager";
    } else if (teamrole === "tecnicstaff") {
      return "Staff";
    } else {
      return;
    }
  };

  return (
    <div className={styles.userDetailsContainer}>
      <div className={styles.fieldWrapper}>
        <div className={styles.fieldTag}>Name</div>
        <div className={styles.fieldContent}>{`${firstname} ${lastname}`}</div>
      </div>
      <div className={styles.fieldWrapper}>
        <div className={styles.fieldTag}>Email</div>
        <div className={styles.fieldContent}>{email}</div>
      </div>
      <div className={styles.fieldWrapper}>
        <div className={styles.fieldTag}>Role</div>
        <div className={styles.fieldContent}>{fixedTeamRole()}</div>
      </div>
    </div>
  );
};

export default UserDetails;
