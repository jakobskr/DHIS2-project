import React , {useState} from "react"
import { useConfig, useDataQuery } from '@dhis2/app-runtime'
import { Menu, MenuItem, Divider , Box, Table, TableBody, TableCell, TableRow,TableHead, TableCellHead, TableRowHead} from '@dhis2/ui'
import styles from './App.module.css'

const Query = {
    program: {
        resource: "trackedEntityInstances",
        params: ({id}) =>( {
          ou: "FdM1UhBUx5y",
          fields:["*"],
            trackedEntityInstance: id,

          //Rakkestad, Viken kommune
        }),
        
    }
}


const CaseTable = (prop) => {
    const entity = prop.entity
    const ent = entity.trackedEntityInstance

    const from = prop.from.trackedEntityInstance == prop.entity.to.trackedEntityInstance.trackedEntityInstance ? prop.entity.from.trackedEntityInstance.trackedEntityInstance: prop.entity.to.trackedEntityInstance.trackedEntityInstance


    const { error, loading, data, refetch } = useDataQuery(Query, {
        variables: {
            id: from,
        },
    })

    const [clicked, setClicked] = useState(<p>Select a timeframe to generate an overview of future workload</p>)

    if (error) {
        return <TableRow><TableCell colSpan="5">error</TableCell></TableRow>
    }
    if (loading) {
        return <TableRow><TableCell colSpan="5">loading</TableCell></TableRow>
    }
    
    let contact = data.program.trackedEntityInstances[0]

    return (
        <TableRow key={entity.trackedEntityInstance}>
            <TableCell className={styles.cell2}> {getAttribute(contact.attributes, "First Name")} </TableCell>
            <TableCell className={styles.cell2}> {getAttribute(contact.attributes, "Surname")}</TableCell>
            <TableCell className={styles.cell2}> {getAttribute(contact.attributes, "Telephone (local)")}</TableCell>            
            <TableCell className={styles.cell2}> {prop.entity.relationshipName}</TableCell>            
            
            <TableCell className={styles.cell2}> <a href={Details(contact)} target="_blank">Details</a> </TableCell>
        </TableRow>
        )
            
}

const Details = props => {
    const {baseUrl} = useConfig()
    const entity = props
    //console.log(baseUrl)
    const moreDetailsURL = baseUrl + "/dhis-web-tracker-capture/index.html#/dashboard?tei=" +
                            entity.trackedEntityInstance + "&program=" + entity.programOwners[0].program + "&ou=" + entity.orgUnit 
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
export { CaseTable }
