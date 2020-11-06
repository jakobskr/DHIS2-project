import React, {useState} from "react"
import { useConfig, useDataQuery } from '@dhis2/app-runtime'
import { InputField, Button, ButtonStrip, SplitButton,Menu, MenuItem, Divider , Box, Table, TableBody, TableCell, TableRow,TableHead, TableCellHead, TableRowHead} from '@dhis2/ui'
import styles from './App.module.css'
import {WorkLoad} from './WorkLoad'



const WorkLoadMain = () => {
    let start = gen_date(0)
    let end = gen_date(5)

    const [clicked,setClicked] = useState(<p>Select a timeframe to generate an overview of future workload</p>)


    const [startDate, setStartDate] = useState("2020-11-02")
    const [endDate, setEndDate] = useState("2020-11-07")


    return (
        <div>   

        <div className={styles.buttonStripBox}>
            <ButtonStrip dataTest ="dhis2-uicore-buttonstrip" className={styles.buttonStrip}>
                <Button className={styles.button} dataTest ="dhis2-uicore-button" type="button"
                    onClick={() => {
                        setClicked(<WorkLoad start={"2020-11-01"} end={"2020-11-06"} timeframe={5}/>)
                        }}
                    >
                    5-day
                </Button>
                <Button className={styles.button} dataTest="dhis2-uicore-button" type="button"
                    onClick={() => {setClicked(undefined) 
                        setClicked(<WorkLoad start={"2020-11-01"} end={"2020-11-08"} timeframe={7}/>)}}

                >
                7-day
                </Button>
            
                <Button className={styles.button} dataTest="dhis2-uicore-button" type ="button"
                    onClick={() => setClicked(<WorkLoad start={"2020-11-01"} end={"2020-11-11"} timeframe={10}/>)}                    
                >
                10-day
                </Button>
                <Button className={styles.button} dataTest ="dhis2-uicore-button" type ="button"
                    onClick={() => setClicked(<WorkLoad start={"2020-11-01"} end={"2020-11-15"} timeframe={14}/>)}                    
                >
                14-day
                </Button>
                
                <InputField label="start-date" name="startDate"
                type="date"
                helpText="start date for events to track"
                onChange={function logger(_ref){console.log(this)
                    setStartDate(_ref.value)}}

                value={startDate}/>

                <InputField label="end-date" name="endDate"
                type="date"
                onChange={function logger(_ref){console.log(this)
                            setEndDate(_ref.value)}}
                helpText="end date for events to track"
                value={endDate}/>
                
                <Button className={styles.button} dataTest ="dhis2-uicore-button" type ="button"
                    onClick={() => { console.log(check_timeframe(startDate, endDate))
                        console.log(startDate + " " + endDate); 
                    setClicked(<WorkLoad start={startDate} end={endDate} timeframe={check_timeframe(startDate, endDate)}/>)}}                   
                >
                enter
                </Button>

            </ButtonStrip>
        </div>

            
            {clicked && <div>{clicked}</div>}

        </div>

    )

}

function update(_ref) {
    console.log(_ref)
    console.log(document.getElementsByName(_ref.name)[0])
    document.getElementsByName(_ref.name)[0]._valueTracker.setValue(_ref.value)
    //console.log(document.getElementsByName(_ref.name)[0])
}

function check_timeframe(d1, d2) {
    let date1 = new Date(d1)
    let date2= new Date(d2)
    console.log(date1);
    console.log(date2);
    //Get 1 day in milliseconds
    var one_day=1000*60*60*24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    return Math.round(difference_ms/one_day); 
    
  }


function gen_date(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0]
}

export {WorkLoadMain}