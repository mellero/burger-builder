import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Hamburger from '../SideDrawer/Hamburger/Hamburger';

const toolbar = ( props ) => (
    <header className={classes.Toolbar}>
        <Hamburger clicked={props.drawerToggle} />
        <div className={classes.Logo}><Logo /></div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;