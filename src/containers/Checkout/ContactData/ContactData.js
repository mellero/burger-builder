import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import axiosStatement from '../../../axiosOrders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { submitOrder } from '../../../store/actions/index';
import { updateObject, orderFormInit, checkValidation } from '../../../utilities/utilities';


class ContactData extends Component {
    state = {
        orderForm: {
                name: orderFormInit("input", "text", "Name", "", { 
                    required: true,
                    minLength: 2,
                    maxLength: 10 
                }),
                street: orderFormInit("input", "text", "Billing Address", "", { required: true } ),
                postalCode: orderFormInit("input", "text", "Postal Code", "", { 
                    required: true,
                    minLength: 6
                }),
                country: orderFormInit("input", "text", "Country", "", { required: true } ),
                email: orderFormInit("input", "email", "Email", "", { required: true })
        },
        isValid: false
    };

    submitOrderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let elmtId in this.state.orderForm) {
            formData[elmtId] = this.state.orderForm[elmtId].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderSubmit(order, this.props.token);
        this.props.history.push("/");
    }

    inputChangedHandler = (event, elmtId) => {
        const updatedElement = updateObject(this.state.orderForm[elmtId], {
            value: event.target.value,
            modified: true,
            valid: checkValidation(event.target.value, this.state.orderForm[elmtId].validation)
        })
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [elmtId]: updatedElement
        })
        this.setState({ orderForm: updatedOrderForm })
    }

    render() {
        const formInputs = [];
        let isFormValid = true;
        for (let key in this.state.orderForm) {
            formInputs.push({
                id: key,
                config: this.state.orderForm[key]
            });
            if (this.state.orderForm[key].valid === false) isFormValid = false;
        }

        let form = (
            <form onSubmit={this.submitOrderHandler}>
                {formInputs.map(el => (
                    <Input 
                        key={el.id}
                        onChange={null}
                        elementType={el.config.elementType} 
                        elementConfig={el.config.elementConfig} 
                        value={el.config.value} 
                        invalid={!el.config.valid}
                        modified={el.config.modified}
                        changed={(event) => this.inputChangedHandler(event, el.id)} />
                ))}
                <Button btnType="Success" disabled={!isFormValid}>Order Now</Button>
            </form>
        );
        if (this.props.loading) form = <Spinner />;

        return (
            <div className={classes.ContactData}>
                <h4>Please enter contact information</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.orders.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderSubmit: (orderData, token) => dispatch(submitOrder(orderData, token)) 
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axiosStatement));