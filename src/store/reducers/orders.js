import * as actionTypes from "../actions/actionTypes";

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_SUCCESFUL:
            const newOrder = {
                ...action.orderID,
                ...action.orderData
            };
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false,
                purchased: true
            };
        case actionTypes.ORDER_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case actionTypes.ORDER_PROCESSING:
            return {
                ...state,
                loading:true
            }
        case actionTypes.ORDER_SUBMIT_DONE:
            return{
                ...state,
                purchased:false
            }
        case actionTypes.FETCH_ORDER:
            return{
                ...state,
                loading:true
            }
        case actionTypes.FETCH_ORDER_SUCCESS:
            return{
                ...state,
                orders: action.orders,
                loading: false
            }
        case actionTypes.FETCH_ORDER_FAIL:
            return{
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
};

export default reducer;