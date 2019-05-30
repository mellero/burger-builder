import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { authCheckState } from './store/actions'

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoLogin()
  }

  render() {
    let routes = (
      <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
      </Switch>
    )

    if (this.props.isLoggedIn) {
      routes = (
        <Switch>
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <Fragment>
        <Layout>
          {routes}
        </Layout>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
