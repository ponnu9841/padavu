import axiosInstance from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
  loading: boolean;
  seoTags: Seo[];
  error: any; //eslint-disable-line
} = {
  loading: true,
  seoTags: [],
  error: "",
};

export const fetchSeo = createAsyncThunk(
  "fetchSeo",
  async (controller?: AbortController) => {
    const response = await axiosInstance.get("/seoTags", {
      signal: controller?.signal,
    });
    return response.data.data;
  }
);

export const seoSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchSeo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSeo.fulfilled, (state, action) => {
      state.loading = false;
      state.seoTags = action.payload;
    });
    builder.addCase(fetchSeo.rejected, (state, action) => {
      state.loading = false;
      if (action.error.name === "TypeError") return;
      state.error = action.error.message as string;
    });
  },
});

export default seoSlice.reducer;
