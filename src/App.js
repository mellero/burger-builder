import React, { Component, Fragment, Suspense } from 'react';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { authCheckState } from './store/actions'

const Auth = React.lazy(() => import('./containers/Auth/Auth'))
const Orders = React.lazy(() => import('./containers/Orders/Orders'))
const Logout = React.lazy(() => import('./containers/Auth/Logout/Logout'))
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'))

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoLogin()
  }

  LazyLoadComponent = (Component) => {
    return props => (
      <Suspense fallback={<div>Loading...</div>}>
        <Component {...props} />
      </Suspense>
    );
  }

  render() {
    let routes = (
      <Switch>
          <Route path="/auth" component={this.LazyLoadComponent(Auth)} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
      </Switch>
    )

    if (this.props.isLoggedIn) {
      routes = (
        <Switch>
          <Route path="/orders" component={this.LazyLoadComponent(Orders)} />
          <Route path="/logout" component={this.LazyLoadComponent(Logout)} />
          <Route path="/checkout" component={this.LazyLoadComponent(Checkout)} />
          <Route path="/auth" component={this.LazyLoadComponent(Auth)} />
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
