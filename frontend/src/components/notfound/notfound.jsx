import React from 'react'
import styles from './notfound.module.css'

const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
        <div className={styles.card}>
           <h2>404 - Not Found</h2>
        </div>
    </div>
  )
}

export default NotFound