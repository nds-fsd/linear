import { useState, useContext, useEffect } from "react";
import ModalBackground from "../../modalbackground/modalbackground";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import styles from "./addprojectmodal.module.css";
import Spinner from "../../spinner/spinner";
import { addProject, patchProjectById } from "../../../utils/apiProject";
import { Context } from "../../../Context";
import { checkEmptyValues } from "../../../utils/formatUtils";

const AddProjectModal = ({
  selectedProject,
  setShowModal,
  setSelectedProject,
  modalType,
}) => {
  const { setTeamsEffect, teamsEffect } = useContext(Context);
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      ...selectedProject,
      startdate: selectedProject?.startdate
        ? new Date(selectedProject?.startdate).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      finishdate: selectedProject?.finishdate
        ? new Date(selectedProject?.finishdate).toISOString().split("T")[0]
        : "",
      active: true,
    },
  });

  const {
    mutate: addProjectMutation,
    isLoading: isPosting,
    isSuccess: isPosted,
    isError,
    error,
  } = useMutation({
    mutationFn: (data) => addProject(data),
    onSuccess: (payload) => {
      setTeamsEffect(!teamsEffect);
    },
    onError: (err) => {
      console.log(err.response.data);
      const missigFields = err.response.data.missingFields.join(", ");
      setErrorMessage(`missing fields: ${missigFields}`);
    },
  });

  const {
    mutate: editProjectMutation,
    isLoading: isMutating,
    isSuccess: isMutated,
    isError: isMutationError,
    error: mutationError,
  } = useMutation({
    mutationFn: (data) => patchProjectById(selectedProject._id, data),
    onSuccess: (payload) => {
      setTeamsEffect(!teamsEffect);
      setShowModal(false);
    },
    onError: (err) => {
      console.log(err.response.data);
      const missigFields = err.response.data.missingFields.join(", ");
      setErrorMessage(`missing fields: ${missigFields}`);
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
            const emptyValues = checkEmptyValues(data);
            if (emptyValues.length > 0) {
              const missingFields = emptyValues.join(", ")
              setErrorMessage(`${missingFields} cant be empty`);
              return;
            }
            const formatedStartDate = new Date(data.startdate);
            const formatedFinishDate = new Date(data.finishdate);
            if (formatedStartDate >= formatedFinishDate) {
              setErrorMessage("finishing date cant be before starting date");
              return;
            } else if (modalType !== "edit") {
              addProjectMutation(data);
            } else {
              editProjectMutation(data);
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
                  onClick={() => {
                    setSelectedProject({});
                    setShowModal(false);
                  }}
                >
                  Close
                </button>
                <input
                  className={styles.submitBtn}
                  type="submit"
                  value={
                    modalType === "edit" ? "Edit Project" : "Create new project"
                  }
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
