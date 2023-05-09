import forgotpassStyles from "./forgotpass.module.css";
import { useForm } from "react-hook-form";

const ForgotPass = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className={forgotpassStyles.container}>
      <form
        className={forgotpassStyles.formContainer}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={forgotpassStyles.text}>
          <h2>Recupera tu cuenta</h2>
          <p>Introduce tu correo electrónico para buscar tu cuenta.</p>
        </div>
        <input
          className={forgotpassStyles.emailUser}
          type="email"
          placeholder="Correo electrónico"
          {...register("example")}
        />
        <div className={forgotpassStyles.buttonContainer}>
          <input
            className={forgotpassStyles.send}
            type="submit"
            value="Cancelar"
          />
          <input
            className={forgotpassStyles.cancel}
            type="submit"
            value="Buscar"
          />
        </div>
      </form>
    </div>
  );
};
export default ForgotPass;
