import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = ( props ) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {props.isLoggedIn ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
            {props.isLoggedIn ?
                <NavigationItem link="/logout">Logout</NavigationItem> 
                : <NavigationItem link="/auth">Login/Sign Up</NavigationItem>}
        </ul>
    )
}

export default navigationItems;