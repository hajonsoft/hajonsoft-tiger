import { combineReducers, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

// TODO: Obviously this reducer implementation was intended to b generic but it doen't work for /visaSystem correctly. or at least it needs to be reviewed
// state.data is confusing

const emptyState = {
  data: {},
  loading: false,
  error: "",
};

const applyStart = (state, action) => {
  state.loading = true;
  state.req = action.payload;
};
const applyFail = (state, action) => {
  state.loading = false;
  state.error = action.payload?.message || action.payload;
};

const fetchTravellersSuccess = (state, action) => {
  state.loading = false;
  state.error = "";
  state.data = _.omit(state.data, "No data found");
  const caravans = { ...action.payload };
  const caravanNames = Object.keys(caravans);
  for (const caravan of caravanNames) {
    for (const traveller of caravans[caravan]) {
      if (traveller.passIssueDt && traveller.passIssueDt.length > 10) {
        traveller.passIssueDt = traveller.passIssueDt.substring(0, 10);
      }
      if (traveller.passExpireDt && traveller.passExpireDt.length > 10) {
        traveller.passExpireDt = traveller.passExpireDt.substring(0, 10);
      }
      if (traveller.birthDate && traveller.birthDate.length > 10) {
        traveller.birthDate = traveller.birthDate.substring(0, 10);
      }
    }
  }
  state.data = { ...caravans };
};

const applyCreateSuccess = (state, action) => {
  state.loading = false;
  state.error = "";
  state.data = _.omit(state.data, "No data found");
  const caravan = Object.keys(action.payload)[0];
  if (!Object.keys(state.data).includes(caravan)) {
    state.data[caravan] = [];
  }
  state.data[caravan].push(
    Object.values(Object.values(action.payload)[0])[0][0]
  );
};

const applyFetchVisaSystemSuccess = (state, action) => {
  state.loading = false;
  state.error = "";
  state.data = action.payload;
};

const applyCreateVisaSystemSuccess = (state, action) => {
  state.loading = false;
  state.error = "";
  state.data.push(action.payload);
};

const applyUpdateSuccess = (state, action) => {
  state.loading = false;
  state.error = "";
  const pathParts = action.payload.path.split("/");
  if (pathParts.length === 3) {
    const caravan = pathParts[1];
    let updated = state.data[caravan].find((x) => x._fid === pathParts[2]);
    _.assign(updated, action.payload.data);
  }
};

const applyDeleteSuccess = (state, action) => {
  state.loading = false;
  state.error = "";

  //TODO: Implement delete success. Make sure this delete is relevant to the correct slice
};

const applyDeleteVisaSystemSuccess = (state, action) => {
  state.loading = false;
  state.error = "";
  if (action.payload.fid) {
    state.data = state.data.filter((x) => x._fid !== action.payload.fid);
  }
};

export const travellerSlice = createSlice({
  name: "traveller",
  initialState: emptyState,
  reducers: {
    fetch: (state, action) => applyStart(state, action),
    fetchSuccess: (state, action) => fetchTravellersSuccess(state, action),
    create: (state, action) => applyStart(state, action),
    createSuccess: (state, action) => applyCreateSuccess(state, action),
    update: (state, action) => applyStart(state, action),
    updateSuccess: (state, action) => applyUpdateSuccess(state, action),
    delete: (state, action) => applyStart(state, action),
    deleteSuccess: (state, action) => applyDeleteSuccess(state, action),
    fail: (state, action) => applyFail(state, action),
  },
});

export const systemSlice = createSlice({
  name: "system",
  initialState: emptyState,
  reducers: {
    fetch: (state, action) => applyStart(state, action),
    fetchSuccess: (state, action) => applyFetchVisaSystemSuccess(state, action),
    create: (state, action) => applyStart(state, action),
    createSuccess: (state, action) =>
      applyCreateVisaSystemSuccess(state, action),
    update: (state, action) => applyStart(state, action),
    updateSuccess: (state, action) => applyUpdateSuccess(state, action),
    delete: (state, action) => applyStart(state, action),
    deleteSuccess: (state, action) =>
      applyDeleteVisaSystemSuccess(state, action),
    fail: (state, action) => applyFail(state, action),
  },
});

export const userSlice = createSlice({
  name: "user",
  initialState: emptyState,
  reducers: {
    fetch: (state, action) => applyStart(state, action),
    // success: (state, action) => applySuccess(state, action),
    fail: (state, action) => applyFail(state, action),
  },
});

const reducer = combineReducers({
  user: userSlice.reducer,
  traveller: travellerSlice.reducer,
  system: systemSlice.reducer,
});

export default reducer;
