import React from 'react'
import ModalBackground from '../modalbackground/modalbackground'
import { useMutation } from "react-query";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../Context";
import addTaskStyles from "./addtaskmodal.module.css";

const AddTaskModal = ({closeModal}) => {
    const { register, handleSubmit } = useForm();
    
    


  return (
    <ModalBackground>
    <div className={addTaskStyles.formContainer}>
      <form
        className={addTaskStyles.form}
        onSubmit={()=>{}}      >
        <select className={addTaskStyles.input} {...register("pronouns")}>
          <option value="" disabled selected hidden>
            How should we adress you?
          </option>
          <option value="mr">Mr</option>
          <option value="mrs">Mrs</option>
          <option value="neutral">Neutral</option>
        </select>
        <input
          className={addTaskStyles.input}
          type="text"
          placeholder="Name"
          {...register("firstname")}
        />
        <input
          className={addTaskStyles.input}
          type="text"
          placeholder="Last name"
          {...register("lastname")}
        />
        <select className={addTaskStyles.input} {...register("teamrole")}>
          <option value="" disabled selected hidden>
            Whats your role in the team?
          </option>
          <option value="projectmanager">Project Manager</option>
          <option value="cyclemanager">Cycle Manager</option>
          <option value="tecnicstaff">Staff</option>
        </select>
        <input
          className={addTaskStyles.input}
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        <input
          className={addTaskStyles.input}
          type="email"
          placeholder="Repeat your Email"
          {...register("repeatemail")}
        />
        <input
          className={addTaskStyles.input}
          type={"password"}
          placeholder="Password"
          {...register("password")}
        />
        <input
          className={addTaskStyles.input}
          type={"password"}
          placeholder="Repeat your Password"
          {...register("repeatpassword")}
        />
        <input
          className={addTaskStyles.registerBtn}
          type="submit"
          value="Register"
        />
      </form>
    </div>
        <button
            onClick={() => closeModal(false)}
        >
            Close Modal
        </button>
    </ModalBackground>
  )
}

export default AddTaskModal