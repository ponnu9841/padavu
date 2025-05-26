import axiosInstance from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
	loading: boolean;
	data: PackagesData[];
	error: string;
	selectedPackage: PackagesData | null;
} = {
	loading: true,
	data: [],
	error: "",
	selectedPackage: null
};

export const fetchPackage = createAsyncThunk(
	"fetchPackages",
	async (controller?: AbortController) => {
		const response = await axiosInstance.get("/packages", {
            signal: controller?.signal,
        });
        return response.data.data;
	}
);

export const packageSlice = createSlice({
	name: "packages",
	initialState,
	reducers: {
		setSelectedPackage(state, action) {
			state.selectedPackage = action.payload
		},
	},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder.addCase(fetchPackage.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchPackage.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchPackage.rejected, (state, action) => {
			state.loading = false;
			if (action.error.name === "TypeError") return;
			state.error = action.error.message as string;
		});
	},
});

export const { setSelectedPackage } = packageSlice.actions

export default packageSlice.reducer;
