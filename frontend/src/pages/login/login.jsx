import loginStyles from './login.module.css';
import {useForm} from 'react-hook-form';
const Login = () => {
    
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(watch("example"));
   
    
    return (
        
    <div className={loginStyles.loginContainer}>
        <form className={loginStyles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        
            <input className={loginStyles.userData} type="email" placeholder="Correo electrónico" {...register("example")} />
            <input className={loginStyles.userData} type="password" placeholder="Contraseña"{...register("exampleRequired", { required: true })} />
            {/* {errors.exampleRequired && <span>This field is required</span>} */}
            <input className={loginStyles.login} type="submit" value="Iniciar sesión" />
            <br></br>
            <a className={loginStyles.forgetPass} href="#">¿Has olvidado la contraseña?</a>
            <br></br>
            <div className={loginStyles.linea}></div>
            <div className={loginStyles.positionNewUser}>
            <input className={loginStyles.newUser} type="button" value="Crear cuenta nueva" />
            </div>
        </form>
        
    </div>
    
    );
}

export default Login;