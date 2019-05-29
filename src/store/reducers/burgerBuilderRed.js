const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: null
}

const INGREDIENT_PRICE_LIST = {
    salad: 0.3,
    bacon: 0.9,
    cheese: 0.7, 
    meat: 1.5
}

const switchcase = cases => defaultCase => key => 
    cases.hasOwnProperty(key) ? cases[key] : defaultCase

const isFunc = f => f instanceof Function ? f() : f

const switchcaseF = cases => defaultCase => key => 
    isFunc(switchcase(cases)(defaultCase)(key))

const reducer = (state = initialState, action) => {
    return switchcaseF({
        "ADD_INGREDIENT": () => {
            let ingredient = action.payload.ingredient
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [ingredient]: state.ingredients[ingredient] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE_LIST[ingredient]
            }
        },
        "REMOVE_INGREDIENT": () => {
            let ingredient = action.payload.ingredient
            if (state.ingredients[ingredient] < 1) {
                return state
            }

            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [ingredient]: state.ingredients[ingredient] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICE_LIST[ingredient]
            }
        },
        "SET_INGREDIENTS": () => {
            let ingredients = action.payload.ingredients
            if (!ingredients) return state
            return {
                ...state,
                ingredients: ingredients,
            }
        },
        "FETCH_INGREDIENTS_ERROR": () => {
            let error = action.payload.error
            if (!error) return state
            return {
                ...state,
                error: error,
            }
        }
    })(state)(action.type)
}

export default reducer;