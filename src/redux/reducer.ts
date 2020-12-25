import { combineReducers, createSlice } from "@reduxjs/toolkit"
import _ from 'lodash';

const emptyState = {
    data: {},
    loading: false,
    error: ''
}


const applyStart = (state: any, action: any) => { state.loading = true; state.req = action.payload }
const applyFail = (state: any, action: any) => { state.loading = false; state.error = action.payload?.message || action.payload }

const applyFetchSuccess = (state: any, action: any) => {
    state.loading = false;
    state.error = '';
    state.data = _.omit(state.data, 'No Groups Found')
    state.data = action.payload;

}

const applyCreateSuccess = (state: any, action: any) => {
    state.loading = false;
    state.error = '';
    state.data = _.omit(state.data, 'No Groups Found')
    const groupName = Object.keys(action.payload)[0];
    if (!Object.keys(state.data).includes(groupName)) {
        state.data[groupName] = [];
    }
    state.data[groupName].push(Object.values(Object.values(action.payload)[0])[0][0]);
}

const applyUpdateSuccess = (state: any, action: any) => {
    state.loading = false;
    state.error = '';
    const pathParts = action.payload.path.split('/');
    if (pathParts.length === 3) {
        const groupName = pathParts[1];
        let updated = state.data[groupName].find(x => x._fid === pathParts[2])
        _.assign(updated,action.payload.data)
    }
}

const applyDeleteSuccess = (state: any, action: any) => {
    state.loading = false;
    state.error = '';

    const pathParts = action.payload.path.split('/');
    if (pathParts.length === 3) {
        state.data[pathParts[1]] = state.data[pathParts[1]].filter(x => x._fid !== pathParts[2])
    } else if (pathParts.length === 2) {
        state.data = _.omit(state.data, action.payload.path.split('/')[1])
    }
}



export const travellerSlice = createSlice({
    name: 'traveller',
    initialState: emptyState,
    reducers: {
        fetch: (state, action) => applyStart(state, action),
        fetchSuccess: (state, action) => applyFetchSuccess(state, action),
        create: (state, action) => applyStart(state, action),
        createSuccess: (state, action) => applyCreateSuccess(state, action),
        update: (state, action) => applyStart(state, action),
        updateSuccess: (state, action) => applyUpdateSuccess(state, action),
        delete: (state, action) => applyStart(state, action),
        deleteSuccess: (state, action) => applyDeleteSuccess(state, action),
        fail: (state, action) => applyFail(state, action)
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState: emptyState,
    reducers: {
        fetch: (state, action) => applyStart(state, action),
        // success: (state, action) => applySuccess(state, action),
        fail: (state, action) => applyFail(state, action)
    }
})

const reducer = combineReducers({
    user: userSlice.reducer,
    traveller: travellerSlice.reducer,
})

export default reducer;