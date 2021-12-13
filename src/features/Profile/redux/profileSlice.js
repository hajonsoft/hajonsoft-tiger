import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from './../../../firebaseapp';

export const getProfile = createAsyncThunk("profile/get", async () => {
  const result = await firebase.database().ref('protected/profile').once('value');
  return result.toJSON();

});

export const updateProfile = createAsyncThunk("profile/update", async ({profileData}) => {
    const updateRef = firebase.database().ref(`protected/profile`);
    updateRef.set(profileData);
});

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    error: "",
    data: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state, action) => {
        state.loading = true;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(updateProfile.pending, (state, action) => {});
    builder.addCase(updateProfile.fulfilled, (state, action) => {});
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default profileSlice.reducer;
