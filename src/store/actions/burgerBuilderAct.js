import * as actionTypes from './actions';
import axiosInstance from '../../axiosOrders';


export const onAddIngredient = (ingredient) => ({
    type: actionTypes.ADD_INGREDIENT,
    payload: {
        ingredient: ingredient
    }
})

export const onRemoveIngredient = (ingredient) => ({
    type: actionTypes.REMOVE_INGREDIENT,
    payload: {
        ingredient: ingredient
    }
})

export const setIngredients = (ingredients) => ({
    type: actionTypes.SET_INGREDIENTS,
    payload: {
        ingredients: ingredients
    }
})

export const fetchIngredientsError = (error) => ({
    type: actionTypes.FETCH_INGREDIENTS_ERROR,
    payload: {
        error: error
    }
})

export const initializeIngredients = () => 
    dispatch => {
         axiosInstance.get("https://burger-builder-1d10b.firebaseio.com/ingredients.json")
            .then(results => {                
                return dispatch(setIngredients(results.data))
            })
            .catch(error => {
                dispatch(fetchIngredientsError(error))
            })
    }   