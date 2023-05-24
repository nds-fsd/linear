import { useEffect } from "react";
import ModalBackground from "../modalbackground/modalbackground";
import styles from "./confirmdeletemodal.module.css";
import Spinner from "../spinner/spinner";
import { useDeleteTaskMutation } from "../../utils/apitask";

const DeleteModal = ({ taskId, deletedSchema, cancelFn }) => {

  const {
    mutate: deleteTask,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteTaskMutation(taskId);

  if(isDeleted){
    cancelFn(false)
  }

  return (
    <ModalBackground>
      <div className={styles.dialogContainer}>
        <h2>Are you sure you want to delete this {deletedSchema}?</h2>

        {isDeleting ? (
          <Spinner />
        ) : (
          <div className={styles.btnContainer}>
            <button
              className={styles.cancelBtn}
              onClick={() => cancelFn(false)}
            >
              Cancel
            </button>
            <button className={styles.deleteBtn} onClick={() => deleteTask()}>
              Confirm
            </button>
          </div>
        )}
      </div>
    </ModalBackground>
  );
};

export default DeleteModal;
