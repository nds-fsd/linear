import React from "react";
import ModalBackground from "../modalbackground/modalbackground";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { addTask } from "../../utils/apitask";
import { getAllUsers } from "../../utils/apiUser";
import { getAllCycles } from "../../utils/apiCycle";
import { getAllProjects } from "../../utils/apiProject";
import { Context } from "../../Context";
import addTaskStyles from "./addtaskmodal.module.css";
import { STATUS_ARRAY } from "../../statusarray";
import Spinner from "../spinner/spinner";

const AddTaskModal = ({ closeModal }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  /*for now I'll be fetching all users for the select item, 
  in the future those users 
  must be filtered by team from the backend. Same with projects and cycles.
  First got to filter projects by TEAM (each user can have an array of teams, 
    and search projects based on that), and then cycles by projects*/

  const { data: users, isLoading: usersIsLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });

  const { data: projects, isLoading: projectsIsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getAllProjects(),
  });

  const { data: cycles, isLoading: cyclesIsLoading } = useQuery({
    queryKey: ["cycles"],
    queryFn: () => getAllCycles(),
  });

  const {
    mutate: addTaskMutation,
    isLoading: isPosting,
    isSuccess: isPosted,
    isError,
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
  const userElements = users?.data.map((userObj) => {
    return (
      <option key={userObj._id} value={userObj._id}>
        {userObj.firstname} {userObj.lastname}
      </option>
    );
  });
  const projectElements = projects?.data.map((projectObj) => {
    return (
      <option key={projectObj._id} value={projectObj._id}>
        {projectObj.title}
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
      setTimeout(() => closeModal(false), 1000);
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
                <label className={addTaskStyles.label} htmlFor="taskuser">
                  Asigned to
                  <select
                    id="taskuser"
                    defaultValue=""
                    className={addTaskStyles.selectInput}
                    {...register("user")}
                  >
                    <option value="" disabled hidden>
                      Pick one from the list
                    </option>
                    {userElements}
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
              <div className={addTaskStyles.wrapper}>
                <label className={addTaskStyles.label} htmlFor="taskproject">
                  Issue Project
                  <select
                    id="taskproject"
                    defaultValue=""
                    className={addTaskStyles.selectInput}
                    {...register("project")}
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
                    id="taskcycle"
                    defaultValue=""
                    className={addTaskStyles.selectInput}
                    {...register("cycle")}
                  >
                    <option value="" disabled hidden>
                      Pick one from the list
                    </option>
                    {cycleElements}
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
                  onClick={() => closeModal(false)}
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
