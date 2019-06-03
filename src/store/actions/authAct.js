import axios from 'axios';
import * as actionTypes from './actions';

export const authRequest = () => ({
    type: actionTypes.AUTH_REQUEST
})

export const authSuccess = (token, userId) => ({
    type: actionTypes.AUTH_SUCCESS,
    payload: {
        token: token,
        userId: userId
    }
})

export const authFail = (error) => ({
    type: actionTypes.AUTH_FAIL,
    error: error
})

export const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("expirationDate")
    localStorage.removeItem("userId")
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}
    

export const authenticate = (email, pass, isNewUser) => 
    dispatch => {
        dispatch(authRequest())
        const payload = {
            email: email,
            password: pass,
            returnSecureToken: true
        }
        let url = isNewUser ?
            "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDry9BdhdFcGMMYpD34fS_9o6db3mMdgKU"
            : "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDry9BdhdFcGMMYpD34fS_9o6db3mMdgKU"

        axios.post(url, payload)
            .then(res => {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
                localStorage.setItem("token", res.data.idToken)
                localStorage.setItem("expirationDate", expirationDate)
                localStorage.setItem("userId", res.data.localId)

                dispatch(authSuccess(res.data.idToken, res.data.localId))
                dispatch(checkAuthTimeout(res.data.expiresIn))
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error))
            })
    }

export const authCheckState = () => 
    dispatch => {
        const token = localStorage.getItem("token")
        if (!token) {
            return dispatch(logout())
        }

        const expirationDate = new Date(localStorage.getItem("expirationDate"))
        if (expirationDate <= new Date()) {
            return dispatch(logout())
        }

        const userId = localStorage.getItem("userId")
        dispatch(authSuccess(token, userId))
        dispatch(checkAuthTimeout( (expirationDate - new Date())/1000 ))
    }
