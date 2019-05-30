import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import axiosStatement from '../../../axiosOrders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { submitOrder } from '../../../store/actions/index';


class ContactData extends Component {
    state = {
        orderForm: {
                name: this.orderFormInit("input", "text", "Name", "", { 
                    required: true,
                    minLength: 2,
                    maxLength: 10 
                }),
                street: this.orderFormInit("input", "text", "Billing Address", "", { required: true } ),
                postalCode: this.orderFormInit("input", "text", "Postal Code", "", { 
                    required: true,
                    minLength: 6
                }),
                country: this.orderFormInit("input", "text", "Country", "", { required: true } ),
                email: this.orderFormInit("input", "email", "Email", "", { required: true })
        },
        isValid: false
    };

    orderFormInit(emType, inType, placeholder, value, validation) {
        return {
            elementType: emType,
            elementConfig: {
                type: inType,
                placeholder: placeholder
            },
            modified: false,
            value: value,
            validation: validation,
            valid: false
        }
    }

    checkValidation(value, rules) {
        if (rules.required && value.trim() === "" ) {
            return false;
        }

        if (rules.minLength && value.length < rules.minLength) {
            return false;
        }

        if (rules.maxLength && value.length > rules.maxLength) {
            return false;
        }

        return true;
    }

    submitOrderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let elmtId in this.state.orderForm) {
            formData[elmtId] = this.state.orderForm[elmtId].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }

        this.props.onOrderSubmit(order);
        this.props.history.push("/");
    }

    inputChangedHandler = (event, elmtId) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedElement = {
            ...updatedOrderForm[elmtId]
        }
        updatedElement.value = event.target.value;
        updatedElement.modified = true;
        updatedElement.valid = this.checkValidation(updatedElement.value, updatedElement.validation);

        updatedOrderForm[elmtId] = updatedElement;
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
        loading: state.orders.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderSubmit: (orderData) => dispatch(submitOrder(orderData)) 
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axiosStatement));