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
  try {
    for (const [key, value] of Object.entries(obj)) {
      array.push({
        name: key,
        columns: Object.values(value)[0].columns
      })
    }
  } catch (err) {
    console.log(err)
  }
  return array;
};

export const getAllReports = createAsyncThunk(
  "report/get",
  async () => {
    const snapshot = await firebase
      .database()
      .ref(`/report`)
      .once("value");

    return snapshot.toJSON();
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
    data: [],
  },
  extraReducers: (builder) => {
    builder.addCase(createReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createReport.fulfilled, (state, action) => {
      state.data.push({ ...action.meta.arg.reportData, name: action.meta.arg.reportName });
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
      state.data = convertObjToArray(action.payload);
      state.loading = false;
    });
    builder.addCase(getAllReports.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteReport.fulfilled, (state, action) => {
      const newData = state.data.filter((report) =>
        report.name !== action.meta.arg.reportName
      );
      state.data = newData
      state.loading = false;
    });
  },
});


export default reportSlice.reducer;
