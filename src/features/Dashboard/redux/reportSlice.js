import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "./../../../firebaseapp";

export const createReport = createAsyncThunk(
  "report/create",
  async ({ reportName, reportData }) => {
    const result = await firebase
      .database()
      .ref(
        `/report/${reportName
          .split("/")
          .filter((part) => !!part)
          .join("/")}`
      )
      .push(reportData);
    return result.key;
  }
);

const convertObjToArray = (obj) => {
  const array = [];

  Object.keys(obj).forEach((key) => {
    array.push({ [key]: obj[key] });
  });

  return array.map((val, index) => val[index.toString()]);
};

export const getAllReports = createAsyncThunk(
  "report/get",
  async () => {
    const snapshot = await firebase
      .database()
      .ref(`/report`)
      .once("value");

    const caravanReports = snapshot.toJSON();

    const results = Object.keys(caravanReports).map((reportName) => {
      const reportObj = caravanReports[reportName];
      return { [reportName]: reportObj[Object.keys(reportObj)[0]] };
    });

    return results.map((result) => {
      const d = result[Object.keys(result)[0]];

      const { columns, data } = d;

      return {
        [Object.keys(result)[0]]: {
          columns: convertObjToArray(columns),
          data: convertObjToArray(data),
        },
      };
    });
  }
);

export const deleteReport = createAsyncThunk(
  "report/delete",
  async ({ reportName }) => {
    try {
      const removeRef = firebase
        .database()
        .ref(`/report/${reportName}`);
      await removeRef.remove();
    } catch (err) {
      console.log(err);
    }
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState: {
    loading: false,
    error: "",
    data: {},
  },
  extraReducers: (builder) => {
    builder.addCase(createReport.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createReport.fulfilled, (state, action) => {
      // if (!state.data[action.meta.arg.caravanName]) {
      //   state.data[action.meta.arg.caravanName] = [];
      // }

      // const newReport = {
      //   [action.meta.arg.reportName]: {
      //     ...action.meta.arg.reportData,
      //   },
      // };

      // state.data[action.meta.arg.caravanName].unshift(newReport);

      state.loading = false;
    });
    builder.addCase(createReport.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAllReports.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllReports.fulfilled, (state, action) => {
      // state.data = {
      //   ...state.data,
      //   [action.meta.arg.caravanName]: action.payload,
      // };
      state.loading = false;
    });
    builder.addCase(getAllReports.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteReport.fulfilled, (state, action) => {

      // const newData = state.data[action.meta.arg.caravanName].filter((report) => {
      //   return Object.keys(report)[0] !== action.meta.arg.reportName;
      // });

      // state.data[action.meta.arg.caravanName] = newData

      state.loading = false;
    });
  },
});


export default reportSlice.reducer;
