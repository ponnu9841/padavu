import axiosInstance from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
  loading: boolean;
  data: Client[];
  error: string;
  selectedClient: Client | null;
} = {
  loading: true,
  data: [],
  error: "",
  selectedClient: null,
};

export const fetchClient = createAsyncThunk(
  "fetchClients",
  async (controller?: AbortController) => {
    const response = await axiosInstance.get("/clients", {
      signal: controller?.signal,
    });
    return response.data.data;
  }
);

export const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setSelectedClient: (state, action) => {
      state.selectedClient = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchClient.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchClient.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchClient.rejected, (state, action) => {
      state.loading = false;
      if (action.error.name === "TypeError") return;
      state.error = action.error.message as string;
    });
  },
});

export const { setSelectedClient } = clientSlice.actions;

export default clientSlice.reducer;
