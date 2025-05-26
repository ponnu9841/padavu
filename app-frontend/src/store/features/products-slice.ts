import axiosInstance from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
   loading: boolean;
   data: Product[];
   error: string;
   selectedProduct: Product | null;
} = {
   loading: true,
   data: [],
   error: "",
   selectedProduct: null,
};

export const fetchProducts = createAsyncThunk(
   "fetchProducts",
   async (controller?: AbortController) => {
      const response = await axiosInstance.get("/products", {
         signal: controller?.signal,
      });
      return response.data.data;
   }
);

export const productsSlice = createSlice({
   name: "packages",
   initialState,
   reducers: {
      setSelectedProduct(state, action) {
         state.selectedProduct = action.payload;
      },
      resetProducts() {
         return initialState;
      },
   },
   extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(fetchProducts.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
         state.loading = false;
         state.data = action.payload;
      });
      builder.addCase(fetchProducts.rejected, (state, action) => {
         state.loading = false;
         if (action.error.name === "TypeError") return;
         state.error = action.error.message as string;
      });
   },
});

export const { setSelectedProduct, resetProducts } = productsSlice.actions;

export default productsSlice.reducer;
