import axiosInstance from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
   loading: boolean;
   data: WorksResponse | null;
   pageNo: number;
   error: string;
   selectedWork: Work | null;
} = {
   loading: true,
   data: null,
   pageNo: 1,
   error: "",
   selectedWork: null,
};

export const fetchWork = createAsyncThunk(
   "fetchWork",
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
         `/works?page=${pageNo}&page_size=${pageSize}`,
         {
            signal: controller?.signal,
         }
      );
      return response.data.data;
   }
);

export const worksSlice = createSlice({
   name: "works",
   initialState,
   reducers: {
      setPageNo: (state, action) => {
         state.pageNo = action.payload;
      },
      resetPageNo: (state) => {
         state.pageNo = initialState.pageNo;
      },
      setSelectedWork: (state, action) => {
         state.selectedWork = action.payload;
      },
   },
   extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(fetchWork.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(fetchWork.fulfilled, (state, action) => {
         state.loading = false;
         state.data = action.payload;
      });
      builder.addCase(fetchWork.rejected, (state, action) => {
         state.loading = false;
         if (action.error.name === "TypeError") return;
         state.error = action.error.message as string;
      });
   },
});

export const { setPageNo, resetPageNo, setSelectedWork } = worksSlice.actions;

export default worksSlice.reducer;
