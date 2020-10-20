import { put } from 'redux-saga/effects'
import axios from "../../axios-order";

import * as actions from "../actions"

export function* syncIngredientsSaga(action){
    try {
        const ingredients = yield axios.get("https://burger-builder-8fbf9.firebaseio.com/ingredients.json");
        yield put(actions.refreshIngredients(ingredients.data));
    } catch (error) {
        yield put(actions.refreshIngredientsFailed());
    }
}