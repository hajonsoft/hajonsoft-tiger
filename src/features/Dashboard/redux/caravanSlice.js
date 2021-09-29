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
    return result.key;
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
    return result.key;
});

export const updatePassenger = createAsyncThunk('caravan/update-passenger', async ({ name, passenger }) => {
    const updateRef = await firebase.database().ref(`/customer/${name}/${passenger._fid}`);
    await updateRef.update(passenger);
    return passenger;
})

export const deletePassenger = createAsyncThunk('caravan/delete-passenger', async ({ name, passenger }) => {
    const removeRef = firebase.database().ref(`/customer/${name}/${passenger._fid}`);
    removeRef.remove();
    try {
        if (passenger && passenger.nationality && passenger.passportNumber && name !== 'online') {
            const photoRef = firebase.storage().ref(`${passenger.nationality}/${passenger.passportNumber}.jpg`);
            photoRef.delete();
            const passportRef = firebase.storage().ref(`${passenger.nationality}/${passenger.passportNumber}_passport.jpg`);
            passportRef.delete();
        }
    } catch (err) {
        console.log(err);
    }
})

export const deleteOnlinePassenger = createAsyncThunk('caravan/delete-online-passenger', async ({ fid }) => {
    try {
        const removeRef = firebase.database().ref(`/customer/online/${fid}`);
        removeRef.remove();
    } catch (err) {
        console.log(err)
    }
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
            state.error = action.error.message;
        });
        builder.addCase(createUpcomingCaravan.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createUpcomingCaravan.fulfilled, (state, action) => {
            state.data = {
                ...state.data, [action.meta.arg]: [{
                    name: 'first passenger'
                }]
            }
            state.loading = false;
        });
        builder.addCase(createUpcomingCaravan.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
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
            state.error = action.error.message;
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
            state.error = action.error.message;
        });
        builder.addCase(createPassenger.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createPassenger.fulfilled, (state, action) => {
            if (!state.data[action.meta.arg.name]) {
                state.data[action.meta.arg.name] = []
            }
            state.data[action.meta.arg.name].push({...action.meta.arg.passenger, _fid: action.payload})
            state.loading = false;
        });
        builder.addCase(createPassenger.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(deletePassenger.fulfilled, (state, action) => {
            state.data[action.meta.arg.packageName] = state.data[action.meta.arg.packageName]?.filter(passenger => passenger._fid !== action.meta.arg?.passenger?._fid);
            state.loading = false;
        });
        builder.addCase(deleteOnlinePassenger.fulfilled, (state, action) => {
            state.data["online"] = state.data?.["online"]?.filter(passenger => passenger._fid !== action.meta.arg?.fid);
            state.loading = false;
        });
        builder.addCase(updatePassenger.fulfilled, (state, action) => {
            const updatedPassenger = state.data[action.meta.arg.name].filter(passenger => passenger._fid !== action.meta.arg.passenger._fid);
            state.data[action.meta.arg.name] = [...updatedPassenger, action.meta.arg.passenger]
            state.loading = false;
        });
    }
});

export default caravanSlice.reducer;