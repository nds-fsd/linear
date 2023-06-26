import { useEffect, useContext } from "react";
import ModalBackground from "../modalbackground/modalbackground";
import styles from "./confirmdeletemodal.module.css";
import Spinner from "../spinner/spinner";
import { useDeleteTaskMutation } from "../../utils/apitask";
import { useDeleteProjectMutation } from "../../utils/apiProject";
import { Context } from "../../Context";

const DeleteModal = ({
  taskId,
  deletedSchema,
  cancelFn,
  teamId,
  modalType,
}) => {

  const {setTeamsEffect, teamsEffect} = useContext(Context)


  const {
    mutate: deleteTask,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteTaskMutation(taskId);
  

  const onSuccess = ()=>{
    setTeamsEffect(!teamsEffect)
  }

  const {
    mutate: deleteProject,
    isLoading: isDeletingProject,
    isSuccess: isDeletedProject,
  } = useDeleteProjectMutation(teamId, onSuccess);

  if (isDeleted || isDeletingProject) {
    cancelFn(false);
  }

  return (
    <ModalBackground>
      <div className={styles.dialogContainer}>
        <h2>Are you sure you want to delete this {deletedSchema}?</h2>

        {isDeleting || isDeletingProject ? (
          <Spinner />
        ) : (
          <div className={styles.btnContainer}>
            <button
              className={styles.cancelBtn}
              onClick={() => cancelFn(false)}
            >
              Cancel
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => {
                if (modalType === "deleteproject") {
                  deleteProject();
                } else {
                  deleteTask();
                }
              }}
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </ModalBackground>
  );
};

export default DeleteModal;
