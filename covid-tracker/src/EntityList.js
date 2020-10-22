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

        },
        
    }
}

const EntityList = () => {
    const { error, loading, data } = useDataQuery(entityQuery)

    if (error) {
        return <p>Error</p>
    }

    if (loading) {
        return <p>Loading</p>
    } 
    
    const entities = data.program.trackedEntityInstances
    return(
        <div>
            <MenuSectionHeader label={i18n.t('EntityList')} />
            <Menu>
                {entities.map(entity => {
                    console.log('start')
                    console.log(entity)
                    
                    const name = getAttribute(entity.attributes,"First Name")+ " " + getAttribute(entity.attributes, "Surname")
                    return ( 
                        <MenuItem 
                            key={entity.trackedEntityInstance}
                            label={name}
                        />
                    )})
                }
            </Menu>

        </div>
    )
} 

function getAttribute(attributes , prop) {
    //Uses display name to find value
    for (let index = 0; index < attributes.length; index++) {
        const element = attributes[index];
        if(element.displayName == prop) {
            return element.value}
    }
    
}
export { EntityList }