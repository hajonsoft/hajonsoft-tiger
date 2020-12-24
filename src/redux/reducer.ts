import { combineReducers, createSlice } from "@reduxjs/toolkit"

const emptyState = {
    req: {},
    data: {},
    loading: false,
    error: ''
}


const applyStart = (state: any, action: any) => { state.loading = true; state.req = action.payload }
const applySuccess = (state: any, action: any) => { state.loading = false; state.error = ''; state.data = action.payload;}
const applyFail = (state: any, action: any) => { state.loading = false; state.error = action.payload?.message || action.payload }

export const travellerSlice = createSlice({
    name: 'traveller',
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

const reducer = combineReducers({
    user: userSlice.reducer,
    traveller: travellerSlice.reducer,
})

export default reducer;