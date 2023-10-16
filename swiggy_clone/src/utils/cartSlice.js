import { createSlice } from "@reduxjs/toolkit";

const cartItems = {
  restaurantName: "",
  restaurant_id: "",
  areaName: "",
  logo: "",
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems,
  },
  reducers: {


    assignBasicDetails: (state, action) => {
      state.cartItems.restaurantName = action.payload.resName;
      state.cartItems.restaurant_id = action.payload.restaurant_id;
      state.cartItems.areaName = action.payload.areaname;
      state.cartItems.logo = action.payload.logo;
    },
    addItem: (state, action) => {
      const item = action.payload;
      const itemPresent = state.cartItems.items.find((i) => i.id === item.id);

      if (itemPresent) {
        itemPresent.quantity += 1;
      } else {
        state.cartItems.items.push(item);
      }
    },
   
    removeItem: (state, action) => {
       // write logic to search action payload in state and remove that.
       const item = action.payload;
       const index = state.cartItems.items.findIndex((i) => i.id === item.id);
       if (index !== -1) {
         if (state.cartItems.items[index].quantity > 1) {
           state.cartItems.items[index].quantity -= 1;
         } else if (state.cartItems.items[index].quantity === 1) {
           state.cartItems.items.splice(index, 1);
         }
       }
    },
    clearCart: (state) => {
      state.cartItems.restaurantName = ""
      state.cartItems.restaurant_id = ""
      state.cartItems.areaName = ""
      state.cartItems.logo = ""
      state.cartItems.items = []
    },
  },
});

export const {assignBasicDetails, addItem, decrementItem, removeItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
