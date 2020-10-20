import * as actionTypes from "../actions/actionTypes";

export const authStart = () => ({
    type: actionTypes.AUTH_START
});

export const authSuccess = (idToken, localId) => ({
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: localId
});

export const authFailed = error => ({
    type: actionTypes.AUTH_FAIL,
    error: error
});

export const auth = (email, password, isSignUp) => ({
    type: actionTypes.AUTH,
    email: email,
    password: password,
    isSignUp: isSignUp
});

export const sessionTimeout = () => ({
    type: actionTypes.SESSION_TIMEOUT_INITIATE
});

export const logOut = () => ({
    type: actionTypes.SESSION_TIMEOUT
})

export const clearSession = (intervalTime) => ({
    type: actionTypes.CLEAR_SESSION,
    intervalTime: intervalTime
});

export const setAuthRedirect = (path) => ({
    type: actionTypes.SET_AUTH_REDIRECT,
    path: path
})

export const fetchLocalStorage = () => ({
    type: actionTypes.FETCH_SESSION
})
