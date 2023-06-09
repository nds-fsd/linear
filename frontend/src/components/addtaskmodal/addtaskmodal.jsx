import { useEffect } from "react";
import ModalBackground from "../modalbackground/modalbackground";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { addTask } from "../../utils/apitask";
import { useCyclesByProjectData } from "../../utils/apiCycle";
import { Context } from "../../Context";
import addTaskStyles from "./addtaskmodal.module.css";
import { STATUS_ARRAY } from "../../statusarray";
import Spinner from "../spinner/spinner";

const AddTaskModal = ({ defaultValues, setShowModal }) => {



  const { teams , userSessionContext } = useContext(Context);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(defaultValues?.team._id ?? "");
  const [selectedCycle, setSelectedCycle] = useState(defaultValues?.cycle);
  const { register, handleSubmit, reset } = useForm({defaultValues:{
    cycle:selectedCycle
  }});


  const [selectedProject, setSelectedProject] = useState("");
  const queryClient = useQueryClient();
  const [users, setUsers] = useState();

  useEffect(() => {
    const fullSelectedTeam = teams.find((team) => team._id === selectedTeam);
    setUsers(fullSelectedTeam?.users);
    setSelectedProject(fullSelectedTeam?.project._id);
  }, [selectedTeam]);


  const onSuccess = ()=>{}
  const onError = ()=>{}
  const enabled = !!selectedProject

  const {
    data: cycles,
    isLoading: cyclesIsLoading,
    isError: cyclesIsError,
  } = useCyclesByProjectData(selectedProject, onSuccess, onError, enabled)

  const {
    mutate: addTaskMutation,
    isLoading: isPosting,
    isSuccess: isPosted,
    isError,
    error,
  } = useMutation({
    mutationFn: (data) => addTask(data),
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

  if (isPosted) {
    {
      setTimeout(() => setShowModal(false), 1000);
    }
    return (
      <ModalBackground>
        <div className={addTaskStyles.form}>
          <h2 style={{ alignSelf: "center" }}>Task created succesfully!</h2>
        </div>
      </ModalBackground>
    );
  }

  return (
    <ModalBackground>
      <div className={addTaskStyles.formContainer}>
        <form
          className={addTaskStyles.form}
          onSubmit={handleSubmit((data) => {
            console.log(data);
            addTaskMutation(data);
          })}
        >
          {isPosting ? (
            <Spinner />
          ) : (
            <>
              <h2 className={addTaskStyles.formTitle}>Add a new Issue</h2>
              {errorMessage && (
                <p className={addTaskStyles.addTaskError}>{errorMessage}</p>
              )}
              <label className={addTaskStyles.label} htmlFor="tasktitle">
                Issue Title
              </label>
              <input
                id="tasktitle"
                className={addTaskStyles.input}
                type="text"
                placeholder="Issue"
                {...register("title")}
              />
              <label className={addTaskStyles.label} htmlFor="taskdescription">
                Issue Description
              </label>
              <textarea
                rows="6"
                cols="30"
                id="taskdescription"
                className={addTaskStyles.textAreaInput}
                placeholder="Description"
                {...register("description")}
              />
              <div className={addTaskStyles.wrapper}>
                <label className={addTaskStyles.label} htmlFor="taskproject">
                  Issue Project
                  <select
                    id="taskproject"
                    defaultValue=""
                    value={selectedTeam}
                    className={addTaskStyles.selectInput}
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
                <label className={addTaskStyles.label} htmlFor="taskcycle">
                  Project Cycle
                  <select
                    disabled={cyclesIsLoading || cyclesIsError}
                    id="taskcycle"
                    value={selectedCycle}
                    className={addTaskStyles.selectInput}
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
              <div className={addTaskStyles.wrapper}>
                <label className={addTaskStyles.label} htmlFor="taskuser">
                  Asigned to
                  <select
                    id="taskuser"
                    defaultValue=""
                    className={addTaskStyles.selectInput}
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
                <label className={addTaskStyles.label} htmlFor="taskstatus">
                  Issue Status
                  <select
                    id="taskstatus"
                    defaultValue=""
                    className={addTaskStyles.selectInput}
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
                <label className={addTaskStyles.label} htmlFor="taskduedate">
                  Issue due date
                </label>
                <input
                  id="taskduedate"
                  className={addTaskStyles.input}
                  type="date"
                  placeholder="Due date"
                  {...register("duedate")}
                />
              </div>
              <div className={addTaskStyles.btnContainer}>
                <button
                  className={addTaskStyles.closeBtn}
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <input
                  className={addTaskStyles.submitBtn}
                  type="submit"
                  value="Create new task"
                />
              </div>
            </>
          )}
        </form>
      </div>
    </ModalBackground>
  );
};

export default AddTaskModal;
