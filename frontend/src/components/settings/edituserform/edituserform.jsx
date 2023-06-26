import { useEffect, useContext, useState } from "react";
import styles from "./edituserform.module.css";
import { TextField, MenuItem } from "@mui/material";
import { usePatchUserMutation, patchUserById } from "../../../utils/apiUser";
import { Context } from "../../../Context";
import Spinner from "../../spinner/spinner";
import { setUserSession, getUserToken } from "../../../utils/localStorage.utils";

const EditUserForm = ({ userData, setEditMode }) => {
  const { email, firstname, lastname, pronouns, teamrole, id } = userData;
  const { userSessionContext, setUserSessionContext } = useContext(Context);
  const [objToSend, setObjToSend] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const roleOptions = [
    { value: "cyclemanager", label: "Time Manager" },
    { value: "projectmanager", label: "Project Manager" },
    { value: "tecnicstaff", label: "Staff" },
  ];


  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const handleChange = (name, value) => {
    setObjToSend((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const onSuccess = (data) => {
    const token = getUserToken()
    const usrData = {...data.data, id:data.data._id}
    setUserSessionContext((prevState) => {
      return { ...prevState, ...usrData };
    });
    const userSession = {token:token, user:usrData}
    setUserSession(userSession)
  };

  const { mutate, isLoading, isSuccess, isError, error } = usePatchUserMutation(
    id,
    objToSend,
    onSuccess
  );

  useEffect(() => {
    if (isSuccess) {
      setEditMode(false);
    }
  }, [isSuccess]);

  if (isLoading) {
    return (
      <div className={styles.userDetailsContainer}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.userDetailsContainer}>
      <div className={styles.fieldWrapper}>
        <div className={styles.fieldTag}>Name</div>
        <TextField
          defaultValue={firstname}
          className={styles.fieldContent}
          name="firstname"
          onChange={(e) => {
            const { name, value } = e.target;
            handleChange(name, value);
          }}
        />
      </div>
      <div className={styles.fieldWrapper}>
        <div className={styles.fieldTag}>Last Name</div>
        <TextField
          defaultValue={lastname}
          className={styles.fieldContent}
          name="lastname"
          onChange={(e) => {
            const { name, value } = e.target;
            handleChange(name, value);
          }}
        />
      </div>
      <div className={styles.fieldWrapper}>
        <div className={styles.fieldTag}>Email</div>
        <TextField
          defaultValue={email}
          className={styles.fieldContent}
          name="email"
          onChange={(e) => {
            const { name, value } = e.target;
            handleChange(name, value);
          }}
        />
      </div>
      <div className={styles.fieldWrapper}>
        <div className={styles.fieldTag}>Role</div>
        <TextField
          select
          label="Select one"
          className={styles.fieldContent}
          defaultValue={teamrole}
          name="teamrole"
          onChange={(e) => {
            const { name, value } = e.target;
            handleChange(name, value);
          }}
        >
          {roleOptions.map((option) => {
            return (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            );
          })}
        </TextField>
      </div>
      <p>{errorMessage}</p>
      <button
        onClick={(e) => {
          e.preventDefault;
          if(objToSend.email && emailRegex.test(objToSend.email)) {
            mutate();
            return;
          } else if(objToSend.email && !emailRegex.test(objToSend.email)) {
            setErrorMessage("Please enter a valid email");
            return;
          } else {
            mutate()
            return;
          }
        }}
        className={styles.inputBtn}
      >
        Update profile
      </button>
    </div>
  );
};

export default EditUserForm;
