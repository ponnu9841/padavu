import axiosInstance from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState: {
  loading: boolean;
  vlogs: VlogResponse | null;
  selectedVlog: Vlog | null;
  pageNo: number;
  error: string;
} = {
  loading: true,
  vlogs: null,
  pageNo: 1,
  selectedVlog: null,
  error: "",
};

export const fetchVlogs = createAsyncThunk(
  "fetchVlogs",
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
      `/vlog?page=${pageNo}&page_size=${pageSize}`,
      {
        signal: controller?.signal,
      }
    );
    return response.data.data;
  }
);

export const blogSlice = createSlice({
  name: "vlogs",
  initialState,
  reducers: {
    setSelectedVlog(state, action) {
      state.selectedVlog = action.payload;
    },
    resetVlogData() {
      return initialState;
    },
    setPageNo(state, action) {
      state.pageNo = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchVlogs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchVlogs.fulfilled, (state, action) => {
      state.loading = false;
      state.vlogs = action.payload;
    });
    builder.addCase(fetchVlogs.rejected, (state, action) => {
      state.loading = false;
      if (action.error.name === "TypeError") return;
      state.error = action.error.message as string;
    });
  },
});

export const { setSelectedVlog, resetVlogData, setPageNo } = blogSlice.actions;

export const getVlogsLoading = (state: RootState) => state.vlogs.loading;
export const getVlogs = (state: RootState) => state.vlogs.vlogs;
export const getSelectedVlog = (state: RootState) =>
  state.vlogs.selectedVlog;
export const getVlogsPageNo = (state: RootState) => state.vlogs.pageNo;

export default blogSlice.reducer;
