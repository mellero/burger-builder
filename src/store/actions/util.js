import { purchaseBurger } from './ordersAct';
import { initializeIngredients } from './burgerBuilderAct';

export const submitOrder = (orderData) => 
    dispatch => {
        dispatch(purchaseBurger(orderData))
        dispatch(initializeIngredients())
    }


