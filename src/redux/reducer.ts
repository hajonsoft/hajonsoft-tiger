const initailSlice = () => ({
    req: {},
    data: {},
    loading: false,
    error: ''
})
const initialState = {
    user: initailSlice(),
    packages: initailSlice(),
    packageCustomers: []
}
const fetchState = (prevState: any, action: any) => ({ ...prevState, loading: true, req: action.payload })
const sucessState = (prevState: any, action: any) => ({ ...prevState, loading: false, error: '', data: action.payload })
const failState = (prevState: any, action: any) => ({ ...prevState, loading: false, error: action.payload.message || action.payload })

function reducer(state = initialState, action: any) {
    // TODO: create reducer fuctions instead of thinking about the logic everytime. 
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: fetchState(state.user, action) };
        case 'LOGIN_SUCCESS':
            return { ...state, user: sucessState(state.user, action.payload) };
        case 'LOGIN_FAIL':
            return { ...state, user: failState(state.user, action.payload) };
        case 'PACKAGES':
            return { ...state, packages: fetchState(state.packages, action) };
        case 'PACKAGES_SUCCESS':
            return { ...state, packages: sucessState(state.packages, action.payload) };
        case 'PACKAGES_FAIL':
            return { ...state, packages: failState(state.packages, action.payload) };
        case 'PACKAGECUSTOMERS':
            return { ...state, packageCustomers: fetchState(state.packageCustomers, action) };
        case 'PACKAGECUSTOMERS_SUCCESS':
            return { ...state, packageCustomers: sucessState(state.packageCustomers, action.payload) };
        case 'PACKAGECUSTOMERS_FAIL':
            return { ...state, packageCustomers: failState(state.packageCustomers, action.payload) };

        default:
            return state;
    }
}

export default reducer;