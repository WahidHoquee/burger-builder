import * as actionType from './actionTypes'

export const addIngredients = (ingredientType) => ({
    type: actionType.ADD_INGREDIENT,
    ingredient: ingredientType
})

export const removeIngredients = (ingredientType) => ({
    type: actionType.REMOVE_INGREDIENT,
    ingredient: ingredientType
})

export const refreshIngredients = (ingredient) => ({
    type: actionType.SYNC_INGREDIENT,
    ingredient: ingredient
})

export const refreshIngredientsFailed = () => ({
    type: actionType.SYNC_INGREDIENT_FAILED,
})

export const syncIngredients = () => ({
    type: actionType.FETCH_INGREDIENTS
})