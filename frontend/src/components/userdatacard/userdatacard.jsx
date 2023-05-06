import {useContext} from 'react'
import userDatacardStyles from './userdatacard.module.css'
import userImage from '../../assets/imageUser.jpg'
import { Context } from '../../Context'

const UserDatacard = () =>{

const context = useContext(Context)

const {userSessionContext} = context
const {firstname, lastname, pronouns} = userSessionContext

return (
    <div className={userDatacardStyles.userData}>
        <img src={userImage}  className={userDatacardStyles.img} alt="" />
        <div className={userDatacardStyles.userDataContainer}>
          <h3>{`${firstname} ${lastname}`}</h3>
          <p>Rol de equipo</p>
        </div>
    </div>    
   )
}
export default UserDatacard ;