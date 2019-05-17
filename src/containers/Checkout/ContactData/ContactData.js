import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axiosInstance from '../../../axiosOrders';
import Spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends Component {
    state = {
        loading: false,
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: "",
            country: ""
        }
    };

    submitOrderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "M E",
                address: {
                    street: "111 test rd",
                    postalCode: "A1A1A1",
                    country: "Canada"
                },
                email: "test@example.com"
            }
        }
    
        axiosInstance.post("/orders.json", order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push("/")
            })
            .catch(error => {
                this.setState({ loading: false });
                console.log(error)
            });
    }

    render() {
        console.log(this.props)
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="name"></input>
                <input className={classes.Input} type="email" name="email" placeholder="email"></input>
                <input className={classes.Input} type="text" name="street" placeholder="street"></input>
                <input className={classes.Input} type="text" name="postalCode" placeholder="postal code"></input>
                <input className={classes.Input} type="text" name="country" placeholder="country"></input>
                <Button btnType="Success" clicked={this.submitOrderHandler}>Order Now</Button>
            </form>
        );
        if (this.state.loading) form = <Spinner />;

        return (
            <div className={classes.ContactData}>
                <h4>Please enter contact information</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;