import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import firebase from './../../../firebaseapp';

export const getUpcomingCaravans = createAsyncThunk('caravan/upcoming', async () => {
    const result = await firebase.database().ref('/customer').once('value');
    return flatten(result)
});

export const createUpcomingCaravan = createAsyncThunk('caravan/create', async (name) => {
    const result = await firebase.database().ref(`/customer/${name}`).push({
        name: 'Default passenger'
    });
    return result;
});

export const updateUpcomingCaravan = createAsyncThunk('caravan/update', async (caravanId, data) => {
    const updateRef = firebase.database().ref(`/customer/${caravanId}`);
    updateRef.update(data);
    return { updated: data };
});

export const deleteUpcomingCaravan = createAsyncThunk('caravan/delete', async (caravanName) => {
    if (caravanName.startsWith('/')) {
        const removeRef = firebase.database().ref(`/customer${caravanName}`);
        removeRef.remove();
    } else {
        const removeRef = firebase.database().ref(`/customer/${caravanName}`);
        removeRef.remove();
    }
});


const flatten = (snapshot) => {
    const output = {};
    const data = snapshot.toJSON();
    if (!data) return { 'No Caravans Found': [{ _fid: '0', name: 'No Travellers Found' }] }
    const caravans = Object.keys(data);

    caravans.forEach(caravan => {
        const fireIds = Object.keys(data[caravan])
        output[caravan] = []
        fireIds.forEach(_fid => {
            output[caravan].push({ ...data[caravan][_fid], _fid })
        })
    })
    return output;
}


const caravanSlice = createSlice({
    name: 'caravan',
    initialState: {
        loading: false,
        error: '',
        data: {},
    },
    extraReducers: (builder) => {
        builder.addCase(getUpcomingCaravans.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getUpcomingCaravans.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(getUpcomingCaravans.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(createUpcomingCaravan.pending, (state, action) => {
            state.data = {...state.data, [action.meta.arg]: {
                name: 'Default passenger'
            }}
            state.loading = true;
        });
        builder.addCase(createUpcomingCaravan.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(createUpcomingCaravan.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(updateUpcomingCaravan.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updateUpcomingCaravan.fulfilled, (state, action) => {
            // Not implemented
            state.loading = false;
        });
        builder.addCase(updateUpcomingCaravan.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(deleteUpcomingCaravan.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(deleteUpcomingCaravan.fulfilled, (state, action) => {
            delete state.data[action.meta.arg];
            state.loading = false;
        });
        builder.addCase(deleteUpcomingCaravan.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default caravanSlice.reducer;