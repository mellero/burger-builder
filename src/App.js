import React, { Component, Fragment } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Switch, Route } from 'react-router-dom';
import Orders from './containers/Orders/Orders';


class App extends Component {
  render() {
    return (
      <Fragment>
        <Layout>
            <Switch>
              <Route path="/orders" component={Orders} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/" exact component={BurgerBuilder} />
            </Switch>
        </Layout>
      </Fragment>
    );
  }
}

export default App;
