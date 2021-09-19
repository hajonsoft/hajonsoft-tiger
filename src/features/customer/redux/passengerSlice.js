import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from './../../../firebaseapp';


export const getPassengers = createAsyncThunk('passenger/get', async () => {
    const result = await firebase.database().ref('/customer').once('value');
    return flatten(result)
})

export const createPassenger = createAsyncThunk('passenger/create', async () => {

})

export const updatePassenger = createAsyncThunk('passenger/update', async () => {

})

export const deletePassenger = createAsyncThunk('passenger/delete', async () => {


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

const passengerSlice = createSlice({
    name: 'passenger',
    initialState: {
        loading: false,
        error: '',
        data: {}
    },
    extraReducers: (builder) => {
        builder.addCase(getPassengers.pending, (state, action) => {
            state.loading = true;

        });
        builder.addCase(getPassengers.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;

        });
        builder.addCase(getPassengers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(updatePassenger.pending, (state, action) => {

        });
        builder.addCase(updatePassenger.fulfilled, (state, action) => {

        });
        builder.addCase(updatePassenger.rejected, (state, action) => {

        });

        builder.addCase(createPassenger.pending, (state, action) => {

        });
        builder.addCase(createPassenger.fulfilled, (state, action) => {

        });
        builder.addCase(createPassenger.rejected, (state, action) => {

        });

        builder.addCase(deletePassenger.pending, (state, action) => {

        });
        builder.addCase(deletePassenger.fulfilled, (state, action) => {

        });
        builder.addCase(deletePassenger.rejected, (state, action) => {

        });

    }
})

export default passengerSlice.reducer;

// passenger.passIssueDt = omitTimezone(passenger.passIssueDt);
// passenger.passExpireDt = omitTimezone(passenger.passExpireDt);
// passenger.birthDate = omitTimezone(passenger.birthDate);
// const omitTimezone = (fullDate) => {
//   const fullMomentWithoutTimezone = moment(fullDate, "YYYY-MM-DD");
//   if (fullMomentWithoutTimezone.isValid()) {
//     return fullMomentWithoutTimezone.format("YYYY-MM-DD");
//   }
//   return fullDate;
// }