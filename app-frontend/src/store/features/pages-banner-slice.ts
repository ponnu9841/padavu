import axiosInstance from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
  loading: boolean;
  banners: PagesBanner[] | [];
  error: any; //eslint-disable-line
} = {
  loading: true,
  banners: [],
  error: "",
};

export const fetchPagesBanner = createAsyncThunk(
  "fetchPagesBanner",
  async (controller?: AbortController) => {
    const response = await axiosInstance.get("/pagesBanner", {
      signal: controller?.signal,
    });
    return response.data.data;
  }
);

export const pagesBannrSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPagesBanner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPagesBanner.fulfilled, (state, action) => {
      state.loading = false;
      state.banners = action.payload;
    });
    builder.addCase(fetchPagesBanner.rejected, (state, action) => {
      state.loading = false;
      if (action.error.name === "TypeError") return;
      state.error = action.error.message as string;
    });
  },
});

export default pagesBannrSlice.reducer;
