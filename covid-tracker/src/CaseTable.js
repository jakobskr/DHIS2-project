import React from "react"
import { useConfig, useDataQuery } from '@dhis2/app-runtime'
import { Menu, MenuItem, Divider , Box, Table, TableBody, TableCell, TableRow,TableHead, TableCellHead, TableRowHead} from '@dhis2/ui'
import styles from './App.module.css'

const attributeQuery = {
    program: {
        resource: "trackedEntityAttributes",
        params: {
          ou: "FdM1UhBUx5y",
          //Rakkestad, Viken kommune
        },
        trackedEntity: ({id}) => trackedEntity,
        
    }
}

const CaseTable = (prop) => {
        const entity = prop.prop
        const ent = entity.trackedEntityInstance
        
        
        return (
            <TableRow key={entity.trackedEntityInstance}>
                <TableCell className={styles.cell}> {getAttribute(entity.attributes, "First Name")} </TableCell>
                <TableCell className={styles.cell}> {getAttribute(entity.attributes, "Surname")} </TableCell>
                <TableCell className={styles.cell}> {getAttribute(entity.attributes, "Telephone (local)")} </TableCell>
                <TableCell className={styles.cell}> {getAttribute(entity.attributes, "Date of birth")} </TableCell>
                <TableCell className={styles.cell}> {entity.programOwners[0].program == "uYjxkTbwRNf" ? "Index case" : "Contact case" } </TableCell>
                <TableCell className={styles.cell}> Unknown </TableCell>
                <TableCell className={styles.cell}> due date </TableCell>
                <TableCell className={styles.cell}> <a href={Details(entity)} target="_blank">Details</a></TableCell>
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
