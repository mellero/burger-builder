import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


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
            <Toolbar 
                isLoggedIn={this.props.isLoggedIn}
                drawerToggle={this.sideDrawerToggleHandler}/>
            <SideDrawer 
                isLoggedIn={this.props.isLoggedIn}
                show={this.state.showSideDrawer} 
                exit={this.sideDrawerExitHandler}/>
            <main className={classes.Content}>{this.props.children}</main>
          </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout);