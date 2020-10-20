import * as actionType from './actionTypes'

export const orderSubmitSuccess = (id,data) => ({
    type:actionType.ORDER_SUCCESFUL,
    orderID: id,
    orderData: data
})

export const orderSubmitFailed = (error) => ({
    type: actionType.ORDER_FAILED,
    error: error
})

export const orderSumbitStart = () => ({
    type: actionType.ORDER_PROCESSING
})

export const orderSubmit = (order,token) => ({
    type: actionType.ORDER,
    order: order,
    token: token
})

export const orderSubmitDone = () => ({
    type: actionType.ORDER_SUBMIT_DONE
})

export const fetchOrderProcess = () => ({
    type: actionType.FETCH_ORDER
})

export const fetchOrderSuccess = (orders) => ({
    type: actionType.FETCH_ORDER_SUCCESS,
    orders: orders
})

export const fetchOrderFailed = (error) => ({
    type: actionType.FETCH_ORDER_FAIL,
    error: error
})

export const fetchOrder = (token,userId) => ({
    type: actionType.FETCH_ORDER_START,
    token: token,
    userId: userId
})