import React, {useState} from 'react'
import { DataQuery } from '@dhis2/app-runtime'
import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import classes from './App.module.css'
import { Menu, MenuItem, MenuSectionHeader } from '@dhis2/ui'
import ProgramList from './hard_requirements/ProgramList.js'

const query = {
    me: {
        resource: 'me',
    },
}

const newQuery = {
    program: {
      resource: "trackedEntityInstances",
      params: {
          ou: "FdM1UhBUx5y",

        },
        
    }
}
  

const MyApp = () => {

    
    
    const { error, loading, data } = useDataQuery(newQuery)

    if (error) {
        return <p>Error</p>
    }

    if (loading) {
        return <p>Loading</p>
    } 

    if(data) {
        console.log(data.program.trackedEntityInstances)
        console.log(data.program)
        data.program.trackedEntityInstances.forEach(element => {
            console.log()
        });
    
    
    }
    
    return (<div className={classes.container}>

       <MenuSectionHeader label={i18n.t('Menu')} />
       <Menu>
       {data.program.trackedEntityInstances.map(element => {
                console.log(element)
            

                let a = element.trackedEntityInstance
                console.log(a)
                console.log(element.attributes)
                let lab = getAttribute(element.attributes,"sB1IHYu2xQT")+ " " + getAttribute(element.attributes, "ENRjVGxVL6l")
                return ( 
                    <MenuItem 
                        label={lab}
                        key={a}
                    />)})}
        </Menu>
        <p>hepla mega</p>
    </div>)
}

export default MyApp


function getAttribute(attributes ,id) {
    
    for (let index = 0; index < attributes.length; index++) {
        const element = attributes[index];
        if(element.attribute == id) {
            console.log("true")
            return element.value}
    }
    
    return "nanashi"
}
