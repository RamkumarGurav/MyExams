import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./api.js";
import { HYDRATE } from 'next-redux-wrapper';

//--------------------------------------------------------

//--------------------------------------------------------

//--------------------------------------------------------

//--------------------------------------------------------
// export const createProduct = createAsyncThunk(
//   "product/createProduct",
//   async ({ formValue, navigate, toast }, { rejectWithValue }) => {
//     try {
//       const response = await api.createProduct(formValue);
//       return response.data;
//     } catch (error) {
//       toast.error(error.response.data.message);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
// //--------------------------------------------------------

// //--------------------------------------------------------
// export const getAllProducts = createAsyncThunk(
//   "product/getAllProducts",
//   async (
//     { currentPage, keyword, price, category, ratings, navigate, toast },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await api.getAllProducts(
//         currentPage,
//         keyword,
//         price,
//         category,
//         ratings
//       );
//       return response.data;
//     } catch (error) {
//       // toast.error(error.response.data.message);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

//--------------------------------------------------------

//--------------------------------------------------------
// export const getProduct = createAsyncThunk(
//   "product/getProduct",
//   async ({ id, toast }, { rejectWithValue }) => {
//     try {
//       const response = await api.getProduct(id);
//       return response.data;
//     } catch (error) {
//       // toast.error(error.response.data.message);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
// //--------------------------------------------------------

//--------------------------------------------------------
const productSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
    products: [],
    userProducts: [],
    currentPage: 1,
    numberOfPages: null,
    resultsPerPage: null,
    productsCount: null,
    filteredProductsCount: null,
    error: "",
    loading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;


    },

    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.product,
        };
      },
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(createProduct.pending, (state, action) => {
  //       state.loading = true;
  //     })
  //     .addCase(createProduct.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.product = action.payload.data.product;
  //       state.products = [...state.products, action.payload.data.product];
  //     })
  //     .addCase(createProduct.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload.message;
  //     });

  //   builder
  //     .addCase(getAllProducts.pending, (state, action) => {
  //       state.loading = true;
  //     })
  //     .addCase(getAllProducts.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.products = action.payload.data.products;
  //       state.currentPage = action.payload.data.currentPage;
  //       state.resultsPerPage = action.payload.data.resultsPerPage;
  //       state.productsCount = action.payload.data.productsCount;
  //       state.filteredProductsCount = action.payload.data.filteredProductsCount;
  //       state.numberOfPages = action.payload.data.numberOfPages;
  //     })
  //     .addCase(getAllProducts.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload.message;
  //     });

  //   builder
  //     .addCase(getProduct.pending, (state, action) => {
  //       state.loading = true;
  //     })
  //     .addCase(getProduct.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.product = action.payload.data.product;
  //     })
  //     .addCase(getProduct.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload.message;
  //     });
  // },
});

export const { setCurrentPage } = productSlice.actions;

// export const selectProduct= (state) =>state.product.product;
// export const selectProducts= (state) => state.product.products;
// export const selectUserProducts= (state) => state.product.userProducts;
// export const selectCurrentPage= (state) => state.product.currentPage;
// export const selectNumberOfPages= (state) => state.product.numberOfPages;
// export const selectResultsPerPage= (state) => state.product.resultsPerPage;
// export const selectProductsCount= (state) => state.product.productsCount;
// export const selectFilteredProductsCount= (state) => state.product.filteredProductsCount;

export default productSlice;
