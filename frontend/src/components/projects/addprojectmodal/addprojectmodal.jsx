import ModalBackground from "../../modalbackground/modalbackground";
import { useMutation, useQueryClient } from "react-query";
import { useState, useContext} from "react";
import { useForm } from "react-hook-form";
import styles from "./addprojectmodal.module.css";
import Spinner from "../../spinner/spinner";
import { addProject } from "../../../utils/apiProject";
import { formatDate } from "../../../utils/formatUtils";
import { Context } from "../../../Context";

const AddProjectModal = ({ setShowModal }) => {
  const {setTeamsEffect, teamsEffect} = useContext(Context)
  const { register, handleSubmit, reset } = useForm({
    defaultValues:{
        active:true
    }
  });

  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();

  const {
    mutate: addProjectMutation,
    isLoading: isPosting,
    isSuccess: isPosted,
    isError,
    error,
  } = useMutation({
    mutationFn: (data) => addProject(data),
    onSuccess: (payload) => {
        setTeamsEffect(!teamsEffect)
    },
    onError: (err) => {
      console.log(err.response.data);
      // setErrorMessage(err.response.data.error)
    },
  });

  if (isPosted) {
    setShowModal(false);
  }

  return (
    <ModalBackground>
      <div className={styles.formContainer}>
        <form
          className={styles.form}
          onSubmit={handleSubmit((data) => {
            const formatedStartDate = new Date(data.startdate);
            const formatedFinishDate = new Date(data.finishdate);

            if (formatedStartDate >= formatedFinishDate) {
              setErrorMessage("finishing date cant be before starting date");
              return;
            } else {
              addProjectMutation(data);
              console.log(data);
            }
          })}
        >
          {isPosting ? (
            <Spinner />
          ) : (
            <>
              <h2 className={styles.formTitle}>Add a new Project</h2>
              {errorMessage && (
                <p className={styles.addTaskError}>{errorMessage}</p>
              )}
              <label className={styles.label} htmlFor="projecttitle">
                Project Title
              </label>
              <input
                id="projecttitle"
                className={styles.input}
                type="text"
                placeholder="Project title"
                {...register("title")}
              />
              <label className={styles.label} htmlFor="projectdescription">
                Project Description
              </label>
              <textarea
                rows="6"
                cols="30"
                id="projectdescription"
                className={styles.textAreaInput}
                placeholder="Description"
                {...register("description")}
              />
              <div className={styles.wrapper}>
                <div>
                  <label className={styles.label} htmlFor="projectstartdate">
                    Start date
                  </label>
                  <input
                    id="projectstartdate"
                    className={styles.input}
                    type="date"
                    placeholder="Start date"
                    {...register("startdate")}
                  />
                </div>
                <div>
                  <label className={styles.label} htmlFor="projectfinishdate">
                    Finish date
                  </label>
                  <input
                    id="projectfinishdate"
                    className={styles.input}
                    type="date"
                    placeholder="Finish date"
                    {...register("finishdate")}
                  />
                </div>
              </div>
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
                  value="Create new project"
                />
              </div>
            </>
          )}
        </form>
      </div>
    </ModalBackground>
  );
};

export default AddProjectModal;
