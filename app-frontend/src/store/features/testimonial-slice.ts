import axiosInstance from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
   loading: boolean;
   data: Testimonial[];
   error: string;
   selectedTestimonial: Testimonial | null;
} = {
   loading: true,
   data: [],
   error: "",
   selectedTestimonial: null,
};

export const fetchTestimonial = createAsyncThunk(
   "fetchTestimonial",
   async (controller?: AbortController) => {
      const response = await axiosInstance.get("/testimonials", {
         signal: controller?.signal,
      });
      return response.data.data;
   }
);

export const testimonialSlice = createSlice({
   name: "testimonials",
   initialState,
   reducers: {
      setSelectedTestimonial: (state, action) => {
         state.selectedTestimonial = action.payload;
      },
      clearTestimonial: () => {
         return initialState;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchTestimonial.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(fetchTestimonial.fulfilled, (state, action) => {
         state.loading = false;
         state.data = action.payload;
      });
      builder.addCase(fetchTestimonial.rejected, (state, action) => {
         state.loading = false;
         if (action.error.name === "TypeError") return;
         state.error = action.error.message as string;
      });
   },
});

export const { setSelectedTestimonial, clearTestimonial } =
   testimonialSlice.actions;

export default testimonialSlice.reducer;
