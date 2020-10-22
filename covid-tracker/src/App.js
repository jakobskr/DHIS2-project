import React, {useState} from 'react'
import styles from './App.module.css'
import { EntityList } from './EntityList'



const MyApp = () => {

    return (
    <div className={styles.container}>
        <div id='left-col'>
            <EntityList/>
        </div>
        <div id='right-col'>
            <p>Details here</p>
        </div>
    </div>
    
    )   
}

export default MyApp



