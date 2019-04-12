import { userConstants } from '../constants';

export function authentication(state = {}, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.data
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}