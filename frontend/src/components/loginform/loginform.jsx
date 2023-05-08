import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Context } from "../../Context";
import { REGISTER } from "../../route-path";
import loginFormStyles from "./loginform.module.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Spinner from "../spinner/spinner";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const [shown, setShown] = useState(false);
  const [missingInfoMessage, setMissingInfoMessage] = useState("");
  const context = useContext(Context);

  const { logIn, invalidLogIn, isLoginIn } = context;

  return (
    <form
      className={loginFormStyles.formContainer}
      onSubmit={handleSubmit((data) => {
        if (!data.email) {
          setMissingInfoMessage("please enter a valid email");
          return;
        } else if (!data.password) {
          setMissingInfoMessage("please enter you password");
          return;
        }
        setMissingInfoMessage("")
        logIn(data);
      })}
    >
      {!isLoginIn ? (
        <>
          <input
            className={loginFormStyles.userData}
            type="email"
            placeholder="Correo electrónico"
            {...register("email")}
          />
          <div className={loginFormStyles.userData}>
            <input
              type={shown ? "text" : "password"}
              placeholder="Contraseña"
              {...register("password")}
            />
            {shown ? (
              <VisibilityIcon
                className={loginFormStyles.icon}
                onClick={() => {
                  setShown(!shown);
                }}
              />
            ) : (
              <VisibilityOffIcon
                className={loginFormStyles.icon}
                onClick={() => {
                  setShown(!shown);
                }}
              />
            )}
          </div>
          <input
            className={loginFormStyles.login}
            type="submit"
            value="Iniciar sesión"
          />
          {missingInfoMessage  && (
            <p className={loginFormStyles.logInError}>
              {missingInfoMessage}
            </p>
          )}
          {invalidLogIn && (
            <p className={loginFormStyles.logInError}>
              invalid username or password
            </p>
          )}
          <br></br>
          <Link className={loginFormStyles.forgetPass} to="/home">
            Forgot your password?
          </Link>
          <br></br>
          <div className={loginFormStyles.linea}></div>
          <div className={loginFormStyles.positionNewUser}>
            <Link className={loginFormStyles.newUser} to={REGISTER}>
              {" "}
              Register
            </Link>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </form>
  );
};

export default LoginForm;
