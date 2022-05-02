import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { flatten } from '../../../redux/helpers';
import firebase from '../../../firebaseapp';

export const getPastCaravans = createAsyncThunk('past/get', async () => {
    const result = await firebase.database().ref('/past').once('value');
    return flatten(result, "past caravan");
});

export const setUpcomingCaravan = createAsyncThunk('caravan/set-upcoming-caravan', async ({ name, passengers }) => {
    for (let passenger of passengers) {
        await firebase.database().ref(`/customer/${name.split('/').filter(part => !!part).join('/')}`).push(passenger);
    }
    const removeRef = firebase.database().ref(`/past/${name.split('/').filter(part => !!part).join('/')}`);
    removeRef.remove();
    return { updated: passengers };
});


const pastCaravanSlice = createSlice({
    name: 'past',
    initialState: {
        loading: false,
        error: '',
        data: {},
    },
    extraReducers: (builder) => {
        builder.addCase(getPastCaravans.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getPastCaravans.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(getPastCaravans.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(setUpcomingCaravan.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(setUpcomingCaravan.fulfilled, (state, action) => {
            delete state.data[action.meta.arg.name];
            state.loading = false;
        });
        builder.addCase(setUpcomingCaravan.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export default pastCaravanSlice.reducer;