import React from 'react'
import styles from '../styles/AddButton.module.css'
const AddButton = ({setClose}) => {

  return (
    <div className={styles.mainAddButton} onClick={()=>{
        setClose(false)
    }}>
        Add NEw pizza

    </div>
  )
}

export default AddButton