import React,{useState} from 'react'
import { useConfig, useDataQuery } from '@dhis2/app-runtime'
import {Checkbox, Menu, MenuItem, Divider , Box, Table, TableBody, TableCell, TableRow,TableHead, TableCellHead, TableRowHead} from '@dhis2/ui'
import styles from './App.module.css'
import { EntityList } from './EntityList'
import {CaseTable} from './CaseTable'

const query = {
    programs: {
        resource: 'programs',
        params: {
            paging: 'false',

            fields: ['id', 'name' , 'created'],
        },
    },
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
            fields:["*"]
  
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
const NewEntityList = () => {
    const { error, loading, data } = useDataQuery(entityQuery)
    const [clicked, setClicked] = useState(undefined)
    const [indexChecked, setIndexChecked] = useState(false)
    const [contactChecked, setContactChecked] = useState(false)
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
        <div>

            <div className={styles.filterbox}>
                <Checkbox
                    label="Index Cases"
                    name="indC"
                    checked={indexChecked}
                    //value={indexChecked}
                    
                    onChange={(_ref) => { console.log(_ref)
                        console.log(document.getElementsByName("indC"))
                        setIndexChecked(!indexChecked)

                        if(contactChecked) {
                            setContactChecked(false)
                        }
                        console.log("testing")}}
                    disbaled="false">
                </Checkbox>

                <Checkbox
                    checked={contactChecked}
                    label="Contact Cases"
                    name="conC"
                    value="default"
                    onChange={(_ref) => { console.log(_ref)
                        console.log(document.getElementsByName("indC"))
                        setContactChecked(!contactChecked)

                        if(indexChecked) {
                            setIndexChecked(false)
                        }

                        console.log("testing")}}                    >
                </Checkbox>

            </div>

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
                            Due date 
                        </TableCellHead>

                        <TableCellHead className={styles.cell}>
                            Details
                        </TableCellHead>
                    </TableRowHead>
                </TableHead>

                <TableBody>
                
                {

                    
                }
                {data.index.trackedEntityInstances.map((entity) => {
                    //console.log(entity)
                    return <CaseTable prop = {entity}/>
                })}    

                
                {data.contact.trackedEntityInstances.map((entity) => {
                    //console.log(entity)
                    return <CaseTable prop = {entity}/>
                })}
                             
                

                </TableBody>

            </Table>

        </div>
    )
}

const Details = props => {
    const {baseUrl} = useConfig()
    const entity = props
    //console.log(baseUrl)
    const moreDetailsURL = baseUrl + "/dhis-web-tracker-capture/index.html#/dashboard?tei=" +
                            entity.trackedEntityInstance + "&program=" + "&ou=" + entity.orgUnit 
    console.log(entity)
    //console.log(moreDetailsURL)
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

function moredata (prop)  {
    const ent = prop.trackedEntityInstance
    const {attrierror, attriloading, attdata} = useDataQuery(attributeQuery, { 
        variables:  {
        id : {ent},
        }})

    if(attrierror) {
        console.log("error for " + ent)
    }

    else if (attriloading) {
        console.log("loading for " + ent)
    }
    console.log(attdata)
}


export { NewEntityList }