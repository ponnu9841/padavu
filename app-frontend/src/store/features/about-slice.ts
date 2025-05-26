import axiosInstance from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
   loading: boolean;
   about: About | null;
   mission: Mission | null;
   vision: Mission | null;
   error: string;
} = {
   loading: true,
   about: null,
   mission: null,
   vision: null,
   error: "",
};

export const fetchAbout = createAsyncThunk(
   "fetchAbout",
   async (controller?: AbortController) => {
      const response = await axiosInstance.get("/about", {
         signal: controller?.signal,
      });
      return response.data.data;
   }
);

export const fetchMission = createAsyncThunk(
   "fetchMission",
   async (controller?: AbortController) => {
      const response = await axiosInstance.get("/mission", {
         signal: controller?.signal,
      });
      return response.data.data;
   }
);
export const fetchVision = createAsyncThunk(
   "fetchVision",
   async (controller?: AbortController) => {
      const response = await axiosInstance.get("/vision", {
         signal: controller?.signal,
      });
      return response.data.data;
   }
);

export const aboutSlice = createSlice({
   name: "about",
   initialState,
   reducers: {
      resetAboutData() {
         return initialState;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchAbout.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(fetchAbout.fulfilled, (state, action) => {
         state.loading = false;
         state.about = action.payload;
      });
      builder.addCase(fetchAbout.rejected, (state, action) => {
         state.loading = false;
         if (action.error.name === "TypeError") return;
         state.error = action.error.message as string;
      });
      builder.addCase(fetchMission.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(fetchMission.fulfilled, (state, action) => {
         state.loading = false;
         state.mission = action.payload;
      });
      builder.addCase(fetchMission.rejected, (state, action) => {
         state.loading = false;
         if (action.error.name === "TypeError") return;
         state.error = action.error.message as string;
      });
      builder.addCase(fetchVision.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(fetchVision.fulfilled, (state, action) => {
         state.loading = false;
         state.vision = action.payload;
      });
      builder.addCase(fetchVision.rejected, (state, action) => {
         state.loading = false;
         if (action.error.name === "TypeError") return;
         state.error = action.error.message as string;
      });
   },
});

export const { resetAboutData } = aboutSlice.actions;

export default aboutSlice.reducer;
