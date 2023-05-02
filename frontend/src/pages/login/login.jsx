import loginStyles from './login.module.css';
import LoginHeader from '../../components/loginheader/loginheader';
import LoginForm from '../../components/loginform/loginform';
import Footer from '../../components/footer/footer';



const Login = () => {
       
    return (        
    <div className={loginStyles.loginContainer}>
        <LoginHeader/>
        <div className={loginStyles.formContainer}>
            <LoginForm/> 
        </div>
        <Footer/>
    </div>   
    );
}

export default Login;




