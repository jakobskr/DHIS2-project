import React, {useState} from 'react'
import i18n from '@dhis2/d2-i18n'
import styles from './App.module.css'
import { Button, ButtonStrip, SplitButton, Menu, MenuItem, MenuSectionHeader, MenuDivider, Checkbox } from '@dhis2/ui'
import { EntityList } from './EntityList'
import { NewEntityList } from './NewEntityList'
import {  WorkLoad } from './WorkLoad'
import {  WorkLoadMain } from './WorkLoadMain'
import { Complete } from './Complete'
import { Overdue } from './Overdue'
import { CasesOverview } from './CasesOverview'




const MyApp = () => {
    const [clicked,setClicked] = useState(<NewEntityList/>)


    return (
        <div className={styles.container}>
            
            <nav className={styles.menu} data-test-id="menu">
                <MenuSectionHeader label={i18n.t('Menu')} />
                <Menu>

                    <MenuItem
                        label={i18n.t('Daily workload')}
                        dataTest="menu-dataSets"
                        onClick={()=> {setClicked(<NewEntityList/>)}}
                    />

                <MenuDivider/>


                <MenuItem
                        label={i18n.t('Case Overview')}
                        dataTest="menu-dataSets"
                        onClick={()=> {setClicked(<CasesOverview/>)}}
                    />

                <MenuItem
                        label={i18n.t('Future Workload')}
                        dataTest="menu-dataSets"
                        onClick={()=> {setClicked(<WorkLoadMain/>)}}
                    />

                    <MenuItem
                        label={i18n.t('Completed events')}
                        dataTest="menu-dataSets"
                        onClick={()=> {setClicked(<Complete/>)}}
                    />

                    <MenuItem
                        label={i18n.t('Overdue')}
                        dataTest="menu-dataSets"
                        onClick={()=> {setClicked(<Overdue/>)}}
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



