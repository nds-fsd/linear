import userDatacardStyles from './userdatacard.module.css'
import userImage from '../../assets/imageUser.jpeg'

const UserDatacard = () =>{


return (
    <div className={userDatacardStyles.userData}>
        <img src={userImage}  className={userDatacardStyles.img} alt="" />
        <div className={userDatacardStyles.userDataContainer}>
          <h3> Rocio vasquez</h3>
          <p> Desarrolladora</p>
        </div>
    </div>    
   )
}
export default UserDatacard ;