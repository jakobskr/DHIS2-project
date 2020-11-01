import React, {useState} from 'react'
import i18n from '@dhis2/d2-i18n'
import styles from './App.module.css'
import { Menu, MenuItem, MenuSectionHeader, Checkbox } from '@dhis2/ui'
import { EntityList } from './EntityList'
import { ProgramList } from './hard_requirements/EntityIndex'
import { NewEntityList } from './NewEntityList'



const MyApp = () => {
    const [clicked,setClicked] = useState(<NewEntityList/>)
    const [details, setDetails] = useState(undefined)


    return (
        <div >
            
            <nav className={styles.menu} data-test-id="menu">
                <MenuSectionHeader label={i18n.t('Menu')} />
                <Menu>
                    <MenuItem
                        label={i18n.t('current EntityList')}
                        dataTest="menu-programs"
                        onClick={()=> {
                            console.log("programs")
                            setClicked(<EntityList/>)
                        }}
                    />
                    <MenuItem
                        label={i18n.t('suggested entitylist')}
                        dataTest="menu-dataSets"
                        onClick={()=> {console.log("datasets")
                                        setClicked(<NewEntityList/>)
                                        }}
                    />
                </Menu>
            </nav>

            <div className={styles.filterbox}>
            <Checkbox
                label="Index Cases"
                name="indc"
                value="checked"
                onChange={() => {console.log("testing")}}
                disbaled="false">
            </Checkbox>

            <Checkbox
                
                label="Contact Cases"
                name="indc"
                value="default"
                onChange={() => {console.log("testing other")}}
                >
            </Checkbox>

            </div>
            <main className={styles.main}>
                {clicked && <div>{clicked}</div>}           
            </main>
        </div>
    )
}

export default MyApp



