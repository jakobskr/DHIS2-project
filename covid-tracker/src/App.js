import React, {useState} from 'react'
import i18n from '@dhis2/d2-i18n'
import styles from './App.module.css'
import { Button, ButtonStrip, SplitButton, Menu, MenuItem, MenuSectionHeader, Checkbox } from '@dhis2/ui'
import { EntityList } from './EntityList'
import { NewEntityList } from './NewEntityList'
import {  WorkLoad } from './WorkLoad'
import {  WorkLoadMain } from './WorkLoadMain'




const MyApp = () => {
    const [clicked,setClicked] = useState(<NewEntityList/>)
    const [details, setDetails] = useState(undefined)


    return (
        <div >
            
            <nav className={styles.menu} data-test-id="menu">
                <MenuSectionHeader label={i18n.t('Menu')} />
                <Menu>

                    <MenuItem
                        label={i18n.t('suggested entitylist')}
                        dataTest="menu-dataSets"
                        onClick={()=> {console.log("datasets")
                                        setClicked(<NewEntityList/>)
                                        }}
                    />

                <MenuItem
                        label={i18n.t('Workload')}
                        dataTest="menu-dataSets"
                        onClick={()=> {console.log("workload")
                                        setClicked(<WorkLoadMain/>)
                                        }}
                    />
                </Menu>
            </nav>


            <main className={styles.main}>
                {clicked && <div>{clicked}</div>}           
            </main>
        </div>
    )
}

export default MyApp



