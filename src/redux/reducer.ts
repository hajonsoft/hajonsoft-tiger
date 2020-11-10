import { combineReducers, createSlice } from "@reduxjs/toolkit"

const emptyState = {
    req: {},
    data: {},
    loading: false,
    error: ''
}


const applyStart = (state: any, action: any) => { state.loading = true; state.req = action.payload }
const applySuccess = (state: any, action: any) => { state.loading = false; state.error = ''; state.data = action.payload?.data }
const applyFail = (state: any, action: any) => { state.loading = false; state.error = action.payload?.message || action.payload }

export const packagesSlice = createSlice({
    name: 'packages',
    initialState: emptyState,
    reducers: {
        fetch: (state, action) => applyStart(state, action),
        create: (state, action) => applyStart(state, action),
        update: (state, action) => applyStart(state, action),
        delete: (state, action) => applyStart(state, action),
        success: (state, action) => applySuccess(state, action),
        fail: (state, action) => applyFail(state, action)
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState: emptyState,
    reducers: {
        fetch: (state, action) => applyStart(state, action),
        success: (state, action) => applySuccess(state, action),
        fail: (state, action) => applyFail(state, action)
    }
})

export const packageCustomersSlice = createSlice({
    name: 'packageCustomers',
    initialState: emptyState,
    reducers: {
        fetch: (state, action) => applyStart(state, action),
        create: (state, action) => applyStart(state, action),
        update: (state, action) => applyStart(state, action),
        delete: (state, action) => applyStart(state, action),
        success: (state, action) => {
            state.loading = false;
            state.error = '';
            // TODO: Respond to update and delete and update or delete in store as well
            if (action?.payload?.req?.packageName) {
                if (!state.data) state.data = {};
                state.data = { [action.payload.req.packageName]: action.payload.data }
            }
        },
        fail: (state, action) => applyFail(state, action)
    }
})

const reducer = combineReducers({
    user: userSlice.reducer,
    packages: packagesSlice.reducer,
    packageCustomers: packageCustomersSlice.reducer,
})

export default reducer;