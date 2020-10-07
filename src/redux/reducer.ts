
const initialState = {
    auth: { request: {}, response: {}, isError: false, isInProgress: false, isLoggedin: false }
}
function reducer(state = initialState, action: any) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, cognitoUser: action.payload };

        default:
            return state;
    }
}

export default reducer;