
const initialState = {
    user: { request: {}, data: {}, loading: false, error: '' },
    package: {request:{ }, data:{}, loading: false. error: ''},
    packageCustomers: []
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
            case 'PACKAGES':
return { ...state, packages: {...state.packages, loading: true, request: action.payload} };
        case 'PACKAGES_SUCCESS':
            return { ...state, packages: {...state.packages, loading: false, error: '', data: action.payload} };
        case 'PACKAGES_FAIL':
            return { ...state, packages: {...state.packages, loading: false, error: action.payload.message || action.payload} };
            case 'PACKAGECUSTOMERS':
return { ...state, packageCustomers: {...state.packageCustomers, loading: true, request: action.payload} };
        case 'PACKAGECUSTOMERS_SUCCESS':
            return { ...state, packageCustomers: {...state. packageCustomers, loading: false, error: '', data: action.payload} };
        case 'PACKAGECUSTOMERS_FAIL':
            return { ...state, packageCustomers: {...state. packageCustomers, loading: false, error: action.payload.message || action.payload} };
            
        default:
            return state;
    }
}

export default reducer;