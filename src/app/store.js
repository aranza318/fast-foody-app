import { configureStore } from "@reduxjs/toolkit";
import shopSlice from '../features/shop/shopSlice'
import cartSlice from '../features/cart/cartSlice'
import { shopApi } from "../services/shopService";
import authSlice from "../features/auth/authSlice";
import { receiptApi } from "../services/receiptsServices";
import { authApi } from "../services/authService";
import { userApi } from "../services/userService";
import { mapApi } from "../services/mapService";

export const store = configureStore({
    reducer:{
        shopSlice,
        cartSlice,
        authSlice,
        [shopApi.reducerPath]: shopApi.reducer,
        [receiptApi.reducerPath]: receiptApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [mapApi.reducerPath]: mapApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
    .concat(shopApi.middleware)
    .concat(authApi.middleware)
    .concat(receiptApi.middleware)
    .concat(userApi.middleware)
    .concat(mapApi.middleware)
})