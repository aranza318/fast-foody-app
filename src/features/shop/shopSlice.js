import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
    name:'shop',
    initialState:{
        value:{
            categorySelected: "",
            productsFilteredByCategory:[],
            productId: null,
            productInCart: null,
            productFilteredInCart: [],
            receipts: [],
            error: null,
            places: []
        }
    },
    reducers:{
        setCategory: (state, action) => {
            state.value.categorySelected = action.payload
        },
        setProductId: (state, action)=>{
            state.value.productId = action.payload
        },
        setProductIncart: (state, action)=>{
            state.value.productFilteredInCart = cartItems.map((item) => item.quantity === action.payload);
            state.value.productInCart = action.payload
        },
        setReceipts: (state, action) => {
            state.value.receipts = action.payload;
            state.value.error = null;
        },
        setReceiptsError: (state, action) => {
            state.value.error = action.payload;
        },
        setPlaces: (state, action) => {
            state.value.places = action.payload;
            state.value.error = null;
        },
        setPlacesError: (state, action) => {
            state.value.error = action.payload;
        },
        removePlace: (state,action)=>{
            state.value.places = state.value.places.filter(item=item.id!==action.payload)
        },
    }
})

export const {setCategory, setProductId, setProductIncart, setReceipts, setReceiptsError, setPlaces, setPlacesError, removePlace} = shopSlice.actions

export default shopSlice.reducer