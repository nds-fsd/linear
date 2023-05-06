import React from "react";
import { useForm } from "react-hook-form";
import registerFormStyles from "./register.module.css";

const Register = () => {
  const { register, handleSubmit } = useForm();

  return (
    <div className={registerFormStyles.formContainer}>
      <form
        className={registerFormStyles.form}
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <select className={registerFormStyles.input} {...register("pronouns")}>
          <option value="mr">Mr</option>
          <option value="mrs">Mrs</option>
          <option value="neutral">Neutral</option>
        </select>
        <input
          className={registerFormStyles.input}
          type="text"
          placeholder="Name"
          {...register("firstname")}
        />
        <input
          className={registerFormStyles.input}
          type="text"
          placeholder="Last name"
          {...register("lastname")}
        />
        <input
          className={registerFormStyles.input}
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        <input
          className={registerFormStyles.input}
          type={"password"}
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <input
          className={registerFormStyles.input}
          type={"password"}
          placeholder="Repeat Password"
          {...register("repeatpassword", { required: true })}
        />
        <input className={""} type="submit" value="Iniciar sesión" />
      </form>
    </div>
  );
};

export default Register;
