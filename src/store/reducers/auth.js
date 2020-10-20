import * as actionTypes from "../actions/actionTypes";

const initialState = {
    idToken: null,
    userId: null,
    error: null,
    loading: false,
    redirectLink: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
                error:null
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                idToken:action.idToken,
                userId:action.userId,
                error: null
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.SESSION_TIMEOUT:
            return {
                ...state,
                idToken: null,
                userId: null
            }
        case actionTypes.SET_AUTH_REDIRECT:
            return {
                ...state,
                redirectLink: action.path
            }
        default:
            return state;
    }
};
export default reducer;