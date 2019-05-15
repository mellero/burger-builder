import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosInstance from '../../axiosOrders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICE_LIST = {
    salad: 0.3,
    bacon: 0.9,
    cheese: 0.7, 
    meat: 1.5
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null, 
        totalPrice: 4,
        purchasable: false,
        purchasing: false, 
        loading: false, 
        error: false
    }

    componentDidMount() {
        axiosInstance.get("https://burger-builder-1d10b.firebaseio.com/ingredients.json")
            .then(results => this.setState({ingredients: results.data}))
            .catch(error => this.setState({error: true}));
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = this.state.ingredients[type] + 1;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICE_LIST[type];
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] <= 0) return;

        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = this.state.ingredients[type] - 1;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICE_LIST[type];
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    };

    updatePurchaseState(ingredients) {
        let sum = 0;
        for (let a in ingredients) {
            sum += ingredients[a];
        }
        
        this.setState({purchasable: !!sum});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelledHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
                this.setState({ loading: false, purchasing: false });
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false });
                console.log(error)
            });
    };

    render() {
        const disabledIng = {
            ...this.state.ingredients
        }
        for (let k in disabledIng) {
            disabledIng[k] = disabledIng[k] <= 0
        }

        let orderSummary = <Spinner />;
        let burgerLoaded = this.state.error ? 
            <p style={{textAlign: "center"}}>Ingredients failed to load.</p> 
            : <Spinner />;

        if (this.state.ingredients) {
            orderSummary = 
                <OrderSummary 
                    ingredients={this.state.ingredients} 
                    price={this.state.totalPrice}
                    cancel={this.purchaseCancelledHandler}
                    continue={this.purchaseContinueHandler}/>;
            if (!this.state.loading) {
                burgerLoaded = 
                    <Fragment>
                        <Burger ingredients={this.state.ingredients}/> 
                        <BuildControls
                            price={this.state.totalPrice} 
                            purchasable={this.state.purchasable}
                            purchasing={this.purchaseHandler}
                            ingredientAdded={this.addIngredientHandler}
                            ingredientRemoved={this.removeIngredientHandler} 
                            disabled={disabledIng}/>
                    </Fragment>;
            }        
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

export default withErrorHandler(BurgerBuilder, axiosInstance);