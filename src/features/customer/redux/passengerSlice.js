import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getPassengers = createAsyncThunk('passenger/get', async () => {

})

export const createPassenger = createAsyncThunk('passenger/create', async () => {

})

export const updatePassenger = createAsyncThunk('passenger/update', async () => {

})

export const deletePassenger = createAsyncThunk('passenger/delete', async () => {

})



const passengerSlice = createSlice({
    name: 'passenger',
    initialState: {
        loading: false,
        error: '',
        data: {}
    },
    extraReducers: (builder) => {
        builder.addCase(getPassengers.pending, (state, action) => {

        });
        builder.addCase(getPassengers.fulfilled, (state, action) => {

        });
        builder.addCase(getPassengers.rejected, (state, action) => {

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