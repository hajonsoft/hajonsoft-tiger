import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "../../../firebaseapp";
import { flattenOnlineCaravans } from "../../../redux/helpers";


export const getOnlineCaravans = createAsyncThunk('onlineCaravan/get', async () => {
    const result = await firebase.database().ref('/protected/onlinePackage').once('value');
    return flattenOnlineCaravans(result, "caravan");
})

export const createOnlineCaravan = createAsyncThunk('onlineCaravan/create', async ({ caravanData }) => {
    const result = await firebase.database().ref(`protected/onlinePackage`).push(caravanData);
    return result.key;
})

export const updateOnlineCaravan = createAsyncThunk('onlineCaravan/update', async ({ _fid, caravanData }) => {
    delete caravanData.tableData;
    const updateRef = await firebase.database().ref(`protected/onlinePackage/${_fid}`);
    await updateRef.update(caravanData);
    return caravanData;
})

export const deleteOnlineCaravan = createAsyncThunk('onlineCaravan/delete', async ({ _fid }) => {
    const removeRef = firebase.database().ref(`protected/onlinePackage/${_fid}`);
    removeRef.remove();
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
            state.data = state.data.filter(advertisement => advertisement._fid !== action.meta.arg._fid);
            state.data.push(action.meta.arg.caravanData);
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
            if (!state.data) {
                state.data = []
            }
            state.data.push({ ...action.meta.arg.caravanData, _fid: action.payload })
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
            state.data = state.data.filter(advertisement => advertisement._fid !== action.meta.arg._fid)
            state.loading = false;

        });
        builder.addCase(deleteOnlineCaravan.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

    }
})

export default onlineCaravanSlice.reducer;