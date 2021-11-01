import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const getProfile = createAsyncThunk('profile/get', async () => {
    // Get profile from /protected/profile
})

const createProfile = createAsyncThunk('profile/create', async () => {

})

const updateProfile = createAsyncThunk('profile/update', async () => {

})

const deleteProfile = createAsyncThunk('profile/delete', async () => {

})


const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        loading: false,
        error: '',
        data: {}
    },
    extraReducers: (builder) => {
        builder.addCase(getProfile.pending, (state, action) => {

        });
        builder.addCase(getProfile.fulfilled, (state, action) => {

        });
        builder.addCase(getProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(updateProfile.pending, (state, action) => {

        });
        builder.addCase(updateProfile.fulfilled, (state, action) => {

        });
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(createProfile.pending, (state, action) => {

        });
        builder.addCase(createProfile.fulfilled, (state, action) => {

        });
        builder.addCase(createProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(deleteProfile.pending, (state, action) => {

        });
        builder.addCase(deleteProfile.fulfilled, (state, action) => {

        });
        builder.addCase(deleteProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

    }
})

export default profileSlice.reducer;