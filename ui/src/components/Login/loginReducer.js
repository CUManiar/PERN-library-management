import { LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_PENDING, EMAIL_ADDRESS, PASSWORD } from '../../constants';

const initialLoginState = {
    isPending: false,
    isValidUser: false,
    user: {}
}

const initialEmail = {
    email: ''
}

const initialPassword = {
    password: ''
}


export const validateUser = (state = initialLoginState, action = {}) => {
    switch (action.type) {
        case LOGIN_PENDING:
            return { ...initialLoginState, isPending: true }
        case LOGIN_SUCCESS:
            return { ...initialLoginState, isPending: false, isValidUser: true, user: action.payload }
        case LOGIN_FAIL:
            return { ...initialLoginState, isValidUser: false, isPending: false };
        default:
            return initialLoginState;

    }
}


export const updateEmail = (state = initialEmail, action = {}) => {
    switch (action.type) {
        case EMAIL_ADDRESS:
            return Object.assign({}, initialEmail, { email: action.payload })
        default:
            return initialEmail;
    }
}

export const updatePassword = (state = initialPassword, action = {}) => {
    switch (action.type) {
        case PASSWORD:
            return Object.assign({}, initialPassword, { password: action.payload })
        default:
            return initialPassword;
    }
}