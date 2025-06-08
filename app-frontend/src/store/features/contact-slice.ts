import axiosInstance from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
  loading: boolean;
  data: Contact | null;
  error: any; //eslint-disable-line
  selectedContact: Contact | null;
} = {
  loading: true,
  data: null,
  error: "",
  selectedContact: null,
};

export const fetchContact = createAsyncThunk(
  "fetchContact",
  async (controller?: AbortController) => {
    const response = await axiosInstance.get("/contact", {
      signal: controller?.signal,
    });
    return response.data.data;
  }
);

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setSelectedContact: (state, action) => {
      state.selectedContact = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchContact.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchContact.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchContact.rejected, (state, action) => {
      state.loading = false;
      if (action.error.name === "TypeError") return;
      state.error = action.error.message as string;
    });
  },
});

export const { setSelectedContact } = contactSlice.actions;

export default contactSlice.reducer;
