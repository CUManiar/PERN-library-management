import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_FAIL, EMAIL_ADDRESS, PASSWORD } from '../../constants';

export const loginAttempt = ({ email, password }) => (dispatch) => {

    dispatch({ type: LOGIN_PENDING });
    fetch('http://localhost:8000/api/auth/sign-in', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(res => res.json())
        .then(res => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
        .catch(err => dispatch({ type: LOGIN_FAIL, payload: err }));
}

export const setEmailAddress = (email) => {
    return {
        type: EMAIL_ADDRESS,
        payload: email
    }
}

export const setPassword = (password) => {
    return {
        type: PASSWORD,
        payload: password
    }
}