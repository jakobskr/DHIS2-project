import React, {useState, useEffect} from "react"
import { useConfig, useDataQuery } from '@dhis2/app-runtime'
import { Menu, MenuItem, Divider , Box, Table, TableBody, TableCell, TableRow,TableHead, TableCellHead, TableRowHead} from '@dhis2/ui'
import styles from './App.module.css'
import { WorkLoadData } from "./WorkLoadData"
import { CompletedData } from "./CompletedData"
import { WorkLoad } from "./WorkLoad"


const program_stages = {
    "LpWNjNGvCO5": "Clinical examination and diagnosis",
    "oqsk2Jv4k3s": "Health status",
    "sAV9jAajr8x": "Follow-up",
    "cMEGZf48YkC": "Lab Results",
    "dDHkBd3X8Ce": "Lab Results",
}

const today = gen_date(0);
const next_week = gen_date(7);
//console.log(today)

const eventQuery = {
    program: {
        resource: "events",
        params: {
            orgUnit: "FdM1UhBUx5y",
            program: "uYjxkTbwRNf",
            ouMode: "SELECTED",
            status: "OVERDUE",
            order:"dueDate:ASC"
            //Rakkestad, Viken kommune
        },

    },

    contacts: {
        resource: "events",
        params: {
            orgUnit: "FdM1UhBUx5y",
            program: "DM9n1bUw8W8",
            ouMode: "SELECTED",
            status: "OVERDUE",
            order:"dueDate:ASC"

            //Rakkestad, Viken kommune
        },

    }
}




const Overdue = (props) => {

    const { error, loading, data, refetch } = useDataQuery(eventQuery)

    const [clicked, setClicked] = useState(<p>Select a timeframe to generate an overview of future workload</p>)

    if (error) {
        return <p>Error</p>
    }
    if (loading) {
        return <p>fetching overdue events</p>
    }

    //{console.log(data)}

    if(!data.program.events) {
        return <p>No overdue events found!</p>
    }
        return (


            <div>

                <h3>Overdue events</h3>
                <Table className={styles.table} key={props.start+""+props.end} >
                <TableHead>
                    <TableRowHead>
                        <TableCellHead className={styles.cell}>
                            Due date
                        </TableCellHead>

                        <TableCellHead className={styles.cell}>
                            Event name
                        </TableCellHead>

                        <TableCellHead className={styles.cell}>
                            First Name
                        </TableCellHead>

                        <TableCellHead className={styles.cell}>
                            Surname
                        </TableCellHead>

                        <TableCellHead className={styles.cell}>
                            dob
                        </TableCellHead>

                        <TableCellHead className={styles.cell}>
                            details
                        </TableCellHead>

                    </TableRowHead>
                </TableHead>

                <TableBody>

                {data.program.events.map((entity) => {
                    return <WorkLoadData event={entity}/>
                })}

                {data.contacts.events.map((entity) => {
                    return <WorkLoadData event={entity}/>
                })}



                </TableBody>

            </Table>
            </div>



            )

}

function fetch_data() {

}

const Details = props => {
    const {baseUrl} = useConfig()
    const entity = props
    //console.log(baseUrl)
    const moreDetailsURL = baseUrl + "/dhis-web-tracker-capture/index.html#/dashboard?tei=" +
                            entity.trackedEntityInstance + "&program=" + entity.program + "&ou=" + entity.orgUnit
    console.log(entity)
    //console.log(moreDetailsURL)
    //Link seems to work when pressing it in the console page but when using the more details link in page, it redirects to dashboard incorrectly.
    return moreDetailsURL
}

function gen_date(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0]
  }

function getAttribute(attributes , prop) {
    //Uses displayName to find value
    for (let index = 0; index < attributes.length; index++) {
        const element = attributes[index];
        if(element.displayName == prop) {
            return element.value}
    }

}
export { Overdue }