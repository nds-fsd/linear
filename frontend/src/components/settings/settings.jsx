import { useState, useContext } from "react";
import settingsStyle from "./settings.module.css";
import { Context } from "../../Context";
import { usePatchUserMutation } from "../../utils/apiUser";
import AvatarImage from "./avatarimage/avatarimage";
import UserDetails from "./userdetails/userdetails";
import EditUserForm from "./edituserform/edituserform";

const Settings = () => {
  const { userSessionContext, setUserSessionContext } = useContext(Context);
  const { id: userId, profilepic } = userSessionContext;
  const [objToSend, setObjToSend] = useState({});
  const [editMode, setEditMode] = useState(false);

  const onSuccess = (res) => {
    console.log(res);
    // setUserSessionContext({...userSessionContext, profilepic:imgUrl})
  };

  // const {mutate, isLoading, isError, error} = usePatchUserMutation(userId, objToSend, onSuccess)

  return (
    <div className={settingsStyle.settings}>
      <div className={settingsStyle.settingsContainer}>
        <div className={settingsStyle.wrapper}>
          <div className={settingsStyle.dataWrapper}>
            <AvatarImage
              userSessionContext={userSessionContext}
              setUserSessionContext={setUserSessionContext}
            />
            {editMode ? (
              <EditUserForm 
              setEditMode={setEditMode}
              userData={userSessionContext} />
            ) : (
              <UserDetails userData={userSessionContext} />
            )}
          </div>
          <button
            className={settingsStyle.editBtn}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode? "Cancel" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
