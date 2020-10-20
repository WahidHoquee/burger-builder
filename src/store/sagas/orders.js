import { put } from 'redux-saga/effects'
import axios from "../../axios-order";

import * as actions from "../actions"

export function* orderSubmitSaga(action){
    yield put(actions.orderSumbitStart());
    try {
        const response = yield axios.post(`/orders.json?auth=${action.token}`, action.order)
        yield put(actions.orderSubmitSuccess(response.data.name,action.order))
    } catch (error) {
        yield put(actions.orderSubmitFailed(error))
    }
}

export function* fetchOrderSaga(action){
    yield put(actions.fetchOrderProcess());

    let query = `auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`

    try {
        const response = yield axios.get(`/orders.json?${query}`)
        const orderList = response.data;
        const orderCollection = [];
        for (let key in orderList) {
            orderCollection.push({ ...orderList[key], id: key });
        }
        yield put(actions.fetchOrderSuccess(orderCollection))
    } catch (error) {
        yield put(actions.fetchOrderFailed(error));
    }
}