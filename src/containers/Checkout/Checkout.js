import React, { Component, Fragment } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    }

    continueCheckoutHandler = () => {
        this.props.history.replace("/checkout/contact");
    }

    render() {
        const summary = (
            <Fragment>
                <CheckoutSummary 
                    ingredients={this.props.ingredients} 
                    cancel={this.cancelCheckoutHandler}
                    continue={this.continueCheckoutHandler} />
                <Route 
                    path={this.props.match.path + "/contact"} 
                    component={ContactData} />
            </Fragment>
        )
        return (
            <div>
                {this.props.ingredients ? summary : <Redirect to="/" />}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);