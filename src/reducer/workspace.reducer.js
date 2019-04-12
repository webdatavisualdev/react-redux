import { userConstants } from '../constants';

export function workspace(state = {}, action) {
    switch (action.type) {
        case userConstants.SET_WORKSPACE:
            return {
                ...action.data
            };
        default:
            return state
    }
}