import { useContext } from "react";
import userDatacardStyles from "./userdatacard.module.css";
import userImage from "../../assets/imageUser.jpg";
import { Context } from "../../Context";

const UserDatacard = () => {
  const context = useContext(Context);

  const { userSessionContext } = context;
  const { firstname, lastname, teamrole } = userSessionContext;

  let role = "";

  if (teamrole === "cyclemanager") {
    role = "Time Manager";
  } else if (teamrole === "projectmanager") {
    role = "Project Manager";
  } else if (teamrole === "tecnicstaff") {
    role = "Staff";
  }

  const userImg = userSessionContext.profilepic ? userSessionContext.profilepic : userImage
  
  console.log(userSessionContext)

  return (
    <div className={userDatacardStyles.userData}>

      <img src={userImg} className={userDatacardStyles.img} alt="" />
      <div className={userDatacardStyles.userDataContainer}>
        <h3>{`${firstname} ${lastname}`}</h3>
        <p>{role}</p>
      </div>
    </div>
  );
};
export default UserDatacard;
