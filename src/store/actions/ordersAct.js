import * as actionTypes from './actions';
import axiosInstance from '../../axiosOrders';

export const purchaseBurgerSuccess = (id, orderData) => ({
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    payload: {
        orderId: id,
        orderData: orderData
    }
})

export const purchaseBurgerFail = (error) => ({
    type: actionTypes.PURCHASE_BURGER_FAIL,
    payload: {
        error: error
    }
})

export const purchaseBurgerRequest = () => ({
    type: actionTypes.PURCHASE_BURGER_REQUEST
})

export const purchaseBurger = (orderData, token) => 
    dispatch => {
        dispatch(purchaseBurgerRequest())
        axiosInstance.post(`/orders.json?auth=${token}`, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerSuccess(error))
            })
    }

export const fetchOrdersSuccess = (orders) => ({
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    payload: {
        orders: orders
    }
})

export const fetchOrdersFail = (error) => ({
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
})

export const fetchOrdersRequest = () => ({
    type: actionTypes.FETCH_ORDERS_REQUEST
})

export const fetchOrders = (token, userId) => 
    dispatch => {
        dispatch(fetchOrdersRequest())
        axiosInstance.get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        id: key,
                        ...res.data[key]
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error))
            });
    }