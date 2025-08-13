import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    caption: "",
    loading: false,
    error: "",
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = "";
    },
    loadCaption: (state, action) => {
      state.caption = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { loadCaption, setLoading, setError } = postSlice.actions;
export default postSlice.reducer;
