import loginHeaderStyles from './loginheader.module.css'
import logo from '../../assets/logo-no-background.svg'

const LoginHeader = () => {

    return (

        <div className={loginHeaderStyles.header}>
            <img className={loginHeaderStyles.logo} src={logo}/>
        </div>
    )
};

export default LoginHeader;