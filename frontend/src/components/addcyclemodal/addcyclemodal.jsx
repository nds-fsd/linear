import ModalBackground from "../modalbackground/modalbackground";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./addcyclemodal.module.css";
import Spinner from "../spinner/spinner";
import { addCycle } from "../../utils/apiCycle";
import { formatDate } from "../../utils/formatDates";

const AddCycleModal = ({ setShowModal, project }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { project: project._id },
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
    onError: (err) => setErrorMessage(err.response.data.error),
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
              addCycleMutation(data);
              console.log(data)
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
                  value="Create new cycle"
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
