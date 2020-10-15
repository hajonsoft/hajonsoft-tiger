const initialSlice = () => ({
    req: {},
    data: {},
    loading: false,
    error: ''
})
const initialState = {
    user: initialSlice(),
    packages: initialSlice(),
    packageCustomers: []
}
const fetchState = (prevState: any, action: any) => ({ ...prevState, loading: true, req: action.payload })
const successState = (prevState: any, action: any) => ({ ...prevState, loading: false, error: '', data: action.payload?.data })
const failState = (prevState: any, action: any) => ({ ...prevState, loading: false, error: action.payload?.message || action.payload })

function reducer(state = initialState, action: any) {
    // TODO: create reducer functions instead of thinking about the logic every time. 
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: fetchState(state.user, action) };
        case 'LOGIN_SUCCESS':
            return { ...state, user: successState(state.user, action) };
        case 'LOGIN_FAIL':
            return { ...state, user: failState(state.user, action) };
        case 'PACKAGES':
            return { ...state, packages: fetchState(state.packages, action) };
        case 'PACKAGES_SUCCESS':
            return { ...state, packages: successState(state.packages, action) };
        case 'PACKAGES_FAIL':
            return { ...state, packages: failState(state.packages, action) };
        case 'PACKAGECUSTOMERS':
            return { ...state, packageCustomers: fetchState(state.packageCustomers, action) };
        case 'PACKAGECUSTOMERS_SUCCESS':
            return { ...state, packageCustomers: successState(state.packageCustomers, action) };
        case 'PACKAGECUSTOMERS_FAIL':
            return { ...state, packageCustomers: failState(state.packageCustomers, action) };

        default:
            return state;
    }
}

export default reducer;