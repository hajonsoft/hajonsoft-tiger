import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import firebase from '../../../firebaseapp';

export const loginWithGoogle = createAsyncThunk('auth/google', async () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("email");
    const user = await firebase.auth().signInWithPopup(provider);
    return user;
})
export const signoutWithGoogle = createAsyncThunk('auth/signout', async () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("email");
    await firebase.auth().signOut();
})

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        data: {},
        loading: false,
        error: '',
    },
    extraReducers: (builder) => {
        builder.addCase(loginWithGoogle.pending, (state, action) => {
                state.loading = true;
        });
        builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
            const user = {
                name: action.payload.user.displayName,
                email: action.payload.user.email,
                photoURL: action.payload.user.photoURL,
            }
            state.data = user;            
            state.loading = false;
        });
        builder.addCase(loginWithGoogle.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(signoutWithGoogle.fulfilled, (state, action) => {
            state.data = {}
            state.loading = false;
        });
        builder.addCase(signoutWithGoogle.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export default authSlice.reducer;