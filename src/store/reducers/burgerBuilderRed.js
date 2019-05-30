import * as actionTypes from '../actions/actions';
import { updateObject, createReducer } from './util';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    building: false,
    error: null
}

const INGREDIENT_PRICE_LIST = {
    salad: 0.3,
    bacon: 0.9,
    cheese: 0.7, 
    meat: 1.5
}

const addIngredient = (state, action) => {
    let ingredient = action.payload.ingredient
    return updateObject(state, {
        ingredients: {
            ...state.ingredients,
            [ingredient]: state.ingredients[ingredient] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICE_LIST[ingredient],
        building: true
    })
}

const removeIngredient = (state, action) => {
    let ingredient = action.payload.ingredient
    if (state.ingredients[ingredient] < 1) return state
    return updateObject(state, {
        ingredients: {
            ...state.ingredients,
            [ingredient]: state.ingredients[ingredient] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICE_LIST[ingredient]
    })
}

const setIngredients = (state, action) => {
    let ingredients = action.payload.ingredients
    if (!ingredients) return state
    return updateObject(state, {
        ingredients: ingredients,
        totalPrice: 4,
        building: false
    })
}

const fetchIngredientsError = (state, action) => {
    let error = action.payload.error
    if (!error) return state
    return updateObject(state, { error: error })
}

const reducer = createReducer(initialState, {
    [actionTypes.ADD_INGREDIENT]: addIngredient,
    [actionTypes.REMOVE_INGREDIENT]: removeIngredient,
    [actionTypes.SET_INGREDIENTS]: setIngredients,
    [actionTypes.FETCH_INGREDIENTS_ERROR]: fetchIngredientsError
})

export default reducer;