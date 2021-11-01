import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const getAd = createAsyncThunk('ads/get', async () => {

})

const createAd = createAsyncThunk('ads/create', async () => {

})

const updateAd = createAsyncThunk('ads/update', async () => {

})

const deleteAd = createAsyncThunk('ads/delete', async () => {

})


const adSlice = createSlice({
    name: 'ads',
    initialState: {
        loading: false,
        error: '',
        data: {}
    },
    extraReducers: (builder) => {
        builder.addCase(getAd.pending, (state, action) => {

        });
        builder.addCase(getAd.fulfilled, (state, action) => {

        });
        builder.addCase(getAd.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(updateAd.pending, (state, action) => {

        });
        builder.addCase(updateAd.fulfilled, (state, action) => {

        });
        builder.addCase(updateAd.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(createAd.pending, (state, action) => {

        });
        builder.addCase(createAd.fulfilled, (state, action) => {

        });
        builder.addCase(createAd.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(deleteAd.pending, (state, action) => {

        });
        builder.addCase(deleteAd.fulfilled, (state, action) => {

        });
        builder.addCase(deleteAd.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

    }
})

export default adSlice.reducer;