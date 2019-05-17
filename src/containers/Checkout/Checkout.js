import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        if(this.props) {
            if (this.props.location) {
                if (this.props.location.state) {
                    console.log("IN CONS: ", this.props.location)
                    this.state = this.props.location.state;
                    return;
                }
            }
        }
        this.state = {
            ingredients: null,
            totalPrice: null
        }
        console.log("IN CONS ELSE: ", this.props.location.state)

    }

    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    }

    continueCheckoutHandler = () => {
        this.props.history.replace("/checkout/contact");
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state ? this.state.ingredients : null} 
                    cancel={this.cancelCheckoutHandler}
                    continue={this.continueCheckoutHandler} />
                {this.state.ingredients ?
                    <Route 
                        path={this.props.match.path + "/contact"} 
                        render={
                            (props) => (
                                <ContactData 
                                    ingredients={this.state.ingredients} 
                                    price={this.state.price} 
                                    {...props} />
                            )
                        } 
                    /> : null}
            </div>
        );
    }
}

export default Checkout;