import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { displayDetails: false };

const assignmentDetailsSlice = createSlice({
  name: "assignmentDetails",
  initialState: { displayDetails: false },
  reducers: {
    setDisplayDetails(state, action) {
      state.displayDetails = action.payload;
    },
  },
});
const changePasswordDetailsSlice = createSlice({
  name: "changePasswordDetails",
  initialState: { displayChangePasswordDetails: false },
  reducers: {
    setDisplayChangePasswordDetails(state, action) {
      state.displayChangePasswordDetails = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    assignmentDetails: assignmentDetailsSlice.reducer,
    changePasswordDetails: changePasswordDetailsSlice.reducer,
  },
});

export const assignmentDetailsActions = assignmentDetailsSlice.actions;
export const changePasswordDetailsActions = changePasswordDetailsSlice.actions;
export default store;
