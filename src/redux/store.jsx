import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product/product.slice";
import categoryReducer from "./category/category.slice";
import authReducer from "./auth/auth.slice";
import cartReducer from "./cart/cart.slice";
import shipReducer from "./ship/ship.slice";
import orderReducer from "./order/order.slice";
import reviewReducer from "./review/review.slice";
import statisticalReducer from "./statistical/statistical.slice";
import userReducer from "./user/user.slice";

const rootReducer = {
  product: productReducer,
  category: categoryReducer,
  auth: authReducer,
  cart: cartReducer,
  ship: shipReducer,
  order: orderReducer,
  review: reviewReducer,
  statistical: statisticalReducer,
  user: userReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});
