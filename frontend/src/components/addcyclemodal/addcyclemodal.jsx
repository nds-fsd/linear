import ModalBackground from "../modalbackground/modalbackground";
import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./addcyclemodal.module.css";
import Spinner from "../spinner/spinner";
import { addCycle, patchCycleById } from "../../utils/apiCycle";
import { checkEmptyValues } from "../../utils/formatUtils";

const AddCycleModal = ({ setShowModal, project, selectedCycle }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      ...selectedCycle,
      startdate: selectedCycle?.startdate
        ? new Date(selectedCycle?.startdate).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      finishdate: selectedCycle?.finishdate
        ? new Date(selectedCycle?.finishdate).toISOString().split("T")[0]
        : "",
      project: project._id,
      active: true,
    },
  });

  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();

  const {
    mutate: addCycleMutation,
    isLoading: isPosting,
    isSuccess: isPosted,
    isError,
    error,
  } = useMutation({
    mutationFn: (data) => addCycle(data),
    onSuccess: (payload) => {
      queryClient.refetchQueries("cycles");
    },
    onError: (err) => {
      const missigFields = err.response.data.missingFields.join(", ");
      setErrorMessage(`missing fields: ${missigFields}`);
    },
  });

  if (isPosted) {
    setShowModal(false);
  }

  const {
    mutate: editCycleMutation,
    isLoading: isMutating,
    isSuccess: isMutated,
    isError: isMutationError,
    error: mutationError,
  } = useMutation({
    mutationFn: (data) => patchCycleById(selectedCycle._id, data),
    onSuccess: (payload) => {
      setShowModal(false);
      queryClient.refetchQueries("cycles");
    },
    onError: (err) => {
      const missigFields = err.response.data.missingFields.join(", ");
      setErrorMessage(`missing fields: ${missigFields}`);
    },
  });

  return (
    <ModalBackground>
      <div className={styles.formContainer}>
        <form
          className={styles.form}
          onSubmit={handleSubmit((data) => {
            const emptyValues = checkEmptyValues(data);
            if (emptyValues.length > 0) {
              const missingFields = emptyValues.join(", ");
              setErrorMessage(`${missingFields} cant be empty`);
              return;
            }
            const formatedStartDate = new Date(data.startdate);
            const formatedFinishDate = new Date(data.finishdate);
            if (formatedStartDate >= formatedFinishDate) {
              setErrorMessage("finishing date cant be before starting date");
              return;
            } else if (selectedCycle.modalType !== "edit") {
              addCycleMutation(data);
            } else {
              editCycleMutation(data);
            }
          })}
        >
          {isPosting ? (
            <Spinner />
          ) : (
            <>
              <h2 className={styles.formTitle}>
                Add a new Cycle to {project.title}
              </h2>
              {errorMessage && (
                <p className={styles.addTaskError}>{errorMessage}</p>
              )}
              <label className={styles.label} htmlFor="cycletitle">
                Cycle Title
              </label>
              <input
                id="cycletitle"
                className={styles.input}
                type="text"
                placeholder="Sprint . . ."
                {...register("title")}
              />
              <label className={styles.label} htmlFor="taskdescription">
                Cycle Description
              </label>
              <textarea
                rows="6"
                cols="30"
                id="taskdescription"
                className={styles.textAreaInput}
                placeholder="Description"
                {...register("description")}
              />
              <div className={styles.wrapper}>
                <div>
                  <label className={styles.label} htmlFor="cyclestartdate">
                    Start date
                  </label>
                  <input
                    id="cyclestartdate"
                    className={styles.input}
                    type="date"
                    placeholder="Start date"
                    {...register("startdate")}
                  />
                </div>
                <div>
                  <label className={styles.label} htmlFor="cyclefinishdate">
                    Finish date
                  </label>
                  <input
                    id="cyclefinishdate"
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
                  value={
                    selectedCycle.modalType === "edit"
                      ? "Edit cycle"
                      : "Create new cycle"
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

export default AddCycleModal;
