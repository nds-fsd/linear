import React from "react";
import ModalBackground from "../modalbackground/modalbackground";
import { useMutation, useQueryClient } from "react-query";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../utils/api";
import { Context } from "../../Context";
import addTaskStyles from "./addtaskmodal.module.css";
import { STATUS_ARRAY } from "../../statusarray";
import Spinner from "../spinner/spinner";

const AddTaskModal = ({ closeModal }) => {
  const [userList, setUserList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("")
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient()

  const addTask = (data) => {
    return api.post("/tasks", data);
  };

  const {
    mutate: addTaskMutation,
    isLoading: isPosting,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: (data) => addTask(data),
    onSuccess:  (payload) => {
        queryClient.refetchQueries("tasks")
        console.log(payload.data)},
    onError:    (err) => setErrorMessage(err.response.data.error),
  });

  const optionElements = STATUS_ARRAY.map((statusObj) => {
    return (
      <option key={statusObj.status} value={statusObj.status}>
        {statusObj.label}
      </option>
    );
  });

  if (isSuccess) {
   {setTimeout(()=>closeModal(false), 1000)} 
    return (
      <ModalBackground>
        <div className={addTaskStyles.form}>
          <h2 style={{alignSelf:"center"}}>Task created succesfully!</h2>
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
            addTaskMutation(data);
          })}
        >
          {isPosting ? (
            <Spinner />
          ) : (
            <>
              <h2 className={addTaskStyles.formTitle}>Add a new Issue</h2>
              {errorMessage && <p className={addTaskStyles.addTaskError}>{errorMessage}</p>}
              <label className={addTaskStyles.label} htmlFor="tasktitle">
                Issue Title
              </label>
              <input
                id="tasktitle"
                className={addTaskStyles.input}
                type="text"
                placeholder="Task"
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

                <label
                  className={addTaskStyles.label}
                  htmlFor="taskdescription"
                >
                  Issue Status
                  <select
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
