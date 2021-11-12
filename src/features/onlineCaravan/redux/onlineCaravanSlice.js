import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "../../../firebaseapp";
import { flattenOnlineCaravans } from "../../../redux/helpers";


export const getOnlineCaravans = createAsyncThunk('onlineCaravan/get', async () => {
    const result = await firebase.database().ref('/protected/onlinePackage').once('value');
    return flattenOnlineCaravans(result, "caravan");
})

export const createOnlineCaravan = createAsyncThunk('onlineCaravan/create', async () => {

})

export const updateOnlineCaravan = createAsyncThunk('onlineCaravan/update', async () => {

})

export const deleteOnlineCaravan = createAsyncThunk('onlineCaravan/delete', async () => {

})


const onlineCaravanSlice = createSlice({
    name: 'onlineCaravan',
    initialState: {
        loading: false,
        error: '',
        data: {}
    },
    extraReducers: (builder) => {
        builder.addCase(getOnlineCaravans.pending, (state, action) => {
            state.loading = true;

        });
        builder.addCase(getOnlineCaravans.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;

        });
        builder.addCase(getOnlineCaravans.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(updateOnlineCaravan.pending, (state, action) => {
            state.loading = true;

        });
        builder.addCase(updateOnlineCaravan.fulfilled, (state, action) => {
            state.loading = false;

        });
        builder.addCase(updateOnlineCaravan.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(createOnlineCaravan.pending, (state, action) => {
            state.loading = true;

        });
        builder.addCase(createOnlineCaravan.fulfilled, (state, action) => {
            state.loading = false;

        });
        builder.addCase(createOnlineCaravan.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(deleteOnlineCaravan.pending, (state, action) => {
            state.loading = true;

        });
        builder.addCase(deleteOnlineCaravan.fulfilled, (state, action) => {
            state.loading = false;

        });
        builder.addCase(deleteOnlineCaravan.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

    }
})

export default onlineCaravanSlice.reducer;