
import { configureStore, type Middleware } from "@reduxjs/toolkit";
import cartReducer, {
  syncCart,
  addItem,
  updateQty,
  removeItem,
} from "@/features/cart/state/cartSlice";
import checkoutReducer from "@/features/checkout/state/CheckoutSlice";

const SYNC_ACTIONS = new Set([
  addItem.type,
  updateQty.type,
  removeItem.type,
]);

const cartSyncMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  const result = next(action);

  if (typeof action === "object" && action !== null && "type" in action && SYNC_ACTIONS.has((action as { type: string }).type as any)) {
    const { cart } = storeAPI.getState().cart;
    if (cart) {
      storeAPI.dispatch(syncCart(cart) as never);
    }
  }

  return result;
};

export const store = configureStore({
  reducer: {
    cart:     cartReducer,
    checkout: checkoutReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartSyncMiddleware),
});

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;