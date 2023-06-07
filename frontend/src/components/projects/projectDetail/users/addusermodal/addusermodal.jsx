import ModalBackground from "../../../../modalbackground/modalbackground";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./addusermodal.module.css";
import Spinner from "../../../../spinner/spinner";
import { Context } from "../../../../../Context";
import { patchTeam } from "../../../../../utils/apiTeam";
import { useParams } from "react-router-dom";
import { useEditTeamMutation } from "../../../../../utils/apiTeam";
import { getAllUsers } from "../../../../../utils/apiUser";

import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";

const AddUserToProjectModal = ({ setShowModal }) => {
  const { id: teamId } = useParams();
  const [data, setData] = useState({
    userId: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();

  const {
    mutate: addUserToProject,
    isLoading: isPosting,
    isSuccess: isPosted,
    isError: isPostingError,
    error: postingError,
  } = useEditTeamMutation(teamId, data)

  const {
    data: userData,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryFn: getAllUsers,
    isSuccess: () => {},
    isError: () => {
      setErrorMessage("Error loading users");
    },
  });

  const userOptions =
    userData?.data?.map((user) => {
      return { label: user.email, id: user._id };
    }) || [];
  const AutocompleteOptions = [
    { label: "Select One", id: "nooption" },
    ...userOptions,
  ];

  if (isPosted) {
    setShowModal(false);
  }

  return (
    <ModalBackground>
      <div className={styles.formContainer}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            addUserToProject()
          }}
        >
          {isPosting ? (
            <Spinner />
          ) : (
            <>
              <h2 className={styles.formTitle}>Add a new user to the project</h2>
              {errorMessage && (
                <p className={styles.addTaskError}>{errorMessage}</p>
              )}
              <label className={styles.label} htmlFor="userid">
                Select a user
              </label>
              <Autocomplete
                options={userOptions}
                id="userid"
                onChange={(e, value) => {
                  setData({
                    userId: value.id,
                  });
                }}
                className={styles.input}
                renderInput={(params) => (
                  <TextField {...params} label="Introduce a User's Email" />
                )}
              />
              <div className={styles.wrapper}></div>
              <div className={styles.btnContainer}>
                <button
                  className={styles.closeBtn}
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <input
                  className={styles.submitBtn}
                  type="submit"
                  value="Invite this user"
                />
              </div>
            </>
          )}
        </form>
      </div>
    </ModalBackground>
  );
};

export default AddUserToProjectModal;
