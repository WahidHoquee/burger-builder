import { delay } from 'redux-saga/effects'
import { put } from 'redux-saga/effects'
import Axios from "axios";


import * as actions from '../actions/index';

export function* sessionTimeoutSaga(action) {
    yield localStorage.removeItem("token");
    yield localStorage.removeItem("expirationDate");
    yield localStorage.removeItem("userId");

    yield put(actions.logOut())
}

export function* authCheckoutSaga(action) {
    yield delay(action.intervalTime*1000)
    yield put(actions.sessionTimeout())
}

export function* authSaga(action) {
    yield put(actions.authStart());

    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };

    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCzK-jiA5WZmWhOIAUKSl2fM52cvaFd2pQ";
    if (!action.isSignUp) {
        url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCzK-jiA5WZmWhOIAUKSl2fM52cvaFd2pQ";
    }
    
    try {
        const response = yield Axios.post(url, authData)
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000)
        yield localStorage.setItem("token",response.data.idToken);
        yield localStorage.setItem("expirationDate",expirationDate);
        yield localStorage.setItem("userId",response.data.localId);

        yield put(actions.authSuccess(response.data.idToken, response.data.localId))
        yield put(actions.clearSession(response.data.expiresIn))
    } 
    catch (error) {
        yield put(actions.authFailed(error.response.data.error));
    }
}

export function* fetchLogin(action){
    const token = yield localStorage.getItem("token")
    if(!token){
        yield put(actions.sessionTimeout())
    }
    else{
        const expirationDate = yield new Date(localStorage.getItem("expirationDate"));
        if(expirationDate <= new Date()){
            yield put(actions.sessionTimeout())
        }
        else{
            const userId = yield localStorage.getItem("userId")
            yield put(actions.authSuccess(token, userId));
            yield put(actions.clearSession((expirationDate.getTime()-new Date().getTime())/1000))
        }
    }
}