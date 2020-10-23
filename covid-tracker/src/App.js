import React, {useState} from 'react'
import styles from './App.module.css'
import { EntityList } from './EntityList'



const MyApp = () => {
    const [isEntityClicked, showDetails] = useState(-1)

    return (
        <div id='root'>
            <EntityList/>
        </div>
    
    )   
}

export default MyApp



