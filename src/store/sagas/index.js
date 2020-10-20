import { takeEvery } from 'redux-saga/effects'

import * as actionTypes from '../actions/actionTypes';
import { sessionTimeoutSaga, authCheckoutSaga, authSaga, fetchLogin } from './auth';
import { syncIngredientsSaga } from './burgerBuilder';
import { orderSubmitSaga, fetchOrderSaga } from './orders';

export function* watchAuth(){
    yield takeEvery(actionTypes.SESSION_TIMEOUT_INITIATE,sessionTimeoutSaga);
    yield takeEvery(actionTypes.CLEAR_SESSION,authCheckoutSaga);
    yield takeEvery(actionTypes.AUTH,authSaga);
    yield takeEvery(actionTypes.FETCH_SESSION,fetchLogin);
}
export function* watchBurgerBuilder(){
    yield takeEvery(actionTypes.FETCH_INGREDIENTS,syncIngredientsSaga);
}
export function* watchOrder(){
    yield takeEvery(actionTypes.ORDER,orderSubmitSaga);
    yield takeEvery(actionTypes.FETCH_ORDER_START,fetchOrderSaga);
}