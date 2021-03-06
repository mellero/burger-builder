import React, { Component, Fragment } from 'react';
import axiosInstance from '../../axiosOrders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitializeIngredients();
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelledHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push({
            pathname: "/checkout",
        });
    };

    render() {
        const disabledIng = {
            ...this.props.ingredients
        }
        for (let k in disabledIng) {
            disabledIng[k] = (disabledIng[k] <= 0)
        }

        let purchasable = false;
        for (let a in this.props.ingredients) {
            if (this.props.ingredients[a]) {
                purchasable = true;
                break;
            }
        }
        
        let orderSummary = <Spinner />;
        let burgerLoaded = this.props.error ? 
            <p style={{textAlign: "center"}}>Ingredients failed to load.</p> 
            : <Spinner />;

        if (this.props.ingredients) {
            orderSummary = 
                <OrderSummary 
                    ingredients={this.props.ingredients} 
                    price={this.props.price}
                    cancel={this.purchaseCancelledHandler}
                    continue={this.purchaseContinueHandler}/>;
            burgerLoaded = 
                <Fragment>
                    <Burger ingredients={this.props.ingredients}/> 
                    <BuildControls
                        price={this.props.price} 
                        purchasable={purchasable}
                        purchasing={this.purchaseHandler}
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onRemoveIngredient} 
                        disabled={disabledIng}/>
                </Fragment>;        
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelledHandler}>
                    {orderSummary}
                </Modal>
                {burgerLoaded}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredient) => dispatch(actions.onAddIngredient(ingredient)),
        onRemoveIngredient: (ingredient) => dispatch(actions.onRemoveIngredient(ingredient)),
        onInitializeIngredients: () => dispatch(actions.initializeIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosInstance));