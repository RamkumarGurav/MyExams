import { configureStore } from "@reduxjs/toolkit";
import testSlice from "./testSlice";
import resultSlice from "./resultSlice";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () =>
  configureStore({
    reducer: {
      test: testSlice.reducer,
          result: resultSlice.reducer,
          auth: authSlice.reducer,
          product: productSlice.reducer,
          cart: cartSlice.reducer,
    },
    devTools: true,
  });

// const store = configureStore({
//   reducer: {
//     test: testSlice.reducer,
//     result: resultSlice.reducer,
//     auth: authSlice.reducer,
//     product: productSlice.reducer,
//     cart: cartSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false }),
// });

export const wrapper = createWrapper(makeStore);
