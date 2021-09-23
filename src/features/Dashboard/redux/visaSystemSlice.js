import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import firebase from '../../../firebaseapp';


export const getVisaSystems = createAsyncThunk('visaSystem/systems', async ()=> {
    const visaSystems = await firebase.database().ref('/visaSystem').once('value');
    return flatten(visaSystems)
})

export const createVisaSystem = createAsyncThunk('visaSystem/create', async (data)=> {
    if (!data) return;
    const result = await firebase.database().ref('/visaSystem').push(data);
    return result.key;
})

export const deleteVisaSystem = createAsyncThunk('visaSystem/delete', async (visaSystemId)=> {
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
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(getVisaSystems.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
        builder.addCase(createVisaSystem.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createVisaSystem.fulfilled, (state, action) => {
            state.data = [...state.data, {
                _fid: action.payload,
                ...action.meta.arg
            }]; 
            state.loading = false;
        });
        builder.addCase(createVisaSystem.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(deleteVisaSystem.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(deleteVisaSystem.fulfilled, (state, action) => {
            state.data = state.data.filter(visaSystem => visaSystem._fid !== action.meta.arg )
            state.loading = false;
        });
        builder.addCase(deleteVisaSystem.rejected, (state, action) => {
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
