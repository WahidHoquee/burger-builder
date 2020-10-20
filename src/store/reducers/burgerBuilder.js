import * as actionType from "../actions/actionTypes";

const INGREDIENT_COST = {
    meat: 1,
    cheese: 0.2,
    bacon: 0.7,
    salad: 0.05
};

const initialState = {
    ingredients: null,
    totalCost: 4,
    error:false,
    buildingBurger: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]:
                        state.ingredients[action.ingredient] + 1
                },
                totalCost: state.totalCost + INGREDIENT_COST[action.ingredient],
                buildingBurger: true,
            };
        case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]:
                        state.ingredients[action.ingredient] - 1
                },
                totalCost: state.totalCost - INGREDIENT_COST[action.ingredient],
                buildingBurger: true
            };
        case actionType.SYNC_INGREDIENT:
            return {
                ...state,
                ingredients: action.ingredient,
                totalCost:4,
                error: false,
                buildingBurger:false
            };
        case actionType.SYNC_INGREDIENT_FAILED:
            return {
                ...state,
                error: true
            };

        default:
            return state;
    }
};

export default reducer;
