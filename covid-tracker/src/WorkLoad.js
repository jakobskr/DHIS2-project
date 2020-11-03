import React, {useState, useEffect} from "react"
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

const today = gen_date(0);
const next_week = gen_date(7);
console.log(today)

const eventQuery = {
    program: {
        resource: "events/eventRows",
        params: ({start, end}) => ({
            orgUnit: "FdM1UhBUx5y",
            program: "uYjxkTbwRNf",
            ouMode: "SELECTED",
            programStatus: "ACTIVE",
            eventStatus: "SCHEDULE",
            startDate: start,
            endDate: end,

            //Rakkestad, Viken kommune
        }),
        
    }
}




const WorkLoad = (props) => {
    console.log(props.start + " " + props.end)

    const { error, loading, data, refetch } = useDataQuery(eventQuery, {
        variables: {
            start: props.start,
            end: props.end,
        },
    })

    useEffect(() => {
        refetch({
            start: props.start,
            end: props.end,
        })
    }, [props.end, props.start])


    const [clicked, setClicked] = useState(undefined)

    if (error) {
        return <p>Error</p>
    }
    if (loading) {
        return <p>Loading</p>
    }

    {console.log(data)}

    if(!data.program.eventRows) {
        return <p>No events found between {props.start} and {props.end}</p>
    }
        
        return (            


            <div>

                <h3>Workload for the next {props.timeframe} days</h3>
                <Table className={styles.table} key={props.start+""+props.end} > 
                <TableHead>
                    <TableRowHead>
                        <TableCellHead className={styles.cell}>
                            Due date 
                        </TableCellHead>

                        <TableCellHead className={styles.cell}>
                            First Name 
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
                                
                {data.program.eventRows.map((entity) => {
                    console.log(entity)
                    return (
                        <TableRow key={entity.event+props.end+props.start}>
                            <TableCell>
                                {entity.dueDate}
                            </TableCell>

                            <TableCell>
                                {program_stages[entity.programStage]}
                            </TableCell>

                            <TableCell>
                                {getAttribute(entity.attributes, "Fornavn")}
                            </TableCell>
                            <TableCell>
                                {getAttribute(entity.attributes, "Etternavn")}
                            </TableCell>
                            <TableCell>
                                {getAttribute(entity.attributes, "Fødselsdato")}
                            </TableCell>

                            <TableCell>
                                <a href={Details(entity)} target="_blank">Details</a>
                            </TableCell>
                        </TableRow>
                    )
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
export { WorkLoad }
