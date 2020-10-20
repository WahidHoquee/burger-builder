import React from 'react';

import classes from './NavigationItems.css';

import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact active>Buger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}        
        {props.isAuthenticated ? <NavigationItem link="/logout">Log Out</NavigationItem> : <NavigationItem link="/auth">Authenticate</NavigationItem>}
    </ul>
)

export default NavigationItems;