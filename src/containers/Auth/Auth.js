import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import { authenticate } from '../../store/actions';

class Auth extends Component {
    state = {
        controls: {
            email: this.orderFormInit("input", "email", "email", "", {
                    required: true,
                    isEmail: true 
                }),
            password: this.orderFormInit("input", "password", "password", "", {
                    required: true,
                    minLength: 7 
                }),
        },
        isNewUser: true
    }

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

    inputChangedHandler = (event, elmtId) => {
        const updatedControls = {
            ...this.state.controls,
            [elmtId]: {
                ...this.state.controls[elmtId],
                value: event.target.value,
                modified: true,
                valid: this.checkValidation(event.target.value, this.state.controls[elmtId].validation)       
            }
        }
        this.setState({ controls: updatedControls })

    }

    submitHandler = (event) => {
        event.preventDefault();

        this.props.onAuthenticate(
            this.state.controls.email.value, this.state.controls.password.value, this.state.isNewUser
        )
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => ({
            isNewUser: !prevState.isNewUser
        }))
    }

    render() {
        const formInputs = [];
        let isFormValid = true;
        for (let key in this.state.controls) {
            formInputs.push({
                id: key,
                config: this.state.controls[key]
            });
            if (this.state.controls[key].valid === false) isFormValid = false;
        }

        const form = formInputs.map(el => (
            <Input
                key={el.id}
                onChange={null}
                elementType={el.config.elementType} 
                elementConfig={el.config.elementConfig} 
                value={el.config.value} 
                invalid={!el.config.valid}
                modified={el.config.modified}
                changed={(event) => this.inputChangedHandler(event, el.id)} />
        ));

        let section = <Spinner />;
        if (!this.props.loading) {
            section = (
                <section>
                    <form onSubmit={this.submitHandler}>
                        {form}
                        <Button btnType="Success">SUBMIT</Button>
                    </form>
                    <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
                        {this.state.isNewUser ? "Switch to LOGIN" : "Switch to SIGN UP"}
                    </Button>
                </section>
            )
        }
            
        if (this.props.isLoggedIn) {
            return this.props.hasIngredients 
                ? <Redirect to="/checkout" />
                : <Redirect to="/" />
        }

        return (
            <div className={classes.Auth}>

                <h4>{this.state.isNewUser ? "SIGN UP" : "LOGIN"}</h4>
                {this.props.error ? <p>{this.props.error.message}</p> : null}
                {section}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: !!state.auth.token,
        hasIngredients: !!state.burgerBuilder.building,
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate: (email, pass, isNewUser) => dispatch(authenticate(email, pass, isNewUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);