import React from 'react'
import styles from './GenericCard.module.css'
const GenericCard = ({taskDone, titleIssue, avatars}) => {



  return (
    <div className={styles.genericCard}>
        <div className={styles.titleIssue}>
         <h3>{titleIssue}</h3>
         <div className={styles.taskDone}>
            <img src="/src/assets/Vector.jpg" alt="flechita" className={styles.imageDone} />
            {taskDone}
         </div>
        </div>
        <div>
            
            Hola mundo
        </div>
        <div>
            Hola mundo
        </div>
    </div>
  )
}

export default GenericCard