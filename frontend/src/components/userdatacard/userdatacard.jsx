import { useContext } from "react";
import userDatacardStyles from "./userdatacard.module.css";
import userImage from "../../assets/imageUser.jpg";
import { Context } from "../../Context";

const UserDatacard = () => {
  const context = useContext(Context);

  const { userSessionContext } = context;
  const { firstname, lastname, pronouns, teamrole } = userSessionContext;
  console.log(userSessionContext);

  let role = "";

  if (teamrole === "cyclemanager") {
    role = "Time Manager";
  } else if (teamrole === "projectmanager") {
    role = "Project Manager";
  } else if (teamrole === "tecnicstaff") {
    role = "Staff";
  }

  return (
    <div className={userDatacardStyles.userData}>
      <img src={userImage} className={userDatacardStyles.img} alt="" />
      <div className={userDatacardStyles.userDataContainer}>
        <h3>{`${firstname} ${lastname}`}</h3>
        <p>{role}</p>
      </div>
    </div>
  );
};
export default UserDatacard;
