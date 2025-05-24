import axiosInstance from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
	loading: boolean;
	data: Banner[];
	error: string;
	selectedBanner: Banner | null;
} = {
	loading: true,
	data: [],
	error: "",
	selectedBanner: null
};

export const fetchBanner = createAsyncThunk(
	"fetchBanners",
	async (controller?: AbortController) => {
		const response = await axiosInstance.get("/banners", {
            signal: controller?.signal,
        });
        return response.data.data;
	}
);

export const bannerSlice = createSlice({
	name: "banners",
	initialState,
	reducers: {
		setSelectedBanner(state, action) {
			state.selectedBanner = action.payload
		},
	},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder.addCase(fetchBanner.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchBanner.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchBanner.rejected, (state, action) => {
			state.loading = false;
			if (action.error.name === "TypeError") return;
			state.error = action.error.message as string;
		});
	},
});

export const { setSelectedBanner } = bannerSlice.actions

export default bannerSlice.reducer;
