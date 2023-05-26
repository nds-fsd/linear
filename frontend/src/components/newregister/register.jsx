import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Context } from "../../Context";
import registerFormStyles from "./register.module.css";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const context = useContext(Context);
  const [validatonMessage, setValidationMessage] = useState();
  const { isLoginIn, registerUser, error, setError } = context;

  return (
    <div className={registerFormStyles.formContainer}>
      <form
        className={registerFormStyles.form}
        onSubmit={handleSubmit((data) => {
          if (!data.email) {
            setValidationMessage("Please enter a valid Email");
            return;
          } else if (!data.firstname) {
            setValidationMessage("Please enter your first name");
            return;
          } else if (!data.lastname) {
            setValidationMessage("Please enter your last name");
            return;
          } else if (!data.password) {
            setValidationMessage("Please enter your a password");
            return;
          } else if (!data.teamrole) {
            setValidationMessage("Please enter your role in the team");
            return;
          } else if (data.password !== data.repeatpassword) {
            setValidationMessage("Passwords dont match");
            return;
          } else if (data.email !== data.repeatemail) {
            setValidationMessage("Emails dont match");
            return;
          }
          setValidationMessage("");
          registerUser(data);
        })}
      >
        <select
          defaultValue=""
          className={registerFormStyles.input}
          {...register("pronouns")}
        >
          <option value="" disabled hidden>
            How should we adress you?
          </option>
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
        <select
          defaultValue=""
          className={registerFormStyles.input}
          {...register("teamrole")}
        >
          <option value="" disabled hidden>
            Whats your role in the team?
          </option>
          <option value="projectmanager">Project Manager</option>
          <option value="cyclemanager">Cycle Manager</option>
          <option value="tecnicstaff">Staff</option>
        </select>
        <input
          className={registerFormStyles.input}
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        <input
          className={registerFormStyles.input}
          type="email"
          placeholder="Repeat your Email"
          {...register("repeatemail")}
        />
        <input
          className={registerFormStyles.input}
          type={"password"}
          placeholder="Password"
          {...register("password")}
        />
        <input
          className={registerFormStyles.input}
          type={"password"}
          placeholder="Repeat your Password"
          {...register("repeatpassword")}
        />
        <input
          className={registerFormStyles.registerBtn}
          type="submit"
          value="Register"
        />
        {validatonMessage && (
          <p className={registerFormStyles.registerError}>{validatonMessage}</p>
        )}
        {error && <p className={registerFormStyles.registerError}>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
