import * as actionTypes from '../actions/actions';
import { updateObject, createReducer } from './util';

const initialState = {
    orders: [],
    loading: false
}

const purchaseBurgerRequest = (state, action) => updateObject(state, { loading: false })
const purchaseBurgerSuccess = (state, action) => {
    const order = {
        ...action.payload.orderData,
        id: action.payload.orderId
    }
    return updateObject(state, {
        loading: false,
        orders: state.orders.concat(order)
    })
}
const purchaseBurgerFail = (state, action) => updateObject(state, { loading: false })
const fetchOrdersRequest = (state, action) => updateObject(state, { loading: true })
const fetchOrdersSuccess = (state, action) => updateObject(state, {
    orders: action.payload.orders,
    loading: false
})
const fetchOrdersFail = (state, action) => updateObject(state, { loading: false })

const reducer = createReducer(initialState, {
    [actionTypes.PURCHASE_BURGER_REQUEST]: purchaseBurgerRequest,
    [actionTypes.PURCHASE_BURGER_SUCCESS]: purchaseBurgerSuccess,
    [actionTypes.PURCHASE_BURGER_FAIL]: purchaseBurgerFail,
    [actionTypes.FETCH_ORDERS_REQUEST]: fetchOrdersRequest,
    [actionTypes.FETCH_ORDERS_SUCCESS]: fetchOrdersSuccess,
    [actionTypes.FETCH_ORDERS_FAIL]: fetchOrdersFail
})

export default reducer;