import React, {useState} from "react"
import { useConfig, useDataQuery } from '@dhis2/app-runtime'
import { Button, ButtonStrip, SplitButton,Menu, MenuItem, Divider , Box, Table, TableBody, TableCell, TableRow,TableHead, TableCellHead, TableRowHead} from '@dhis2/ui'
import styles from './App.module.css'
import {WorkLoad} from './WorkLoad'



const WorkLoadMain = () => {
    let start = gen_date(0)
    let end = gen_date(5)

    const [clicked,setClicked] = useState(<p>Select a timeframe to generate an overview of future workload</p>)

    

    return (
        <div>   

        <div
        style={{
            border: '1px solid #c4c9cc',
            display: 'inline-block',
            padding: 8
        }}>
            <ButtonStrip dataTest ="dhis2-uicore-buttonstrip">
                <Button dataTest ="dhis2-uicore-button" type="button"
                    onClick={() => {
                        setClicked(<WorkLoad start={gen_date(0)} end={gen_date(5)} timeframe={5}/>)
                        }}
                    >
                    5-day
                </Button>
                <Button dataTest="dhis2-uicore-button" type="button"
                    onClick={() => {setClicked(undefined) 
                        setClicked(<WorkLoad start={gen_date(0)} end={gen_date(3)} timeframe={7}/>)}}

                >
                7-day
                </Button>
            
                <Button dataTest="dhis2-uicore-button" type ="button"
                    onClick={() => setClicked(<WorkLoad start={gen_date(-10)} end={gen_date(3)} timeframe={10}/>)}                    
                >
                10-day
                </Button>
                <Button dataTest ="dhis2-uicore-button" type ="button"
                    onClick={() => setClicked(<WorkLoad start={gen_date(-1)} end={gen_date(14)} timeframe={14}/>)}                    
                >
                14-day
                </Button>
                
                <SplitButton dataTest ="dhis2-uicore-splitbutton">
                Label?
                </SplitButton>
            </ButtonStrip>
        </div>

            
            {clicked && <div>{clicked}</div>}

        </div>

    )

}


function gen_date(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0]
}

export {WorkLoadMain}