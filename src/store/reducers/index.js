import { combineReducers } from 'redux';
import burgerBuilderReducer from './burgerBuilderRed';
import ordersReducer from './orderRed';
import authReducer from './authRed';

export default combineReducers({
    burgerBuilder: burgerBuilderReducer,
    orders: ordersReducer,
    auth: authReducer
}); 