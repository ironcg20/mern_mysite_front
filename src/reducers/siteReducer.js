import { createSlice } from "@reduxjs/toolkit";

const siteSlice = createSlice({
  name: "site",
  initialState: {
    tabIndex: 0,
  },

  reducers: {
    setTabIndex: (state, action) => {
      state.tabIndex = action.payload.tabIndex;
    },
  },
});

export default siteSlice.reducer;
export const { setTabIndex } = siteSlice.actions;
