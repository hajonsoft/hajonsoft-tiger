import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import firebase from './../../../firebaseapp';

export const getUpcomingCaravans = createAsyncThunk('caravan/upcoming', async () => {
    const result = await firebase.database().ref('/customer').once('value');
    return flatten(result)
});

export const createUpcomingCaravan = createAsyncThunk('caravan/create', async (name) => {
    const result = await firebase.database().ref(`/customer/${name.split('/').filter(part => !!part).join('/')}`).push({
        name: 'Sample passenger --delete'
    });
    return result;
});

export const setPastCaravan = createAsyncThunk('caravan/set-past-caravan', async (name, data) => {
    await firebase.database().ref(`/past/${name.split('/').filter(part => !!part).join('/')}`).push(data);
    const removeRef = firebase.database().ref(`/customer${name.split('/').filter(part => !!part).join('/')}`);
    removeRef.remove();
    return { updated: data };
});

export const setUpcomingCaravan = createAsyncThunk('caravan/set-upcoming-caravan', async (name, data) => {
    await firebase.database().ref(`/customer/${name.split('/').filter(part => !!part).join('/')}`).push(data);
    const removeRef = firebase.database().ref(`/past${name.split('/').filter(part => !!part).join('/')}`);
    removeRef.remove();
    return { updated: data };
});

export const deleteUpcomingCaravan = createAsyncThunk('caravan/delete', async (name) => {
    const removeRef = firebase.database().ref(`/customer/${name.split('/').filter(part => !!part).join('/')}`);
    removeRef.remove();
});


export const createPassenger = createAsyncThunk('caravan/create-passenger', async ({ name, passenger }) => {
    const result = await firebase.database().ref(`/customer/${name.split('/').filter(part => !!part).join('/')}`).push(passenger);
    return flatten(result);
});

export const updatePassenger = createAsyncThunk('caravan/update-passenger', async (passengerPath, passenger) => {
    // const result = await firebase.database().ref(`/customer/${passengerPath}`).push(passenger);
    // return result;
})

export const deletePassenger = createAsyncThunk('caravan/delete-passenger', async () => {


    // TODO:RTK 5 use the logic below to delete passenger photos
    // if (data && data.nationality && data.passportNumber) {
    //     const photoRef = firebase.storage().ref(`${data.nationality}/${data.passportNumber}.jpg`);
    //     photoRef.delete();
    //     const passportRef = firebase.storage().ref(`${data.nationality}/${data.passportNumber}_passport.jpg`);
    //     passportRef.delete();
    // }
})


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
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(getUpcomingCaravans.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(createUpcomingCaravan.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createUpcomingCaravan.fulfilled, (state, action) => {
            state.data = {...state.data, [action.meta.arg]: {
                name: 'first passenger'
            }}
            state.loading = false;
        });
        builder.addCase(createUpcomingCaravan.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(setPastCaravan.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(setPastCaravan.fulfilled, (state, action) => {
            // Delete caravan from caravanData
            // Add the caravan to pastData in caravanSlice
            state.loading = false;
        });
        builder.addCase(setPastCaravan.rejected, (state, action) => {
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