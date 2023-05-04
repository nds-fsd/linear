import registerStyles from './register.module.css';
import NewRegister from '../../components/newregister/newregister';
import ResetPassHeader from '../../components/resetpassheader/resetpassheader';
import Footer from '../../components/footer/footer';

const Register = () => {

            
        return (
          <div className={registerStyles.container}>
            <ResetPassHeader/>
            <div className={registerStyles.newRegister}>
              <NewRegister/>
            </div>
            <Footer />
          </div>
        );
      }

  export default Register;