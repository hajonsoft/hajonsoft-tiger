import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { flatten } from '../../../redux/helpers';
import firebase from './../../../firebaseapp';

// action creators
export const getUpcomingCaravans = createAsyncThunk(
  'caravan/upcoming',
  async () => {
    const resultSnapshot = await firebase
      .database()
      .ref('/customer')
      .once('value');
    return flatten(resultSnapshot, 'caravan');
  }
);

export const createUpcomingCaravan = createAsyncThunk(
  'caravan/create',
  async (name) => {
    const result = await firebase
      .database()
      .ref(
        `/customer/${name
          .split('/')
          .filter((part) => !!part)
          .join('/')}`
      )
      .push({
        name: 'DEMO PASSENGER',
      });
    return result.key;
  }
);

export const setPastCaravan = createAsyncThunk(
  'caravan/set-past-caravan',
  async ({ name, passengers }) => {
    for (let passenger of passengers) {
      await firebase
        .database()
        .ref(
          `/past/${name
            .split('/')
            .filter((part) => !!part)
            .join('/')}`
        )
        .push(passenger);
    }
    const removeRef = firebase.database().ref(
      `/customer/${name
        .split('/')
        .filter((part) => !!part)
        .join('/')}`
    );
    removeRef.remove();
    return { updated: passengers };
  }
);

export const deleteUpcomingCaravan = createAsyncThunk(
  'caravan/delete',
  async (name) => {
    const removeRef = firebase.database().ref(
      `/customer/${name
        .split('/')
        .filter((part) => !!part)
        .join('/')}`
    );
    removeRef.remove();
  }
);

export const deleteExpiredPassports = createAsyncThunk(
  'caravan/delete-expired',
  async ({ passengers, caravan }) => {
    for (const passenger of passengers) {
      const removeRef = firebase.database().ref(
        `/customer/${caravan
          .split('/')
          .filter((part) => !!part)
          .join('/')}/${passenger._fid}`
      );
      removeRef.remove();
    }
  }
);

export const createPassenger = createAsyncThunk(
  'caravan/create-passenger',
  async ({ name, passenger }) => {
    const result = await firebase
      .database()
      .ref(
        `/customer/${name
          .split('/')
          .filter((part) => !!part)
          .join('/')}`
      )
      .push(passenger);
    return result.key;
  }
);

export const updatePassenger = createAsyncThunk(
  'caravan/update-passenger',
  async ({ name, passenger }) => {
    const updateRef = await firebase
      .database()
      .ref(`/customer/${name}/${passenger._fid}`);
    await updateRef.update(passenger);
    return passenger;
  }
);

export const deletePassenger = createAsyncThunk(
  'caravan/delete-passenger',
  async ({ packageName, passenger }) => {
    const removeRef = firebase
      .database()
      .ref(`/customer/${packageName}/${passenger._fid}`);
    removeRef.remove();
    try {
      if (
        passenger &&
        passenger.nationality &&
        passenger.passportNumber &&
        packageName !== 'online'
      ) {
        const photoRef = firebase
          .storage()
          .ref(`${passenger.nationality}/${passenger.passportNumber}.jpg`);
        photoRef.delete();
        const passportRef = firebase
          .storage()
          .ref(
            `${passenger.nationality}/${passenger.passportNumber}_passport.jpg`
          );
        passportRef.delete();
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteOnlinePassenger = createAsyncThunk(
  'caravan/delete-online-passenger',
  async ({ fid }) => {
    try {
      const removeRef = firebase.database().ref(`/customer/online/${fid}`);
      removeRef.remove();
    } catch (err) {
      console.log(err);
    }
  }
);

export const movePassenger = createAsyncThunk(
  'caravan/move-passenger',
  async ({ newCaravan, oldCaravan, passenger }) => {
    const result = await firebase
      .database()
      .ref(
        `/customer/${newCaravan
          .split('/')
          .filter((part) => !!part)
          .join('/')}`
      )
      .push(passenger);
    const removeRef = firebase
      .database()
      .ref(`/customer/${oldCaravan}/${passenger._fid}`);
    removeRef.remove();
    return result.key;
  }
);

export const movePassengers = createAsyncThunk(
  'caravan/move-passengers',
  async ({ newCaravan, oldCaravan, passengers }) => {
    const results = [];
    for (const passenger of passengers) {
      const result = await firebase
        .database()
        .ref(
          `/customer/${newCaravan
            .split('/')
            .filter((part) => !!part)
            .join('/')}`
        )
        .push(passenger);
      const removeRef = firebase
        .database()
        .ref(`/customer/${oldCaravan}/${passenger._fid}`);
      removeRef.remove();
      results.push(result.key);
    }
    return results;
  }
);

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
        ...state.data,
        [action.meta.arg]: [
          {
            name: 'DEMO PASSENGER',
          },
        ],
      };
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
      delete state.data[action.meta.arg.name];
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
    builder.addCase(deleteExpiredPassports.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteExpiredPassports.fulfilled, (state, action) => {
      const deletedIds = action.meta.arg.passengers.map((p) => p._fid);
      state.data[action.meta.arg.caravan] = state.data[
        action.meta.arg.caravan
      ].filter((p) => !deletedIds.includes(p._fid));
      state.loading = false;
    });
    builder.addCase(deleteExpiredPassports.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(createPassenger.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createPassenger.fulfilled, (state, action) => {
      if (!state.data[action.meta.arg.name]) {
        state.data[action.meta.arg.name] = [];
      }
      state.data[action.meta.arg.name].push({
        ...action.meta.arg.passenger,
        _fid: action.payload,
      });
      state.loading = false;
    });
    builder.addCase(createPassenger.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deletePassenger.fulfilled, (state, action) => {
      state.data[action.meta.arg.packageName] = state.data[
        action.meta.arg.packageName
      ]?.filter(
        (passenger) => passenger._fid !== action.meta.arg?.passenger?._fid
      );
      state.loading = false;
    });
    builder.addCase(movePassenger.fulfilled, (state, action) => {
      if (!state.data[action.meta.arg.newCaravan]) {
        state.data[action.meta.arg.newCaravan] = [];
      }
      state.data[action.meta.arg.newCaravan].push({
        ...action.meta.arg.passenger,
        _fid: action.payload,
      });
      state.data[action.meta.arg.oldCaravan] = state.data[
        action.meta.arg.oldCaravan
      ]?.filter(
        (passenger) => passenger._fid !== action.meta.arg?.passenger?._fid
      );

      state.loading = false;
    });
    builder.addCase(movePassenger.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(movePassengers.fulfilled, (state, action) => {
      if (!state.data[action.meta.arg.newCaravan]) {
        state.data[action.meta.arg.newCaravan] = [];
      }

      for(let i = 0; i < action.meta.arg.passengers.length; i++) {
        state.data[action.meta.arg.newCaravan].push({
            ...action.meta.arg?.passengers?.[i],
            _fid: action.payload?.[i],
          });
          state.data[action.meta.arg.oldCaravan] = state.data[
            action.meta.arg.oldCaravan
          ]?.filter(
            (passenger) => passenger._fid !== action.meta.arg?.passengers?.[i]?._fid
          );
      }

      state.loading = false;
    });
    builder.addCase(movePassengers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteOnlinePassenger.fulfilled, (state, action) => {
      state.data['online'] = state.data?.['online']?.filter(
        (passenger) => passenger._fid !== action.meta.arg?.fid
      );
      state.loading = false;
    });
    builder.addCase(updatePassenger.fulfilled, (state, action) => {
      const updatedPassenger = state.data[action.meta.arg.name].filter(
        (passenger) => passenger._fid !== action.meta.arg.passenger._fid
      );
      state.data[action.meta.arg.name] = [
        ...updatedPassenger,
        action.meta.arg.passenger,
      ];
      state.loading = false;
    });
  },
});

export default caravanSlice.reducer;
