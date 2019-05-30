import { purchaseBurger } from './ordersAct';
import { initializeIngredients } from './burgerBuilderAct';

export const submitOrder = (orderData, token) => 
    dispatch => {
        dispatch(purchaseBurger(orderData, token))
        dispatch(initializeIngredients())
    }


