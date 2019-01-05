import { AuthActions, SIGNUP, SIGNIN, LOGOUT } from './auth.actions';

export interface State {
    token: string;
    authenticated: boolean;
}

const initialState: State = {
    token: null,
    authenticated: false
};

export function authReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case SIGNUP:
        case SIGNIN:
            return {
                ...state,
                authenticated: true
            };
        case LOGOUT:
            return {
                ...state,
                token: null,
                authenticated: false
            };
        default:
            return state;
    }
}
