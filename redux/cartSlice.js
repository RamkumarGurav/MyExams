/* eslint-disable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./api.js";
const client = typeof window !== "undefined";
import { HYDRATE } from "next-redux-wrapper";

export const createOrder = createAsyncThunk(
  "cart/createOrder",
  async ({ orderDetails }, { rejectWithValue }) => {
    try {
      const response = await api.createOrder(orderDetails);
      // toast.success("order created Successfully");
      // console.log("Order created Successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems:
      typeof window !== "undefined"
        ? localStorage.getItem("cartItems")
          ? JSON.parse(localStorage.getItem("cartItems"))
          : []
        : [],
    shippingInfo:
      typeof window !== "undefined"
        ? localStorage.getItem("shippingInfo")
          ? JSON.parse(localStorage.getItem("shippingInfo"))
          : null
        : null,
    orderDetails:
      typeof window !== "undefined"
        ? localStorage.getItem("orderDetails")
          ? JSON.parse(localStorage.getItem("orderDetails"))
          : []
        : [],
    orderedList:
      typeof window !== "undefined"
        ? localStorage.getItem("orderedList")
          ? JSON.parse(localStorage.getItem("orderedList"))
          : []
        : [],
    orderFinished: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (cartItem) => item.product === cartItem.product
      );
      if (isItemExist) {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem.product === isItemExist.product ? item : cartItem
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // console.log(state.cartItems);
      localStorage.setItem("cartItems", JSON.stringify([...state.cartItems]));
    },
    setCartItems: (state, action) => {
      if (action.payload?.length > 0) {
        state.cartItems = [...action.payload];
        localStorage.setItem("cartItems", JSON.stringify([...state.cartItems]));
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item, i) => item.product !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify([...state.cartItems]));
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(action.payload));
    },
    saveOrderDetails: (state, action) => {
      state.orderDetails = action.payload;
      localStorage.setItem("orderDetails", JSON.stringify(action.payload));
    },
    removeOrderDetails: (state, action) => {
      state.orderDetails = null;
      localStorage.removeItem("orderDetails");
    },
    addToOrderedList: (state, action) => {
      state.orderedList = [...state.orderedList, action.payload];
      localStorage.setItem(
        "orderedList",
        JSON.stringify([...state.orderedList, action.payload])
      );
    },
    setOrderFinished: (state, action) => {
      state.orderFinished = action.payload;
    },
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.cart,
        };
      },
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(createOrder.pending, (state, action) => {})
  //     .addCase(createOrder.fulfilled, (state, action) => {
  //       // state.orderDetails = null;
  //       // localStorage.removeItem("orderDetails");
  //     })
  //     .addCase(createOrder.rejected, (state, action) => {});
  // },
});

export const {
  addToCart,
  setCartItems,
  removeFromCart,
  saveShippingInfo,
  saveOrderDetails,
  removeOrderDetails,
  clearCartItems,
  addToOrderedList,
  setOrderFinished,
} = cartSlice.actions;

// export const selectCartItems= (state) => state.cart.cartItems;
// export const selectShippingInfo= (state) => state.cart.shippingInfo;
// export const selectOrderDetails= (state) => state.cart.orderDetails;
// export const selectOrderedList= (state) => state.cart.orderedList;

export default cartSlice;
