export interface State {
    token: string;
    authenticated: boolean;
}

const initialState: State = {
    token: null,
    authenticated: false
};

export function authReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
