import loginFormStyles from './loginform.module.css';
import {useForm} from 'react-hook-form';
import {useState} from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {HOME} from '../../route-path'
import {Link} from 'react-router-dom'
import { login } from '../../queryhooks/loginquery';


const LoginForm = () => {
    
    const { register, handleSubmit, watch, formState } = useForm();
    const onSubmit = data => login(data);
    const [shown, setShown] = useState(false);


    
    return (
        
        <form className={loginFormStyles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        
            <input className={loginFormStyles.userData} type="email" 
            placeholder="Correo electrónico" {...register("email")} />
            <div className={loginFormStyles.userData}>
                <input  type={shown ? 'text' : 'password'} 
                placeholder="Contraseña"{...register("password", { required: true })} />
                {
                    shown ? 
                    <VisibilityIcon className={loginFormStyles.icon}
                    onClick={() => {setShown(!shown)}}/>
                    
                    : 
                    <VisibilityOffIcon className={loginFormStyles.icon}
                    onClick={() => {setShown(!shown)}}/>
                }
            </div>
            {/* {errors.exampleRequired && <span>This field is required</span>} */}
            <input className={loginFormStyles.login} type="submit" value="Iniciar sesión" />
            <br></br>
            <Link className={loginFormStyles.forgetPass} 
            to="/home">
                ¿Has olvidado la contraseña?
            </Link>
            <br></br>
            <div className={loginFormStyles.linea}></div>
            <div className={loginFormStyles.positionNewUser}>
                <Link className={loginFormStyles.newUser} to={HOME}> Crear cuenta nueva
                </Link>
            </div>
        </form>
    
    );
}

export default LoginForm;




