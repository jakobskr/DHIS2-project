import React, {useState} from "react"
import { useConfig, useDataQuery } from '@dhis2/app-runtime'
import { Menu, MenuItem, Divider , Box, Table, TableBody, TableCell, TableRow,TableHead, TableCellHead, TableRowHead} from '@dhis2/ui'
import styles from './App.module.css'


const program_stages = {
    "LpWNjNGvCO5": "Clinical examination and diagnosis",
    "oqsk2Jv4k3s": "Health status",
    "sAV9jAajr8x": "Follow-up",
    "cMEGZf48YkC": "Lab Results",
    "dDHkBd3X8Ce": "Lab Results",
}

const query = {
    program: {
        resource: "trackedEntityInstances",
        params: ({tei, program}) => ({
            ou: "FdM1UhBUx5y",
            program: program,
            trackedEntityInstance: tei,
            fields: ["*"]
            //Rakkestad, Viken kommune
        }),
    
    }
} 




const WorkLoadData = (event) => {
    //console.log(event.event)

    const { error, loading, data } = useDataQuery(query, {
        variables: {
            tei: event.event.trackedEntityInstance,
            program: event.event.program,
        },
    })
    const [clicked, setClicked] = useState(undefined)

    if (error) {
        return <TableRow><TableCell colSpan="7">error</TableCell></TableRow>
    }
    if (loading) {
        return <TableRow><TableCell colSpan="7">loading</TableCell></TableRow>
    }


    const entity = data.program.trackedEntityInstances[0]
    return (
        <TableRow key={event.event.event}>
                            <TableCell>
                                {event.event.dueDate}
                            </TableCell>

                            <TableCell>
                                {program_stages[event.event.programStage]}
                            </TableCell>

                            <TableCell>
                                {getAttribute(entity.attributes, "First Name")}
                            </TableCell>
                            <TableCell>
                                {getAttribute(entity.attributes, "Surname")}
                            </TableCell>
                            <TableCell>
                                {getAttribute(entity.attributes, "Date of birth")}
                            </TableCell>

                            <TableCell>
                                <a href={Details(event.event)} target="_blank">Details</a>
                            </TableCell>
    </TableRow>
    )
}

const Details = props => {
    const {baseUrl} = useConfig()
    const entity = props
    const moreDetailsURL = baseUrl + "/dhis-web-tracker-capture/index.html#/dashboard?tei=" +
                            entity.trackedEntityInstance + "&program=" + entity.program + "&ou=" + entity.orgUnit 
    //onsole.log(entity)
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

export {WorkLoadData}