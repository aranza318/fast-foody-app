import { createSlice } from "@reduxjs/toolkit";
import { calculate_total } from "../../utils/functions";

export const cartSlice = createSlice({
    name:'cart',
    initialState:{
        value:{
            cartItems:[],
            user:"demo",
            total: null,
            cartLenght: 0,
            updateAt: Date.now().toLocaleString()
        }
    },
    reducers:{
        addItem: (state, action)=>{
            const productRepeated = state.value.cartItems.find(item=>item.id===action.payload.id)
            if(!productRepeated){
                state.value.cartItems.push(action.payload)
                state.value.cartLenght += 1
            } else {
                state.value.cartItems.map(item=>{
                    if(item.id===action.payload.id){
                       item.quantity += 1
                       return item
                    }
                    return item

                })
            }

            const total = calculate_total(state.value.cartItems)
            state.value={
                ...state.value,
                total,
                updateAt: new Date().toLocaleString()
            }
        },
        removeItem: (state, action)=>{
            const { id, quantity } = action.payload;
            const productIndex = state.value.cartItems.findIndex(item => item.id === id);

           if (productIndex !== -1) {
           const product = state.value.cartItems[productIndex];
        
           if (product.quantity > 1) {
            product.quantity -= 1;
        } else {
            // Si la cantidad es 1, elimina el producto del carrito
            state.value.cartItems.splice(productIndex, 1);
        }
        const total = calculate_total(state.value.cartItems)
        state.value={
            ...state.value,
            total,
            updateAt: new Date().toLocaleString()
        }
    }
        }, 
        clearCart:(state)=>{
            state.value.cartItems = []; 
            state.value.total = 0; 
            state.value.updateAt = new Date().toLocaleString();
        }
    }
})

export const {addItem, removeItem, clearCart}=cartSlice.actions

export default cartSlice.reducer