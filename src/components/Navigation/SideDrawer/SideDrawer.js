import React, { Fragment } from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = ( props ) => {
    const attachedClasses = [classes.SideDrawer, classes.Closed];
    if (props.show) attachedClasses[1] = classes.Open;

    return (
        <Fragment>
            <Backdrop show={props.show} exit={props.exit}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}><Logo /></div>
                <nav>
                    <NavigationItems isLoggedIn={props.isLoggedIn} />
                </nav>
            </div>
        </Fragment>
    );
}

export default sideDrawer;