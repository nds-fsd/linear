import resetpassStyles from './resetpass.module.css';
import ForgotPass from '../../components/forgotpass/forgotpass';
import ResetPassHeader from '../../components/resetpassheader/resetpassheader';
import Footer from '../../components/footer/footer';
const ResetPass = () => {



    return (
        <div className={resetpassStyles.container}>
            <ResetPassHeader/>
            <ForgotPass/>
            <Footer/>
        </div>
    );
}
export default ResetPass;