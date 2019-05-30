export const updateObject = (oldObject, updatedProps) => ({
    ...oldObject,
    ...updatedProps
})

export const createReducer = (initialState, handlers) => 
    function reducerUtil(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        }
        return state
    }