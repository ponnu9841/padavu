import axiosInstance from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
  loading: boolean;
  data: Experts[];
  error: string;
  selectedExpert: Experts | null;
} = {
  loading: true,
  data: [],
  error: "",
  selectedExpert: null,
};

export const fetchExperts = createAsyncThunk(
  "fetchExperts",
  async (controller?: AbortController) => {
    const response = await axiosInstance.get("/experts", {
      signal: controller?.signal,
    });
    return response.data.data;
  }
);

export const expertsSlice = createSlice({
  name: "experts",
  initialState,
  reducers: {
    setSelectedExpert: (state, action) => {
      state.selectedExpert = action.payload;
    },
    resetExperts: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchExperts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchExperts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchExperts.rejected, (state, action) => {
      state.loading = false;
      if (action.error.name === "TypeError") return;
      state.error = action.error.message as string;
    });
  },
});

export const { setSelectedExpert, resetExperts } = expertsSlice.actions;

export default expertsSlice.reducer;
