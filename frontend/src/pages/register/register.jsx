import registerStyles from './register.module.css';
import RegisterForm from '../../components/newregister/register';
import ResetPassHeader from '../../components/resetpassheader/resetpassheader';
import LoginHeader from '../../components/loginheader/loginheader'
import Footer from '../../components/footer/footer';

const Register = () => {

            
        return (
          <div className={registerStyles.container}>
            {/* <ResetPassHeader/> */}
            <LoginHeader/>
            <div className={registerStyles.newRegister}>
              <RegisterForm/>
            </div>
            <Footer />
          </div>
        );
      }

  export default Register;