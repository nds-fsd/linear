import { useEffect, useRef } from "react";
import ModalBackground from "../modalbackground/modalbackground";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { patchTaskById, getTaskById } from "../../utils/apitask";
import { getCyclesByProject } from "../../utils/apiCycle";
import { Context } from "../../Context";
import styles from "./edittaskmodal.module.css";
import { STATUS_ARRAY } from "../../statusarray";
import Spinner from "../spinner/spinner";

const EditTaskModal = ({ closeModal, taskDataState, taskId }) => {
  const { teams, userSessionContext } = useContext(Context);
  const [useFormHookParams, setUseFormHookParams] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const queryClient = useQueryClient();
  const [users, setUsers] = useState();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: () =>
      getTaskById(taskId).then((res) => {
        const { title, description, duedate, cycle, status, asigneduser } =
          res.data;
        const formatedDueDate = new Date(duedate).toISOString().split("T")[0];
        const projectid = cycle.project._id;
        const cycleid = cycle._id;
        const userid = asigneduser._id;
        const team = teams.find((team) => team.project._id === projectid);
        setSelectedTeam(team._id);
        setUsers(team?.users);

        setSelectedProject(projectid);
        return {
          title,
          description,
          duedate: formatedDueDate,
          status,
          cycle: cycleid,
          user: userid,
        };
      }),
  });

  useEffect(() => {
    const fullSelectedTeam = teams.find((team) => team._id === selectedTeam);
    setUsers(fullSelectedTeam?.users);
    setSelectedProject(fullSelectedTeam?.project._id);
  }, [selectedTeam]);

  const {
    data: cycles,
    isLoading: cyclesIsLoading,
    isError: cyclesIsError,
  } = useQuery({
    queryKey: ["cycles", { project: selectedProject }],
    queryFn: () => getCyclesByProject(selectedProject),
  });

  const {
    mutate: patchTask,
    isLoading: isPosting,
    isSuccess: isEdited,
    isError,
    error,
  } = useMutation({
    mutationFn: (data) => patchTaskById(taskId, data),
    onSuccess: (payload) => {
      queryClient.refetchQueries("tasks");
    },
    onError: (err) => setErrorMessage(err.response.data.error),
  });

  const optionElements = STATUS_ARRAY.map((statusObj) => {
    return (
      <option key={statusObj.status} value={statusObj.status}>
        {statusObj.label}
      </option>
    );
  });

  const userElements = users?.map((userObj) => {
    return (
      <option key={userObj._id} value={userObj._id}>
        {userObj.firstname} {userObj.lastname}
      </option>
    );
  });

  const projectElements = teams?.map((team) => {
    const projectObj = team.project;
    if (!projectObj) {
      return;
    }
    return (
      <option key={projectObj?._id} value={team?._id}>
        {projectObj?.title}
      </option>
    );
  });

  const cycleElements = cycles?.data.map((cycleObj) => {
    return (
      <option key={cycleObj._id} value={cycleObj._id}>
        {cycleObj.title}
      </option>
    );
  });

  if (isEdited) {
    closeModal(false);
  }

  return (
    <ModalBackground>
      <div className={styles.formContainer}>
        <form
          className={styles.form}
          onSubmit={handleSubmit((data) => {
            patchTask(data);
          })}
        >
          {isPosting ? (
            <Spinner />
          ) : (
            <>
              {errorMessage && (
                <p className={styles.addTaskError}>{errorMessage}</p>
              )}
              <label className={styles.label} htmlFor="tasktitle">
                Issue Title
              </label>
              <input
                id="tasktitle"
                className={styles.input}
                type="text"
                placeholder="Issue"
                {...register("title")}
              />
              <label className={styles.label} htmlFor="taskdescription">
                Issue Description
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
                <label className={styles.label} htmlFor="taskproject">
                  Issue Project
                  <select
                    id="taskproject"
                    value={selectedTeam ? selectedTeam : ""}
                    className={styles.selectInput}
                    onChange={(e) => {
                      reset({ cycle: "" });
                      setSelectedTeam(e.target.value);
                    }}
                  >
                    <option value="" disabled hidden>
                      Pick one from the list
                    </option>
                    {projectElements}
                  </select>
                </label>
                <label className={styles.label} htmlFor="taskcycle">
                  Project Cycle
                  <select
                    disabled={cyclesIsLoading || cyclesIsError}
                    id="taskcycle"
                    defaultValue=""
                    className={styles.selectInput}
                    {...register("cycle")}
                  >
                    {!selectedProject ? (
                      <option value="" disabled hidden>
                        First select a project
                      </option>
                    ) : (
                      <option value="" disabled hidden>
                        {cycleElements
                          ? "Select an option"
                          : "No cycles available"}
                      </option>
                    )}
                    {cycleElements}
                  </select>
                </label>
              </div>
              <div className={styles.wrapper}>
                <label className={styles.label} htmlFor="taskuser">
                  Asigned to
                  <select
                    id="taskuser"
                    className={styles.selectInput}
                    {...register("user")}
                  >
                    {users ? (
                      userElements
                    ) : (
                      <option
                        key={userSessionContext.id}
                        value={userSessionContext.id}
                      >
                        {userSessionContext.firstname}{" "}
                        {userSessionContext.lastname}
                      </option>
                    )}
                  </select>
                </label>
                <label className={styles.label} htmlFor="taskstatus">
                  Issue Status
                  <select
                    id="taskstatus"
                    defaultValue=""
                    className={styles.selectInput}
                    {...register("status")}
                  >
                    <option value="" disabled hidden>
                      Pick one from the list
                    </option>
                    {optionElements}
                  </select>
                </label>
              </div>
              <div>
                <label className={styles.label} htmlFor="taskduedate">
                  Issue due date
                </label>
                <input
                  id="taskduedate"
                  className={styles.input}
                  type="date"
                  placeholder="Due date"
                  {...register("duedate")}
                />
              </div>
              <div className={styles.btnContainer}>
                <button
                  className={styles.closeBtn}
                  onClick={() => closeModal(false)}
                >
                  Close
                </button>
                <input
                  className={styles.submitBtn}
                  type="submit"
                  value="Confirm"
                />
              </div>
            </>
          )}
        </form>
      </div>
    </ModalBackground>
  );
};

export default EditTaskModal;
