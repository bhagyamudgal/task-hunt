import { configureStore, createSlice } from "@reduxjs/toolkit";

const assignmentDetailsSlice = createSlice({
  name: "assignmentDetails",
  initialState: { displayDetails: false, id: null },
  reducers: {
    setDisplayDetails(state, action) {
      state.displayDetails = action.payload;
    },
    setId(state, action) {
      state.id = action.payload;
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
const createAssignmentSlice = createSlice({
  name: "createAssignment",
  initialState: { displayCreateAssignment: false },
  reducers: {
    setDisplayCreateAssignment(state, action) {
      state.displayCreateAssignment = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    assignmentDetails: assignmentDetailsSlice.reducer,
    changePasswordDetails: changePasswordDetailsSlice.reducer,
    createAssignment: createAssignmentSlice.reducer,
  },
});

export const assignmentDetailsActions = assignmentDetailsSlice.actions;
export const changePasswordDetailsActions = changePasswordDetailsSlice.actions;
export const createAssignmentActions = createAssignmentSlice.actions;
export default store;
