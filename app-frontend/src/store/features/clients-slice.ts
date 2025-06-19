import axiosInstance from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
   loading: boolean;
   data: ClientsResponse | null;
   pageNo: number;
   error: string;
   selectedClient: Client | null;
} = {
   loading: true,
   data: null,
   pageNo: 1,
   error: "",
   selectedClient: null,
};

export const fetchClient = createAsyncThunk(
   "fetchClients",
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
         `/clients?page=${pageNo}&page_size=${pageSize}`,
         {
            signal: controller?.signal,
         }
      );
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
      setPageNo: (state, action) => {
         state.pageNo = action.payload;
      },
      resetclientState: () => {
         return initialState;
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

export const { setSelectedClient, setPageNo } = clientSlice.actions;

export default clientSlice.reducer;
