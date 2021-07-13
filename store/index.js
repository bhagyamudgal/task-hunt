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

const store = configureStore({
  reducer: { assignmentDetails: assignmentDetailsSlice.reducer },
});

export const assignmentDetailsActions = assignmentDetailsSlice.actions;
export default store;
