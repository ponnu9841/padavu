import axiosInstance from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
   loading: false,
   user: {
      name: "",
      email: "",
      id: "",
      type: "",
   },
   error: "",
};

export const fetchUser = createAsyncThunk(
   "fetchUser",
   async ({ controller }: { controller?: AbortController }) => {
      const response = await axiosInstance.get("/user", {
         signal: controller?.signal,
      });
      return response.data.data;
   }
);

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      setUser: (state, action) => {
         return {
            ...state,
            user: action.payload,
         };
      },
   },
   extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(fetchUser.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(fetchUser.fulfilled, (state, action) => {
         state.loading = false;
         state.user = action.payload;
      });
      builder.addCase(fetchUser.rejected, (state, action) => {
         state.loading = false;
         if (action.error.name === "TypeError") return;
         state.error = action.error.message as string;
      });
   },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
