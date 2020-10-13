
const initialState = {
    user: { request: {}, data: {}, loading: false, error: '' }
}
function reducer(state = initialState, action: any) {
  // TODO: create reducer fuctions instead of thinking about the logic everytime. 
    switch (action.type) {
        case 'LOGIN':
return { ...state, user: {...state.user, loading: true, request: action.payload} };
        case 'LOGIN_SUCCESS':
            return { ...state, user: {...state.user, loading: false, error: '', data: action.payload} };
        case 'LOGIN_FAIL':
            return { ...state, user: {...state.user, loading: false, error: action.payload.message || action.payload} };
        default:
            return state;
    }
}

export default reducer;