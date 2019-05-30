import { combineReducers } from 'redux';
import burgerBuilderReducer from './burgerBuilderRed';
import ordersReducer from './orderRed';

export default combineReducers({
    burgerBuilder: burgerBuilderReducer,
    orders: ordersReducer
}); 