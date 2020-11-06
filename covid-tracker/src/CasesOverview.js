import React,{useState} from 'react'
import { useConfig, useDataQuery } from '@dhis2/app-runtime'
import {Button, Checkbox, Menu, MenuItem, Divider , Box, Table, TableBody, TableCell, TableRow,TableHead, TableCellHead, TableRowHead} from '@dhis2/ui'
import styles from './App.module.css'
import { EntityList } from './EntityList'
import {CaseTable} from './CaseTable'
import {NewEntityList} from "./NewEntityList"

const program_stages = {
    "LpWNjNGvCO5": "Clinical examination and diagnosis",
    "oqsk2Jv4k3s": "Health status",
    "sAV9jAajr8x": "Follow-up",
    "cMEGZf48YkC": "Lab Results",
    "dDHkBd3X8Ce": "Lab Results",
}

const entityQuery = {
    contact: {
      resource: "trackedEntityInstances",
      params: {
          ou: "FdM1UhBUx5y",
          //Rakkestad, Viken kommune
          program: "DM9n1bUw8W8",
          fields:["*"],
          //dueDate: "2020-11-06"
        
        },
    },

    index: {
        resource: "trackedEntityInstances",
        params: {
            ou: "FdM1UhBUx5y",
            //Rakkestad, Viken kommune
            program: "uYjxkTbwRNf",
            fields:["*"],
  
          },
      }
}


const attributeQuery = {
    program: {
        resource: "trackedEntityInstances",
        params: {
          ou: "FdM1UhBUx5y",
          fields: ["*"]  
          //Rakkestad, Viken kommune
        },
        id: ({id}) => id,
        
    }
}

const CasesOverview = () => {
    const { error, loading, data } = useDataQuery(entityQuery)
    const [clicked, setClicked] = useState(undefined)
    const [indexChecked, setIndexChecked] = useState(false)
    const [contactChecked, setContactChecked] = useState(false)
    const [contactsClicked, setContactsClicked] = useState(undefined)

    let a = false
    if (error) {
        return <p>Error</p>
    }
    if (loading) {
        return <p>Loading</p>
    }
    let unique_id = "undefined"
    //const 
    return (
        <div className={styles.mainList}>
            <h2>Overview of all tracked cases</h2>
            <div className={styles.filterBox}>
                <h4>Filter</h4>

                <Checkbox
                    className={styles.checkBox}
                    label="Index Cases"
                    name="indC"
                    checked={indexChecked}
                    //value={indexChecked}
                    
                    onChange={(_ref) => { 
                        setIndexChecked(!indexChecked)

                        if(contactChecked) {
                            setContactChecked(false)
                        }
                        setContactsClicked(undefined)

                        }}
                    disbaled="false">
                </Checkbox>

                <Checkbox
                    className={styles.checkBox}

                    checked={contactChecked}
                    label="Contact Cases"
                    name="conC"
                    value="default"
                    onChange={(_ref) => { 
                        setContactChecked(!contactChecked)
                        setContactsClicked(undefined)
                        if(indexChecked) {
                            setIndexChecked(false)
                        }

                        }}                    >
                </Checkbox>

            </div>

        <div className={styles.tables}>
            <Table className={styles.table}>
                <TableHead>
                    <TableRowHead>
                        <TableCellHead className={styles.cell}>
                            First Name 
                        </TableCellHead>

                        <TableCellHead className={styles.cell}>
                            Surname 
                        </TableCellHead>

                        <TableCellHead className={styles.cell}>
                            Phone Number 
                        </TableCellHead>

                        <TableCellHead className={styles.cell}>
                            dob 
                        </TableCellHead>

                        <TableCellHead className={styles.cell}>
                            Program 
                        </TableCellHead>

                        <TableCellHead className={styles.cell}>
                            Program Stage 
                        </TableCellHead>

                        <TableCellHead className={styles.cell}>
                            Due Date 
                        </TableCellHead>

                        <TableCellHead className={styles.cell}>
                            Number of Contacts 
                        </TableCellHead>

                        <TableCellHead className={styles.cell}>
                            Contacts 
                        </TableCellHead>

                        <TableCellHead className={styles.cell}>
                            Details
                        </TableCellHead>
                    </TableRowHead>
                </TableHead>

                <TableBody>
                
                {(indexChecked || !contactChecked) && data.index.trackedEntityInstances.map((entity) => {
                    return render_cases(entity, setContactsClicked)
                })}    

                
                {(!indexChecked || contactChecked) && data.contact.trackedEntityInstances.map((entity) => {
                    return render_cases(entity, setContactsClicked)
                })}
                </TableBody>
            </Table>

            {            <h3>Details</h3>    &&
            contactsClicked && <div className={styles.details}>{contactsClicked}</div>}
            </div>
        </div>
    )
}

const Details = props => {
    const {baseUrl} = useConfig()
    const entity = props
    const moreDetailsURL = baseUrl + "/dhis-web-tracker-capture/index.html#/dashboard?tei=" +
                            entity.trackedEntityInstance + "&program=" + entity.programOwners[0].program + "&ou=" + entity.orgUnit 
    //Link seems to work when pressing it in the console page but when using the more details link in page, it redirects to dashboard incorrectly. 
    return moreDetailsURL
}

function getAttribute(attributes , prop) {
    //Uses displayName to find value
    for (let index = 0; index < attributes.length; index++) {
        const element = attributes[index];
        if(element.displayName == prop) {
            return element.value}
    }
    
}

function dueDay(entity) {
    //console.log(entity)

    for (let index = 0; index < entity.enrollments[0].events.length; index++) {
        const element = entity.enrollments[0].events[index];
        let dueDate = element.dueDate
        let realdueDate = dueDate.substring(0,10)
        if (element.status != "COMPLETED") {
            return [program_stages[element.programStage], element.dueDate]
        }
    }

    return ["COMPLETED", "COMPLETED"]
} 

function render_cases(entity, func) {

        let event_info = dueDay(entity)        
        return (
            <TableRow key={entity.trackedEntityInstance}>
                <TableCell className={styles.cell}> {getAttribute(entity.attributes, "First Name")} </TableCell>
                <TableCell className={styles.cell}> {getAttribute(entity.attributes, "Surname")} </TableCell>
                <TableCell className={styles.cell}> {getAttribute(entity.attributes, "Telephone (local)")} </TableCell>
                <TableCell className={styles.cell}> {getAttribute(entity.attributes, "Date of birth")} </TableCell>
                <TableCell className={styles.cell}> {entity.programOwners[0].program == "uYjxkTbwRNf" ? "Index case" : "Contact case" } </TableCell>
                <TableCell className={styles.cell}>  {event_info[0]} </TableCell>
                <TableCell className={styles.cell}>  {event_info[1]} </TableCell>
                <TableCell className={styles.cell}> {entity.relationships.length} </TableCell>
                <TableCell className={styles.cell}> 
                    <Button className={styles.button} dataTest ="dhis2-uicore-button" type ="button"
                        onClick={() => {func(render_contacts(entity.relationships, entity))}}>
                        Show Contacts
                    </Button> </TableCell>

                <TableCell className={styles.cell}> <a href={Details(entity)} target="_blank">Details</a></TableCell>
            </TableRow>
            )
}

function render_contacts(relationships, from) {
    return (
        <Table className={styles.table2}>
                <TableHead>
                    <TableRowHead>
                        <TableCellHead colSpan="5">
                        {getAttribute(from.attributes, "First Name")} {getAttribute(from.attributes, "Surname")}'s contacts
                        </TableCellHead>
                    </TableRowHead>
                    <TableRowHead>
                        <TableCellHead className={styles.cell2}>
                            First Name 
                        </TableCellHead>
                        <TableCellHead className={styles.cell2}>
                            Surname 
                        </TableCellHead>
                        <TableCellHead className={styles.cell2}>
                            Phone Number 
                        </TableCellHead>
                        <TableCellHead className={styles.cell2}>
                            Relationship 
                        </TableCellHead>
                        <TableCellHead className={styles.cell2}>
                            details 
                        </TableCellHead>
                    </TableRowHead>
                </TableHead>

                <TableBody>
                
                {relationships.map((entity) => {   
                    return <CaseTable entity={entity} from={from}/>
                })}                          
                </TableBody>

            </Table>
    )
}



export { CasesOverview }