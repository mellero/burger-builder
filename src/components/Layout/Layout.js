import React, { Component, Fragment } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    
    sideDrawerExitHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState(prevState => (
            {showSideDrawer: !prevState.showSideDrawer}
        ));
    }

    render() {
        return (
          <Fragment>
            <Toolbar drawerToggle={this.sideDrawerToggleHandler}/>
            <SideDrawer show={this.state.showSideDrawer} exit={this.sideDrawerExitHandler}/>
            <main className={classes.Content}>{this.props.children}</main>
          </Fragment>
        );
    }
}

export default Layout;