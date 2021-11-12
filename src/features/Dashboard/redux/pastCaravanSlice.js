import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { flatten } from '../../../redux/helpers';
import firebase from '../../../firebaseapp';

export const getPastCaravans = createAsyncThunk('past/get', async () => {
    const result = await firebase.database().ref('/past').once('value');
    return flatten(result, "past caravan");
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
    }
});

export default pastCaravanSlice.reducer;