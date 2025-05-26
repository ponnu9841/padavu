import axiosInstance from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
   loading: boolean;
   blogs: BlogResponse | null;
   selectedBlog: Blog | null;
   pageNo: number;
   error: string;
} = {
   loading: true,
   blogs: null,
   pageNo: 1,
   selectedBlog: null,
   error: "",
};

export const fetchBlogs = createAsyncThunk(
   "fetchBlogs",
   async ({
      pageNo = 1,
      pageSize = 8,
      controller,
   }: {
      pageNo?: number;
      pageSize?: number;
      controller?: AbortController;
   }) => {
      const response = await axiosInstance.get(
         `/blogs?page=${pageNo}&page_size=${pageSize}`,
         {
            signal: controller?.signal,
         }
      );
      return response.data.data;
   }
);

export const blogSlice = createSlice({
   name: "contact",
   initialState,
   reducers: {
      setSelectedBlog(state, action) {
         state.selectedBlog = action.payload;
      },
      resetBlogData() {
         return initialState;
      },
      setPageNo(state, action) {
         state.pageNo = action.payload;
      },
   },
   extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(fetchBlogs.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(fetchBlogs.fulfilled, (state, action) => {
         state.loading = false;
         state.blogs = action.payload;
      });
      builder.addCase(fetchBlogs.rejected, (state, action) => {
         state.loading = false;
         if (action.error.name === "TypeError") return;
         state.error = action.error.message as string;
      });
   },
});

export const { setSelectedBlog, resetBlogData, setPageNo } = blogSlice.actions;

export default blogSlice.reducer;
