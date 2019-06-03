import * as actionTypes from '../actions/actions';
import { createReducer } from './util';
import { updateObject } from '../../utilities/utilities';


const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const authRequest = (state, action) => updateObject(state, { 
    error: null,
    loading: true
 })

const authSuccess = (state, action) => updateObject(state, {
    token: action.payload.token,
    userId: action.payload.userId,
    loading: false
})

const authFail = (state, action) => updateObject(state, {
    token: null,
    userId: null,
    error: action.error,
    loading: false
})

const authLogout = (state, action) => updateObject(state, {
    token: null,
    userId: null
})

const reducer = createReducer(initialState, {
    [actionTypes.AUTH_REQUEST]: authRequest,
    [actionTypes.AUTH_SUCCESS]: authSuccess,
    [actionTypes.AUTH_FAIL]: authFail,
    [actionTypes.AUTH_LOGOUT]: authLogout
})

export default reducer;
