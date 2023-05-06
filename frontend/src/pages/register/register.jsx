import registerStyles from './register.module.css';
import RegisterForm from '../../components/newregister/register';
import ResetPassHeader from '../../components/resetpassheader/resetpassheader';
import Footer from '../../components/footer/footer';

const Register = () => {

            
        return (
          <div className={registerStyles.container}>
            <ResetPassHeader/>
            <div className={registerStyles.newRegister}>
              <RegisterForm/>
            </div>
            <Footer />
          </div>
        );
      }

  export default Register;