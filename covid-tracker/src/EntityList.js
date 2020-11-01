import React, {useState} from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import { Menu, MenuItem, MenuSectionHeader } from '@dhis2/ui'
import styles from './App.module.css'
import i18n from '@dhis2/d2-i18n'

const entityQuery = {
    program: {
      resource: "trackedEntityInstances",
      params: {
          ou: "FdM1UhBUx5y",
          fields: ["*"]  
          //Rakkestad, Viken kommune
        },
        
    }
}

const EntityList = () => {
    const { error, loading, data } = useDataQuery(entityQuery)
    const [entityObj, showDetails] = useState(-1)

    if (error) {
        return <p>Error</p>
    }

    if (loading) {
        return <p>Loading</p>
    } 
    
    const entities = data.program.trackedEntityInstances
    return(
        <div className={styles.container}>
            <div id='left-col'>
                <MenuSectionHeader label={i18n.t('EntityList')} />
                <Menu>
                    {entities.map(entity => {
                        const name = getAttribute(entity.attributes,"First Name")+ " " + getAttribute(entity.attributes, "Surname")
                        return ( 
                            <MenuItem 
                                key={entity.trackedEntityInstance}
                                label={name}
                                onClick={() => showDetails(entity)}
                            />
                        )})
                    }
                </Menu>
            </div>
            <div id='right-col'>
                {entityObj != -1 && <Details entity={entityObj}/>}
            </div>

        </div>
    )
} 

const Details = props => {

    const entity = props.entity
    const moreDetailsURL = "https://course.dhis2.org/hmis/dhis-web-tracker-capture/index.html#/dashboard?tei=" +
                            entity.trackedEntityInstance + "&program=DM9n1bUw8W8&ou=" + entity.orgUnit 
    console.log(entity)
    console.log(moreDetailsURL)
    //Link seems to work when pressing it in the console page but when using the more details link in page, it redirects to dashboard incorrectly. 
    return(
        <div>
            <p><b>Last Name:</b> {getAttribute(entity.attributes, "Surname")}</p>
            <p><b>First Name:</b> {getAttribute(entity.attributes,"First Name")}</p>
            <p><b>Sex:</b> {getAttribute(entity.attributes, "Sex")}</p>
            <p><b>Date of Birth:</b> {getAttribute(entity.attributes, "Date of birth")}</p>
            <p><a href={moreDetailsURL} target="_blank"> more details</a> </p>
        </div>
        

    )
}

function getAttribute(attributes , prop) {
    //Uses displayName to find value
    for (let index = 0; index < attributes.length; index++) {
        const element = attributes[index];
        if(element.displayName == prop) {
            return element.value}
    }
    
}
export { EntityList }