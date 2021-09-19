import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import firebase from '../../../firebaseapp';


export const getVisaSystems = createAsyncThunk('visaSystems/systems', async ()=> {
    const result = await firebase.database().ref('/visaSystem').once('value');
    return flatten(result)
})

export const createVisaSystems = createAsyncThunk('visaSystems/create', async (data)=> {
    if (!data) return;
    const result = await firebase.database().ref('/visaSystem').push(data);
    return result;
})

export const deleteVisaSystems = createAsyncThunk('visaSystems/delete', async (visaSystemId)=> {
    const removeRef = firebase.database().ref(`/visaSystem/${visaSystemId}`);
    removeRef.remove();
    
})

const visaSystemSlice = createSlice({
    name: 'visaSystem',
    initialState: {
        loading: false,
        error: '',
        data: {}
    },
    extraReducers: (builder) => {
        builder.addCase(getVisaSystems.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getVisaSystems.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(getVisaSystems.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(createVisaSystems.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createVisaSystems.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(createVisaSystems.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(deleteVisaSystems.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(deleteVisaSystems.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(deleteVisaSystems.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

const flatten = (snapshot) => {

    const output = [];
    const data = snapshot.toJSON();
    if (!data) return output;
    for (let [key, value] of Object.entries(data)){
        output.push({...value, _fid: key})
    }
    return output;
}
export default visaSystemSlice.reducer;
