import { combineReducers } from 'redux';
import burgerBuilderReducer from './burgerBuilderRed';

export default combineReducers({
    burgerBuilder: burgerBuilderReducer,
    // orders: ordersReducer
}); 