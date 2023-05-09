import resetPassHeaderStyles from "./resetpassheader.module.css";
import { useForm } from "react-hook-form";

const ResetPassHeader = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(watch("example"));

  return (
    <div className={resetPassHeaderStyles.header}>
      <li className={resetPassHeaderStyles.logo}>
        <a href="#">Logo</a>
      </li>
      <form
        className={resetPassHeaderStyles.loginContainer}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <input
            className={resetPassHeaderStyles.buttonLogin}
            type="email"
            placeholder="Correo electrónico"
            {...register("example", { required: true })}
          />
          <input
            className={resetPassHeaderStyles.buttonLogin}
            type="password"
            placeholder="Contraseña"
            {...register("exampleRequired", { required: true })}
          />
          <input
            className={resetPassHeaderStyles.buttonSubmit}
            type="submit"
            value="Iniciar sesión"
          />
        </div>
      </form>
    </div>
  );
};

export default ResetPassHeader;
